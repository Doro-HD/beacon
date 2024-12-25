<!--
@component
A component used for displaying data in card format
-->

<script lang="ts">
	import { cardVariants, type CardProps } from './index';

	const { title, description }: CardProps = $props();
</script>

<div class={cardVariants()} data-testid="card">
	<p class="type-scale-5">{title}</p>

	<p>{description}</p>
</div>
