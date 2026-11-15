<!-- Original flat illustration for the hero: laptop, phone, plant and mug
     on a pink blob. Reference artwork was not copied; all shapes here are
     simple SVG geometry. Decorative only. -->
<svg viewBox="0 0 560 420" class="h-auto w-full" aria-hidden="true">
	<!-- Blob -->
	<path
		class="fill-blush"
		d="M280 28 C 400 10 520 70 536 180 C 550 280 480 380 360 398 C 240 416 110 390 62 300 C 14 210 40 130 120 78 C 170 46 220 38 280 28 Z"
	/>
	<!-- Sparkles -->
	<g class="fill-ink">
		<path d="M96 92 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 Z" />
		<path d="M478 60 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 Z" />
		<path d="M452 330 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 Z" />
		<path d="M70 300 l2.5 8 8 2.5 -8 2.5 -2.5 8 -2.5 -8 -8 -2.5 8 -2.5 Z" />
	</g>
	<g class="fill-accent">
		<path d="M510 200 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 Z" />
		<path d="M150 44 l2.5 8 8 2.5 -8 2.5 -2.5 8 -2.5 -8 -8 -2.5 8 -2.5 Z" />
	</g>

	<!-- Code bubble -->
	<g>
		<rect x="196" y="58" width="76" height="38" rx="12" class="fill-white" />
		<text
			x="234"
			y="84"
			text-anchor="middle"
			class="fill-ink"
			font-size="18"
			font-weight="700"
			font-family="monospace">&lt;/&gt;</text
		>
	</g>

	<!-- Laptop -->
	<g>
		<rect x="130" y="120" width="300" height="190" rx="12" class="fill-ink" />
		<rect x="142" y="132" width="276" height="166" rx="6" class="fill-footer" />
		<!-- code lines -->
		<g>
			<rect x="158" y="148" width="90" height="8" rx="4" class="fill-accent" opacity="0.9" />
			<rect x="158" y="166" width="150" height="8" rx="4" class="fill-white" opacity="0.75" />
			<rect x="158" y="184" width="120" height="8" rx="4" class="fill-white" opacity="0.55" />
			<rect x="174" y="202" width="170" height="8" rx="4" class="fill-tile-yellow" />
			<rect x="174" y="220" width="110" height="8" rx="4" class="fill-white" opacity="0.55" />
			<rect x="158" y="238" width="180" height="8" rx="4" class="fill-tile-purple" />
			<rect x="158" y="256" width="90" height="8" rx="4" class="fill-white" opacity="0.75" />
		</g>
		<!-- keyboard base -->
		<path
			d="M106 310 L454 310 L472 334 Q 474 340 466 340 L94 340 Q 86 340 88 334 Z"
			class="fill-white"
		/>
		<rect x="220" y="318" width="120" height="10" rx="5" class="fill-lilac" />
	</g>

	<!-- Phone -->
	<g transform="rotate(8 470 190)">
		<rect x="432" y="96" width="82" height="168" rx="16" class="fill-ink" />
		<rect x="438" y="102" width="70" height="156" rx="11" class="fill-white" />
		<rect x="448" y="114" width="50" height="52" rx="8" class="fill-tile-pink" />
		<rect x="448" y="176" width="50" height="7" rx="3.5" class="fill-ink" opacity="0.7" />
		<rect x="448" y="190" width="34" height="7" rx="3.5" class="fill-ink" opacity="0.35" />
		<rect x="448" y="208" width="50" height="16" rx="8" class="fill-accent" />
		<rect x="448" y="232" width="50" height="7" rx="3.5" class="fill-ink" opacity="0.2" />
	</g>

	<!-- Plant -->
	<g>
		<path d="M104 316 L146 316 L140 356 L110 356 Z" class="fill-white" />
		<ellipse
			cx="118"
			cy="288"
			rx="10"
			ry="26"
			class="fill-icon-green"
			transform="rotate(-18 118 288)"
		/>
		<ellipse cx="134" cy="282" rx="10" ry="30" class="fill-icon-green" />
		<ellipse
			cx="148"
			cy="292"
			rx="9"
			ry="22"
			class="fill-icon-green"
			transform="rotate(20 148 292)"
		/>
	</g>

	<!-- Mug -->
	<g>
		<rect x="452" y="300" width="64" height="58" rx="10" class="fill-ink" />
		<circle cx="524" cy="328" r="13" fill="none" class="stroke-ink" stroke-width="8" />
		<text
			x="484"
			y="338"
			text-anchor="middle"
			class="fill-white"
			font-size="22"
			font-weight="800"
			font-family="sans-serif">AR.</text
		>
		<path
			d="M468 288 q4 -8 0 -16"
			fill="none"
			class="stroke-ink"
			stroke-width="3"
			stroke-linecap="round"
			opacity="0.5"
		/>
		<path
			d="M490 288 q4 -8 0 -16"
			fill="none"
			class="stroke-ink"
			stroke-width="3"
			stroke-linecap="round"
			opacity="0.5"
		/>
	</g>
</svg>
