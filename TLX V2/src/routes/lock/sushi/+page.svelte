<script lang="ts">
	import { fade, fly, blur } from 'svelte/transition';
	
</script>

<svelte:head><title>Trust Lock | Lock Sushi LP</title></svelte:head>

<div
	in:fade={{ delay: 100 }}
	class="flex items-center justify-center rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 border border-gray-300 dark:border-neutral-800 backdrop-blur-sm"
>
	<div
		in:fade={{ delay: 300 }}
		class="xl:w-1/2 w-full bg-white border shadow-xl shadow-blue-900/10  border-gray-200 rounded-lg shadow-xl dark:bg-gray-900/20 dark:border-gray-700 my-4 mx-4"
		style="background-image:url(grid.svg)"
	>
		<div in:blur={{ delay: 400 }} class="flex flex-col items-center pb-4">
			<img
				in:fade={{ delay: 200 }}
				class="w-24 h-24 mb-3 rounded-full shadow-xl"
				src="/sushi.png"
				alt="Logo"
			/>
			<h5
				in:fade={{ duration: 500, delay: 300 }}
				class="mb-1 text-xl font-semibold text-gray-900 dark:text-white"
			>
				Lock SushiSwap LP Tokens
			</h5>
			
				<button
					
					in:fade={{ duration: 1000, delay: 600 }}
					class="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
					>Connect</button
				>
			
		</div>
	</div>
</div>
<section in:fly={{ x: -50 }}>
	<div
		in:fade={{ delay: 100 }}
		class="flex items-center justify-center rounded my-4 bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 border border-gray-300 dark:border-neutral-800 backdrop-blur-sm"
	>
		<div
			in:fade={{ delay: 300 }}
			class="xl:w-1/2 w-full bg-white border shadow-xl shadow-blue-900/10  border-gray-200 rounded-lg shadow-xl dark:bg-gray-900/20 dark:border-gray-700 my-4 mx-4"
			style="background-image:url(grid.svg)"
		>
			
				<section in:fade class="text-neutral-600 body-font">
					<div
						in:fade={{ delay: 100 }}
						class="flex flex-col text-center xl:w-full mx-auto  py-8  rounded-xl shadow-md shadow-black/50 bg-cover bg-center"
					>
						<form >
							<input
								class="xl:w-1/2 mx-auto text-center rounded-md border border-1 shadow-md dark:bg-blue-900/20 bg-slate-200  text-neutral-400 shadow-black border-neutral-600"
								type="text"
								placeholder="Enter Your LP Token Address"
								
							/>
							<p>
								<button
									type="submit"
									class="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
									>Submit</button
								>
							</p>
						</form>
					</div>
				</section>
			
		</div>
	</div>
</section>
