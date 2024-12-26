import { tv, type VariantProps } from 'tailwind-variants';
import Modal from './Modal.svelte';

const modalFooterVariants = tv({
	base: 'flex gap-x-2',
	variants: {
		jutify: {
			start: 'justify-start',
			center: 'justify-center',
			end: 'justify-end'
		}
	}
});
export type ModalFooterVariants = VariantProps<typeof modalFooterVariants>;

export { Modal, modalFooterVariants };
