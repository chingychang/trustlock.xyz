<script lang="ts">
	import { ethers, Contract, utils, Signer } from 'ethers';
	import lockABI from '$lib/lock/lockABI.json';
	import Dappbar from '$lib/lock/dappbar.svelte';
	import { fade, fly } from 'svelte/transition';

	let provider: ethers.providers.Provider | ethers.Signer | undefined;
	let contract: ethers.Contract;
	let address: string;
	let locks: any[] = [];
	let inputLP = '';
	let errorMessageLP = '';
	let errorMessage = '';
	let connected = false;
	const contractAddress = '0x7F2E701Ff709BC5E2aE70Cd8ea0Cd7AC92022568';
	const abi = lockABI; // replace with the contract abi

	async function connectToWallet() {
		// @ts-ignore
		if (window.ethereum) {
			// @ts-ignore
			await window.ethereum.request({ method: 'eth_requestAccounts' });
			// @ts-ignore
			provider = new ethers.providers.Web3Provider(window.ethereum);
			const networkId = await provider.getNetwork().then(({ chainId }) => chainId);
			if (networkId !== 42161) {
				console.error('You are not connected to the Arb1 network');
			}

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

			errorMessage = '';
		} catch (err) {
			errorMessageLP = 'Error: Invalid LP address or wrong network. Please refresh & try again.';
		}
	}

	let txHashMessage = '';
	async function withdraw(
		lpToken: string,
		index: number,
		lockID: number,
		amount: number,
		updatedLocks: any[]
	) {
		try {
			// @ts-ignore
			provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const networkId = await provider.getNetwork().then(({ chainId }) => chainId);
			if (networkId !== 42161) {
				console.error('You are not connected to the Arb1 network');
				return;
			}

			const contract = new ethers.Contract(contractAddress, abi, signer);
			const lock = updatedLocks[index];
			const tx = await contract.functions.withdraw(
				lock.withdrawLP,
				lock.index,
				lock.lockID,
				lock.amount
			);
			const txHash = await signer.sendTransaction({ to: contractAddress });
			console.log(`Transaction hash: ${txHash}`);
			const receipt = await tx.wait();
			if (receipt.status === 1) {
				console.log('Withdrawal completed successfully!');
				errorMessage = '`Transaction hash: ${txHash}`';
				txHashMessage = `Transaction hash: ${txHash}`;
			} else {
				errorMessage = 'Transaction hash: ${txHash}';
				txHashMessage = `Transaction hash: ${txHash}`;
			}
		} catch (err) {
			errorMessage = 'Error: Too soon ;)';

			txHashMessage = 'Error: Too soon ;)';
		}
	}

	///// RELOCK
	let relockDays: any;

	async function relock(withdrawLP: any, index: any, unlockTime: any, relockDays: any) {
		console.log(relock);
		// @ts-ignore
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		let unixTimestamp = new Date(Date.now() + Number(relockDays) * 24 * 60 * 60 * 1000);
		let unlockDate = Math.round(unixTimestamp.getTime() / 1000);

		const contract = new ethers.Contract(contractAddress, abi, signer);
		

		try {
			// Call the relock function
			const tx = await contract.relock(withdrawLP, index, unlockTime, unlockDate);
			await tx.wait();
			console.log('Relock successfull');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<Dappbar />

<section in:fly={{ y: -20, duration: 400 }} class="text-neutral-400 body-font">
	<div class="container px-5 py-8 mx-auto flex flex-col">
		<div class="lg:w-4/6 mx-auto">
			{#if connected}
				<section in:fade class="text-neutral-600 body-font">
					<div class="container px-5 my-8 mx-auto">
						<div
							in:fade={{ delay: 100 }}
							class="flex flex-col text-center xl:w-full mx-auto  py-8 border border-1 border-neutral-600 rounded-xl shadow-md shadow-black/50 bg-cover bg-center"
						>
							<h1 class="sm:text-4xl text-3xl font-medium title-font text-neutral-400">
								Withdraw LP Tokens
							</h1>
							<form on:submit|preventDefault={() => getLocksForToken(inputLP)}>
								<input
									class="xl:w-1/2 mx-auto text-center rounded-md border border-1 shadow-md bg-neutral-600 text-neutral-400 shadow-black border-neutral-600"
									type="text"
									placeholder="Enter Your LP Token Address"
									bind:value={inputLP}
								/>
								<p><button type="submit" class="btn my-4">Submit</button></p>
								<!-- svelte-ignore empty-block -->
								{#if locks.length > 0}
									<p class="text-emerald-400">View all active locks below.</p>
								{:else if errorMessageLP}
								<p class="text-red-400">{errorMessageLP}</p>
								{:else if !errorMessageLP}
									<p class="text-blue-600">You do not hold any active locks for this token.</p>
								{/if}
							</form>
						</div>
					</div>
				</section>
			{:else}
				<section in:fade class="text-neutral-600 body-font">
					<div
						class="flex flex-col text-center xl:w-full mx-auto my-8 border border-1 border-neutral-600 rounded-xl shadow-sm shadow-black/50"
					>
						<div
							in:fade={{ delay: 100 }}
							class="container px-5 py-8 mx-auto bg-center bg-cover border border-1 border-neutral-600  rounded-xl shadow-sm shadow-black/50"
						>
							<h1 class="sm:text-4xl text-3xl font-medium title-font text-neutral-400">
								Withdraw LP Tokens
							</h1>
							<div class="xl:w-full text-center mx-auto">
								<p class="font-semibold">You are not connected yet.</p>
								<button class="btn mx-auto text-center mt-4" on:click={connectToWallet}
									>Connect to Wallet</button
								>
							</div>
						</div>
					</div>
				</section>
			{/if}

			{#each locks as lock}
				<div
					in:fade
					class="flex flex-col sm:flex-row border border-1 mb-4 rounded-xl shadow-sm shadow-black/50"
				>
					<div
						in:fly={{ y: 20, duration: 400 }}
						class="sm:w-1/3 text-center sm:py-8 rounded-xl shadow-sm shadow-black/50"
					>
						<div
							class="w-20 h-20 rounded-full inline-flex items-center justify-center xl:mt-0 mt-1 outline outline-1 outline-black/60 shadow-lg shadow-black/50 bg-neutral-700 text-neutral-400"
						>
							<img src="/logogif.gif" alt="logo" class="w-16 h-16 mx-auto" />
						</div>

						<div class="flex flex-col items-center text-center justify-center bg-cover">
							{#if new Date().getTime() > lock.unlockDate * 1000}
								<h2 class="font-bold title-font mt-4 text-emerald-400 animate-pulse text-lg">
									WITHDRAW
								</h2>
								<div class="w-12 h-1 bg-emerald-400 rounded mt-2 mb-4" />
							{:else}
								<h2 class="font-bold title-font mt-4 text-blue-600 animate-pulse text-lg">
									ACTIVE
								</h2>
								<div class="w-12 h-1 bg-blue-600 rounded mt-2 mb-4" />
							{/if}

							<p class="text-base font-semibold">Initial Amount</p>
							<p class="text-base">{ethers.utils.formatEther(lock.initialAmount)}</p>
							<p class="text-base font-semibold">Current Amount</p>
							<p class="text-base">{ethers.utils.formatEther(lock.amount)}</p>
						</div>
					</div>
					<div
						in:fly={{ y: -20, duration: 400 }}
						class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-neutral-400 border border-1 rounded-xl shadow-sm shadow-black/50 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left"
					>
						<span class="invisible">{lock.index}</span>
						<p class="leading-relaxed text-lg mb-4">
							<span class="font-semibold">Lock ID:</span>
							{lock.lockID}
						</p>
						<p class="leading-relaxed xl:text-lg text-xs mb-4">
							<span class="font-semibold">Lock Owner:</span>
							{lock.owner}
						</p>
						<p class="leading-relaxed text-lg mb-4">
							<span class="font-semibold">Lock Date:</span>
							{new Date(lock.lockDate * 1000).toLocaleString()}
						</p>
						<p class="leading-relaxed text-lg mb-4">
							<span class="font-semibold">Unlock Date:</span>
							{new Date(lock.unlockDate * 1000).toLocaleString()}
						</p>
						{#if new Date().getTime() > lock.unlockDate * 1000}
							<button
								class="btn hover:saturate-200 shadow-md shadow-black/50"
								on:click={() => withdraw(lock.withdrawLP, lock.index, lock[4], lock[1], locks)}
								>Withdraw</button
							>
						{:else}
							<button
								class="btn bg-neutral-900 text-neutral-400 cursor-not-allowed hover:saturate-200 shadow-md shadow-black/50"
								
								>Withdraw</button
							>
						{/if}
						
							<span class="mx-2">Relock For:</span><input
								class="bg-neutral-600 text-center"
								bind:value={relockDays}
								type="text"
								placeholder="Amount Of Days"
							/><button
								class="btn btn-outline text-neutral-400 shadow-md shadow-black/50 mx-2 xl:mb-0 mb-2"
								on:click={() => relock(lock.withdrawLP, lock.index, lock.lockID, relockDays)}
							>
								Relock
							</button>
						
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
