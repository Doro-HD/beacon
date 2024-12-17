<!--
@component
A sidebar component, useful for having a vertical navigation bar
-->
<script lang="ts">
	type Props = {
		class?: string;
		items: { title: string; identifier: string }[];
		basePath: string;
	};
	const { class: className, items, basePath }: Props = $props();
</script>

<div class="border-e-4 {className}">
	{#each items as item}
		<div class="border-b-2 ps-1 preset-filled-surface-100-900">
			<a href="/{basePath}/{item.identifier}" class="anchor type-scale-6">{item.title}</a>
		</div>
	{/each}
</div>
