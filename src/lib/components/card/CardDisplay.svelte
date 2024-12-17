<!--
@component
A component used to display data in a card layout
-->

<script lang="ts">
	import { Grid } from '../grid';
	import { Card, type CardProps } from './index';

	type Props = {
		cards: CardProps[];
	};
	const { cards }: Props = $props();
</script>

<Grid>
	{#each cards as card, i (i)}
		<Card title={card.title} description={card.description}></Card>
	{/each}
</Grid>
