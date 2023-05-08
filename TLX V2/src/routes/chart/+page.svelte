<script>
	import { fade, fly, blur } from 'svelte/transition';
</script>
<svelte:head
	><title>Trust Lock | TLX Chart</title>
	</svelte:head
>
<body in:blur>
	<div in:fade class="w-4/5 mx-auto">
		<div
			id="rubic-widget-root"
			class="w-full mx-auto rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 backdrop-blur-sm border border-gray-300 dark:border-neutral-800"
		/>
	</div>
	
	<div in:fade
		class="w-full mx-auto my-6 rounded bg-slate-50 shadow-lg shadow-blue-900/10 dark:bg-blue-900/10 backdrop-blur-sm border border-gray-300 dark:border-neutral-800"
	>
		<style>
			#dexscreener-embed {
				position: relative;
				width: 100%;
				height: 100%;
			}
			@media (min-width: 1400px) {
				#dexscreener-embed {
					padding-bottom: 34%;
				}
			}
			#dexscreener-embed iframe {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				border: 0;
			}
		</style>
		<div in:fade id="dexscreener-embed" class="rounded">
			<iframe
				src="https://dexscreener.com/arbitrum/0x96ea8a925D8c4b65B7a6c08923dd8ad089473394?embed=1&theme=dark"
			/>
		</div>
        <div in:blur={{delay: 300}} class="w-full text-center mx-auto my-2">
        <a in:fade={{delay: 200}}
		href="https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x2468400e2520b6Fb3612612bA571554521B0318E&chainId=42161"
		target="_blank"
		referrerpolicy="no-referrer"
		class="text-semibold text-blue-500 underline text-center mt-4">Prefer SushiSwap? Click Here!</a
	></div>
	</div>
	<script defer type="text/javascript">
		// describe widget configuration and saving to a global variable for future use
		var configuration = {
			from: 'ETH',
			to: '0x2468400e2520b6fb3612612ba571554521b0318e',
			fromChain: 'ARBITRUM',
			toChain: 'ARBITRUM',
			amount: 1,
			iframe: 'flex',
			hideSelectionFrom: false,
			hideSelectionTo: true,
			tokenSearch: true,
			rubicLink: true,
			theme: 'dark',
			background: '#28372e',
			injectTokens: {
				arbitrum: ['0x2468400e2520b6fb3612612ba571554521b0318e']
			},
			slippagePercent: {
				instantTrades: 10,
				crossChain: 15
			}
		};

		// prevent accidental changes to the object, for example, when re-creating a widget for another theme
		Object.freeze(configuration);

		// create widget
		// @ts-ignore
		rubicWidget.init(configuration);
	</script>
</body>
