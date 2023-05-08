<script>
    import Navbar from "$lib/navbar.svelte";
    import Footer from "$lib/footer.svelte";
    import { ethers, Contract } from 'ethers';
    import lockABI from '$lib/lock/lockABI.json';
    import { onMount } from 'svelte';
     import { fade, fly } from 'svelte/transition';

    ////////////////// SERVICE FEE

   
let serviceFee = "";
const lockContractAddress = '0x7F2E701Ff709BC5E2aE70Cd8ea0Cd7AC92022568';
  const abi = lockABI;

   
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
<Navbar />

<section class="text-gray-600 body-font overflow-hidden">
  <div in:fade class="container px-5 py-20 mx-auto">
    <div  class="flex flex-col text-center w-full mb-20">
      <h1 in:fly={{y: -50, duration: 800}} class="sm:text-4xl text-3xl font-medium title-font mb-2 text-neutral-400">Pricing</h1>
      <p in:fade={{delay: 500}} class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">50% of service fee buys back and burns TLX!</p>
      <div in:fly={{y: 50, duration: 800}} class="flex mx-auto border-2 border-blue-600 rounded overflow-hidden mt-6">
        <a href="/lock/explorer"><button class="py-1 px-4 bg-blue-600 text-white focus:outline-none ">Explore</button>
        <button class="py-1 px-3 focus:outline-none ">Projects</button></a>
      </div>
    </div>
   
    <div in:fade={{delay: 300}} class="flex flex-wrap xl:w-1/2 w-full -m-4 mx-auto">
      
      <div class="p-4 xl:w-1/2 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-blue-600 flex flex-col relative overflow-hidden">
          <span class="bg-blue-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">LIQUIDITY LOCK</h2>
          <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span class="text-neutral-400">{serviceFee}</span>
            <span class="text-lg ml-1 font-normal text-gray-500">/eth</span>
          </h1>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Safe & Effective
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Easy Interface
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Best Rate On Market
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Trusted By Community
          </p>
          <a href="/lock"><button class="flex items-center mt-auto text-white bg-blue-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">Lock LP Tokens
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button></a>
          <p class="text-xs text-gray-500 mt-3">Need help? <label for="my-modal-4" class="text-blue-700 underline hover:cursor-pointer">Watch video!</label></p>
        </div>
      </div>
      <div in:fade={{delay: 600}} class="p-4 xl:w-1/2 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">SAFE PRESALE</h2>
          <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
            <span class="text-neutral-400">0.1</span>
            <span class="text-lg ml-1 font-normal text-gray-500">/eth</span>
          </h1>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Minimize The Risk
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Project Explorer
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Vesting Schedule
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Decentralized Escrow
          </p>
          
          <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded cursor-not-allowed">In development
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
          <p class="text-xs text-gray-500 mt-3">Follow progress on <a href="https://t.me/trustlock" target="_blank" rel="noreferrer" class="text-blue-700 underline">Telegram.</a></p>
        </div>
      </div>

    </div>
    
  </div>
</section>



  <Footer />

  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer backdrop-blur-sm">
  <label class="xl:w-2/3 w-full border border-1 border-neutral-600 shadow-lg shadow-black/50 relative bg-black" for="">
    <video src="/arbilock.mp4" controls ><track kind="captions"/></video>
  </label>
</label>