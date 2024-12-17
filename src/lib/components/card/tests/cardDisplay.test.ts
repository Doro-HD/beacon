import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

import CardDisplay from '../CardDisplay.svelte';

describe('CardDisplay', () => {
	test('Should be in the document', () => {
		const cardDisplay = render(CardDisplay)

		expect(cardDisplay.baseElement).toBeInTheDocument();
	}),

		test('Should render the correct amount of cards', () => {
			const cards = [{ title: 'Foo', description: 'Foo' }, { title: 'Bar', description: 'Bar' }];
			const cardDisplay = render(CardDisplay, { cards });

			const cardElements = cardDisplay.getAllByTestId('card');

			expect(cardElements.length).toBe(cards.length)
		})
})
