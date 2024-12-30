<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Modal } from '@skeletonlabs/skeleton-svelte';

	import { buttonVariants, type ButtonVariants } from '../button';
	import { cardVariants } from '../card';
	import { modalFooterVariants, type ModalFooterVariants } from './index';

	type Props = {
		isOpen?: boolean;
		triggerInner: Snippet;
		triggerVariant?: ButtonVariants;
		header?: Snippet;
		body: Snippet<[() => void]>;
		/** @desciption A snippet that renders inside the modals footer, parses a function that will close the dialog as an argument */
		footer?: Snippet<[() => void]>;
		footerVariant?: ModalFooterVariants;
	};
	let {
		isOpen = $bindable(false),
		triggerInner,
		triggerVariant = { filled: 'primary' },
		header,
		body,
		footer,
		footerVariant
	}: Props = $props();

	function close() {
		isOpen = false;
	}
</script>

<Modal
	bind:open={isOpen}
	triggerBase={buttonVariants({ ...triggerVariant })}
	contentBase={cardVariants()}
	backdropClasses="backdrop-blur-sm"
>
	{#snippet trigger()}
		{@render triggerInner()}
	{/snippet}

	{#snippet content()}
		{#if header}
			<header>
				{@render header()}
			</header>
		{/if}

		<article>
			{@render body(close)}
		</article>

		{#if footer}
			<footer class={modalFooterVariants({ ...footerVariant })}>
				{@render footer(close)}
			</footer>
		{/if}
	{/snippet}
</Modal>
