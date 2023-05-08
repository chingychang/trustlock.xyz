<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { ethers } from 'ethers';
  import lockABI from "$lib/lock/lockABI.json";
  import token from "$lib/tokenABI.json";
  const contractAddress = '0x7F2E701Ff709BC5E2aE70Cd8ea0Cd7AC92022568';
  const contractABI = lockABI;
  const tokenABI = token;

  /**
	 * @type {any}
	 */
  let numLockedTokens;
  let error;
  /**
	 * @type {boolean}
	 */
  let loading;

  onMount(async () => {
  try {
    loading = true;
    // @ts-ignore
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the network ID
    let networkId = await provider.getNetwork().then(({ chainId }) => chainId);
		
		// Check if the user is connected to the correct network
    if (networkId !== 42161) {
      error = 'You are not connected to the Arb1 network';
    } else {
      // Create an instance of the contract using the provider and contract address/ABI
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      // Call the `getNumLockedTokens` function
      numLockedTokens = await contract.getNumLockedTokens();
      loading = false;
    }
  } catch (err) {
    // Handle any errors that may occur
    // @ts-ignore
    error = err.message;
  }
});
let tokenAddress = "0x2468400e2520b6Fb3612612bA571554521B0318E";
let deadAddress = "0x000000000000000000000000000000000000dead";

/**
	 * @type {any}
	 */
let balanceTokens;
/**
	 * @type {any}
	 */
let balance;
/**
	 * @type {boolean}
	 */
let loading2;
let balanceWei;

onMount(async () => {
  try {
    loading2 = true;
        // @ts-ignore
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(tokenAddress, token, provider);

    balance = await contract.balanceOf(deadAddress);
    balanceWei = balance.toString();
    balanceTokens = parseInt(ethers.utils.formatUnits(balanceWei, 9));
    loading2 = false;
    } catch (error) {
    console.error(error);
    
  }
});
</script>
<section in:fly={{ y: 20, duration: 400}}>
<div in:fade={{ delay: 100 }} class="hero xl:py-12 border border-1 border-neutral-500 rounded-xl xl:w-1/2 mx-auto my-4 bg-cover bg-center bg-no-repeat shadow-lg shadow-black/50 bg-gradient-to-r from-neutral-500/50 via-neutral-800/20 to-neutral-500/50">
    <div in:fade={{ delay: 400 }} class="hero-overlay bg-opacity-40 bg-neutral-400/10 rounded-xl xl:w-1/2 mx-auto shadow-md shadow-black/50 bg-center bg-cover border border-1 border-zinc-500">
    <div class="hero-content text-center ">
      <div class="max-w-md " >
        <div class="mb-4 text-5xl font-bold text-sky-600"><img src="/mainlogo.gif" alt="logo" class=" mx-auto"></div>
        <hr class="mb-2 border border-1 border-zinc-600">
        <p class="xl:text-xl text-lg font-semibold text-white/70">Arbitrum One Project Security</p>
        <p class=" xl:text-lg text-md text-white/50">Locking | Vesting | Safesale</p>
      </div>
    </div>
  </div>
</section>



<div in:fade={{ delay: 400 }} class="flex flex-col sm:flex-row xl:w-1/2 mx-auto text-center my-6 ">
    <div in:fade={{ delay: 600 }} class="flex-1 xl:w-1/2 xl:mr-4 xl:mb-0 mb-4 rounded-xl bg-contain bg-top border border-1 border-zinc-200/50">
        <div class="mx-auto bg-slate-400/10 py-6 border border-1 border-zinc-200/20 rounded-xl shadow-lg shadow-black/50">
        <h1 class="text-4xl font-bold text-emerald-400">{#if loading2}Loading...{:else}{balanceTokens}{/if}</h1>
        <hr class="w-1/2 mx-auto border border-zinc-500/50">
        <p class="text-xl font-medium text-neutral-400">Total TLX Revenue Burned</p>
    </div>
    </div>
    <div in:fade={{ delay: 800 }} class="flex-1 xl:w-1/2 xl:ml-4 xl:mb-0 mb-4 rounded-xl bg-contain bg-left border border-1 border-zinc-200/50">
        <div class="mx-auto bg-slate-400/10 py-6 border border-1 border-zinc-200/20 rounded-xl shadow-lg shadow-black/50">
        <h1 class="text-4xl font-bold text-emerald-400">{#if loading}Loading...{:else}{numLockedTokens}{/if}</h1>
        <hr class="w-1/2 mx-auto border border-zinc-500/50">
        <p class="text-xl font-medium text-neutral-400">Total Projects Secured</p>
    </div>
    </div>
    
  </div>
  
 

