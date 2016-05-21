import { MOVE_HERO, PICKUP_POTION, PICKUP_WEAPON, DMG_HERO, GAIN_XP, LEVEL_UP } from '../actions/index.js'

const INITIAL_HERO_STATE = {
    level: 1,
    hp: 50,
    weapon: {name: 'fist', att: 5},
    position: [5,5],
    xp: 0,
 };
 
 //XP Thresholds: 50, 110, 160
 
 export default function (state = INITIAL_HERO_STATE, action) {
     switch (action.type) {
        case MOVE_HERO:
            return Object.assign({}, state, {position: action.position});
        case PICKUP_WEAPON:
            return Object.assign({}, state, {weapon: action.weapon});
        case PICKUP_POTION:
            return Object.assign({}, state, {hp: action.hp});
        case DMG_HERO:
            return Object.assign({}, state, {hp: action.hp})
        case GAIN_XP: 
            return Object.assign({}, state, {xp: action.xp})
        case LEVEL_UP:
            return Object.assign({}, state, {lvl: action.lvl}, {hp: action.hp})

        // case STAIRS:

     }
     return state;
 } 