<!--
@component
A simple wrapper component around Skeletons button classes
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { buttonVariants } from './index';
	import type { Presets } from '$lib/ui/presets';

	type Props = {
		type?: 'button' | 'submit';
		form?: string;
		variant?: Presets;
		onclick?: () => void;
		children: Snippet;
	};
	const {
		type = 'button',
		form,
		variant = { filled: 'primary' },
		onclick,
		children
	}: Props = $props();
</script>

<button {type} {form} class={buttonVariants({ ...variant })} {onclick}>
	{@render children()}
</button>
