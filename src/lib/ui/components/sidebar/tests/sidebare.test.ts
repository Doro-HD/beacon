import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';

import Sidebar from '../Sidebar.svelte';

describe('Sidebar', () => {
	test('Should be in the document', () => {
		const sidebar = render(Sidebar);

		expect(sidebar.baseElement).toBeInTheDocument();
	}),
		test('Should render with correct props', () => {
			const basePath = 'test';
			const item = { title: 'Foo', identifier: 'Bar' };

			const sidebar = render(Sidebar, { items: [item], basePath });

			const anchorElement = sidebar.getByRole('link');

			expect(anchorElement).toHaveTextContent(item.title);
			expect(anchorElement.getAttribute('href')).toBe(`/${basePath}/${item.identifier}`);
		}),
		test('Should render correct amount of <a> tags', () => {
			const basePath = 'test';
			const items = [
				{ title: 'Foo', identifier: 'Foo' },
				{ title: 'Bar', identifier: 'Bar' }
			];

			const sidebar = render(Sidebar, { items: items, basePath });

			const anchorElements = sidebar.getAllByRole('link');

			expect(anchorElements.length).toBe(items.length);
		});
});
