export type Board = Uint32Array
export enum Direction {
	Up,
	Down,
	Left,
	Right,
}

export class Game {
	board: Board
	score: number
	constructor() {
		this.board = new Uint32Array(16).fill(0)
		this.board[Math.floor(Math.random() * 16)] = Math.random() < 0.75 ? 2 : 4
		this.score = 0
	}
	get(x: number, y: number) {
		return this.board[y * 4 + x]
	}
	set(x: number, y: number, value: number) {
		this.board[y * 4 + x] = value
	}

	move_squares(direction: Direction): boolean {
		let moved = false
		for (const yc of direction === Direction.Down ? [3, 2, 1, 0] : [0, 1, 2, 3]) {
			for (const xc of direction === Direction.Right ? [3, 2, 1, 0] : [0, 1, 2, 3]) {
				let x = xc
				let y = yc
				if (this.get(x, y) === 0) continue
				switch (direction) {
					case Direction.Up: {
						while (y > 0 && this.get(x, y - 1) === 0) {
							this.set(x, y - 1, this.get(x, y))
							this.set(x, y, 0)
							moved = true
							y -= 1
						}
						if (y > 0 && this.get(x, y - 1) === this.get(x, y)) {
							this.set(x, y - 1, this.get(x, y - 1) * 2)
							this.set(x, y, 0)
							moved = true
						}
						break
					}
					case Direction.Down: {
						while (y < 3 && this.get(x, y + 1) === 0) {
							this.set(x, y + 1, this.get(x, y))
							this.set(x, y, 0)
							moved = true
							y += 1
						}
						if (y < 3 && this.get(x, y + 1) === this.get(x, y)) {
							this.set(x, y + 1, this.get(x, y + 1) * 2)
							this.set(x, y, 0)
							moved = true
						}
						break
					}
					case Direction.Left: {
						while (x > 0 && this.get(x - 1, y) === 0) {
							this.set(x - 1, y, this.get(x, y))
							this.set(x, y, 0)
							moved = true
							x -= 1
						}
						if (x > 0 && this.get(x - 1, y) === this.get(x, y)) {
							this.set(x - 1, y, this.get(x - 1, y) * 2)
							this.set(x, y, 0)
							moved = true
						}
						break
					}
					case Direction.Right: {
						while (x < 3 && this.get(x + 1, y) === 0) {
							this.set(x + 1, y, this.get(x, y))
							this.set(x, y, 0)
							moved = true
							x += 1
						}
						if (x < 3 && this.get(x + 1, y) === this.get(x, y)) {
							this.set(x + 1, y, this.get(x + 1, y) * 2)
							this.set(x, y, 0)
							moved = true
						}
						break
					}
				}
			}
		}
		return moved
	}
	can_move(): boolean {
		for (let y = 0; y < 4; y++) {
			for (let x = 0; x < 4; x++) {
				if (this.get(x, y) === 0) return true
				if (x < 3 && this.get(x, y) === this.get(x + 1, y)) return true
				if (y < 3 && this.get(x, y) === this.get(x, y + 1)) return true
			}
		}
		return false
	}
}
