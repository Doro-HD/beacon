<script lang="ts">
	import { CardDisplay } from '$lib/ui/components/card';

	const beaconFires = [
		{ title: 'Dokapon Kingdom', description: 'This game...' },
		{ title: 'Why you should watch Jojo', description: 'The poses' }
	];
</script>

<div class="px-5">
	<CardDisplay cards={beaconFires}></CardDisplay>
</div>
