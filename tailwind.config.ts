import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

import { skeleton, contentPath } from '@skeletonlabs/skeleton/plugin';
import * as themes from '@skeletonlabs/skeleton/themes';
import tailwindcssMotion from "tailwindcss-motion"; 

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', contentPath(import.meta.url, 'svelte')],

	theme: {
		extend: {}
	},

	darkMode: 'selector',

	plugins: [
		forms,
		skeleton({
			themes: [themes.cerberus, themes.catppuccin]
		}),
		tailwindcssMotion
	]
} satisfies Config;
