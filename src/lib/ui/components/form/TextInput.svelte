<!--
@component
A text input component, provides a basic text input field
-->
<script lang="ts">
	import { fade } from 'svelte/transition';

	type Props = {
		label: string;
		placeholder?: string;
		value: string;
		error?: string;
	};
	let { label, placeholder = label, value = $bindable(), error }: Props = $props();
</script>

<div class="space-y-2">
	<label class="label">
		<span class="label-text">{label}</span>

		<input class="input" type="text" {placeholder} bind:value />
	</label>

	{#if error}
		<p class="text-xs text-error-900-100" transition:fade>{error}</p>
	{/if}
</div>
