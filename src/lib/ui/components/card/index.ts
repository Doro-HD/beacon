import { tv, type VariantProps } from 'tailwind-variants';
import Card from './Card.svelte';
import CardDisplay from './CardDisplay.svelte';

// Used to style skeleton components that needs to be a card and needs class names and not a component
const cardVariants = tv({
	base: 'card bg-surface-100-900 p-4 space-y-4 shadow-xl w-full max-w-screen-sm'
});

export type CardVariants = VariantProps<typeof cardVariants>;

export type CardProps = {
	title: string;
	description: string;
};

export { Card, CardDisplay, cardVariants };
