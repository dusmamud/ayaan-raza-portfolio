<script lang="ts">
	// Inline brand icon (Simple Icons path data). The visible name sits
	// beside the icon, so the graphic itself stays hidden from AT.
	let {
		path,
		color,
		size = 40
	}: {
		path: string;
		color: string;
		size?: number;
	} = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill={color}
	aria-hidden="true"
	focusable="false"
>
	<path d={path} />
</svg>
