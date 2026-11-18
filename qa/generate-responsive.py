"""Generate responsive width variants for every artwork image.

Replaces the single-resolution output of convert-images.py (kept for
reference; do not run it — it writes the old {name}.{ext} files nothing
references any more). Each PNG master in qa/masters/ produces, per width,
an AVIF + WebP + JPG triple named {name}-{width}.{ext}, consumed by
Picture.svelte via srcset/sizes. Encoder settings match convert-images.py
exactly (AVIF libaom CRF 28 yuv444p, WebP q85, JPG q90 4:4:4 progressive)
so the resized files keep the same flat-colour behaviour as the originals.

Masters: 7 recovered from git history (commit cd33256^, before the PNGs
were deleted from static/) + screen-wanderly/screen-taskflow already in
qa/masters/. Re-extract with:
  git show "cd33256^:portfolio/static/images/<name>.png" > qa/masters/<name>.png

Widths: illustrations are shown at ~592px on desktop / full-width on
mobile (up to ~3x DPR) -> [640, 960, 1280, 1920]. Phone screens are shown
at <=144px CSS -> [320, 480, 720, native]. Run under plain `python3`
(the login-shell python lacks PIL).

Requires: ffmpeg with libaom-av1, PIL.
"""

import os
import subprocess
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
MASTERS = os.path.join(HERE, "masters")
OUT = os.path.join(HERE, "..", "portfolio", "static", "images")

# name -> widths. Screens use their native width as the largest entry;
# it is resolved from the master at runtime (1008, except fittrack 970).
WIDTHS = {
    "hero-illustration": [640, 960, 1280, 1920],
    "about-illustration": [640, 960, 1280, 1920],
    "cta-illustration": [640, 960, 1280, 1920],
    "screen-foodly": [320, 480, 720, None],
    "screen-shopio": [320, 480, 720, None],
    "screen-walletwise": [320, 480, 720, None],
    "screen-fittrack": [320, 480, 720, None],
    "screen-wanderly": [320, 480, 720, None],
    "screen-taskflow": [320, 480, 720, None],
}


def encode_avif(src: str, width: int, dest: str) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            src,
            "-vf",
            f"scale={width}:-2",
            "-c:v",
            "libaom-av1",
            "-still-picture",
            "1",
            "-crf",
            "28",
            "-b:v",
            "0",
            "-cpu-used",
            "5",
            "-pix_fmt",
            "yuv444p",
            dest,
        ],
        check=True,
    )


def main() -> int:
    total = {"avif": 0, "webp": 0, "jpg": 0}
    for name, widths in WIDTHS.items():
        src = os.path.join(MASTERS, name + ".png")
        if not os.path.exists(src) or os.path.getsize(src) == 0:
            print(f"SKIP {name}: master missing or empty: {src}")
            continue
        with Image.open(src) as probe:
            native_w, native_h = probe.size
        resolved = [native_w if w is None else w for w in widths]
        for width in resolved:
            if width > native_w:
                print(f"SKIP {name}-{width}: wider than native {native_w}")
                continue
            base = os.path.join(OUT, f"{name}-{width}")
            encode_avif(src, width, base + ".avif")
            with Image.open(src).convert("RGB") as img:
                height = round(img.height * width / img.width)
                resized = img.resize((width, height), Image.LANCZOS)
                resized.save(base + ".webp", "WEBP", quality=85, method=6)
                resized.save(
                    base + ".jpg", "JPEG", quality=90, subsampling=0, optimize=True, progressive=True
                )
            sizes = {ext: os.path.getsize(f"{base}.{ext}") for ext in ("avif", "webp", "jpg")}
            for ext, size in sizes.items():
                total[ext] += size
            print(f"{name}-{width}: {native_w}x{native_h} -> {width}x{height} "
                  f"avif={sizes['avif']} webp={sizes['webp']} jpg={sizes['jpg']}")
    print(f"TOTAL: avif={total['avif']} webp={total['webp']} jpg={total['jpg']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
