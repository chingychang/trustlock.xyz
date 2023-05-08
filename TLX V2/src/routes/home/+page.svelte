<script>
	import { ethers, utils } from 'ethers';
	import { onMount } from 'svelte';
	import { fade, fly, blur } from 'svelte/transition';
	import lockABI from '$lib/lock/lockABI.json';
	import tokenABI from '$lib/tokenABI.json';
	import { Network, Alchemy } from 'alchemy-sdk';

	const settings = {
		apiKey: 'k2aT8xnPS0OoAYX8RVe_ymkXFTb_UA_P',
		network: Network.ARB_MAINNET
	};

	const alchemy = new Alchemy(settings);

	const contractAddress = '0x7F2E701Ff709BC5E2aE70Cd8ea0Cd7AC92022568';
	const tokenAddress = '0x2468400e2520b6Fb3612612bA571554521B0318E';
	const deadAddress = '0x000000000000000000000000000000000000dead';

	/**
	 * @type {any}
	 */
	let numLockedTokens;
	/**
	 * @type {number}
	 */
	let balanceTokens;
	let balanceWei;
	let error;
	let loading = false;
	let loading2 = false;

	const provider = new ethers.providers.AlchemyProvider(
		'arbitrum',
		'k2aT8xnPS0OoAYX8RVe_ymkXFTb_UA_P'
	);

	onMount(async () => {
		try {
			loading = true;

			const contract = new ethers.Contract(contractAddress, lockABI, provider);
			numLockedTokens = await contract.getNumLockedTokens();

			loading = false;
		} catch (err) {
			// @ts-ignore
			error = err.message;
			loading = false;
		}

		try {
			loading2 = true;
			// @ts-ignore

			const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

			const balance = await contract.balanceOf(deadAddress);
			balanceWei = balance.toString();
			balanceTokens = parseInt(ethers.utils.formatUnits(balanceWei, 9));
			loading2 = false;
		} catch (error) {
			console.error(error);
		}
	});
</script>

<svelte:head><title>Trust Lock | Home</title></svelte:head>
<section in:blur>
<div
	in:fly={{ y: -10, duration: 1200 }}
	class="w-full p-4 text-center bg-white border shadow-lg shadow-blue-900/10 border-gray-200 rounded-lg shadow sm:p-8 dark:bg-blue-900/10 backdrop-blur-sm dark:border-gray-700"
>
	<h5
		in:fade={{ duration: 400, delay: 100 }}
		class="mb-2 text-3xl font-bold text-gray-900 dark:text-white"
	>
		Arbitrum One Project Security
	</h5>
	<hr
		in:fade={{ duration: 400, delay: 100 }}
		class="w-2/5 animate-pulse mx-auto border border-slate-400 dark:border-slate-600"
	/>
	<p
		in:fade={{ duration: 500, delay: 300 }}
		class="mt-2 text-base text-gray-500 sm:text-lg dark:text-gray-400"
	>
		TrustLock helps everyone to secure their projects in few seconds.
	</p>
	<p
		in:fade={{ duration: 500, delay: 600 }}
		class=" text-base text-gray-500 sm:text-lg dark:text-gray-400"
	>
		Secured projects on TrustLock are published on our Project Explorer.
	</p>
</div>

<div in:fly={{ y: 10, duration: 100 }} class="grid grid-cols-2 gap-4 mb-4 mt-4">
	
	<div
		in:fade={{ delay: 100 }}
		class="flex items-center justify-center rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 backdrop-blur-sm border border-gray-300 dark:border-neutral-800"
	>
		<div
			in:fade={{ delay: 300 }}
			class="w-full max-w-lg bg-white border shadow-xl shadow-blue-900/10  border-gray-200 rounded-lg shadow-xl dark:bg-gray-900/20 dark:border-gray-700 my-4 mx-4"
			style="background-image:url(grid.svg)"
		>
			<div in:fade={{ delay: 200 }} class="flex flex-col items-center pb-4">
				<img
					class="w-24 h-24 mb-3 rounded-full shadow-xl"
					src="/logostatic.png"
					alt="Logo"
				/>
				<h5
					in:fade={{ duration: 500, delay: 300 }}
					class="mb-1 text-xl font-semibold text-gray-900 dark:text-white"
				>
					Lock Liquidity
				</h5>
				<span
					in:fade={{ duration: 1000, delay: 600 }}
					class="text-sm text-center text-gray-500 dark:text-gray-400"
					>Secure Liquidity Pool (LP) Tokens</span
				>
				<div class="flex mt-4 space-x-3 md:mt-6">
					<a
						in:fade={{ duration: 1000, delay: 300 }}
						href="/explorer/locked"
						class="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-blue-900/20 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
						>View Projects</a
					>
					<a
						in:fade={{ duration: 1000, delay: 300 }}
						href="/docs"
						class="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-blue-900/20 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
						>Learn More</a
					>
				</div>
				<a
					in:fade={{ duration: 1000, delay: 600 }}
					href="/lock"
					class="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
					>Create Lock</a
				>
			</div>
		</div>
		
	</div>
	<div
		in:fade={{ delay: 100 }}
		class="flex items-center justify-center rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 border border-gray-300 dark:border-neutral-800 backdrop-blur-sm"
	>
		<div
			in:fade={{ delay: 300 }}
			class="w-full max-w-lg bg-white border shadow-xl  shadow-blue-900/10  border-gray-200 rounded-lg shadow-xl dark:bg-gray-900/20 dark:border-gray-700 my-4 mx-4"
			style="background-image:url(grid.svg)"
		>
			<div class="flex flex-col items-center pb-4">
				<img
					in:fade={{ delay: 200 }}
					class="w-24 h-24 mb-3 rounded-full shadow-xl"
					src="/logostatic.png"
					alt="Logo"
				/>
				<h5
					in:fade={{ duration: 500, delay: 300 }}
					class="mb-1 text-xl font-semibold text-gray-900 dark:text-white"
				>
					Launchpad
				</h5>
				<span
					in:fade={{ duration: 1000, delay: 600 }}
					class="text-sm text-center text-gray-500 dark:text-gray-400"
					>Kickstart Your Token Launch</span
				>
				<div class="flex mt-4 space-x-3 md:mt-6">
					<a
						in:fade={{ duration: 1000, delay: 300 }}
						href="/join"
						class="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-blue-900/20 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
						>Join Beta</a
					>
					<a
						in:fade={{ duration: 1000, delay: 300 }}
						href="/docs"
						class="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-blue-900/20 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
						>Learn More</a
					>
				</div>
				<button
					in:fade={{ duration: 1000, delay: 600 }}
					disabled
					class="inline-flex cursor-not-allowed blur-sm hover:blur-none transition ease-in-out items-center px-4 py-2 mt-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
					>New Project</button
				>
			</div>
		</div>
	</div>
	<div
		in:fly={{ y: 10, duration: 400, delay: 200 }}
		class="flex items-center justify-center rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 backdrop-blur-sm border border-gray-300 dark:border-neutral-800"
	>
		<div
			in:fade={{ delay: 700 }}
			class="flex flex-col sm:flex-row xl:w-1/2 mx-auto shadow-xl shadow-blue-900/10 text-center my-6 border border-gray-300 dark:border-gray-600 rounded-lg py-4 px-4 bg-white  dark:bg-gray-900/20"
			style="background-image:url(grid.svg)"
		>
			<div 
				id="alert-border-1"
				class="flex mx-auto  text-blue-400 border-b-4 border-neutral-300  dark:text-blue-400  dark:border-neutral-500"
				role="alert"
			>
				<div
					in:fade={{ delay: 1200 }}
					class="text-md font-medium text-neutral-600 dark:text-white/80"
				>
					Total TLX Revenue Burned
					<p class="text-4xl text-center text-blue-400 dark:text-blue-500 font-bold animate-pulse">
						{#if loading2}Loading...{:else}{balanceTokens}{/if}
					</p>
				</div>
			</div>
		</div>
	</div>
	<div
		in:fly={{ y: 10, duration: 400, delay: 200 }}
		class="flex items-center justify-center rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 backdrop-blur-sm border border-gray-300 dark:border-neutral-800"
	>
		<div
			in:fade={{ delay: 700 }}
			class="flex flex-col sm:flex-row xl:w-1/2 mx-auto shadow-xl shadow-blue-900/10  text-center my-6 border border-gray-300 dark:border-gray-600 rounded-lg py-4 px-4 bg-white  dark:bg-gray-900/20"
			style="background-image:url(grid.svg)"
		>
			<div 
				id="alert-border-1"
				class="flex mx-auto text-blue-400 border-b-4 border-neutral-300  dark:text-blue-400  dark:border-neutral-500"
				role="alert"
			>
				<div
					in:fade={{ delay: 1200 }}
					class="text-md font-medium text-neutral-600 dark:text-white/80"
				>
					Total Secured Projects
					<p class="text-4xl text-center text-blue-400 dark:text-blue-500 font-bold animate-pulse">
						{#if loading}Loading...{:else}{numLockedTokens}{/if}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div
	in:fade={{ delay: 400, duration: 1000 }}
	class="w-full text-center  bg-white border border-gray-200 rounded-lg shadow-lg shadow-blue-900/10 sm:p-6 dark:bg-blue-900/10 backdrop-blur-sm dark:border-gray-700"
>
	<p
		in:fade={{ delay: 800, duration: 1000 }}
		class="text-base text-blue-500 font-semibold sm:text-lg dark:text-blue-400"
	>
		Contract Address
	</p>
	<hr class="w-1/6 animate-pulse mx-auto border border-slate-400 dark:border-slate-600 " />
	<p
		in:fade={{ delay: 1200, duration: 1000 }}
		class="font-bold text-base text-gray-500 xl:text-lg md:text-md lg:text-lg text-sm dark:text-gray-400"
	>
		0x2468400e2520b6fb3612612ba571554521b0318e
	</p>
</div>
</section>