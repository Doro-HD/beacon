<script lang="ts">
	import { type Snippet } from 'svelte';

	import { beaconStore } from '$lib/api/beacons';
	import BeaconTree from './BeaconTree.svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="flex h-screen flex-row">
	<div class="min-w-96">
		<BeaconTree></BeaconTree>
	</div>

	<div class="px-2">
		{@render children()}
	</div>
</div>
