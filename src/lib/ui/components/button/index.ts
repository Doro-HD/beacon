import { tv, type VariantProps } from 'tailwind-variants';

import Button from './Button.svelte';
import { presets } from '$lib/ui/presets';

const buttonVariants = tv({
	extend: presets,
	base: 'btn'
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export { Button, buttonVariants };
