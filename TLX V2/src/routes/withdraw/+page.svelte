<script lang="ts">
	import { fade, fly, blur } from 'svelte/transition';
	import { ethers, Contract, Signer, utils } from 'ethers';
	import lockABI from '$lib/lock/lockABI.json';

	let provider: ethers.providers.Provider | ethers.Signer | undefined;
	let contract: ethers.Contract;
	let address: string;
	let locks: any[] = [];
	let inputLP = '';
	let errorMessageLP = '';
	let errorMessage = '';
	let connected = false;

	const abi = lockABI; // replace with the contract abi
	const contractAddress = '0x7F2E701Ff709BC5E2aE70Cd8ea0Cd7AC92022568';
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
		console.log(getLocksForToken);
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

<svelte:head><title>Trust Lock | Withdraw LP</title></svelte:head>

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
				src="/logostatic.png"
				alt="Logo"
			/>
			<h5
				in:fade={{ duration: 500, delay: 300 }}
				class="mb-1 text-xl font-semibold text-gray-900 dark:text-white"
			>
				Withdraw Liquidity Tokens
			</h5>
			{#if connected}
				<span
					in:fade={{ duration: 1000, delay: 600 }}
					class="text-sm text-center text-gray-500 dark:text-gray-400">Status</span
				>
				{#if locks.length > 0}
					<span
						in:fade={{ duration: 1000, delay: 600 }}
						class="text-sm text-center text-gray-500 dark:text-blue-400 animate-pulse"
						>View All Locks</span
					>
				{:else if errorMessageLP}
					<span
						in:fade={{ duration: 1000, delay: 600 }}
						class="text-sm text-center text-gray-500 dark:text-red-400 animate-pulse"
						>{errorMessageLP}</span
					>
				{:else if !errorMessageLP}
					<span
						in:fade={{ duration: 1000, delay: 600 }}
						class="text-sm text-center text-gray-500 dark:text-blue-400 animate-pulse"
						>No Locks Founds.</span
					>
				{/if}
			{:else}
				<button
					on:click={connectToWallet}
					in:fade={{ duration: 1000, delay: 600 }}
					class="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
					>Connect</button
				>
			{/if}
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
			{#if connected}
				<section in:fade class="text-neutral-600 body-font">
					<div
						in:fade={{ delay: 100 }}
						class="flex flex-col text-center xl:w-full mx-auto  py-8  rounded-xl shadow-md shadow-black/50 bg-cover bg-center"
					>
						<form on:submit|preventDefault={() => getLocksForToken(inputLP)}>
							<input
								class="xl:w-1/2 mx-auto text-center rounded-md border border-1 shadow-md dark:bg-blue-900/20 bg-slate-200  text-neutral-400 shadow-black border-neutral-600"
								type="text"
								placeholder="Enter Your LP Token Address"
								bind:value={inputLP}
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
			{/if}
		</div>
	</div>
</section>
{#if locks.length === 0}
	<div
		in:blur={{ delay: 600, duration: 1000 }}
		class="flex items-center my-24 my-12 justify-center"
	>
		<!-- centered content -->

		<div class="mx-auto">
			<div role="status">
				<svg
					aria-hidden="true"
					class="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span class="sr-only text-black/50 text-xl text-center font-bold">Loading...</span>
			</div>
		</div>

		<!-- end centered content -->
	</div>
{:else}
	{#each locks as lock}
		<div
			in:fade
			class="flex flex-col sm:flex-row rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 border border-gray-300 dark:border-neutral-800 backdrop-blur-sm"
		>
			<div
				style="background-image:url(grid.svg)"
				in:fly={{ y: 20, duration: 400 }}
				class="xL:w-1/3 w-full text-center sm:py-8 border shadow-xl shadow-blue-900/10  border-gray-200 rounded-lg shadow-xl dark:bg-gray-900/20 dark:border-gray-700 my-4 mx-4"
			>
				<div
					in:blur={{ delay: 400 }}
					class="w-20 h-20 rounded-full backdrop-blur-sm inline-flex items-center justify-center xl:mt-0 mt-1 border shadow-xl shadow-blue-900/10  border-gray-200 rounded-lg shadow-xl dark:bg-gray-900/20 dark:border-gray-700 my-4 mx-4"
				>
					<img src="/logogif.gif" alt="logo" class="w-16 h-16 mx-auto " />
				</div>

				<div class="flex flex-col items-center text-center justify-center bg-cover">
					{#if new Date().getTime() > lock.unlockDate * 1000}
						<h2 class="font-bold title-font mt-4 text-emerald-400 animate-pulse text-lg">
							WITHDRAW
						</h2>
						<div class="w-12 h-1 bg-emerald-400 rounded mt-2 mb-4" />
					{:else}
						<h2 class="font-bold title-font mt-4 text-blue-600 animate-pulse text-lg">ACTIVE</h2>
						<div class="w-12 h-1 bg-blue-600 rounded mt-2 mb-4" />
					{/if}

					<p class="text-base dark:text-white/50 font-semibold">Initial Amount</p>
					<p class="text-base dark:text-white/80 animate-pulse">
						{ethers.utils.formatEther(lock.initialAmount)}
					</p>
					<p class="text-base dark:text-white/50 font-semibold">Current Amount</p>
					<p class="text-base dark:text-white/80 animate-pulse">
						{ethers.utils.formatEther(lock.Amount)}
					</p>
				</div>
			</div>
			<div
				style="background-image:url(grid.svg)"
				in:fly={{ y: -20, duration: 400 }}
				class="xl:w-2/3 w-full sm:pl-8 sm:py-8 border shadow-xl shadow-blue-900/10  border-gray-200 rounded-lg shadow-xl dark:bg-gray-900/20 dark:border-gray-700 my-4 mx-4 text-center sm:text-left"
			>
				<span class="invisible">{lock.index}</span>
				<p class="leading-relaxed text-lg mb-4">
					<span class="font-semibold dark:text-white/50">Token Pair:</span>
				</p>
				<p in:blur={{ delay: 100 }} class="leading-relaxed text-lg mb-4">
					<span class="font-semibold dark:text-white/50">Lock ID:</span>
					<span class="text-blue-400">{lock.lockID}</span>
				</p>
				<p in:blur={{ delay: 200 }} class="leading-relaxed xl:text-lg text-xs mb-4">
					<span class="font-semibold dark:text-white/50">Lock Owner:</span>
					<span class="text-blue-400">{lock.owner}</span>
				</p>
				<p in:blur={{ delay: 300 }} class="leading-relaxed text-lg mb-4">
					<span class="font-semibold dark:text-white/50">Lock Date:</span>
					<span class="text-blue-400">{new Date(lock.lockDate * 1000).toLocaleString()}</span>
				</p>
				<p in:blur={{ delay: 400 }} class="leading-relaxed text-lg mb-4">
					<span class="font-semibold dark:text-white/50">Unlock Date:</span>
					<span class="text-blue-400">{new Date(lock.unlockDate * 1000).toLocaleString()}</span>
				</p>
				{#if new Date().getTime() > lock.unlockDate * 1000}
					<button
						in:blur={{ delay: 500 }}
						class="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
						on:click={() => withdraw(lock.withdrawLP, lock.index, lock[4], lock[1], locks)}
						>Withdraw</button
					>
				{:else}
					<button
						in:blur={{ delay: 500 }}
						class="inline-flex cursor-not-allowed items-center px-4 py-2 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-blue-900/20 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
						>Withdraw</button
					>
				{/if}

				<span in:blur={{ delay: 600 }} class="mx-2">Relock For:</span><input
					class="dark:bg-blue-900/20 bg-slate-200 text-center"
					bind:value={relockDays}
					type="text"
					placeholder="Amount Of Days"
				/><button
					in:blur={{ delay: 700 }}
					class="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-blue-900/20 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
					on:click={() => relock(lock.withdrawLP, lock.index, lock.lockID, relockDays)}
				>
					Relock
				</button>
			</div>
		</div>
	{/each}
{/if}
