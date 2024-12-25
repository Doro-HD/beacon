<script lang="ts">
	import { getContext, type Snippet } from 'svelte';

	import { beaconStore, type Beacon } from '$lib/api/beacons';
	import { Sidebar } from '$lib/ui/components/sidebar';
	import { Modal } from '$lib/ui/components/modal';
	import { Button } from '$lib/ui/components/button';
	import BeaconForm from './BeaconForm.svelte';
	import type { ToastContext } from '@skeletonlabs/skeleton-svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();

	const toast: ToastContext = getContext('toast');

	const items = $derived(
		beaconStore.beacons.map((beacon) => ({ title: beacon.name, identifier: beacon.id }))
	);

	let isCreateBeaconOpen = $state(false);

	async function createBeacon(beacon: Omit<Beacon, 'id'>) {
		const createResult = await beaconStore.add(beacon);

		switch (createResult.status) {
			case 'success':
				toast.create({ description: `Created Beacon ${createResult.data.name}`, type: 'success' });

				break;
			case 'error':
				toast.create({ description: 'Could not create Beacon', type: 'error' });

				break;
		}

		isCreateBeaconOpen = false;
	}
</script>

<div class="flex h-screen flex-row">
	<div class="w-1/6">
		<Sidebar class="h-full" {items} basePath="beacons" headerVariant={{ justify: 'between' }}>
			{#snippet header()}
				<h6 class="h6">Beacons</h6>

				<Modal
					triggerVariant={{ outlined: 'primary' }}
					footerVariant={{ jutify: 'end' }}
					bind:isOpen={isCreateBeaconOpen}
				>
					{#snippet triggerInner()}
						Add Beacon
					{/snippet}

					{#snippet header()}
						<h5 class="h5">Add Beacon</h5>
					{/snippet}

					<BeaconForm onSubmit={createBeacon} id="create-beacon"></BeaconForm>

					{#snippet footer()}
						<Button variant={{ tonal: 'error' }} onclick={() => (isCreateBeaconOpen = false)}
							>Cancel</Button
						>

						<Button type="submit" form="create-beacon" variant={{ filled: 'success' }}>Add</Button>
					{/snippet}
				</Modal>
			{/snippet}
		</Sidebar>
	</div>

	<div class="px-2">
		{@render children()}
	</div>
</div>
