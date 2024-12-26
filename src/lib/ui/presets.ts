import { tv, type VariantProps } from 'tailwind-variants';

export const presets = tv({
	variants: {
		filled: {
			primary: 'preset-filled-primary-500',
			secondary: 'preset-filled-secondary-500',
			tertiary: 'preset-filled-tertiary-500',
			success: 'preset-filled-success-500',
			warning: 'preset-filled-warning-500',
			error: 'preset-filled-error-500',
			surface: 'preset-filled-surface-500'
		},
		tonal: {
			primary: 'preset-tonal-primary',
			secondary: 'preset-tonal-secondary',
			tertiary: 'preset-tonal-tertiary',
			success: 'preset-tonal-success',
			warning: 'preset-tonal-warning',
			error: 'preset-tonal-error',
			surface: 'preset-tonal-surface'
		},
		outlined: {
			primary: 'preset-outlined-primary-500',
			secondary: 'preset-outlined-secondary-500',
			tertiary: 'preset-outlined-tertiary-500',
			success: 'preset-outlined-success-500',
			warning: 'preset-outlined-warning-500',
			error: 'preset-outlined-error-500',
			surface: 'preset-outlined-surface-500'
		}
	}
});

export type Presets = VariantProps<typeof presets>;
