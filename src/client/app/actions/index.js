export const MOVE_HERO = 'MOVE_HERO';
export function moveHero(newPos) {
	return {
		type: MOVE_HERO,
		position: newPos
	}
}

//change to remove potion so as to pass as little info as possible  in action?
export const REMOVE_POTION = 'REMOVE_POTION';
export function removePotion(position){
	return {
		type: REMOVE_POTION,
		position,
		cell: {
		  potion: false,
		}
	}
}

export const REMOVE_WEAPON = 'REMOVE_WEAPON';
export function removeWeapon(position){
	return {
		type: REMOVE_WEAPON,
		position,
		cell: {			
		  weapon: false,
		}
	}
}

export const PICKUP_POTION = 'PICKUP_POTION';
export function pickupPotion(amt){
	return {
		type: PICKUP_POTION,
		hp: amt
	}
}

export const PICKUP_WEAPON = 'PICKUP_WEAPON';
export function pickupWeapon(weapon) {
	return {
		type: PICKUP_WEAPON,
		weapon
	}
}

//NEEDS REFACTORING!
export const HIT_ENEMY = 'HIT_ENEMY';
export function hitEnemy(position, hp){
	return {
		type: HIT_ENEMY,
		position,
		hit: {
			enemy: { hp }
		},
		dead: {
			enemy: false
		}
	}
}
