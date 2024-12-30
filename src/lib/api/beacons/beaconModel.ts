import { z } from 'zod';

export const beaconSchema = z.object({
	id: z.string().cuid2(),
	name: z.string().min(5),
	url: z.string().url(),
});

export type Beacon = z.infer<typeof beaconSchema>;
