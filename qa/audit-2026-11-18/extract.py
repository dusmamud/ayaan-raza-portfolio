#!/usr/bin/env python3
"""Audit extractor for ayaan-raza-portfolio live site. READ-ONLY. No fixes.
Fetches all 33 sitemap URLs via curl, extracts SEO/meta/JSON-LD/image facts.
Output: qa/audit-2026-11-18/schema/pages.json + summary.md
"""
import json, re, subprocess, sys, os
from html.parser import HTMLParser
from urllib.parse import urljoin

BASE = "https://ayaan-raza-portfolio.pages.dev"
OUTDIR = os.path.expanduser("~/workspace/ayaan-raza/qa/audit-2026-11-18/schema")
os.makedirs(OUTDIR, exist_ok=True)

def curl(url, headers_only=False):
    cmd = ["curl", "-s", "--max-time", "30", "-L"]
    if headers_only:
        cmd += ["-I"]
    cmd += [url]
    r = subprocess.run(cmd, capture_output=True, text=True)
    return r.stdout

def curl_status(url):
    r = subprocess.run(["curl", "-s", "-o", "/dev/null", "-w", "%{http_code} %{size_download} %{time_total}",
                        "--max-time", "30", "-L", url], capture_output=True, text=True)
    parts = r.stdout.split()
    return {"status": int(parts[0]) if parts else 0, "bytes": int(parts[1]) if len(parts) > 1 else 0,
            "time_s": float(parts[2]) if len(parts) > 2 else 0.0}

sitemap = curl(BASE + "/sitemap.xml")
urls = re.findall(r"<loc>([^<]+)</loc>", sitemap)
print(f"sitemap urls: {len(urls)}")

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.in_title = False
        self.meta = {}
        self.link = []
        self.h1 = []
        self.in_h1 = False
        self.h1buf = ""
        self.imgs = []
        self.scripts = []
        self.in_ld = False
        self.ldbuf = ""
        self.ld_raw = []
        self.lang = None
        self.in_script = False
        self.anchors_hash = 0
        self.anchors_total = 0
        self.html_attrs = {}
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "html":
            self.html_attrs = d
            self.lang = d.get("lang")
        if tag == "title":
            self.in_title = True
        if tag == "meta":
            k = d.get("name") or d.get("property") or d.get("charset") or d.get("http-equiv")
            if k:
                self.meta[k] = d.get("content", "")
        if tag == "link":
            self.link.append(d)
        if tag == "h1":
            self.in_h1 = True; self.h1buf = ""
        if tag == "img":
            self.imgs.append(d)
        if tag == "a":
            self.anchors_total += 1
            if d.get("href") in ("#", ""):
                self.anchors_hash += 1
        if tag == "script":
            self.in_script = True
            if d.get("type") == "application/ld+json":
                self.in_ld = True; self.ldbuf = ""
            else:
                self.scripts.append(d)
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "h1":
            self.in_h1 = False; self.h1.append(self.h1buf.strip())
        if tag == "script":
            if self.in_ld:
                self.ld_raw.append(self.ldbuf)
                self.in_ld = False
            self.in_script = False
    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_h1:
            self.h1buf += data
        if self.in_ld:
            self.ldbuf += data

def describe_jsonld(raw):
    try:
        obj = json.loads(raw)
    except Exception as e:
        return {"parse": "ERROR", "error": str(e)[:200], "raw_preview": raw[:300]}
    def types(o):
        out = []
        if isinstance(o, dict):
            if "@type" in o:
                t = o["@type"]
                out.append(t if isinstance(t, str) else "+".join(t))
            if "@graph" in o and isinstance(o["@graph"], list):
                for g in o["@graph"]:
                    out.extend(types(g))
            # nested mainEntity etc: record top-level only + graph
        elif isinstance(o, list):
            for i in o:
                out.extend(types(i))
        return out
    return {"parse": "OK", "types": types(obj), "keys": list(obj.keys()) if isinstance(obj, dict) else [f"list[{len(obj)}]"],
            "object": obj}

results = []
for u in urls:
    st = curl_status(u)
    html = curl(u)
    p = P()
    try:
        p.feed(html)
    except Exception as e:
        print(f"parse warn {u}: {e}")
    lds = [describe_jsonld(r) for r in p.ld_raw]
    # strip full objects for pages.json? keep them in separate file
    imgs_missing_alt = [i for i in p.imgs if "alt" not in i]
    imgs_empty_alt = [i for i in p.imgs if i.get("alt") == ""]
    imgs_no_dims = [i for i in p.imgs if "width" not in i or "height" not in i]
    imgs_no_lazy_below = None
    css = [l for l in p.link if l.get("rel") == "stylesheet"]
    preloads = [l for l in p.link if l.get("rel") == "preload"]
    canonical = [l.get("href") for l in p.link if l.get("rel") == "canonical"]
    og = {k: v for k, v in p.meta.items() if k.startswith("og:") or k.startswith("twitter:")}
    results.append({
        "url": u, "path": u[len(BASE):] or "/",
        "status": st["status"], "html_bytes": st["bytes"], "fetch_time_s": st["time_s"],
        "title": p.title.strip(), "title_len": len(p.title.strip()),
        "lang": p.lang,
        "meta_description": p.meta.get("description", ""),
        "meta_description_len": len(p.meta.get("description", "")),
        "robots_meta": p.meta.get("robots", ""),
        "viewport": p.meta.get("viewport", ""),
        "canonical": canonical,
        "og": og,
        "h1": p.h1,
        "jsonld_blocks": len(p.ld_raw),
        "jsonld": [{k: v for k, v in ld.items() if k != "object"} for ld in lds],
        "jsonld_objects": [ld.get("object") for ld in lds],
        "img_total": len(p.imgs),
        "img_missing_alt": len(imgs_missing_alt),
        "img_empty_alt": len(imgs_empty_alt),
        "img_no_dims": len(imgs_no_dims),
        "img_srcs": [i.get("src", "")[:120] for i in p.imgs],
        "img_loading": [i.get("loading", "(none)") for i in p.imgs],
        "img_fetchpriority": [i.get("fetchpriority", "(none)") for i in p.imgs],
        "css_links": len(css), "preload_links": len(preloads),
        "preload_hrefs": [l.get("href", "") for l in preloads],
        "script_tags": len(p.scripts),
        "script_srcs": [s.get("src", "(inline)") for s in p.scripts],
        "anchors_total": p.anchors_total, "anchors_hash_only": p.anchors_hash,
    })
    print(f"{st['status']} {u} ld={len(p.ld_raw)} imgs={len(p.imgs)} h1={len(p.h1)}")

with open(os.path.join(OUTDIR, "pages.json"), "w") as f:
    json.dump(results, f, indent=1, ensure_ascii=False)

# summary markdown
lines = ["# Live-site extraction summary (2026-11-18, curl, no fixes)", ""]
lines.append(f"Pages: {len(results)}")
for r in results:
    types = []
    for ld in r["jsonld"]:
        types.extend(ld.get("types", []))
    lines.append(f"- `{r['path']}` status={r['status']} bytes={r['html_bytes']} title_len={r['title_len']} desc_len={r['meta_description_len']} h1={len(r['h1'])} ld_blocks={r['jsonld_blocks']} ld_types={types} imgs={r['img_total']} (no-alt={r['img_missing_alt']}, empty-alt={r['img_empty_alt']}, no-dims={r['img_no_dims']}) css={r['css_links']} scripts={r['script_tags']} hash_links={r['anchors_hash_only']}")
with open(os.path.join(OUTDIR, "summary.md"), "w") as f:
    f.write("\n".join(lines) + "\n")
print("wrote pages.json + summary.md")
