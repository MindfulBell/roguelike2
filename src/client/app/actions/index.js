export const MOVE_HERO = 'MOVE_HERO';
export function moveHero(newPos) {
	return {
		type: MOVE_HERO,
		position: newPos
	}
}