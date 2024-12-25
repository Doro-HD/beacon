<!--
@component
A form component for uniform styling
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		ariaLabel: string;
		id?: string;
		onSubmit?: (event: SubmitEvent) => void;
		children: Snippet;
	};
	const { ariaLabel, id, onSubmit, children }: Props = $props();
</script>

<form aria-label={ariaLabel} {id} class="space-y-2" onsubmit={onSubmit}>
	{@render children()}
</form>
