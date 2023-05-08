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
<section in:fly={{ y: -20, duration: 400 }} class="py-8 mt-6 xl:w-2/3 mx-auto">
	<p in:fade class="text-center text-xl font-bold py-2 text-gray-400">
		Explore All Secured Projects
	</p>
	<p in:fade={{ delay: 200 }} class="text-center text-md font-bold py-2 text-gray-400">
		Make sure to select Arbitrum1 Network in MetaMask first!
	</p>
	<div in:fade={{ delay: 400 }} class="text-center mt-4">
		<button class="btn mx-auto text-center" on:click={getPastDepositEvents}>Refresh</button>
	</div>

{#if depositEvents.length > 0}
	{#each depositEvents as depositEvent}
	
<section in:fade class="antialiased text-gray-600 px-4 py-6">
    <div in:fly={{y: -50}} class="flex flex-col justify-center h-full rounded-lg">
        <!-- Table -->
        <div in:fade={{delay: 100}} class="w-full mx-auto bg-black/20 shadow-lg rounded-lg border border-neutral-700 rounded-lg" >
            <header class="px-5 py-4 border-b border-neutral-600 bg-no-repeat bg-right bg-contain" style="background-image:url(/logogif.gif)">
				<span class="font-medium">Secured Projects Explorer</span>
                <div class="font-semibold text-neutral-200">LP Token: {depositEvent.lpToken}</div>
				
            </header>

            <div in:fade={{delay: 200}} class="overflow-x-auto p-3 shadow-md bg-gradient-to-b from-neutral-500/10 via-neutral-800/20 to-neutral-500/30 shadow-black">
                <table class="table-auto w-full ">
                    <thead in:fade={{delay: 400}} class="text-xs font-semibold uppercase text-gray-400 ">
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

                    <tbody in:fade={{delay: 400}} class="text-sm divide-y divide-neutral-600 rounded-sm">
                        <!-- record 1 -->
                        <tr>
                            <td class="p-2">
								{depositEvent.lockDate}
                            </td>
                            <td class="p-2">
                                <div class="font-medium text-gray-200">
                                    {depositEvent.unlockDate}
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="text-left">{depositEvent.user}</div>
                            </td>
                            <td class="p-2">
								{#if new Date().getTime() > new Date(depositEvent.unlockDate).getTime()}
								<div class="text-left animate-pulse font-bold text-red-500">
                                    UNLOCKED
                                </div>
								{:else if new Date().getTime() < new Date(depositEvent.unlockDate).getTime()}
                                <div class="text-left animate-pulse font-bold text-green-500">
                                    SECURED 
                                </div>
								{/if}
                            </td>
                            <td class="p-2">
                                <div class="flex justify-center text-blue-600">
                                   Arb1
                                </div>
                            </td>
                        </tr>

                        

                     
                    </tbody>
                </table>
            </div>

            <!-- total amount -->
			
            <div class="flex justify-end font-bold space-x-4 text-xl border-t border-neutral-900 px-5 py-4 shadow-sm shadow-neutral rounded-md">
                <div class="text-gray-200">Total Liquidity Supply Locked:</div>
				{#if new Date().getTime() > new Date(depositEvent.unlockDate).getTime()}
				<div class="text-red-500 font-extrabold">{depositEvent.lockedPercentage * 100}% ({depositEvent.amount} $SLP)</div>
				{:else if new Date().getTime() < new Date(depositEvent.unlockDate).getTime()}
                <div class="text-green-500 font-extrabold">{depositEvent.lockedPercentage * 100}% ({depositEvent.amount} $SLP)</div>
				{/if}
            </div>

            
        </div>
    </div>
</section>
	{/each}
	
{/if}

</section>


