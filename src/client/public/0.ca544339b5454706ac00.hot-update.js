webpackHotUpdate(0,{

/***/ 104:
/*!***************************************************!*\
  !*** ./src/client/app/reducers/layout-reducer.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	
	    case _index.REMOVE_ITEM:
	      return state.map(function (row) {
	        return row.map(function (cell) {
	          if (findCellMatch(cell, action)) {
	            return Object.assign({}, cell, action.cell);
	          } else {
	            return cell;
	          }
	        });
	      });
	
	    case _index.HIT_ENEMY:
	      return state.map(function (row) {
	        return row.map(function (cell) {
	          if (findCellMatch(cell, action)) {
	            // did we damage it enough to kill it? change presence of enemy to false;
	            // else, just reduce its hp to new hp value
	            var newHP = action.hit.enemy.hp;
	            return newHP <= 0 ? Object.assign({}, cell, action.dead) : Object.assign({}, cell, action.hit);
	          } else {
	            return cell;
	          }
	        });
	      });
	
	    case _index.NEW_LEVEL:
	      return action.newBoard;
	
	    default:
	      return state;
	  }
	};
	
	var _index = __webpack_require__(/*! ../actions/index.js */ 35);
	
	function findCellMatch(cell, action) {
	
	  var cellX = cell.position[0];
	  var cellY = cell.position[1];
	  var newCellX = action.position[0];
	  var newCellY = action.position[1];
	
	  return cellX === newCellX && cellY === newCellY;
	}

/***/ }

})
//# sourceMappingURL=0.ca544339b5454706ac00.hot-update.js.map