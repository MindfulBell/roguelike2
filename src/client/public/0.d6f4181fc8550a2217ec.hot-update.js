webpackHotUpdate(0,{

/***/ 102:
/*!*************************************************!*\
  !*** ./src/client/app/reducers/hero-reducer.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_HERO_STATE : arguments[0];
	    var action = arguments[1];
	
	    switch (action.type) {
	        case _index.MOVE_HERO:
	            return Object.assign({}, state, { position: action.position });
	        case _index.PICKUP_WEAPON:
	            return Object.assign({}, state, { weapon: action.weapon });
	        case _index.PICKUP_POTION:
	        case _index.DMG_HERO:
	            return Object.assign({}, state, { hp: action.hp });
	        case _index.GAIN_XP:
	            return Object.assign({}, state, { xp: action.xp });
	        case _index.LEVEL_UP:
	            return Object.assign({}, state, { level: action.lvl }, { hp: action.hp });
	        case _index.NEW_POSITION:
	            return Object.assign({}, state, { position: action.position });
	        case _index.RESET_HERO:
	            return Object.assign({}, state, INITIAL_HERO_STATE);
	    }
	    return state;
	};
	
	var _index = __webpack_require__(/*! ../actions/index.js */ 35);
	
	var INITIAL_HERO_STATE = {
	    level: 1,
	    hp: 50,
	    weapon: { name: 'Cheese Grater of Grateness', att: 5 },
	    position: [4, 20],
	    xp: 0
	};

/***/ }

})
//# sourceMappingURL=0.d6f4181fc8550a2217ec.hot-update.js.map