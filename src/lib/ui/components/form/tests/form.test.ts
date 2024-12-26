import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

import { Form } from '../index';
import { createRawSnippet } from 'svelte';

describe('Form', () => {
	const childrenSnippet = createRawSnippet(() => ({ render: () => '<p>foo</p>' }));

	test('That it is be in the document', () => {
		const { baseElement } = render(Form, { ariaLabel: 'form', children: childrenSnippet });

		expect(baseElement).toBeInTheDocument();
	});

	test('That it calls the onSubmit prop once on submit', () => {
		const onSubmit = vi.fn((e: SubmitEvent) => {
			e.preventDefault();
		});
		const { getByRole } = render(Form, { ariaLabel: 'form', onSubmit, children: childrenSnippet });

		const form = getByRole('form');
		fireEvent(form, new SubmitEvent('submit', {}));

		expect(onSubmit).toHaveBeenCalledOnce();
	});
});
