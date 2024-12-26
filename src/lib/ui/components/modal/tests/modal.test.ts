import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

//import { Modal } from '../index';
import { createRawSnippet } from 'svelte';

describe('Modal', () => {
	const triggerSnippet = createRawSnippet(() => ({ render: () => '<p>foo</p>' }));
	const childrenSnippet = createRawSnippet(() => ({ render: () => '<p>foo</p>' }));

	test('That it is be in the document', () => {
		//const { baseElement} = render(Modal, { triggerInner: triggerSnippet, children: childrenSnippet });
		//expect(baseElement).toBeInTheDocument();
	});
});
