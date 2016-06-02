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
	function Cell() {
	
	    var style = {};
	    if (this.props.hidden) {
	        style = { backgroundColor: 'black' };
	    } else if (this.props.hero) {
	        style = { backgroundColor: 'blue' };
	    } else if (this.props.potion) {
	        style = { backgroundColor: 'green' };
	    } else if (this.props.weapon) {
	        style = { backgroundColor: 'orange' };
	    } else if (this.props.boss) {
	        style = { backgroundColor: 'yellow' };
	    } else if (this.props.enemy) {
	        style = { backgroundColor: 'red' };
	    } else if (this.props.stairs) {
	        style = { backgroundColor: 'purple' };
	    } else if (this.props.room) {
	        style = { backgroundColor: 'white' };
	    }
	
	    return React.createElement('div', { className: 'cell', style: style });
	}

/***/ }

})
//# sourceMappingURL=0.b525a2710cce96541ead.hot-update.js.map