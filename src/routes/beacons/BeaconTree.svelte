<!--
@component
A componnet for handling a file like tree structure, provides an interface for creating, updating and deleting generic items
-->
<script lang="ts">
	import { getContext } from 'svelte';
	import type { ToastContext } from '@skeletonlabs/skeleton-svelte';
	import { Pencil, X } from 'lucide-svelte';

	import { beaconStore, type Beacon } from '$lib/api/beacons';
	import { Modal } from '$lib/ui/components/modal';
	import { Button } from '$lib/ui/components/button';
	import BeaconForm from './BeaconForm.svelte';

	const toast: ToastContext = getContext('toast');

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

	async function updateBeacon(
		beaconId: string,
		beacon: Omit<Beacon, 'id'>,
		closeModal: () => void
	) {
		const updateResult = await beaconStore.update({ ...beacon, id: beaconId });

		switch (updateResult.status) {
			case 'success':
				toast.create({ description: `Updated Beacon ${updateResult.data?.name}`, type: 'success' });

				break;
			case 'error':
				toast.create({ description: 'Could not update Beacon', type: 'error' });

				break;
		}

		closeModal();
	}

	async function deleteBeacon(beaconId: string) {
		const deletedBeacon = await beaconStore.delete(beaconId);

		switch (deletedBeacon.status) {
			case 'success':
				toast.create({
					description: `Deleted beacon ${deletedBeacon.data?.name}`,
					type: 'success'
				});

				break;
			case 'error':
				toast.create({
					description: `Could not delete beacon due to:  ${deletedBeacon.reason}`,
					type: 'error'
				});

				break;
		}
	}
</script>

<div class="h-full space-y-2 border-e-4">
	<div class="flex justify-between">
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

			{#snippet body()}
				<BeaconForm onSubmit={createBeacon} id="create-beacon"></BeaconForm>
			{/snippet}

			{#snippet footer()}
				<Button variant={{ tonal: 'error' }} onclick={() => (isCreateBeaconOpen = false)}
					>Cancel</Button
				>

				<Button options={{ type: 'submit', form: 'create-beacon' }} variant={{ filled: 'success' }}
					>Add</Button
				>
			{/snippet}
		</Modal>
	</div>

	{#each beaconStore.beacons as beacon (beacon.id)}
		{@const formId = `edit-beacon-${beacon.id}`}
		<div class="group motion-preset-fade relative border-b-2 ps-1 preset-filled-surface-100-900">
			<div class="motion-preset-fade absolute right-0 top-0 hidden gap-x-2 group-hover:flex">
				<Modal
					triggerVariant={{ filled: 'tertiary', size: 'sm' }}
					footerVariant={{ jutify: 'end' }}
				>
					{#snippet triggerInner()}
						<Pencil></Pencil>
					{/snippet}

					{#snippet header()}
						<h5 class="h5">Edit {beacon.name}</h5>
					{/snippet}

					{#snippet body(close)}
						<BeaconForm
							beaconName={beacon.name}
							beaconUrl={beacon.url}
							onSubmit={(updatedBeacon) => updateBeacon(beacon.id, updatedBeacon, close)}
							id={formId}
						></BeaconForm>
					{/snippet}

					{#snippet footer(close)}
						<Button variant={{ tonal: 'error' }} onclick={close}>Cancel</Button>

						<Button options={{ type: 'submit', form: formId }} variant={{ filled: 'success' }}
							>Save</Button
						>
					{/snippet}
				</Modal>

				<Button onclick={() => deleteBeacon(beacon.id)} variant={{ filled: 'error', size: 'sm' }}>
					<X></X>
				</Button>
			</div>

			<a href="/#/beacons/{beacon.id}" class="anchor type-scale-6">{beacon.name}</a>
		</div>
	{/each}
</div>
