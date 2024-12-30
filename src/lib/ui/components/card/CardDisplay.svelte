<!--
@component
A component used to display data in a card layout
-->

<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { Grid } from '../grid';
	import { Card, type CardProps } from './index';

	type Props = {
		dataCards: { card: CardProps; meta: T }[];
		/** @description Apllies the css classes to all card components*/
		class?: string;
		dataActions: Snippet<[T]>;
	};
	const { dataCards, class: className, dataActions }: Props = $props();
</script>

<Grid>
	{#each dataCards as dataCard, i (i)}
		<Card {...dataCard.card} class={className}>
			{#snippet actions()}
				{@render dataActions(dataCard.meta)}
			{/snippet}
		</Card>
	{/each}
</Grid>
