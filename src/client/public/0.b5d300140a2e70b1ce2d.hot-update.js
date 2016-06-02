webpackHotUpdate(0,{

/***/ 100:
/*!*********************************************!*\
  !*** ./src/client/app/components/layout.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 18);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _cell = __webpack_require__(/*! ./cell.js */ 99);
	
	var _cell2 = _interopRequireDefault(_cell);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 57);
	
	var _index = __webpack_require__(/*! ../actions/index.js */ 35);
	
	var _redux = __webpack_require__(/*! redux */ 34);
	
	var _index2 = __webpack_require__(/*! ../utils/index.js */ 56);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Layout = function (_Component) {
	  _inherits(Layout, _Component);
	
	  function Layout(props) {
	    _classCallCheck(this, Layout);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).call(this, props));
	
	    _this.state = {
	      playerDead: false,
	      bossDead: false,
	      seeAll: false
	    };
	    _this.handleKey = _this.handleKey.bind(_this);
	    _this.findNeighbors = _this.findNeighbors.bind(_this);
	    _this.getMovedTo = _this.getMovedTo.bind(_this);
	    _this.handleClick = _this.handleClick.bind(_this);
	    return _this;
	  }
	
	  _createClass(Layout, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.props.newLevel();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('keydown', this.handleKey);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('keydown', this.handleKey);
	    }
	
	    //mapping a new array of neighbors, top, left, bot, right and giving them a new prop based on direction
	
	  }, {
	    key: 'findNeighbors',
	    value: function findNeighbors() {
	      var heroPos = this.props.hero.position;
	      var layout = this.props.layout;
	      //flatten to 1d array for filtering to get small array for 4 neighbors
	      var neighbors = [];
	      for (var i = 0; i < layout.length; i++) {
	        neighbors.push.apply(neighbors, _toConsumableArray(layout[i]));
	      }
	      return neighbors.map(function (cell) {
	        var xCoord = cell.position[0];
	        var yCoord = cell.position[1];
	        if (xCoord === heroPos[0] && yCoord === heroPos[1] - 1) {
	          return Object.assign({}, cell, { top: true });
	        } else if (xCoord === heroPos[0] - 1 && yCoord === heroPos[1]) {
	          return Object.assign({}, cell, { left: true });
	        } else if (xCoord === heroPos[0] && yCoord === heroPos[1] + 1) {
	          return Object.assign({}, cell, { bot: true });
	        } else if (xCoord === heroPos[0] + 1 && yCoord === heroPos[1]) {
	          return Object.assign({}, cell, { right: true });
	        } else {
	          return cell;
	        }
	      }).filter(function (cell) {
	        return cell.top || cell.left || cell.right || cell.bot;
	      });
	    }
	  }, {
	    key: 'getMovedTo',
	    value: function getMovedTo(neighbors, pos) {
	      for (var i = 0; i < neighbors.length; i++) {
	        for (var prop in neighbors[i]) {
	          var X = neighbors[i][prop][0];
	          var Y = neighbors[i][prop][1];
	          if (X === pos[0] && Y === pos[1]) {
	            return neighbors[i];
	          }
	        }
	      }
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      this.setState({ seeAll: !this.state.seeAll });
	    }
	  }, {
	    key: 'handleKey',
	    value: function handleKey(e) {
	      e.preventDefault();
	      if (!this.state.playerDead && !this.state.bossDead) {
	        var heroPos = this.props.hero.position;
	        var neighbors = this.findNeighbors();
	
	        // MOVEMENT
	        // Get the x,y of the space we are moving to
	        var move = [];
	        switch (e.keyCode) {
	          case 37:
	            //left
	            move = [heroPos[0] - 1, heroPos[1]];
	            break;
	          case 38:
	            //top
	            move = [heroPos[0], heroPos[1] - 1];
	            break;
	          case 39:
	            //right
	            move = [heroPos[0] + 1, heroPos[1]];
	            break;
	          case 40:
	            //bot
	            move = [heroPos[0], heroPos[1] + 1];
	            break;
	          default:
	            move = [heroPos[0], heroPos[1]];
	            break;
	        }
	
	        // get the cell object you are moving to
	        var movingTo = this.getMovedTo(neighbors, move);
	
	        //based on what it is, do various things
	        if (movingTo !== undefined) {
	          if (!movingTo.wall && !movingTo.enemy) {
	            this.props.moveHero(move);
	            if (movingTo.potion) {
	              var hp = this.props.hero.hp + movingTo.potion;
	              this.props.removeItem(move);
	              this.props.healHero(hp);
	            } else if (movingTo.weapon) {
	              this.props.removeItem(move);
	              this.props.getWeaponHero(movingTo.weapon);
	            } else if (movingTo.stairs) {
	              switch (movingTo.currentStage) {
	
	                case 1:
	                  this.props.newLevel(2);
	                  break;
	                case 2:
	                  this.props.newLevel(3);
	                  break;
	                case 3:
	                  this.props.newLevel(4);
	                  break;
	                default:
	                  this.props.newLevel(1);
	                  break;
	              }
	              this.props.newPosition();
	            }
	          } else if (movingTo.enemy) {
	            //HERO STATS
	
	            //hero attack is level + att of weapon
	            var hero = this.props.hero;
	            var heroAttack = hero.level + hero.weapon.att;
	            var heroHP = this.props.hero.hp;
	            var heroXP = this.props.hero.xp;
	            var heroLvl = this.props.hero.level;
	
	            // ENEMY STATS
	            var enemy = movingTo.enemy;
	            var enemyHP = enemy.hp;
	            var enemyXP = enemy.xp;
	
	            //ATTACK ENEMY
	            enemyHP -= heroAttack;
	            this.props.hitEnemy(move, enemy, enemyHP);
	
	            //ATTACK HERO
	            // enemy attack is based off level
	            var enemyAttack = 0;
	            switch (movingTo.enemy.lvl) {
	              case 1:
	                enemyAttack = (0, _index2.randomInclusive)(4, 6);
	                break;
	              case 2:
	                enemyAttack = (0, _index2.randomInclusive)(8, 10);
	                break;
	              case 3:
	                enemyAttack = (0, _index2.randomInclusive)(12, 14);
	                break;
	              case 4:
	                enemyAttack = (0, _index2.randomInclusive)(16, 18);
	                break;
	              case 5:
	                enemyAttack = (0, _index2.randomInclusive)(22, 26);
	                break;
	            }
	            heroHP -= enemyAttack;
	            this.props.dmgHero(heroHP);
	
	            // CHECK IF KILLED/HERO DEAD/XP BOOST
	            if (enemyHP <= 0 && heroHP > 0) {
	              //not dead and killed enemy, get xp
	              var totalXP = heroXP + enemyXP;
	              this.props.gainXP(totalXP);
	
	              // CHECK LEVEL UP?
	              // hitpoint boost on level up
	              var levelupHP = heroHP + 50;
	
	              //XP Thresholds: 35, 85, 120
	              if (totalXP >= 35 && totalXP < 85 && heroLvl === 1) {
	                this.props.levelUp(2, levelupHP);
	              }
	              if (totalXP >= 85 && totalXP < 120 && heroLvl === 2) {
	                this.props.levelUp(3, levelupHP);
	              }
	              if (totalXP >= 120 && heroLvl === 3) {
	                this.props.levelUp(4, levelupHP);
	              }
	              if (movingTo.boss) {
	                this.setState({ bossDead: true });
	              }
	            } else if (heroHP <= 0) {
	              //set local state as a flag 'hero dead' to add some div message
	              this.setState({ playerDead: true });
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      // building the map, pulled layout from global state/redux
	      var xpStatus = 0;
	      var heroXP = this.props.hero.xp;
	      switch (this.props.hero.level) {
	        case 1:
	          xpStatus = heroXP + ' / 35';
	          break;
	        case 2:
	          xpStatus = heroXP + ' / 85';
	          break;
	        case 3:
	          xpStatus = heroXP + ' / 120';
	          break;
	        case 4:
	          xpStatus = 'MAX';
	        default:
	          xpStatus = 'Test';
	      }
	      var cells = this.props.layout.map(function (row, rowNum) {
	        return row.map(function (cell, cellNum) {
	          var heroPos = _this2.props.hero.position;
	          // if within hero sight radius
	          if (!_this2.state.seeAll && (cellNum <= heroPos[0] - 5 || cellNum >= heroPos[0] + 5 || rowNum <= heroPos[1] - 5 || rowNum >= heroPos[1] + 5)) {
	            return _react2.default.createElement(_cell2.default, { key: cellNum + rowNum, hidden: true });
	          }
	          // if hero
	          else if (rowNum === heroPos[1] && cellNum === heroPos[0]) {
	              return _react2.default.createElement(_cell2.default, { key: cellNum + rowNum, hero: true });
	            }
	            // if potion
	            else if (cell.potion !== false) {
	                return _react2.default.createElement(_cell2.default, { key: cellNum + rowNum, potion: true });
	              }
	              // if weapon
	              else if (cell.weapon !== false) {
	                  return _react2.default.createElement(_cell2.default, { key: cellNum + rowNum, weapon: true });
	                }
	                // if boss
	                else if (cell.boss !== false) {
	                    return _react2.default.createElement(_cell2.default, { key: cellNum + rowNum, boss: true });
	                  }
	                  // if enemy
	                  else if (cell.enemy !== false) {
	                      return _react2.default.createElement(_cell2.default, { key: cellNum + rowNum, enemy: true });
	                    }
	                    // if stairs
	                    else if (cell.stairs) {
	                        return _react2.default.createElement(_cell2.default, { key: cellNum + rowNum, stairs: true });
	                      } else if (!cell.wall) {
	                        return _react2.default.createElement(_cell2.default, { key: cellNum + rowNum, room: true });
	                      } else {
	                        return _react2.default.createElement(_cell2.default, { key: cellNum + rowNum, wall: true });
	                      }
	        });
	      });
	
	      var message = this.state.playerDead ? 'YOU DIED!' : 'YOU WON!';
	
	      var messageDiv = _react2.default.createElement(
	        'div',
	        {
	          className: 'messageDiv',
	          style: this.state.playerDead || this.state.bossDead ? { opacity: 1 } : { opacity: 0 } },
	        _react2.default.createElement(
	          'h4',
	          null,
	          message
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'see-button',
	            style: { margin: '0 auto' },
	            onClick: this.handleRestart },
	          _react2.default.createElement('i', { className: 'fa fa-2x fa-refresh', 'aria-hidden': 'true' })
	        )
	      );
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'stats-and-key' },
	          _react2.default.createElement(
	            'div',
	            { className: 'player-stats', style: { backgroundColor: 'white' } },
	            _react2.default.createElement(
	              'h2',
	              null,
	              'Hero Stats'
	            ),
	            _react2.default.createElement(
	              'h4',
	              null,
	              _react2.default.createElement(
	                'span',
	                { className: 'stat-name' },
	                'Level'
	              ),
	              ': ',
	              this.props.hero.level
	            ),
	            _react2.default.createElement(
	              'h4',
	              null,
	              _react2.default.createElement(
	                'span',
	                { className: 'stat-name' },
	                'Health'
	              ),
	              ': ',
	              this.props.hero.hp
	            ),
	            _react2.default.createElement(
	              'h4',
	              null,
	              _react2.default.createElement(
	                'span',
	                { className: 'stat-name' },
	                'Weapon'
	              ),
	              ': ',
	              this.props.hero.weapon.name
	            ),
	            _react2.default.createElement(
	              'h4',
	              null,
	              _react2.default.createElement(
	                'span',
	                { className: 'stat-name' },
	                'Experience'
	              ),
	              ': ',
	              xpStatus,
	              ' '
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'key', style: { backgroundColor: 'white' } },
	            _react2.default.createElement(
	              'h2',
	              { style: { textAlign: 'center' } },
	              'Key'
	            ),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement('div', { className: 'key-cell', style: { backgroundColor: 'green' } }),
	              ' = Potion '
	            ),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement('div', { className: 'key-cell', style: { backgroundColor: 'orange' } }),
	              ' = Weapon '
	            ),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement('div', { className: 'key-cell', style: { backgroundColor: 'red' } }),
	              ' = Enemy '
	            ),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement('div', { className: 'key-cell', style: { backgroundColor: 'yellow' } }),
	              ' = Boss '
	            ),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement('div', { className: 'key-cell', style: { backgroundColor: 'purple' } }),
	              ' = Stairs '
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'see-all' },
	          _react2.default.createElement(
	            'div',
	            { className: 'see-button', style: { margin: '0 auto' }, onClick: this.handleClick },
	            _react2.default.createElement('i', { className: 'fa fa-2x fa-lightbulb-o', 'aria-hidden': 'true' })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'board-holder' },
	          messageDiv,
	          _react2.default.createElement(
	            'div',
	            { className: 'board' },
	            cells
	          )
	        )
	      );
	    }
	  }]);
	
	  return Layout;
	}(_react.Component);
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    layout: state.layout,
	    hero: state.hero
	  };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    moveHero: function moveHero(newPos) {
	      dispatch((0, _index.moveHero)(newPos));
	    },
	    removeItem: function removeItem(position) {
	      dispatch((0, _index.removeItem)(position));
	    },
	    healHero: function healHero(amt) {
	      dispatch((0, _index.pickupPotion)(amt));
	    },
	    getWeaponHero: function getWeaponHero(weapon) {
	      dispatch((0, _index.pickupWeapon)(weapon));
	    },
	    hitEnemy: function hitEnemy(position, ene, hp) {
	      dispatch((0, _index.hitEnemy)(position, ene, hp));
	    },
	    dmgHero: function dmgHero(hp) {
	      dispatch((0, _index.dmgHero)(hp));
	    },
	    gainXP: function gainXP(xp) {
	      dispatch((0, _index.gainXP)(xp));
	    },
	    levelUp: function levelUp(lvl, hp) {
	      dispatch((0, _index.levelUp)(lvl, hp));
	    },
	    newLevel: function newLevel(num) {
	      dispatch((0, _index.newLevel)(num));
	    },
	    newPosition: function newPosition() {
	      dispatch((0, _index.newPosition)());
	    }
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Layout);

/***/ }

})
//# sourceMappingURL=0.b5d300140a2e70b1ce2d.hot-update.js.map