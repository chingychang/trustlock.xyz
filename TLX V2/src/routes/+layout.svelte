<script>
	import Header from '../lib/Header.svelte';
	import Sidebar from '../lib/Sidebar.svelte';
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<Header />

<Sidebar />
<div class="p-4 sm:ml-64">
	<section class="bg-center" style="background-image:url(grid.svg)">
		<div class="p-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600">
			<slot />
		</div>
	</section>
</div>
