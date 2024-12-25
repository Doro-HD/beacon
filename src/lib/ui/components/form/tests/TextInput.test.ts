import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

import { TextInput } from '../index';


describe('TextInput', () => {
	test('That it is be in the document', () => {
		const { baseElement} = render(TextInput);

		expect(baseElement).toBeInTheDocument();
	});

	test('That it render with the correct props', () => {
        const label = 'Username';
        const value = 'Foo'
		const { getByText, getByPlaceholderText } = render(TextInput, { label, value });

        const labelElement = getByText(label);
        const inputElement = getByPlaceholderText(label);

        expect(labelElement).toHaveTextContent(label);

        expect(inputElement).toHaveValue(value);
	});
});
