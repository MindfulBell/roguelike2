import { MOVE_HERO, moveHero } from '../actions/index.js'

const INITIAL_HERO_STATE = {
    level: 1,
    hp: 50,
    weapon: ['fist', 5],
    position: [5,5],
    xp: 0
 };
 
 export default function (state = INITIAL_HERO_STATE, action) {
     switch (action.type) {
        case MOVE_HERO:
            return Object.assign({}, state, {position: action.position});
        // case PICKUP_WEAPON:
        // 		return Object.assign({}, state, {weapon: action.weapon});
        // case PICKUP_POTION:

        // case BATTLE: 

        // case STAIRS:

     }
     return state;
 } 