<script lang="ts">
	import { ethers } from 'ethers';
	import { fade, fly } from 'svelte/transition';
	import { Contract, utils, BigNumber } from 'ethers';
	import lockABI from './lockABI.json';
	import approveABI from './approveABI.json';
	import { onMount } from 'svelte';
	let provider;
	let accounts;
	let networkId;
	let error = '';
	let loading = true;
	let connectedAccount: string | Promise<string>;
	let balance: string;
	let approveLpTxLock = false;
	let txHashLock = '';
	let withdrawAddy: any;
	let tokens: any;
	let days: number;
	let unlockDate: Date;
	let addressInput = '';
	let message = '';
	let symbol: any;
	let errorMessage;
	let balanceLP: any;
	const lockContractAddress = '0x7F2E701Ff709BC5E2aE70Cd8ea0Cd7AC92022568';
  const abi = lockABI;

	const connectWallet = async () => {
		loading = true;
		// @ts-ignore
		if (window.ethereum) {
			try {
				// @ts-ignore
				provider = new ethers.providers.Web3Provider(window.ethereum);
				// @ts-ignore
				accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
				networkId = await provider.getNetwork().then(({ chainId }) => chainId);
				if (networkId !== 42161) {
					error = 'You are not connected to the Arb1 network';
				} else {
					connectedAccount = accounts[0];
					const balanceInWei = await provider.getBalance(connectedAccount);
					balance = ethers.utils.formatEther(balanceInWei);
					balance = parseFloat(balance).toFixed(5);
					error = '';
				}
			} catch (e) {
				// @ts-ignore
				error = e;
			} finally {
				loading = false;
			}
		} else {
			error = 'MetaMask not detected';
			loading = false;
		}
	};

	//////// CHECK LP ADDRESS

	async function checkAddressAndBalance() {
		const address = addressInput;
		try {
			// @ts-ignore
			provider = new ethers.providers.Web3Provider(window.ethereum);
			accounts = await provider.listAccounts();
			// @ts-ignore
			networkId = await provider.getNetwork().then(({ chainId }) => chainId);
			if (networkId !== 42161) {
				errorMessage = 'You are not connected to the Arb1 network';
			}
			connectedAccount = accounts[0];
			const signer = provider.getSigner();
			const uniswapFactory = new ethers.Contract(
				'0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
				['function getPair(address tokenA, address tokenB) public view returns (address)'],
				provider
			);
			const lpToken = new ethers.Contract(
				address,
				[
					'function token0() public view returns (address)',
					'function token1() public view returns (address)',
					'function symbol() public view returns (string)',
					'function balanceOf(address _owner) public view returns (uint256)'
				],
				provider
			);
			symbol = await lpToken.symbol();
			const pairAddress = await uniswapFactory.getPair(
				await lpToken.token0(),
				await lpToken.token1()
			);
			if (pairAddress === address) {
				message = `Valid LP token address`;
				try {
					const balanceOfLP = await lpToken.balanceOf(connectedAccount);
					const balanceLP_wei = balanceOfLP.toString();
					const balanceLP_ether = ethers.utils.formatEther(balanceLP_wei);
					balanceLP = balanceLP_ether;
				} catch (balanceError) {
					console.error(balanceError);
					message = `Error: Do you hold the LP tokens?`;
				}
			} else {
				message = `Invalid LP token address`;
			}
		} catch (addressError) {
			console.error(addressError);
			message = `Error: Invalid address.`;
		}
	}

	function submitForm() {
		const today = new Date();
		unlockDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
	}

	let showModal = false;
	///////////// APPROVE

	
	const approveContractAbi = approveABI;
	let approveLpTx = false;
	let txHash = '';
	async function handleApproveSubmit() {
		// @ts-ignore
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(addressInput, approveContractAbi, signer);
		
		const value2 = ethers.utils.parseEther(tokens.toString());

		try {
			const tx = await contract.approve(lockContractAddress, value2);
			txHash = tx.hash;
			await tx.wait();
			approveLpTx = true;
			console.log('Transaction successful');
		} catch (error) {
			console.error(error);
		}
	}
	///////// LOCK CONTRACT
	let LockLpTx = false;
	function handleLockSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		let unixTimestamp = new Date(Date.now() + Number(days) * 24 * 60 * 60 * 1000);
		let unlockDate = Math.round(unixTimestamp.getTime() / 1000);
		let selectRouterAddress = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506';
		let lpToken = addressInput;
		let amount = ethers.utils.parseEther(tokens.toString());
		let withdrawer = withdrawAddy;
		let routerAddress = selectRouterAddress;
		lockLPToken(lpToken, amount, unlockDate, withdrawer, routerAddress);
	}

	async function lockLPToken(
		lpToken: any,
		amount: any,
		unlockDate: any,
		withdrawer: any,
		routerAddress: any
	) {
		try {
			//@ts-ignore
			provider = new ethers.providers.Web3Provider(window.ethereum);
			accounts = await provider.listAccounts();
			networkId = await provider.getNetwork().then(({ chainId }) => chainId);
			if (networkId !== 42161) {
				errorMessage = 'You are not connected to the Arb1 network';
			}
			connectedAccount = accounts[0];
			let signer = provider.getSigner();

			
			const contract = new Contract(lockContractAddress, abi, signer);
			let ethFeeCall = await contract.functions.ethFee();
			let ethFee = ethFeeCall.toString();
			
			const tx = await contract.lockLPToken(
				lpToken,
				amount,
				unlockDate,
				withdrawer,
				routerAddress,
				{
					value: ethFee
				}
			);
            
			txHashLock = tx.hash;
			console.log(`Transaction hash: ${tx.txHashLock}`);
			await tx.wait();
			LockLpTx = true;
			console.log('LP Token lock completed!');
		} catch (error) {
			console.error(error);
		}
	}

	////////////////// SERVICE FEE
   
let serviceFee = "";
   
onMount(async () => {
    // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const networkId = await provider.getNetwork().then(({ chainId }) => chainId);
  if (networkId !== 42161) {
    console.error('You are not connected to the Arb1 network');
  }

  
  const contract = new Contract(lockContractAddress, abi, provider);
  let serviceFeeWei = await contract.functions.ethFee();
    serviceFee = ethers.utils.formatEther(serviceFeeWei.toString());
});

</script>

<section
	in:fly={{ y: -20, duration: 900 }}
	class="xl:w-1/2 my-4 mx-auto bg-neutral-700/50 rounded-2xl xl:px-6 px-2 py-6 shadow-sm shadow-black border border-1 border-zinc-600/40"
>
	<div class="flex items-center justify-between mb-5">
		<span in:fade={{ delay: 200 }} class="text-gray-400 xl:text-sm text-xs"
			>{#if connectedAccount}<code>UniSwap Selected</code>{:else}Welcome Back!{/if}</span
		>

		<span in:fade={{ delay: 300 }} class="text-emerald-400 xl:text-sm text-xs animate-pulse">
			{#if loading}
				<p class="text-blue-600/80">Waiting for MetaMask connection...</p>
			{:else if error}
				<p style="color: red;">Error: {error}</p>
			{:else if connectedAccount}
				<p>Connected to Arb1 network!</p>
			{/if}
		</span>
	</div>

	<div in:fade={{ delay: 500 }} class="mt-8 ">
		<p class="text-emerald-400 font-semibold mt-2.5 xl:text-sm text-xs">
			{#if connectedAccount}{connectedAccount}{:else}Please Connect Your Wallet{/if}
		</p>

		<div in:fade={{ delay: 600 }} class="mt-3 text-white xl:text-sm text-xs">
			<span class="text-blue-600 font-semibold animate-pulse"
				>{#if connectedAccount}Balance: {balance} ETH{:else}Waiting ...{/if}</span
			>
		</div>
	</div>

	<div in:fade={{ delay: 800 }} class="h-1 w-full bg-black mt-8 rounded-full">
		<div class="h-1 rounded-full w-full bg-neutral-500" />
	</div>

	<div
		in:fade={{ delay: 1000 }}
		class="text-center bg-cover bg-bottom"
		
	>
		<button on:click={connectWallet} class="btn mt-4 mx-auto">
			{#if connectedAccount}Refresh{:else}Connect Wallet{/if}</button
		>
	</div>
</section>

{#if connectedAccount}
	<div class="xl:w-1/2 py-4 mx-auto" in:fly={{ y: -20, duration: 2000, delay: 500 }}>
		<div
			class="xl:w-1/2 my-6 mx-auto rounded-xl bg-cover bg-top border border-1 shadow-sm shadow-black border-zinc-600/40"
			in:fade
			
		>
			<div class="form-control">
				<span class="text-center font-semibold backdrop-blur-sm text-neutral-400 rounded-tl-xl rounded-tr-xl"
					>Enter Your LP Token Address</span
				>
				<label class="input-group input-group-vertical">
					<input
						type="text"
						bind:value={addressInput}
						placeholder="0x000000000000000000000000000000000000dead"
						class="input input-bordered text-center bg-neutral-500"
					/>
				</label>

				<div class="xl:w-1/2 my-2 py-2 mx-auto text-center">
					<button class="btn mx-auto text-center" on:click={checkAddressAndBalance}>Validate</button
					>
				</div>
			</div>
			<hr class="border border-1 border-neutral-500">
			<p
				class="text-center w-full mx-auto backdrop-blur-sm rounded-bl-xl rounded-br-xl font-semibold {message ===
				'Valid LP token address'
					? 'text-emerald-400'
					: 'text-red-400'}"
			>
				<span class="animate-pulse">
					{message === 'Invalid LP token address'
						? 'Invalid address input. Please try again.'
						: message}
				</span>
			</p>
			<p
				class="text-center w-full mx-auto backdrop-blur-sm rounded-bl-xl rounded-br-xl font-semibold text-blue-600"
			>
				{#if error}
					<span class="animate-pulse">{error}</span>
				{:else if balanceLP == 0}
					<span class="animate-pulse">You don’t hold this LP token.</span>
				{:else if balanceLP}
					<span class="animate-pulse">Balance: {balanceLP} ${symbol}</span>
				{:else}
					<span class="animate-pulse">Waiting</span>
				{/if}
			</p>
		</div>
	</div>
{/if}

{#if balanceLP > 0}
	<div class="w-full mx-auto" in:fly={{ y: 20, duration: 2000, delay: 500 }}>
		<div
			class="xl:w-1/2 mt-2 mb-2 mx-auto rounded-xl bg-cover bg-top border border-1 shadow-sm shadow-black border-zinc-600/40 "
			in:fade
			
		>
			<div class="form-control backdrop-blur-sm rounded-xl">
				<span
					class="text-center text-center text-neutral-400 font-semibold backdrop-blur-sm border-b mb-4 shadow-sm shadow-black border-zinc-600/40  rounded-tl-xl rounded-tr-xl"
					>Create & Verify</span
				>
				<form on:submit|preventDefault={submitForm} class="text-center xl:w-full mx-auto">
					<div class="flex flex-col sm:flex-row text-center">
						<div class="flex-1 xl:border-r md:border-r border-zinc-600/40 ">
							<label for="tokens" class="text-neutral-400 font-semibold">Number of Tokens:</label>

							<br />
							<input
								type="text"
								id="tokens"
								bind:value={tokens}
								class="bg-neutral-500 text-center xl:w-1/2 mx-auto rounded-md border border-1 shadow-sm shadow-black border-zinc-600/40"
							/>
							<br />
							<button
								on:click={() => (tokens = balanceLP)}
								class="text-xs font-semibold px-2 my-2 border border-1 text-neutral-500 border-black/80 bg-black/20"
								>Select Max</button
							>
						</div>
						<div class="flex-1 xl:border-l md:border-l border-zinc-600/40">
							<label for="days" class="font-semibold text-neutral-400">Number of Days:</label>
							<br />
							<input
								type="text"
								id="days"
								bind:value={days}
								class="bg-neutral-500 text-center xl:w-1/2 mx-auto rounded-md border border-1 shadow-sm shadow-black border-zinc-600/40"
							/>
							<br />
							<button
								on:click={() => (days = 36525)}
								class="text-xs font-semibold px-2 my-2 border border-1 border-black/80 bg-black/20 text-neutral-500"
								>Lifetime Lock</button
							>
						</div>
					</div>
					<hr class="border-1 border-zinc-600/60 shadow-sm shadow-black mb-2" />
					<label for="withdrawAddy" class="text-neutral-400 xl:w-full mx-auto text-center font-semibold"
						>Withdrawer Address:</label
					>
					<br />
					<input
						type="text"
						id="withdrawAddy"
						bind:value={withdrawAddy}
						class="bg-neutral-500 text-center xl:w-1/2 mx-auto rounded-md border border-1 shadow-sm shadow-black border-zinc-600/40"
					/>
					<br />
					<button
						on:click={() => (withdrawAddy = connectedAccount)}
						class="text-xs font-semibold px-2 my-2 border border-1 border-black/80 bg-black/20 text-neutral-500" 
						>Use Connected</button
					>
					<br />
					<button
						type="submit"
						on:click={() => (showModal = !showModal)}
						class="btn my-2 xl:w-1/4 w-1/2 mx-auto">Verify</button
					>
				</form>
			</div>
		</div>
	</div>
{/if}

{#if showModal}
	<form on:submit|preventDefault={handleLockSubmit}>
		<div in:fade out:fade class="flex items-center justify-center absolute">
			<!-- centered content -->

			<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
				<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

				<div class="fixed inset-0 z-10 overflow-y-auto">
					<div
						class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
					>
						<div
							class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
						>
							<div class="bg-neutral-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div class="sm:flex sm:items-start">
									<div
										class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
									>
										<!-- Heroicon name: outline/exclamation-triangle -->
										<svg
											class="h-6 w-6 text-red-600"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
											/>
										</svg>
									</div>
									<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<h3 class="text-lg font-medium leading-6 text-neutral-500" id="modal-title">
											Verify Info
										</h3>
										<div class="mt-2">
											<p class="text-sm text-neutral-400">
												Make sure your information is correct. This action cannot be undone.
											</p>
											<p><span class="font-semibold text-neutral-400">LP Token:</span></p>
											<p>
												<input
													type="text"
													bind:value={addressInput}
													placeholder={addressInput}
													class="w-full bg-transparent text-neutral-400"
													disabled
												/>
											</p>

											<hr />
											<p>
												<span class="font-semibold text-neutral-400">{symbol} Amount:</span>
												<input type="text" class="bg-transparent text-neutral-400" bind:value={tokens} placeholder={tokens} disabled />
											</p>
											<hr />
											<p>
												<span class="font-semibold text-neutral-400">Number Of Days:</span>
												<input
													type="text"
													bind:value={days}
													placeholder={days.toString()}
													disabled
													class="bg-transparent text-neutral-400"
												/>
											</p>
											<hr />
											<p>
												<span class="font-semibold text-neutral-400">Unlock Date:</span>
												<input
													type="text"
													bind:value={unlockDate}
													placeholder={unlockDate ? unlockDate.toString() : 'Error with calculating days!'}
													disabled
													class="w-full bg-transparent text-neutral-400"
												/>
												
											</p>
											<hr />
											<p><span class="font-semibold text-neutral-400">Withdrawer Address:</span></p>
											<p>
												<input
													type="text"
													bind:value={withdrawAddy}
													placeholder={withdrawAddy}
													class="w-full bg-transparent text-neutral-400"
													disabled
												/>
											</p>

											<hr class="border border-1 border-neutral-200 my-2" />
											<p>
												<span class="font-semibold text-emerald-400">Service Fee:</span>
												<span class="text-neutral-400">{serviceFee} ETH</span>
											</p>
											<p>
												<span class="font-bold text-blue-600">Status:</span>
												{#if approveLpTx}
													<a
														href={`https://arbiscan.io/tx/${txHash}`}
														target="_blank"
														rel="noreferrer"
														class="animate-pulse text-emerald-400"
														>Approve successful! View TX.
													</a>
													<p class="text-neutral-400">Lock your {symbol} tokens for {days} days now!</p>
												{:else}
													<a
														href={`https://arbiscan.io/tx/${txHash}`}
														target="_blank"
														rel="noreferrer"
														class="animate-pulse text-blue-600"
														>Waiting Approve TX confirmation...
													</a>
												{/if}
												{#if approveLpTx}
													{#if LockLpTx}
														<p>
															<a
																href={`https://arbiscan.io/tx/${txHashLock}`}
																target="_blank"
																rel="noreferrer"
																class="animate-pulse text-emerald-400"
																>LOCK successful! View TX.
															</a>
														</p>
													{:else}
														<p>
															<a
																href={`https://arbiscan.io/tx/${txHashLock}`}
																target="_blank"
																rel="noreferrer"
																class="animate-pulse text-blue-600"
																>Waiting Lock TX confirmation...
															</a>
														</p>
													{/if}
												{/if}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div class="bg-neutral-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								{#if approveLpTx}
									{#if approveLpTxLock}
										<span />
									{:else}
									{#if LockLpTx}
									<button
											disabled
											type="submit"
											class="inline-flex cursor-not-allowed w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
											>LOCKED</button
										>
									{:else}
										<button
											on:click={handleLockSubmit}
											type="submit"
											class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
											>LOCK</button
										>
										{/if}
									{/if}
								{:else}
									<button
										on:click={handleApproveSubmit}
										type="button"
										class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
										>Approve</button
									>
								{/if}
								<button
									type="button"
									on:click={() => (showModal = !showModal)}
									class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									>Close</button
								>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- end centered content -->
		</div>
	</form>
{/if}
