import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

import Grid from '../Grid.svelte';
import { createRawSnippet } from 'svelte';

describe('Grid', () => {
	const emptySnippet = createRawSnippet(() => ({ render: () => '<p>Foo</p>' }));

	test('Should be in the document', () => {
		const card = render(Grid, { children: emptySnippet });

		expect(card.baseElement).toBeInTheDocument();
	});

	test('Should have the tailwind css classes', () => {
		const grid = render(Grid, { children: emptySnippet });

		expect(grid.getByTestId('grid')).toHaveClass('grid grid-cols-3 gap-2');
	});
});
