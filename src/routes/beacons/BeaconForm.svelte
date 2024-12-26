<script lang="ts">
	import type { Snippet } from 'svelte';

	import { beaconSchema, type Beacon } from '$lib/api/beacons/beaconModel';
	import { Form, TextInput } from '$lib/ui/components/form';

	type Props = {
		id?: string;
		onSubmit: (beacon: Omit<Beacon, 'id'>) => void;
		children?: Snippet;
	};
	const { id = 'beacon-form', onSubmit, children }: Props = $props();

	let name = $state('');
	let nameError: string | undefined = $state(undefined);

	let url = $state('');
	let urlError: string | undefined = $state(undefined);

	function submit(event: SubmitEvent) {
		event.preventDefault();

		const schemaResult = beaconSchema.omit({ id: true }).safeParse({ name, url });
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
	<TextInput label="Name" bind:value={name} error={nameError}></TextInput>

	<TextInput label="URL" bind:value={url} error={urlError}></TextInput>

	{#if children}
		{@render children()}
	{/if}
</Form>
