<script>
	import { fade, fly } from 'svelte/transition';
  </script>
<section in:fade>
<footer in:fly={{ y: 20, duration: 800, delay: 1400 }} class="xl:w-1/2 mx-auto footer text-neutral-500 items-center p-4 bg-gradient-to-t from-cyan-100/10 to-black/20 border-t border-slate-500 rounded-xl shadow-sm shadow-black/50">
	<div class="items-center grid-flow-col">
		<img src="/logostatic.png" alt="logo" class="w-10 h-10">
		<p class="xl:text-md md:text-md text-xs">Copyright © 2023 - All right reserved</p>
	</div>
	<div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end justify-self-center">
		<a href="https://twitter.com/trustlockLP" target="_blank" rel="noreferrer" class="hover:scale-125 transition ease-in hover:saturate-200"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				class="fill-current"
				><path
					d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
				/></svg
			>
		</a>
		<!-- svelte-ignore a11y-missing-attribute -->
		<a class="hover:scale-125 transition ease-in hover:saturate-200 "
			><label for="my-modal-4" class="cursor-pointer"><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				class="fill-current"
				><path
					d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
				/></svg
			></label></a
		>
		<a href="https://t.me/trustlock" target="_blank" rel="noreferrer" class="hover:scale-125 transition ease-in hover:saturate-200"
			>
			<svg width="24px" height="24px" version="1.1" class="fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path id="telegram-1" d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"/></svg>
			</a
		>
		<a href="Lite-Paper-v1.pdf" target="_blank" rel="noreferrer" class="hover:scale-125 transition ease-in hover:saturate-200"
			>
			<svg width="24px" height="24px" class="fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
			viewBox="0 0 512 512" xml:space="preserve">
	   <g>
		   <g>
			   <polygon points="445.494,406.856 344.886,471.093 51.868,471.093 0,504.21 335.098,504.21 487.573,406.856 		"/>
		   </g>
	   </g>
	   <g>
		   <g>
			   <polygon points="445.493,343.344 344.886,407.58 51.868,407.58 0,440.698 335.098,440.698 487.573,343.344 		"/>
		   </g>
	   </g>
	   <g>
		   <g>
			   <polygon points="425.156,135.987 90.058,135.987 176.902,233.791 512,233.791 		"/>
		   </g>
	   </g>
	   <g>
		   <g>
			   <polygon points="176.902,7.79 90.058,105.593 425.156,105.593 512,7.79 		"/>
		   </g>
	   </g>
	   <g>
		   <g>
			   <polygon points="176.902,264.185 0,377.186 335.098,377.186 512,264.185 		"/>
		   </g>
	   </g>
	   </svg>
			</a
		>

		
	</div>
</footer>
</section>
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer backdrop-blur-sm">
  <label class="xl:w-2/3 w-full border border-1 border-neutral-600 shadow-lg shadow-black/50 relative bg-black" for="">
    <video src="/arbilock.mp4" controls ><track kind="captions"/></video>
  </label>
</label>