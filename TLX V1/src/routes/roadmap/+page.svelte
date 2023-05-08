<script>
    import Navbar from "$lib/navbar.svelte";
    import Footer from "$lib/footer.svelte";
    import { fade, fly } from 'svelte/transition';
</script>
<Navbar />

<div in:fade class="mt-6 text-center">
    <h2 class="text-base font-semibold tracking-wide text-sky-600 uppercase">
        Roadmap
    </h2>
    <p class="my-2 text-3xl font-extrabold leading-8 tracking-tight text-neutral-400  sm:text-4xl">
        A better way to express our goals
    </p>
    <a href="/Lite-Paper-v1.pdf" target="_blank" class="text-center">
        <button class="btn">Click to read the lite paper!</button>
     </a>
</div>
<div class="flex-wrap items-center mb-12 justify-center gap-8 text-center sm:flex">
    <div in:fade={{delay: 200}} class="w-full px-4 py-4 mt-6 bg-neutral-600/40 rounded-lg sm:w-1/2 md:w-1/2 lg:w-1/4  shadow-sm shadow-black border border-1 border-neutral-400">
        
        <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-black/10 border border-1 rounded-md">
                <svg width="20" height="20" viewBox="0 0 1024 1024" class="icon w-6 h-6"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M892.1 938.7H131.9c-17.8 0-35.1-3.5-51.4-10.4-15.6-6.6-29.7-16.1-41.9-28.2C26.5 888 17 873.9 10.3 858.2 3.5 841.8 0 824.5 0 806.8V217.2c0-17.8 3.5-35 10.4-51.3 6.6-15.7 16.1-29.8 28.2-41.9 12.2-12.2 26.3-21.7 42-28.3 16.2-6.9 33.5-10.4 51.3-10.4h83.4c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7h-83.4c-6.3 0-12.4 1.2-18.1 3.6-5.6 2.4-10.6 5.7-14.9 10-4.3 4.3-7.6 9.2-10 14.8-2.4 5.7-3.6 11.8-3.6 18.1v589.6c0 6.3 1.2 12.4 3.7 18.1 2.3 5.5 5.7 10.5 10 14.8 4.3 4.2 9.2 7.6 14.8 9.9 5.8 2.4 11.9 3.7 18.1 3.7h760.2c6.3 0 12.4-1.2 18.1-3.6 5.6-2.4 10.6-5.7 14.9-10 4.3-4.3 7.6-9.2 10-14.8 2.4-5.7 3.6-11.8 3.6-18.1V217.2c0-6.3-1.2-12.4-3.7-18.1-2.3-5.5-5.7-10.5-10-14.8-4.3-4.2-9.2-7.6-14.8-9.9-5.8-2.4-11.9-3.7-18.1-3.7h-83.4c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h83.4c17.8 0 35.1 3.5 51.4 10.4 15.6 6.6 29.7 16.1 41.9 28.2 12.1 12.1 21.6 26.2 28.3 41.9 6.9 16.3 10.4 33.6 10.4 51.4v589.6c0 17.8-3.5 35-10.4 51.3-6.6 15.7-16.1 29.8-28.2 41.9-12.2 12.2-26.3 21.7-42 28.3-16.3 6.9-33.6 10.4-51.4 10.4z" fill="#3688FF" /><path d="M229.8 714.8c-6.1 0-12.3-1.3-18.1-4.1-21.3-10-30.5-35.5-20.4-56.8L467.5 67.1c10-21.3 35.5-30.5 56.8-20.4 21.3 10 30.5 35.5 20.4 56.8L268.5 690.3c-7.3 15.4-22.7 24.5-38.7 24.5zM810.7 448H640c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h170.7c23.6 0 42.7 19.1 42.7 42.7S834.2 448 810.7 448zM810.7 704h-384c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h384c23.6 0 42.7 19.1 42.7 42.7S834.2 704 810.7 704z" fill="#5F6379" /></svg>
            </div>
        </div>
        <h3 class="py-4 text-2xl font-semibold text-neutral-400 sm:text-xl ">
            Phase I
        </h3>
        <p class="leading-loose font-medium text-neutral-300 text-md">
            Full UI revamp
        </p>
        <p class="leading-loose font-medium text-neutral-300 text-md">
            Secured Projects Explorer
        </p>
        <p class="leading-loose font-medium text-neutral-300 text-md">
            AI Powered Risk Assesment
        </p>
    </div>
    <div in:fade={{delay: 400}} class="w-full px-4 py-4 mt-6 bg-neutral-600/40 rounded-lg shadow-md sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24  shadow-sm shadow-black border border-1 border-neutral-400">
        <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-black/10 border border-1 rounded-md">
                <svg width="20" height="20" viewBox="0 0 1024 1024" class="icon w-6 h-6"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z" fill="#3688FF" /><path d="M469.3 704c-10.9 0-21.8-4.2-30.2-12.5-16.7-16.7-16.7-43.7 0-60.3L558.3 512 439.2 392.8c-16.7-16.7-16.7-43.7 0-60.3 16.7-16.7 43.7-16.7 60.3 0l149.3 149.3c16.7 16.7 16.7 43.7 0 60.3L499.5 691.5c-8.3 8.3-19.3 12.5-30.2 12.5z" fill="#5F6379" /></svg>
            </div>
        </div>
        <h3 class="py-4 text-2xl font-semibold text-neutral-400 sm:text-xl ">
            Phase II
        </h3>
        <p class="leading-loose font-medium text-neutral-300 text-md">
            Token Vesting dApp
        </p>
        <p class="leading-loose font-medium text-neutral-300 text-md">
            Safe Presale dApp
        </p>
        <p class="leading-loose font-medium text-neutral-300 text-md">
            AI Powered Presale Indicators
        </p>
    </div>
    <div in:fade={{delay: 600}} class="w-full px-4 py-4 mt-6 bg-neutral-600/40 rounded-lg sm:w-1/2 md:w-1/2 lg:w-1/4  shadow-sm shadow-black border border-1 border-neutral-400">
        <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-black/10 border border-1 rounded-md">
                <svg width="20" height="20" viewBox="0 0 1024 1024" class="icon w-6 h-6"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M892.10374 938.7H131.90374C59.20374 938.7 0.00374 879.5 0.00374 806.8V217.2C0.00374 144.5 59.20374 85.3 131.90374 85.3h760.2c72.7 0 131.9 59.2 131.9 131.9v589.6c0 72.7-59.2 131.9-131.9 131.9z m-760.2-768c-25.7 0-46.5 20.9-46.5 46.5v589.6c0 25.7 20.9 46.5 46.5 46.5h760.2c25.7 0 46.5-20.9 46.5-46.5V217.2c0-25.7-20.9-46.5-46.5-46.5H131.90374z" fill="#3688FF" /><path d="M42.70374 832c-13.7 0-27.2-6.6-35.4-18.8-13.2-19.5-8-46.1 11.5-59.2l376-253.4c34.4-23.2 77.6-20.3 105.1 7.1l101.2 100.7c0.2-0.1 0.4-0.3 0.6-0.4l353.8-268.5c18.8-14.2 45.5-10.6 59.8 8.2 14.2 18.8 10.6 45.5-8.2 59.8L653.30374 675.8c-34.6 26.3-80.6 24.6-109.4-4L442.80374 571.1c-0.1 0.1-0.2 0.1-0.3 0.2l-376 253.4c-7.3 4.9-15.6 7.3-23.8 7.3z" fill="#5F6379" /><path d="M234.70374 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#5F6379" /></svg>
            </div>
        </div>
        <h3 class="py-4 text-2xl font-semibold text-neutral-400 sm:text-xl ">
            Phase III
        </h3>
        <p class="leading-loose font-medium text-neutral-300 text-md">
            Arbitrum1 Portal Publication
        </p>
        <p class="leading-loose font-medium text-neutral-300 text-md">
            Mass Media Marketing
        </p>
        <p class="leading-loose font-medium text-neutral-300 text-md">
            Multichain Support
        </p>
    </div>
</div>

<div in:fade={{delay: 800}}  class="hero-content mx-auto mb-6 text-center ">
    <div class="max-w-md " >
      <div in:fly={{ y: 50, duration: 1200}} class="mb-4 text-5xl font-bold text-sky-600"><img src="/mainlogo.gif" alt="logo" class=" mx-auto"></div>
      <hr class="mb-2 border border-1 border-zinc-600">
      <p class="xl:text-xl text-lg font-semibold text-white/70">Arbitrum One Project Security</p>
      <p class=" xl:text-lg text-md text-white/50">Locking | Vesting | Safesale</p>
    </div>
  </div>


<Footer />
