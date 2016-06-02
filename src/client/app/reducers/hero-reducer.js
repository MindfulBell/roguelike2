import { MOVE_HERO, PICKUP_POTION, PICKUP_WEAPON, DMG_HERO, GAIN_XP, LEVEL_UP, NEW_POSITION, RESET_HERO } from '../actions/index.js'

const INITIAL_HERO_STATE = {
    level: 1,
    hp: 50,
    weapon: {name: 'Cheese Grater of Grateness', att: 5},
    position: [4, 20],
    xp: 0,
 };
 
 export default function (state = INITIAL_HERO_STATE, action) {
     switch (action.type) {
        case MOVE_HERO:
            return Object.assign({}, state, {position: action.position});
        case PICKUP_WEAPON:
            return Object.assign({}, state, {weapon: action.weapon});
        case PICKUP_POTION:
        case DMG_HERO:
            return Object.assign({}, state, {hp: action.hp});
        case GAIN_XP: 
            return Object.assign({}, state, {xp: action.xp});
        case LEVEL_UP:
            return Object.assign({}, state, {level: action.lvl}, {hp: action.hp})
        case NEW_POSITION:
            return Object.assign({}, state, {position: action.position})
        case RESET_HERO: 
            return Object.assign({}, state, INITIAL_HERO_STATE)
     }
     return state;
 } 