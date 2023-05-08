<script>
	import { ethers } from 'ethers';
	import ABI from '$lib/lock/lockABI.json';
	import LPABI from '$lib/lock/lpABI.json';
	import Dappbar from '$lib/lock/dappbar.svelte';
	import { fade, fly } from 'svelte/transition';

	const contractAddress = '0x7F2E701Ff709BC5E2aE70Cd8ea0Cd7AC92022568';

	/**
 * @type {string | any[]}
 */
let depositEvents = [];

async function getPastDepositEvents() {
  // @ts-ignore
  // Connect to the contract using ethers.js
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  // Get the block number for the latest block
  const latestBlockNumber = await provider.getBlockNumber();

  // Set the filter to fetch all the events of type "onDeposit"
  const filter = contract.filters.onDeposit();

  // Fetch all the events using the filter and the latest block number
  const events = await contract.queryFilter(filter, 60649597, latestBlockNumber);

  // Map the events to a more readable format
  depositEvents = await Promise.all(events.map(async (event) => {
    // @ts-ignore
    const lpTokenContract = new ethers.Contract(event.args.lpToken, LPABI, provider);
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
  }));
}


</script>

<Dappbar />
<section in:fly={{ y: -20, duration: 400 }} class="py-8 mt-6">
	<p in:fade class="text-center text-xl font-bold py-2 text-gray-400">
		Explore All Secured Projects
	</p>
	<p in:fade={{ delay: 200 }} class="text-center text-md font-bold py-2 text-gray-400">
		Make sure to select Arbitrum1 Network in MetaMask first!
	</p>
</section>
{#if depositEvents.length > 0}
	{#each depositEvents as depositEvent}
		<section in:fade class="xl:w-1/2 w-full mx-auto">
			<div
				class="w-full px-8 py-4 mt-16  rounded-lg shadow-lg bg-gradient-to-b from-neutral-500/10 via-neutral-800/20 to-neutral-500/30 shadow-white/20 border border-2 border-neutral-600"
			>
				<div class="flex justify-center -mt-16 md:justify-end">
					<img
						class="object-contain w-20 h-20 border-2 border-neutral-600 bg-neutral-800 rounded-full "
						alt="Testimonial avatar"
						src="/logogif.gif"
					/>
				</div>

				<h2 class="mt-2 text-xl font-semibold  text-white md:mt-0">
					LP Token: {depositEvent.lpToken}
				</h2>

				<p class="mt-2 text-sm  text-gray-200">Owner: {depositEvent.user}</p>
				<p class="mt-2 text-sm text-gray-200">
					Amount: {depositEvent.amount}
					Total: {depositEvent.lockedPercentage * 100}%
				  </p>
									  
				<p class="mt-2 text-sm  text-gray-200">Lock Date: {depositEvent.lockDate}</p>
				<p class="mt-2 text-sm  text-gray-200">Unlock Date: {depositEvent.unlockDate}</p>

				<div class="flex justify-end mt-4">
					{#if new Date().getTime() > new Date(depositEvent.unlockDate).getTime()}
						<p class="text-lg mx-2 font-medium  text-red-400">UNLOCKED</p>
					{:else if new Date().getTime() < new Date(depositEvent.unlockDate).getTime()}
						<p class="text-lg mx-2 font-medium  text-emerald-400">SECURED</p>
					{/if}
				</div>
			</div>
		</section>
	{/each}
{:else}
	<div in:fade={{ delay: 400 }} class="text-center">
		<button class="btn mx-auto text-center" on:click={getPastDepositEvents}>Open Explorer</button>
	</div>
{/if}
