<!--
@component
A component used for displaying data in card format
-->

<script lang="ts">
	import { cardVariants, type CardProps } from './index';

	const { title, description, actions }: CardProps = $props();
</script>

<div class={cardVariants()} data-testid="card">
	<h6 class="h6">{title}</h6>

	<p>{description}</p>

	{#if actions}
		<footer class="flex justify-end">
			{@render actions({ title, description })}
		</footer>
	{/if}
</div>
