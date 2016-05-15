import { combineReducers } from 'redux';
import HeroReducer from './hero-reducer';
import LayoutReducer from './layout-reducer';

const rootReducer = combineReducers({
	hero: HeroReducer,
	layout: LayoutReducer
})

export default rootReducer;