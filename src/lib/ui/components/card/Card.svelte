<!--
@component
A component used for displaying data in card format
-->

<script lang="ts">
	import { cardVariants, type CardProps, type CardVariants } from './index';

	const {
		title,
		description,
		thumbnail,
		class: className,
		variant,
		actions
	}: CardProps & { class?: string | string[]; variant?: CardVariants } = $props();
</script>

<div class={cardVariants({ ...variant, className })} data-testid="card">
	<header>
		<img src={thumbnail ?? '/alt_beacon.png'} alt="Beacon" />
	</header>

	<article>
		<h5 class="h5">{title}</h5>

		<p class="line-clamp-5">{description}</p>
	</article>

	{#if actions}
		<footer class="self-end">
			{@render actions({ title, description })}
		</footer>
	{/if}
</div>
