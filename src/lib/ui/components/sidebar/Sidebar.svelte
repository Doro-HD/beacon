<!--
@component
A sidebar component, useful for having a vertical navigation bar.

-->
<script lang="ts">
	import { type Snippet } from 'svelte';
	import { sideBarHeaderVariants, type SideBarHeaderVariants } from '.';

	type Props = {
		class?: string;
		items: { title: string; identifier: string }[];
		basePath: string;
		header?: Snippet;
		headerVariant?: SideBarHeaderVariants;
	};
	const { class: className, items, basePath, header, headerVariant }: Props = $props();
</script>

<div class="border-e-4 {className}">
	<div class={sideBarHeaderVariants({ ...headerVariant })}>
		{#if header}
			{@render header()}
		{/if}
	</div>

	{#each items as item}
		<div class="border-b-2 ps-1 preset-filled-surface-100-900">
			<a href="/{basePath}/{item.identifier}" class="anchor type-scale-6">{item.title}</a>
		</div>
	{/each}
</div>
