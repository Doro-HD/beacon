<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setMode, ModeWatcher } from 'mode-watcher';

	import { beaconStore } from '$lib/api/beacons';
	import '../app.css';
	import { Sidebar } from '$lib/ui/components/sidebar';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();

	setMode('dark');

	const items = $derived(
		beaconStore.getAllBeacons().map((beacon) => ({ title: beacon.name, identifier: beacon.id }))
	);
</script>

<ModeWatcher></ModeWatcher>

<div class="flex h-screen flex-row">
	<div class="w-1/6">
		<Sidebar class="h-full" {items} basePath="beacons"></Sidebar>
	</div>

	<div class="px-2">
		{@render children()}
	</div>
</div>
