<script>
	import { ethers } from 'ethers';
	import lockABI from '$lib/lock/lockABI.json';
	import lpABI from '$lib/lock/lpABI.json';
	import { Network, Alchemy } from 'alchemy-sdk';
	import { fade, fly, blur } from 'svelte/transition';

	const contractAddress = '0x7F2E701Ff709BC5E2aE70Cd8ea0Cd7AC92022568';
let loading;
	/**
	 * @type {string | any[]}
	 */
	let depositEvents = [];
	/**
	 * @type {any}
	 */
	let lpToken;
	/**
	 * @param {any} lpToken
	 */
	async function getPastDepositEvents(lpToken) {
		loading = true;
		// @ts-ignore
		// Connect to the contract using ethers.js
		const provider = new ethers.providers.AlchemyProvider(
			'arbitrum',
			'k2aT8xnPS0OoAYX8RVe_ymkXFTb_UA_P'
		);
		const contract = new ethers.Contract(contractAddress, lockABI, provider);

		// Get the block number for the latest block
		const latestBlockNumber = await provider.getBlockNumber();

		// Set the filter to fetch all the events of type "onDeposit"
		const filter = contract.filters.onDeposit();

		// Fetch all the events using the filter and the latest block number
		const events = await contract.queryFilter(filter, 60649597, latestBlockNumber);

		// Map the events to a more readable format
		depositEvents = await Promise.all(
			events.map(async (event) => {
				// @ts-ignore
				const lpTokenContract = new ethers.Contract(event.args.lpToken, lpABI, provider);
				const totalSupply = await lpTokenContract.totalSupply();
				const totalSupplyTokens = ethers.utils.formatUnits(totalSupply, 18);

				// Calculate the percentage of locked amount against total supply
				const lockedPercentage = ethers.utils.formatUnits(
					// @ts-ignore
					ethers.BigNumber.from(event.args.amount)
						.mul(ethers.utils.parseUnits('100', 'wei'))
						.div(totalSupply),
					2
				);

				return {
					// @ts-ignore
					lpToken: event.args.lpToken,
					// @ts-ignore
					user: event.args.user,
					// @ts-ignore
					amount: ethers.utils.formatEther(event.args.amount),
					// @ts-ignore
					lockDate: new Date(event.args.lockDate.toNumber() * 1000).toLocaleString(),
					// @ts-ignore
					unlockDate: new Date(event.args.unlockDate.toNumber() * 1000).toLocaleString(),
					totalSupply: totalSupplyTokens,
					lockedPercentage: lockedPercentage
				};
			})
		);
		loading = false;
	}
</script>

<section style="background-image:url(/grid.svg)">
	<div
		in:fade={{ delay: 100 }}
		class="flex w-2/3 mx-auto items-center justify-center px-8 rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 border border-gray-300 dark:border-neutral-800 backdrop-blur-sm"
	>
		<div
			style="background-image:url(/grid.svg)"
			in:fade={{ delay: 300 }}
			class="w-full bg-white border shadow-xl shadow-blue-900/10  border-gray-200 rounded-lg shadow-xl dark:bg-gray-900/20 dark:border-gray-700 my-4 mx-4"
		>
			<div in:blur={{ delay: 400 }} class="flex flex-col items-center pb-4">
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
					Locked LP Projects
				</h5>
				<form in:fade={{ duration: 600, delay: 400}} class="w-3/4 mx-auto text-center" on:submit|preventDefault={() => getPastDepositEvents(lpToken)}>
					<input
						class="w-full mx-auto text-center rounded-md border border-1 shadow-md dark:bg-blue-900/20 bg-slate-200  text-neutral-400 shadow-black border-neutral-600"
						type="text"
						placeholder="Search For LP Lock"
						bind:value={lpToken}
					/>
					<p class="mx-auto w-full">
						<button
							type="submit"
							on:click={getPastDepositEvents}
							in:fade={{ duration: 1000, delay: 600 }}
							class="inline-flex mx-auto items-center px-4 py-2 mt-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
							>Search All</button
						>
					</p>
				</form>
			</div>
		</div>
	</div>

	{#if depositEvents.length > 0}
		{#each depositEvents as depositEvent}
			<section in:fade class=" text-gray-600 px-16 py-6">
				<div in:fly={{ y: -50 }} class="flex flex-col justify-center h-full rounded-lg">
					<!-- Table -->
					<div
						in:fade={{ delay: 100 }}
						class="w-full mx-auto rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 border border-gray-300 dark:border-neutral-800 backdrop-blur-sm"
					>
						<header
							class="px-5 py-4 bg-slate-100/50 border shadow-xl shadow-blue-900/10  border-gray-200 rounded-lg shadow-xl dark:bg-gray-900/20 dark:border-gray-700 my-4 mx-4 bg-no-repeat bg-center"
							style="background-image:url(/grid.svg)"
						>
							<span class="font-semibold">LP Token: {depositEvent.lpToken}</span>
							<div class="font-semibold text-black/70 dark:text-neutral-200">
								Token Pair: TLX/WETH
							</div>
							<div class="text-black font-bold dark:text-gray-200">
								Total Liquidity Supply Locked:
							</div>
							{#if new Date().getTime() > new Date(depositEvent.unlockDate).getTime()}
								<div class="text-red-500 font-extrabold">
									{depositEvent.lockedPercentage * 100}% ({depositEvent.amount} $SLP)
								</div>
							{:else if new Date().getTime() < new Date(depositEvent.unlockDate).getTime()}
								<div class="text-green-500 font-extrabold">
									{depositEvent.lockedPercentage * 100}% ({depositEvent.amount} $SLP)
								</div>
							{/if}
							<div
								in:fade={{ delay: 200 }}
								class="overflow-x-auto p-2 my-4 px-2 rounded shadow-md bg-gradient-to-b dark:from-blue-900/10 dark:via-blue-800/10 dark:to-black/30 shadow-black/50 border border-gray-200 dark:border-gray-700"
							>
								<table class="table-auto w-full " style="background-image:url(/grid.svg)">
									<thead
										in:fade={{ delay: 400 }}
										class="text-xs font-semibold uppercase text-gray-400 "
									>
										<tr>
											<th class="p-2">
												<div class="font-semibold text-left">Lock Date</div>
											</th>
											<th class="p-2">
												<div class="font-semibold text-left">Unlock Date</div>
											</th>
											<th class="p-2">
												<div class="font-semibold text-left">Owner</div>
											</th>
											<th class="p-2">
												<div class="font-semibold text-left">Status</div>
											</th>
											<th class="p-2">
												<div class="font-semibold text-center">Network</div>
											</th>
										</tr>
									</thead>

									<tbody
										in:fade={{ delay: 400 }}
										class="text-sm divide-y divide-neutral-600 rounded-sm"
									>
										<!-- record 1 -->
										<tr>
											<td class="p-2">
												{depositEvent.lockDate}
											</td>
											<td class="p-2">
												<div class="font-medium text-black/40 dark:text-gray-400">
													{depositEvent.unlockDate}
												</div>
											</td>
											<td class="p-2">
												<div class="text-left">{depositEvent.user}</div>
											</td>
											<td class="p-2">
												{#if new Date().getTime() > new Date(depositEvent.unlockDate).getTime()}
													<div class="text-left animate-pulse font-bold text-red-500">UNLOCKED</div>
												{:else if new Date().getTime() < new Date(depositEvent.unlockDate).getTime()}
													<div class="text-left animate-pulse font-bold text-green-500">
														SECURED
													</div>
												{/if}
											</td>
											<td class="p-2">
												<div class="flex justify-center text-blue-600">Arb1</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</header>
					</div>
				</div>
			</section>
		{/each}
		{:else}
		<div in:blur={{delay: 600, duration: 1000}} class="flex items-center py-40 my-12 justify-center">
			<!-- centered content -->
		  
			<div class="mx-auto">
			  
		<div role="status">
			<svg aria-hidden="true" class="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
				<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
			</svg>
			<span class="sr-only text-black/50 text-xl text-center font-bold">Loading...</span>
		</div>
		
			</div>
		  
			<!-- end centered content -->
		  </div>
	{/if}
</section>
