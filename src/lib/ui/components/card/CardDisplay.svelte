<!--
@component
A component used to display data in a card layout
-->

<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { Grid } from '../grid';
	import { Card, type CardProps, type CardVariants } from './index';

	type Props = {
		dataCards: { card: CardProps; meta: T }[];
		/** @description Apllies the css classes to all card components*/
		class?: string;
		variant?: CardVariants;
		dataActions: Snippet<[T]>;
	};
	const { dataCards, class: className, variant, dataActions }: Props = $props();
</script>

<Grid>
	{#each dataCards as dataCard, i (i)}
		<Card {...dataCard.card} class={className} {variant}>
			{#snippet actions()}
				{@render dataActions(dataCard.meta)}
			{/snippet}
		</Card>
	{/each}
</Grid>
