export const MOVE_HERO = 'MOVE_HERO';
export function moveHero(newPos) {
	return {
		type: MOVE_HERO,
		position: newPos
	}
}

export const REMOVE_ITEM = 'REMOVE_ITEM';
export function removeItem(position){
	return {
		type: REMOVE_ITEM,
		cell: {
			position: position,
    	enemy: false,
	    potion: false,
	    weapon: false,
	    stairs: false,
	    hero: false, // need to inject his position from the hero reducer?
	    wall: false
	  }
	}
}

