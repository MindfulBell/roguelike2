webpackHotUpdate(0,{

/***/ 35:
/*!*****************************************!*\
  !*** ./src/client/app/actions/index.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RESET_HERO = exports.NEW_POSITION = exports.LEVEL_UP = exports.GAIN_XP = exports.DMG_HERO = exports.PICKUP_WEAPON = exports.PICKUP_POTION = exports.MOVE_HERO = exports.NEW_LEVEL = exports.HIT_ENEMY = exports.REMOVE_ITEM = undefined;
	exports.removeItem = removeItem;
	exports.hitEnemy = hitEnemy;
	exports.newLevel = newLevel;
	exports.moveHero = moveHero;
	exports.pickupPotion = pickupPotion;
	exports.pickupWeapon = pickupWeapon;
	exports.dmgHero = dmgHero;
	exports.gainXP = gainXP;
	exports.levelUp = levelUp;
	exports.newPosition = newPosition;
	exports.resetHero = resetHero;
	
	var _board = __webpack_require__(/*! ../reducers/board.js */ 101);
	
	var _index = __webpack_require__(/*! ../utils/index.js */ 56);
	
	function buildBoard(board) {
	  var currentStage = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	  var hp1 = arguments.length <= 2 || arguments[2] === undefined ? 9 : arguments[2];
	  var hp2 = arguments.length <= 3 || arguments[3] === undefined ? 16 : arguments[3];
	  var weapon = arguments.length <= 4 || arguments[4] === undefined ? { name: 'Club of Cockiness', att: 5 } : arguments[4];
	  var enemylvl = arguments.length <= 5 || arguments[5] === undefined ? 1 : arguments[5];
	  var lastLevel = arguments.length <= 6 || arguments[6] === undefined ? false : arguments[6];
	
	  var cells = [];
	  var counter = 0;
	  for (var y = 0; y < 30; y++) {
	    var row = [];
	    for (var x = 0; x < 50; x++) {
	      counter++;
	      var cell = {
	        position: [x, y],
	        enemy: false,
	        potion: false,
	        weapon: false,
	        stairs: false,
	        hero: false,
	        wall: true,
	        boss: false,
	        currentStage: currentStage
	      };
	      // based on imported generated dungeon board, if item is a 0, it is a room
	      if (board[counter] !== 0) {
	        cell.wall = false;
	      }
	      row.push(cell);
	    }
	    cells.push(row);
	  }
	  cells = addPotions(cells, hp1, hp2);
	  cells = addWeapon(cells, weapon);
	  cells = addEnemies(cells, enemylvl, lastLevel);
	  if (!lastLevel) {
	    cells = addStairs(cells);
	  } else if (lastLevel) {
	    cells = addBoss(cells);
	  }
	
	  return cells;
	}
	
	function addPotions(board, hp1, hp2) {
	  var tempBoard = board;
	  var potionCount = 4;
	
	  var _loop = function _loop() {
	    var x = (0, _index.randomInclusive)(0, 49);
	    var y = (0, _index.randomInclusive)(0, 29);
	    var potion = (0, _index.randomInclusive)(hp1, hp2);
	    var newBoard = tempBoard.map(function (row) {
	      return row.map(function (cell) {
	        if (cell.position[0] === x && cell.position[1] === y && !cell.wall) {
	          potionCount--;
	          return Object.assign({}, cell, { potion: potion });
	        } else {
	          return cell;
	        }
	      });
	    });
	    tempBoard = newBoard;
	  };
	
	  while (potionCount > 0) {
	    _loop();
	  }
	  return tempBoard;
	}
	
	function addWeapon(board, weapon) {
	  var newBoard = [];
	  var foundSpot = false;
	
	  var _loop2 = function _loop2() {
	    var x = (0, _index.randomInclusive)(0, 49);
	    var y = (0, _index.randomInclusive)(0, 29);
	    newBoard = board.map(function (row) {
	      return row.map(function (cell) {
	        if (cell.position[0] === x && cell.position[1] === y && !cell.wall && !cell.potion) {
	          foundSpot = true;
	          return Object.assign({}, cell, { weapon: weapon });
	        } else {
	          return cell;
	        }
	      });
	    });
	  };
	
	  while (!foundSpot) {
	    _loop2();
	  }
	  return newBoard;
	}
	
	function addEnemies(board, enemylvl) {
	  var tempBoard = board;
	  var enemyCount = 6;
	
	  var _loop3 = function _loop3() {
	    var x = (0, _index.randomInclusive)(0, 49);
	    var y = (0, _index.randomInclusive)(0, 29);
	    var enemyhp = 0;
	    switch (enemylvl) {
	      case 1:
	        enemyhp = (0, _index.randomInclusive)(12, 19);
	        break;
	      case 2:
	        enemyhp = (0, _index.randomInclusive)(19, 28);
	        break;
	      case 3:
	        enemyhp = (0, _index.randomInclusive)(28, 35);
	        break;
	      case 4:
	        enemyhp = (0, _index.randomInclusive)(35, 40);
	        break;
	    }
	    var enemy = { lvl: enemylvl, hp: enemyhp, xp: (0, _index.randomInclusive)(6, 10) };
	
	    var newBoard = tempBoard.map(function (row) {
	      return row.map(function (cell) {
	        if (cell.position[0] === x && cell.position[1] === y && !cell.wall && !cell.potion && !cell.weapon) {
	          enemyCount--;
	          return Object.assign({}, cell, { enemy: enemy });
	        } else {
	          return cell;
	        }
	      });
	    });
	    tempBoard = newBoard;
	  };
	
	  while (enemyCount > 0) {
	    _loop3();
	  }
	  return tempBoard;
	}
	
	function addStairs(board) {
	  // if last level...no staircase!!!
	  var newBoard = [];
	  var foundSpot = false;
	
	  var _loop4 = function _loop4() {
	    var x = (0, _index.randomInclusive)(0, 49);
	    var y = (0, _index.randomInclusive)(0, 29);
	    newBoard = board.map(function (row) {
	      return row.map(function (cell) {
	        if (cell.position[0] === x && cell.position[1] === y && !cell.wall && !cell.potion && !cell.weapon && !cell.enemy) {
	          foundSpot = true;
	          return Object.assign({}, cell, { stairs: true });
	        } else {
	          return cell;
	        }
	      });
	    });
	  };
	
	  while (!foundSpot) {
	    _loop4();
	  }
	  return newBoard;
	}
	
	function addBoss(board) {
	  var newBoard = [];
	  var foundSpot = false;
	
	  var _loop5 = function _loop5() {
	    var x = (0, _index.randomInclusive)(0, 49);
	    var y = (0, _index.randomInclusive)(0, 29);
	    var bossObj = {
	      enemy: { lvl: 5, hp: 150 },
	      boss: true
	    };
	    newBoard = board.map(function (row) {
	      return row.map(function (cell) {
	        if (cell.position[0] === x && cell.position[1] === y && !cell.wall && !cell.potion) {
	          foundSpot = true;
	          return Object.assign({}, cell, bossObj);
	        } else {
	          return cell;
	        }
	      });
	    });
	  };
	
	  while (!foundSpot) {
	    _loop5();
	  }
	  return newBoard;
	}
	
	// set boards for each level that get increasingly difficult
	var board1 = buildBoard(_board.level1);
	var board2 = buildBoard(_board.level2, 2, 18, 25, _board.weapon2, 2);
	var board3 = buildBoard(_board.level3, 3, 25, 30, _board.weapon3, 3);
	var board4 = buildBoard(_board.level4, 4, 30, 35, _board.weapon4, 4, true);
	
	/* LAYOUT ACTIONS */
	
	var REMOVE_ITEM = exports.REMOVE_ITEM = 'REMOVE_WEAPON';
	function removeItem(position) {
	  return {
	    type: REMOVE_ITEM,
	    position: position,
	    cell: {
	      potion: false,
	      weapon: false
	    }
	  };
	}
	
	var HIT_ENEMY = exports.HIT_ENEMY = 'HIT_ENEMY';
	function hitEnemy(position, ene, newHP) {
	  return {
	    type: HIT_ENEMY,
	    position: position,
	    hit: {
	      enemy: {
	        hp: newHP,
	        lvl: ene.lvl,
	        xp: ene.xp
	
	      }
	    },
	    dead: {
	      enemy: false,
	      boss: false
	    }
	  };
	}
	
	var NEW_LEVEL = exports.NEW_LEVEL = 'NEW_LEVEL';
	function newLevel(num) {
	  var newBoard = [];
	  switch (num) {
	    case 2:
	      newBoard = board2;
	      break;
	    case 3:
	      newBoard = board3;
	      break;
	    case 4:
	      newBoard = board4;
	      break;
	    default:
	      newBoard = board1;
	      break;
	  }
	  return {
	    type: NEW_LEVEL,
	    newBoard: newBoard
	  };
	}
	
	/* HERO ACTIONS */
	
	var MOVE_HERO = exports.MOVE_HERO = 'MOVE_HERO';
	function moveHero(newPos) {
	  return {
	    type: MOVE_HERO,
	    position: newPos
	  };
	}
	
	var PICKUP_POTION = exports.PICKUP_POTION = 'PICKUP_POTION';
	function pickupPotion(amt) {
	  return {
	    type: PICKUP_POTION,
	    hp: amt
	  };
	}
	
	var PICKUP_WEAPON = exports.PICKUP_WEAPON = 'PICKUP_WEAPON';
	function pickupWeapon(weapon) {
	  return {
	    type: PICKUP_WEAPON,
	    weapon: weapon
	  };
	}
	
	var DMG_HERO = exports.DMG_HERO = 'DMG_HERO';
	function dmgHero(hp) {
	  return {
	    type: DMG_HERO,
	    hp: hp
	  };
	}
	
	var GAIN_XP = exports.GAIN_XP = 'GAIN_XP';
	function gainXP(xp) {
	  return {
	    type: GAIN_XP,
	    xp: xp
	  };
	}
	
	var LEVEL_UP = exports.LEVEL_UP = 'LEVEL_UP';
	function levelUp(lvl, hp) {
	  return {
	    type: LEVEL_UP,
	    lvl: lvl,
	    hp: hp
	  };
	}
	
	var NEW_POSITION = exports.NEW_POSITION = 'NEW_POSITION';
	function newPosition() {
	  return {
	    type: NEW_POSITION,
	    position: [5, 20]
	  };
	}
	
	var RESET_HERO = exports.RESET_HERO = 'RESET_HERO';
	function resetHero() {
	  return {
	    type: RESET_HERO
	  };
	}

/***/ }

})
//# sourceMappingURL=0.e590d354435122e58c59.hot-update.js.map