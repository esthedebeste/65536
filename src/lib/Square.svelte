<script lang="ts">
	export let value: number
</script>

{#if value === 0}
	<div />
{:else}
	<div data-pow={Math.log2(value)}>{value}</div>
{/if}

<style lang="scss">
	@use "sass:math";
	div {
		border-radius: 1rem;
		border: 5px solid #0002;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 5vw;
	}
	@for $i from 1 through 20 {
		div[data-pow="#{$i}"] {
			background-color: hsl(360 - $i * 30, 100%, calc(100% - 5% * $i));
			box-shadow: 0 0 1rem hsl(360 - $i * 30, 100%, calc(100% - 5% * $i));
			@if $i > 10 {
				color: white;
			} @else {
				color: black;
			}
		}
	}
</style>
