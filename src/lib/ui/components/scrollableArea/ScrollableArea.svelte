<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children: Snippet;
	};
	const { class: className, children }: Props = $props();
</script>

<div class={['max-h-full overflow-y-auto px-5', className]}>
	{@render children()}
</div>
