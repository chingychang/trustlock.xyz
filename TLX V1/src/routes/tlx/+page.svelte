<script>
    import Navbar from "$lib/navbar.svelte";
    import Footer from "$lib/footer.svelte";
    import { fade, fly } from 'svelte/transition';
    
</script>

<Navbar />

<section in:fade={{ duration: 400 }} class="text-neutral-400/80 body-font">
    <div class="container px-5 py-20 mx-auto">
      <div  class="flex flex-wrap w-full mb-20">
        <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
          <h1 in:fly={{ x: 50, duration: 800}} class="sm:text-3xl text-2xl font-medium title-font font-bold mb-2 text-neutral-400">TLX Token</h1>
          <div class="h-1 w-20 bg-sky-800 rounded"></div>
        </div>
        <p in:fly={{ x: -50, duration: 800}} class="lg:w-1/2 w-full leading-relaxed text-neutral-400 font-semibold text-opacity-90">TrustLock token (Ticker: TLX) is the native token used for our services!</p>
      </div>
      <div class="flex flex-wrap -m-4">
        <div in:fade={{ delay: 400 }} class="xl:w-1/4 md:w-1/2 p-4">
          <div in:fly={{ x: 80, duration: 1400}} class="bg-slate-400/20 bg-opacity-40 p-6 rounded-lg shadow-md shadow-black/50 border border-1 border-zinc-200">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video in:fly={{ y: 40, duration: 1600}} class="h-40 rounded w-full object-cover object-center mb-6 shadow-md shadow-black/50 border border-1 border-zinc-200" src="/tlx1.mp4" autoplay muted loop></video>
            <h3 class="tracking-widest text-blue-600 text-xs font-bold title-font">Basic Info</h3>
            <h2 class="text-lg text-neutral-400 font-medium title-font ">TLX Token</h2>
            <hr class="mb-4 border border-1 border-zinc-500">
            <p class="leading-relaxed text-base font-semibold">Total Supply: 1 million $TLX</p>
            <p class="leading-relaxed text-base font-semibold">Network: Arbitrum 1</p>
            <p class="leading-relaxed text-base font-semibold">Listed On: SushiSwap</p>
            
          </div>
        </div>
        <div in:fade={{ delay: 200 }} class="xl:w-1/4 md:w-1/2 p-4">
            <div class="bg-slate-400/20 bg-opacity-40 p-6 rounded-lg shadow-md shadow-black/50 border border-1 border-zinc-200">
              <video in:fly={{ y: 40, duration: 1600}} class="h-40 rounded w-full object-cover object-center mb-6 shadow-md shadow-black/50 border border-1 border-zinc-200" src="/tlx2.mp4" autoplay muted loop></video>
            <h3 class="tracking-widest text-emerald-400 text-xs font-bold title-font">Distribution</h3>
            <h2 class="text-lg text-neutral-400 font-medium title-font">No Presale</h2>
            <hr class="mb-4 border border-1 border-zinc-500">
            <p class="leading-relaxed text-base font-semibold">No presale or ICO</p>
            <p class="leading-relaxed text-base font-semibold">Stealth launched</p>
            <p class="leading-relaxed text-base font-semibold">100% supply on DEX</p>
          </div>
        </div>
        <div in:fade={{ delay: 200 }} class="xl:w-1/4 md:w-1/2 p-4">
            <div class="bg-slate-400/20 bg-opacity-40 p-6 rounded-lg shadow-md shadow-black/50 border border-1 border-zinc-200">
              <video in:fly={{ y: 40, duration: 1600}} class="h-40 rounded w-full object-cover object-center mb-6 shadow-md shadow-black/50 border border-1 border-zinc-200" src="/tlx3.mp4" autoplay muted loop></video>
            <h3 class="tracking-widest text-blue-600 text-xs font-bold title-font">Trading Info</h3>
            <h2 class="text-lg text-neutral-400 font-medium title-font">Tax and Fees</h2>
            <hr class="mb-4 border border-1 border-zinc-500">
            <p class="leading-relaxed text-base font-semibold">1% marketing fee</p>
            <p class="leading-relaxed text-base font-semibold">1% development fee</p>
            <p class="leading-relaxed text-base font-semibold">1% future expense fee</p>
          </div>
        </div>
        <div in:fade={{ delay: 400 }} class="xl:w-1/4 md:w-1/2 p-4" >
            <div in:fly={{ x: -80, duration: 1400}} class="bg-slate-400/20 bg-opacity-40 p-6 rounded-lg shadow-md shadow-black/50 border border-1 border-zinc-200">
              <video in:fly={{ y: 40, duration: 1600}} class="h-40 rounded w-full object-cover object-center mb-6 shadow-md shadow-black/50 border border-1 border-zinc-200" src="/tlx4.mp4" autoplay muted loop></video>
            <h3 class="tracking-widest text-emerald-400 text-xs font-bold title-font">Dapp Revenue</h3>
            <h2 class="text-lg text-neutral-400 font-medium title-font">TLX Usecase</h2>
            <hr class="mb-4 border border-1 border-zinc-500">
            <p class="leading-relaxed text-base font-semibold">50% dApp fees burn TLX</p>
            <p class="leading-relaxed text-base font-semibold">Use platform features</p>
            <p class="leading-relaxed text-base font-semibold">Access advanced tools</p>
          </div>
        </div>
      </div>
    </div>
  </section>


  <p in:fly={{ y: -20, delay: 1000}} class="text-center font-semibold text-neutral-400 xl:text-md md:text-md text-xs mb-4">Contract Address: 0x2468400e2520b6Fb3612612bA571554521B0318E</p>

  <p in:fly={{ y: 20, delay: 1200}} class="text-center font-semibold text-neutral-400 xl:text-md md:text-md text-xs mb-8 mx-2"><a href="https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x2468400e2520b6Fb3612612bA571554521B0318E&chainId=42161" target="_blank" rel="noreferrer"><button class="btn mx-2">BUY NOW</button></a><a href="https://www.dextools.io/app/en/arbitrum/pair-explorer/0x96ea8a925d8c4b65b7a6c08923dd8ad089473394" target="_blank" rel="noreferrer"><button class="btn">CHART</button></a></p>

  <Footer />



  