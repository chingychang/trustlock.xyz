<script>
	import DashboardUNI from '$lib/lock/lock-uni.svelte';
	import DashboardSUSHI from '$lib/lock/lock-sushi.svelte';
	import { fade, fly } from 'svelte/transition';
	import Dappbar from '$lib/lock/dappbar.svelte';

	let showUNI = false;
	let showSUSHI = false;
	let showSwap = true;
</script>

<Dappbar />
{#if showSwap}
	<div
		in:fly={{ y: 20, duration: 400, delay: 200 }}
		class="xl:w-1/2 p-4 mt-8 m-auto  shadow-sm shadow-black/50 border border-1 border-zinc-200/20 rounded-2xl "
	>
		<div in:fade={{ delay: 100 }} class="w-full h-full text-center">
			<div class="flex flex-col justify-between h-full">
				<svg
					width="40"
					height="40"
					class="w-12 h-12 m-auto mt-4 icon text-blue-600"
					fill="currentColor"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M512 1004.5L85.3 758.2V265.5L512 19.1l426.7 246.3v492.7L512 1004.5zM170.7 708.9L512 906l341.3-197.1V314.8L512 117.7 170.7 314.8v394.1z"
						fill="#3688FF"
					/><path
						d="M511.8 640c-31 0-60.6-11.1-84.1-31.7-25.7-22.5-41.1-53.7-43.4-87.8-4.6-70.4 48.9-131.5 119.3-136.2 33.9-2.2 67 8.9 92.8 31.4 25.7 22.5 41.1 53.7 43.4 87.8 4.6 70.4-48.9 131.5-119.3 136.2-3 0.2-5.8 0.3-8.7 0.3z m0.3-170.7c-1 0-1.9 0-2.9 0.1-23.5 1.6-41.3 21.9-39.8 45.4 0.8 11.4 5.9 21.8 14.4 29.3 8.6 7.5 19.5 11.2 30.9 10.5 23.5-1.6 41.3-21.9 39.8-45.4-0.8-11.4-5.9-21.8-14.5-29.3-7.7-6.9-17.6-10.6-27.9-10.6z"
						fill="#5F6379"
					/></svg
				>
				<p class="mt-4 text-4xl font-bold text-neutral-400 ">Choose DEX</p>
				<p class="px-6 py-2 xl:text-lg text-sm text-gray-600 ">
					Where is Your LP Token listed?
				</p>
				<div class="flex items-center justify-between w-full gap-4 mt-8">
					<button
						on:click={() => ((showSwap = !showSwap), (showSUSHI = !showSUSHI))}
						type="button"
						class="py-2 px-4  bg-neutral-600 hover:bg-neutral-700 focus:ring-emerald-400 focus:ring-offset-emerald-400 text-neutral-300  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
					>
						SushiSwap
					</button>
					<button
						on:click={() => ((showSwap = !showSwap), (showUNI = !showUNI))}
						type="button"
						class="py-2 px-4  bg-neutral-600 hover:bg-neutral-700 focus:ring-emerald-400 focus:ring-offset-emerald-400 text-neutral-300  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
					>
						UniSwap
					</button>
				</div>
			</div>
		</div>
	</div>
{:else if showUNI}
	<DashboardUNI />
{:else if showSUSHI}
	<DashboardSUSHI />
{/if}
