/* LAYOUT ACTIONS */

export const REMOVE_POTION = 'REMOVE_POTION';
export function removePotion(position){
	return {
		type: REMOVE_POTION,
		position,
		cell: {
		  potion: false,
		}
	};
}

export const REMOVE_WEAPON = 'REMOVE_WEAPON';
export function removeWeapon(position){
	return {
		type: REMOVE_WEAPON,
		position,
		cell: {			
		  weapon: false,
		}
	};
}

//NEEDS REFACTORING!
export const HIT_ENEMY = 'HIT_ENEMY';
export function hitEnemy(position, ene, newHP){
	return {
		type: HIT_ENEMY,
		position,
		hit: {
			enemy: { hp: newHP, lvl: ene.lvl, xp: ene.xp }
		},
		dead: { enemy: false }
	};
}


/* HERO ACTIONS */

export const MOVE_HERO = 'MOVE_HERO';
export function moveHero(newPos) {
	return {
		type: MOVE_HERO,
		position: newPos
	};
}

export const PICKUP_POTION = 'PICKUP_POTION';
export function pickupPotion(amt){
	return {
		type: PICKUP_POTION,
		hp: amt
	};
}

export const PICKUP_WEAPON = 'PICKUP_WEAPON';
export function pickupWeapon(weapon) {
	return {
		type: PICKUP_WEAPON,
		weapon
	};
}

export const DMG_HERO = 'DMG_HERO';
export function dmgHero(hp) {
	return {
		type: DMG_HERO,
		hp
	};
}

export const GAIN_XP = 'GAIN_XP';
export function gainXP(xp) {
	return {
		type: GAIN_XP,
		xp
	};
}

export const LEVEL_UP = 'LEVEL_UP';
export function levelUp(lvl, hp) {
	return {
		type: LEVEL_UP,
		lvl,
		hp
	};
}


