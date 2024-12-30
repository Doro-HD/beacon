<!--
@component
A simple wrapper component around Skeletons button classes
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { buttonVariants, type ButtonVariants } from './index';

	type Props = {
		options?: { type?: 'button' | 'submit'; form?: string } | { href?: string; target?: '_blank' };
		class?: string;
		variant?: ButtonVariants;
		onclick?: () => void;
		children: Snippet;
	};
	const {
		options = { type: 'button' },
		class: className,
		variant = { filled: 'primary' },
		onclick,
		children
	}: Props = $props();
</script>

{#if 'type' in options}
	<button
		type={options.type}
		form={options.form}
		class={buttonVariants({ ...variant, className })}
		{onclick}
	>
		{@render children()}
	</button>
{:else if 'href' in options}
	<a href={options.href} target={options.target} class={buttonVariants({ ...variant, className })}
		>{@render children()}</a
	>
{/if}
