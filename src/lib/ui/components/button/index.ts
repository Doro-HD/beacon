import { tv, type VariantProps } from 'tailwind-variants';

import Button from './Button.svelte';
import { presets } from '$lib/ui/presets';

const buttonVariants = tv({
	extend: presets,
	base: 'btn',
	variants: {
		size: {
			sm: 'btn-sm',
			md: 'btn-md',
			lg: 'btn-lg'
		}
	}
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export { Button, buttonVariants };
