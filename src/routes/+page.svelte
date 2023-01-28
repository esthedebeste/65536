<script lang="ts">
	import Square from "../lib/Square.svelte"
	import { Direction, Game } from "../lib/game"
	import { swipe } from "svelte-gestures"
	import { onMount } from "svelte"

	let game = new Game()
	onMount(() => {
		// @ts-expect-error game not on window
		window.game = game
		// @ts-expect-error game not on window
		window.updateGame = () => (game = game)
	})

	const move = (direction: Direction) => {
		const moved = game.move_squares(direction)
		if (!game.can_move()) location.reload()
		if (!moved) return
		const empties = [...game.board.keys()].filter(index => game.board[index] === 0)
		game.board[empties[Math.floor(Math.random() * empties.length)]] = Math.random() < 0.75 ? 2 : 4
		game = game
	}

	const arrows = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"])
	const keyboard = (event: KeyboardEvent) => {
		if (!arrows.has(event.key)) return
		const direction = event.key.replace("Arrow", "")
		move(Direction[direction as "Up" | "Down" | "Left" | "Right"])
	}

	const swiped = (
		event: CustomEvent<{
			direction: "left" | "right" | "top" | "bottom"
			target: EventTarget
		}>
	) => {
		const directions = {
			left: Direction.Left,
			right: Direction.Right,
			top: Direction.Up,
			bottom: Direction.Down,
		}
		const direction = event.detail.direction
		move(directions[direction])
	}
</script>

<svelte:head>
	<title>65536 :3</title>
</svelte:head>
<svelte:window on:keydown={keyboard} />

<main
	use:swipe={{
		minSwipeDistance: 5,
		timeframe: 500,
		touchAction: "none",
	}}
	on:swipe={swiped}
>
	{#each game.board as value, i}
		<Square {value} />
	{/each}
</main>

<style>
	main {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-gap: 1rem;
		height: 85vmin;
		width: 85vmin;
		border-radius: 1rem;
		padding: 1rem;
	}
</style>
