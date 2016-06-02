webpackHotUpdate(0,{

/***/ 99:
/*!*******************************************!*\
  !*** ./src/client/app/components/cell.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Cell;
	
	var _react = __webpack_require__(/*! react */ 18);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	    return _react2.default.createElement('div', { className: 'cell', style: style });
	}

/***/ }

})
//# sourceMappingURL=0.222b48d584d7b51f71e7.hot-update.js.map