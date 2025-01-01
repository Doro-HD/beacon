import { tv, type VariantProps } from 'tailwind-variants';
import Card from './Card.svelte';
import CardDisplay from './CardDisplay.svelte';
import type { Snippet } from 'svelte';

// Used to style skeleton components that needs to be a card and needs class names and not a component
const cardVariants = tv({
	base: 'card flex w-full max-w-screen-sm flex-col space-y-4 p-4 shadow-xl bg-surface-100-900',
	variants: {
		hover: {
			true: 'card-hover'
		}
	}
});

export type CardVariants = VariantProps<typeof cardVariants>;

export type CardProps = {
	title: string;
	description: string;
	thumbnail?: string;
	actions?: Snippet<[Omit<CardProps, 'actions'>]>;
};

export { Card, CardDisplay, cardVariants };
