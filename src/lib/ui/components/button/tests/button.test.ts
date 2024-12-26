import { createRawSnippet } from 'svelte';
import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

import { Button } from '../index';

describe('Button', () => {
	const ButtonChildren = createRawSnippet(() => ({ render: () => '<span>Button</span>' }));

	test('That it is in the document', () => {
		const { baseElement } = render(Button, { children: ButtonChildren });

		expect(baseElement).toBeInTheDocument();
	});

	test('That the onclick is called once on a single click', () => {
		const onclick = vi.fn(() => {});
		const { getByRole } = render(Button, { children: ButtonChildren, onclick });

		const btn = getByRole('button');
		btn.click();

		expect(onclick).toHaveBeenCalledOnce();
	});

	test('That a variant can be applied', () => {
		const { getByRole } = render(Button, {
			children: ButtonChildren,
			variant: { outlined: 'tertiary' }
		});

		const btn = getByRole('button');

		expect(btn).toHaveClass('btn preset-outlined-tertiary-500');
	});
});
