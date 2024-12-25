<script lang="ts">
	import type { Snippet } from 'svelte';

	import { setMode, ModeWatcher } from 'mode-watcher';
	import { ToastProvider } from '@skeletonlabs/skeleton-svelte';

	import '../app.css';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();

	setMode('dark');
</script>

<ModeWatcher></ModeWatcher>

<ToastProvider>
	{@render children()}
</ToastProvider>
