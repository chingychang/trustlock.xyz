<script>
  import Sidebar from './Sidebar.svelte';

	import '../app.css';
	import Theme from './Theme.svelte';
</script>

<!-- simple layout with top navigation to host our theme switcher -->
<div class="min-h-full">
	<nav
		class="bg-slate-200 bg-gradient-to-b dark:bg-neutral-900 dark:from-blue-900/20 border-b border-black/50 dark:border-gray-500 shadow-xl shadow-blue-900/20"
	>
		<div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div class="flex-shrink-0 flex items-center">
						<img class="h-8 w-auto block dark:hidden " src="/logogif.gif" alt="Logo" />
						<img class="h-8 w-auto hidden dark:block" src="/logogif.gif" alt="Logo" />
						<a href="/" class="ml-4 text-black/80 dark:text-white font-bold">TRUSTLOCK</a>
					</div>
				</div>
				<div class="flex items-center">
					<Theme />
				</div>
				<button
					data-drawer-target="Sidebar"
					data-drawer-toggle="Sidebar"
					aria-controls="Sidebar"
					type="button"
					class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				>
					<span class="sr-only">Open sidebar</span>
					<svg
						class="w-5 h-5"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clip-rule="evenodd"
							fill-rule="evenodd"
							d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</nav>
</div>

