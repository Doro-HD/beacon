import { tv, type VariantProps } from 'tailwind-variants';
import Sidebar from './Sidebar.svelte';

const sideBarHeaderVariants = tv({
    base: 'flex p-3',
    variants: {
        justify: {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            between: 'justify-between'
        }
    }
});
export type SideBarHeaderVariants = VariantProps<typeof sideBarHeaderVariants>;

export { Sidebar, sideBarHeaderVariants };
