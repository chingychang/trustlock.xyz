<script>
  import { fade, fly } from 'svelte/transition';
</script>
<div in:fly={{ y: -20, duration: 400 }} class="navbar xl:w-1/2 mx-auto bg-gradient-to-b from-cyan-100/10 to-black/10 border-b border-slate-500 rounded-xl shadow-sm shadow-black/50">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 bg-black/70 shadow rounded-box w-52 text-neutral-400">
          <li class="hover:bg-neutral-600 rounded-xl hover:text-blue-400 transition ease-in-out"><a href="/tlx">TLX Token</a></li>
          <li class="hover:bg-neutral-600 rounded-xl hover:text-blue-400 transition ease-in-out"><a href="/pricing">Pricing</a></li>
          <li class="hover:bg-neutral-600 rounded-xl hover:text-blue-400 transition ease-in-out"><a href="/roadmap">Roadmap</a></li>
        </ul>
      </div>
      <a href="/home" class="btn btn-ghost normal-case xl:text-xl md:text-md text-md text-sky-600 font-bold"><img src="/logogif.gif" class="xl:w-10 xl:h-10 w-6 h-6"> TrustLock</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 text-neutral-400">
        <li in:fade={{ duration: 200 }} class="hover:bg-neutral-600 rounded-xl hover:text-blue-400 transition ease-in-out"><a href="/tlx">TLX Token</a></li>
        <li in:fade={{ duration: 200, delay: 400 }} class="hover:bg-neutral-600 rounded-xl hover:text-blue-400 transition ease-in-out"><a href="/pricing">Pricing</a></li>
        <li in:fade={{ duration: 200, delay: 600 }} class="hover:bg-neutral-600 rounded-xl hover:text-blue-400 transition ease-in-out"><a href="/roadmap">Roadmap</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="xl:visible md:invisible invisible" href="https://arbitrum.io/" target="_blank" rel="noreferrer" ><img src="/arblogo.png" alt="" class="xl:visible md:invisible invisible  btn rounded-md mx-2 border border-1"></a>
      <a href="/lock" class="btn ">Launch Dapp</a>
    </div>
  </div>

