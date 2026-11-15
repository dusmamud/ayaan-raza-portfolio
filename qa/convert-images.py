"""Generate AVIF + WebP + JPG variants for every artwork image.

Best-practice format waterfall (2026): AVIF first, WebP second, JPG
fallback, served via the <picture> element (see Picture.svelte). The
browser picks the first <source> type it supports, so selection is
native and instant with no JavaScript and only one file downloaded.

Sources are the PNG masters in static/images/. Re-run any time a
master changes. Settings are deliberately high-quality: the three
illustrations blend into exact section background colors, so flat
areas must stay uniform (AVIF/WebP keep flat colors near-exact;
JPG uses 4:4:4 subsampling to avoid block edges).
"""

import os
import subprocess

from PIL import Image

SRC = os.path.join(os.path.dirname(__file__), '..', 'portfolio', 'static', 'images')

FILES = [
	'hero-illustration.png',
	'about-illustration.png',
	'cta-illustration.png',
	'screen-foodly.png',
	'screen-shopio.png',
	'screen-walletwise.png',
	'screen-fittrack.png'
]


def main() -> None:
	for name in FILES:
		base = os.path.join(SRC, name[: -len('.png')])
		src = base + '.png'
		# AVIF: libaom reference encoder, constant quality, full chroma.
		subprocess.run(
			[
				'ffmpeg',
				'-y',
				'-hide_banner',
				'-loglevel',
				'error',
				'-i',
				src,
				'-c:v',
				'libaom-av1',
				'-still-picture',
				'1',
				'-crf',
				'28',
				'-b:v',
				'0',
				'-cpu-used',
				'5',
				'-pix_fmt',
				'yuv444p',
				base + '.avif'
			],
			check=True
		)
		img = Image.open(src).convert('RGB')
		img.save(base + '.webp', 'WEBP', quality=85, method=6)
		img.save(base + '.jpg', 'JPEG', quality=90, subsampling=0, optimize=True, progressive=True)
		sizes = {ext: os.path.getsize(f'{base}.{ext}') for ext in ('png', 'avif', 'webp', 'jpg')}
		print(f"{name}: png={sizes['png']} avif={sizes['avif']} webp={sizes['webp']} jpg={sizes['jpg']}")


if __name__ == '__main__':
	main()
