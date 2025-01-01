<script lang="ts">
	import { type Snippet } from 'svelte';

	import { beaconStore } from '$lib/api/beacons';
	import BeaconTree from './BeaconTree.svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="relative flex h-screen flex-row">
	<div class="fixed left-0 top-0 h-screen w-96">
		<BeaconTree></BeaconTree>
	</div>

	<div class="ps-96">
		{@render children()}
	</div>
</div>
