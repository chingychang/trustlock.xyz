<script>
	import '../app.css';
	import { onMount } from 'svelte';

	/**
	 * @type {any}
	 */
	let baseTokenPriceUsd;

	onMount(async () => {
		const response = await fetch(
			'https://api.geckoterminal.com/api/v2/networks/arbitrum/pools/0x96ea8a925d8c4b65b7a6c08923dd8ad089473394'
		);
		const data = await response.json();
		baseTokenPriceUsd = data.data.attributes.base_token_price_usd;
	});
</script>

<aside
	id="Sidebar"
	class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-black/40 dark:border-gray-500 shadow-xl shadow-blue-900/50"
	aria-label="Sidebar"
>
	<div
		class="h-full px-3 py-4 overflow-y-auto bg-gray-50 bg-gradient-to-b dark:bg-neutral-900 dark:from-blue-900/10 "
	>
		<a href="/home" class="flex items-center pl-2.5 mb-5 ">
			<img src="/logostatic.png" class="h-6 mr-3 sm:h-7 " alt="Logo" />
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white "
				>TRUSTLOCK <code class="text-xs font-extralight animate-pulse text-blue-400 dark:text-blue-300">v1.2</code></span
			>
		</a>
		<hr class="border-1 border-black/50 dark:border-gray-500 pb-4" />
		<ul class="space-y-2">
			<li>
				<a
					href="/home"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
							clip-rule="evenodd"
						/></svg
					>
					<span class="flex-1 ml-3 whitespace-nowrap">Home</span>
				</a>
			</li>
			<li>
				<a
					href="/explorer"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						aria-hidden="true"
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path
							d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
						/></svg
					>
					<span class="ml-3">Project Explorer</span>
				</a>
			</li>
			
			<li>
				<a
					href="/lock"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
							clip-rule="evenodd"
						/></svg
					>
					<span class="flex-1 ml-3 whitespace-nowrap">Lock Liquidity</span>
				</a>
			</li>
			<li>
				<a
					href="/withdraw"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
						/><path
							d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
						/></svg
					>
					<span class="flex-1 ml-3 whitespace-nowrap">Withdraw LP</span>
				</a>
			</li>

			<li>
				<a
					href="#"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/></svg
					>
					<span class="flex-1 ml-3 whitespace-nowrap">Launchpad</span>
					<span
						class="inline-flex animate-pulse items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
						>BETA</span
					>
				</a>
			</li>
			
			<li>
				<a
					href="/Lite-Paper-v1.pdf"
					target="_blank"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						enable-background="new 0 0 128 128"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
						><path d="m17 22v-8h-4v2h2v6h-3v2h8v-2z"/><path d="m16 8a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0 -1.5-1.5z"/><path d="m16 30a14 14 0 1 1 14-14 14 14 0 0 1 -14 14zm0-26a12 12 0 1 0 12 12 12 12 0 0 0 -12-12z"/><path d="m0 0h32v32h-32z" fill="none"/></svg>
					
					<span class="flex-1 ml-3 whitespace-nowrap">Support</span>
				</a>
			</li>
			<li>
				<a
					href="/chart"
					referrerpolicy="no-referrer"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						aria-hidden="true"
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 512 512"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="m496 384h-432v-304c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm-32-288h-118.06c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4-73.37 73.38-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0l46.06-46.07 73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97v-118.05c.01-8.84-7.15-16-15.99-16z"
						/></svg
					> <span class="ml-3">Chart</span>
				</a>
			</li>

			<li>
				<a
					href="/Lite-Paper-v1.pdf"
					target="_blank"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						enable-background="new 0 0 128 128"
						viewBox="0 0 128 128"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="m19.133.002c-1.079 0-2.151.441-2.914 1.198s-1.207 1.82-1.207 2.89v119.822c0 1.07.444 2.134 1.207 2.89.763.757 1.835 1.198 2.914 1.198h89.734c1.079 0 2.151-.441 2.914-1.198s1.207-1.82 1.207-2.89c0-30.989 0-61.977 0-92.965-.117-1.197-.552-2.405-1.271-3.114l-28.074-26.698c-.737-.696-1.742-1.106-2.76-1.126-20.56-.015-41.172-.007-61.75-.007zm4.121 8.176h53.418v22.61c0 1.07.444 2.134 1.207 2.89.763.757 1.835 1.198 2.914 1.198h23.953v84.949h-81.492zm61.66 5.66 13.53 12.862h-13.53zm-19.861 89.531h-32.657v-6.047h32.658v6.047zm30.551-15.802h-63.208v-6.047h63.209v6.047zm0-15.802h-63.208v-6.047h63.209v6.047zm0-15.803h-63.208v-6.047h63.209v6.047z"
						/></svg
					>
					<span class="flex-1 ml-3 whitespace-nowrap">Docs</span>
				</a>
			</li>
			
			<li>
				<a
					href="https://t.me/trustlock"
					target="_blank"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<img src="/telegram.svg" class="w-6 h-6" />
					<span class="flex-1 ml-3 whitespace-nowrap">Telegram</span>
				</a>
			</li>
			<li>
				<a
					href="https://twitter.com/trustlockLP"
					target="_blank"
					class="flex items-center p-2 text-base font-normal dark:hover:text-blue-400 hover:text-blue-400 transition ease-in-out delay-100 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<img src="/twitter.svg" class="w-6 h-6" />
					<span class="flex-1 ml-3 whitespace-nowrap">Twitter</span>
				</a>
			</li>
		</ul>
	</div>
	<div class="relative w-1/2 mx-auto">
		<!-- fixed bottom left corner -->
		<div
			class="absolute w-full text-sm text-black/50 dark:text-white/80 bg-slate-100 dark:bg-black/10 text-center mb-4 bottom-0 p-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 font-bold"
		>
			<img class="w-24 h-24 animate-pulse mb-3 mx-auto rounded-full shadow-lg" src="/logogif.gif" /><span
				class="text-blue-400">TLX</span
			> <code>${Number(baseTokenPriceUsd).toFixed(2)}</code>
			<a
				href="/chart"
				
				><p
					class="text-xs font-light py-1 px-4 border border-opacity-20 border-black/20 dark:border-slate-500 rounded-md cursor-pointer hover:bg-slate-300 hover:dark:bg-blue-500"
				>
					Buy Now
				</p></a
			>
		</div>
		<!-- end fixed bottom left corner -->
	</div>
</aside>
