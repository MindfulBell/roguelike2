import { MOVE_HERO } from '../actions/index.js';

const INITIAL_HERO_STATE = {
    level: 1,
    hp: 50,
    weapon: ['fist', 5],
    position: [30,20]
}

export default function (state = INITIAL_HERO_STATE, action) {
    switch (action.type) {
        case MOVE_HERO:
        	return Object.assign({}, state, {position: action.position})
        	break;
        default:
        	return state;
    }
   
}