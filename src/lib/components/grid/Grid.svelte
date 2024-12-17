<!--
@component
A component used for displaying elemnts in a grid, is best used as a wrapper for other types of display components. 
For example a card view
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="grid grid-cols-4 gap-2" data-testid="grid">
	{@render children()}
</div>
