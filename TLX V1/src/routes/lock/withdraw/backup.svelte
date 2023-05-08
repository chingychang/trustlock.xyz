<script lang="ts">
	import { ethers, Contract, utils } from 'ethers';
	import lockABI from '$lib/lock/lockABI.json';
	import Dappbar from '$lib/lock/dappbar.svelte';
	import { fade, fly } from 'svelte/transition';

	let provider: ethers.providers.Provider | ethers.Signer | undefined;
	let contract: ethers.Contract;
	let address: string;
	let locks: any[] = [];
	let inputLP = '';
	let errorMessage = '';
	let connected = false;
	

	async function connectToWallet() {
		console.log(connectToWallet);
		// @ts-ignore
		if (window.ethereum) {
			// @ts-ignore
			await window.ethereum.request({ method: 'eth_requestAccounts' });
			// @ts-ignore
			provider = new ethers.providers.Web3Provider(window.ethereum);
			const networkId = await provider.getNetwork().then(({ chainId }) => chainId);
			if (networkId !== 5) {
				console.error('You are not connected to the Arb1 network');
			}

			const abi = lockABI; // replace with the contract abi
			const contractAddress = '0xd11F31e8b44cF3DD2713f986F394455322611169'; // replace with the contract address
			contract = new ethers.Contract(contractAddress, abi, provider);
			address = await provider.getSigner().getAddress();
			connected = true;
		}
	}

	async function getLocksForToken(lpToken: string) {
		
		if (!connected) {
			errorMessage = 'Please connect to your wallet.';
			return;
		}

		try {
			const userAddress = address;
			const numLocksForToken = await contract.functions.getUserNumLocksForToken(
				userAddress,
				lpToken
			);
			let updatedLocks = [];
			for (let index = 0; index < numLocksForToken; index++) {
				const lockForToken = await contract.functions.getUserLockForTokenAtIndex(
					userAddress,
					lpToken,
					index
				);
				updatedLocks.push({
					lockDate: lockForToken[0],
					amount: lockForToken[1],
					initialAmount: lockForToken[2],
					unlockDate: lockForToken[3],
					lockID: lockForToken[4],
					owner: lockForToken[5],
					index: index,
					withdrawLP: inputLP
				});
				
			}
			locks = Array.from(new Set(updatedLocks));
			console.log(updatedLocks);
			errorMessage = '';
		} catch (err) {
			errorMessage = 'Error: Invalid LP address or network congestion. Please refresh & try again.';
			console.error(err);
		}
	}

	let txHashMessage= '';
	async function withdraw(lpToken: string, index: number, lockID: number, amount: number, updatedLocks: any[]) {
	try {
		console.log(withdraw);
		
		// @ts-ignore
		provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const networkId = await provider.getNetwork().then(({ chainId }) => chainId);
		if (networkId !== 5) {
			console.error('You are not connected to the Arb1 network');
			return;
		}
	
		const abi = lockABI;
		const contractAddress = '0xd11F31e8b44cF3DD2713f986F394455322611169';
		const contract = new ethers.Contract(contractAddress, abi, signer);
		const lock = updatedLocks[index];
		const tx = await contract.functions.withdraw(lock.withdrawLP, lock.index, lock.lockID, lock.amount);
		const txHash = await signer.sendTransaction({to: contractAddress});
		console.log(`Transaction hash: ${txHash}`);
		const receipt = await tx.wait();
		if (receipt.status === 1) {
			console.log('Withdrawal completed successfully!');
			errorMessage = '';
			txHashMessage = `Transaction hash: ${txHash}`;
		} else {
			errorMessage = 'Error: Withdrawal failed. Please try again.';
			txHashMessage = '';
		}
	} catch (err) {
		errorMessage = 'Error: Too soon ;)';
		console.error(err);
		txHashMessage = '';
	}
}



</script>

<Dappbar />

{#if connected}
	<section class="text-gray-600 body-font">
		<div class="container px-5 pt-8 mx-auto">
			<div class="flex flex-col text-center w-full mb-6">
				<h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
					Withdraw LP Tokens
				</h1>
				<form on:submit|preventDefault={() => getLocksForToken(inputLP)}>
					<input
						class="xl:w-1/3 mx-auto text-center rounded-md border border-1 shadow-sm shadow-black border-zinc-600/40"
						type="text"
						placeholder="Enter Your LP Token"
						bind:value={inputLP}
					/>
					<p><button type="submit" class="btn my-2">Submit</button></p>
				</form>
			</div>
		</div>
	</section>
{:else}
	<section class="text-gray-600 body-font">
		<div class="container px-5 pt-8 mx-auto">
			<div class="flex flex-col text-center xl:w-full mb-6">
				<h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
					Withdraw LP Tokens
				</h1>
				<div class="xl:w-full text-center mx-auto">
					<button class="btn mx-auto text-center my-2" on:click={connectToWallet}
						>Connect to Wallet</button
					>
				</div>
			</div>
		</div>
	</section>
{/if}
<section class="text-gray-600 body-font text-center">
	{#if errorMessage}
	<p class="error">{errorMessage}</p>
{:else}
	<p>{txHashMessage}</p>
{/if}

	{#if locks.length > 0}
		<table
			in:fade
			class="table-auto xl:w-1/2 mx-auto text-center xl:whitespace-no-wrap rounded-md border border-1 shadow-sm shadow-black border-zinc-600/40"
		>
			<thead class="rounded-md border border-1 shadow-sm shadow-black border-zinc-600/40">
				<tr>
					
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl"
						>Lock ID</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
						>Lock Date</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
						>Amount</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
						>Unlock Date</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
						>Close</th
					>
				</tr>
			</thead>

			<tbody
				in:fly={{ y: -20, duration: 900 }}
				class="rounded-md border border-1 shadow-sm shadow-black border-zinc-600/40"
			>
				{#each locks as lock}
				<span class="invisible">{lock.index}</span>
					<tr class="bg-slate-100/20" in:fade>
						<td class="px-4 py-6">{lock.lockID}</td>
						<td class="px-4 py-6">{new Date(lock.lockDate * 1000).toLocaleString()}</td>
						<td class="px-4 py-6">{ethers.utils.formatEther(lock.amount)}</td>
						<td class="px-4 py-6">{new Date(lock.unlockDate * 1000).toLocaleString()}</td>
						<td class="px-4 py-6">
							<button class="btn btn-ghost" on:click={() => withdraw(lock.withdrawLP, lock.index, lock[4], lock[1], locks)}>Withdraw</button>

						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>
