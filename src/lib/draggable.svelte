
<script>
	export let left = 0;
	export let top = 40;
	let moving = false; 
	
	function start() {
		moving = true;
	}
	
	function stop() {
		moving = false;
	}
	
	function move(e) {
			if (moving) {
				left += e.movementX;
				top += e.movementY;
			}
	}
	
	//$: console.log(moving)
</script>

<style>
	.draggable {
		user-select: none;
		position: fixed;
		border: solid 1px gray;
		cursor: move;
	}
</style>

<svelte:window on:pointerup={stop} on:pointermove={move}  />

<section on:pointerdown={start} style="left: {left}px; top: {top}px;" class="draggable">
	<slot></slot>
</section>

