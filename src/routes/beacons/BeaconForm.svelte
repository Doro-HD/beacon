<script lang="ts">
	import type { Snippet } from 'svelte';

	import { beaconSchema, type Beacon } from '$lib/api/beacons/beaconModel';
	import { Form, TextInput } from '$lib/ui/components/form';

	type Props = {
		id?: string;
		beaconName?: string;
		beaconUrl?: string;
		onSubmit: (beacon: Omit<Beacon, 'id'>) => void;
		children?: Snippet;
	};
	let {
		id = 'beacon-form',
		beaconName = $bindable(''),
		beaconUrl = $bindable(''),
		onSubmit,
		children
	}: Props = $props();

	let nameError: string | undefined = $state(undefined);

	let urlError: string | undefined = $state(undefined);

	function submit(event: SubmitEvent) {
		event.preventDefault();

		const schemaResult = beaconSchema
			.omit({ id: true })
			.safeParse({ name: beaconName, url: beaconUrl });
		if (!schemaResult.success) {
			const formattedError = schemaResult.error.format();

			nameError = formattedError.name?._errors.join(', ');
			urlError = formattedError.url?._errors.join(', ');

			return;
		}
		const data = schemaResult.data;

		onSubmit({ name: data.name, url: data.url });
	}
</script>

<Form ariaLabel="beacon-form" {id} onSubmit={submit}>
	<TextInput label="Name" bind:value={beaconName} error={nameError}></TextInput>

	<TextInput label="URL" bind:value={beaconUrl} error={urlError}></TextInput>

	{#if children}
		{@render children()}
	{/if}
</Form>
