<script lang="ts">
	import { toggleService } from './machine'

</script>

<div class="mt-16 grid justify-items-center text-center">
	<h1>
		<span
			class="bg-gradient-to-r from-blue-400 to-purple-400  box-decoration-clone bg-clip-text text-7xl font-bold text-transparent"
		>
			SvelteKit Enterprise Stack
		</span>
	</h1>

	<h2>
		{$toggleService.context.count}
	</h2>

	<button on:click={() => toggleService.send('TOGGLE')}>
		{$toggleService.matches('INACTIVE') ? 'Off' : 'On'}
	</button>

	<button on:click={() => toggleService.send('RESET')}>
		RESET
	</button>

	<button on:click={() => toggleService.send('INCREMENT')}>
		INCREMENT
	</button>

	<button on:click={() => toggleService.send('DECREMENT')}>
		DECREMENT
	</button>

	<span class="my-16 block max-w-3xl text-2xl text-gray-400">
		Every part of the SvelteKit stack for enterprise is optimized to go
		blazingly fast to please investors and shareholders alike.
	</span>

	<img
		class="h-80 w-80 rounded-full object-cover"
		src="https://haha.business/business.jpg"
		alt="Business person laughing"
	/>
</div>
