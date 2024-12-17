<!--
@component
A component used for displaying data in card format
-->

<script lang="ts">
	import { type CardProps } from './index';

	const { title, description }: CardProps = $props();
</script>

<div
	class="card w-full max-w-md border-[1px] p-4 font-bold border-surface-200-800 preset-filled-surface-100-900"
	data-testid="card"
>
	<p class="type-scale-5">{title}</p>

	<p>{description}</p>
</div>
