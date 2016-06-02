webpackHotUpdate(0,{

/***/ 99:
/*!*******************************************!*\
  !*** ./src/client/app/components/cell.js ***!
  \*******************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Cell;
	function Cell(props) {
	
	    var style = {};
	    if (props.hidden) {
	        style = { backgroundColor: 'black' };
	    } else if (props.hero) {
	        style = { backgroundColor: 'blue' };
	    } else if (props.potion) {
	        style = { backgroundColor: 'green' };
	    } else if (props.weapon) {
	        style = { backgroundColor: 'orange' };
	    } else if (props.boss) {
	        style = { backgroundColor: 'yellow' };
	    } else if (props.enemy) {
	        style = { backgroundColor: 'red' };
	    } else if (props.stairs) {
	        style = { backgroundColor: 'purple' };
	    } else if (props.room) {
	        style = { backgroundColor: 'white' };
	    }
	
	    return React.createElement('div', { className: 'cell', style: style });
	}

/***/ }

})
//# sourceMappingURL=0.075cae2841c7feaa1d37.hot-update.js.map