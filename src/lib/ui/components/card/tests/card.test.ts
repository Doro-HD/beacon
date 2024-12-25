import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

import Card from '../Card.svelte';

describe('Card', () => {
	test('That it is be in the document', () => {
		const card = render(Card);

		expect(card.baseElement).toBeInTheDocument();
	});

	test('That it render with the correct props', () => {
		const title = 'Card title';
		const description = 'Card description';
		const card = render(Card, { title, description });

		const titleElement = card.getByText(title);
		const descriptionElement = card.getByText(description);

		expect(titleElement).toBeInTheDocument();
		expect(titleElement).toHaveClass('type-scale-5');

		expect(descriptionElement).toBeInTheDocument();
	});
});
