import { level1, level2, level3, level4, weapon2, weapon3, weapon4 } from '../reducers/board.js';
import { randomInclusive } from '../utils/index.js';

function buildBoard(board, currentStage = 1, hp1 = 9, hp2 = 16, weapon = {name: 'Club of Cockiness', att: 5}, enemylvl = 1, lastLevel = false) {
  let cells = [];
  let counter = 0;
  for (let y=0; y<30; y++) {
    let row = [];
    for (let x=0; x<50; x++) {
      counter++;
      let cell = {
          position: [x,y],
          enemy: false,
          potion: false,
          weapon: false,
          stairs: false,
          hero: false,
          wall: true,
          boss: false,
          currentStage
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
	}
	else if (lastLevel) {
	  cells = addBoss(cells);
	}

  return cells;
}

function addPotions(board, hp1, hp2){
  let tempBoard = board;
  let potionCount = 4;
  while (potionCount > 0) {
    let x = randomInclusive(0,49);
    let y = randomInclusive(0,29);
    let potion = randomInclusive(hp1,hp2);
    let newBoard = tempBoard.map((row) => {
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y && !cell.wall) {
          potionCount--;
          return Object.assign({}, cell, {potion});
        }
        else {
          return cell;
        }
      });
    });
    tempBoard = newBoard;
  }
  return tempBoard;
}

function addWeapon(board, weapon){
  let newBoard= [];
  let foundSpot = false;
  while (!foundSpot) {
  let x = randomInclusive(0,49);
  let y = randomInclusive(0,29);
  newBoard = board.map((row)=>{
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y && !cell.wall && !cell.potion) {
          foundSpot = true;
          return Object.assign({}, cell, {weapon})
        }
        else {
          return cell;
        }
      })
    })
  }
  return newBoard;
}

function addEnemies(board, enemylvl){
  let tempBoard = board;
  let enemyCount = 6;
  while (enemyCount > 0) {
    let x = randomInclusive(0,49);
    let y = randomInclusive(0,29);
    let enemyhp = 0;
    switch (enemylvl){
    	case 1:
    		enemyhp = randomInclusive(12,19)
    		break;
    	case 2:
    		enemyhp = randomInclusive(19,28)
    		break;
    	case 3:
    		enemyhp = randomInclusive(28,35)
    		break;
    	case 4:
    		enemyhp = randomInclusive(35,40)
    		break;
    }
    let enemy = {lvl: enemylvl, hp: enemyhp, xp: randomInclusive(6, 10)};

    let newBoard = tempBoard.map((row) => {
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y && !cell.wall && !cell.potion && !cell.weapon) {
          enemyCount--;
          return Object.assign({}, cell, {enemy});
        }
        else {
          return cell;
        }
      });
    });
    tempBoard = newBoard;
  }
  return tempBoard;
}

function addStairs(board){
  // if last level...no staircase!!!
    let newBoard= [];
    let foundSpot = false;
    while (!foundSpot) {
    let x = randomInclusive(0,49);
    let y = randomInclusive(0,29);
    newBoard = board.map((row)=>{
        return row.map((cell)=>{
          if ((cell.position[0] === x && cell.position[1] === y) && !cell.wall && !cell.potion && !cell.weapon && !cell.enemy) {
            foundSpot = true;
            return Object.assign({}, cell, {stairs: true})
          }
          else {
            return cell;
          }
        })
      })
    }
    return newBoard;  
}

function addBoss(board){
  let newBoard= [];
  let foundSpot = false;
  while (!foundSpot) {
  let x = randomInclusive(0,49);
  let y = randomInclusive(0,29);
  let bossObj = {
    enemy: {lvl: 5, hp: 150}, 
    boss: true
  }
  newBoard = board.map((row)=>{
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y && !cell.wall && !cell.potion) {
          foundSpot = true;
          return Object.assign({}, cell, bossObj)
        }
        else {
          return cell;
        }
      })
    })
  }
  return newBoard;
}

// set boards for each level that get increasingly difficult
let board1 = buildBoard(level1);
let board2 = buildBoard(level2, 2, 18, 25, weapon2, 2);
let board3 = buildBoard(level3, 3, 25, 30, weapon3, 3);
let board4 = buildBoard(level4, 4, 30, 35, weapon4, 4, true);

/* LAYOUT ACTIONS */

export const REMOVE_ITEM = 'REMOVE_WEAPON';
export function removeItem(position){
	return {
		type: REMOVE_ITEM,
		position,
		cell: {
		  potion: false,
		  weapon: false,
		}
	};
}

export const HIT_ENEMY = 'HIT_ENEMY';
export function hitEnemy(position, ene, newHP){
	return {
		type: HIT_ENEMY,
		position,
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

export const NEW_LEVEL = 'NEW_LEVEL';
export function newLevel(num){
	let newBoard = [];
	switch (num){
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
			newBoard = board1
			break;
	}
	return {
		type: NEW_LEVEL,
		newBoard
	}
}


/* HERO ACTIONS */

export const MOVE_HERO = 'MOVE_HERO';
export function moveHero(newPos) {
	return {
		type: MOVE_HERO,
		position: newPos
	};
}

export const PICKUP_POTION = 'PICKUP_POTION';
export function pickupPotion(amt){
	return {
		type: PICKUP_POTION,
		hp: amt
	};
}

export const PICKUP_WEAPON = 'PICKUP_WEAPON';
export function pickupWeapon(weapon) {
	return {
		type: PICKUP_WEAPON,
		weapon
	};
}

export const DMG_HERO = 'DMG_HERO';
export function dmgHero(hp) {
	return {
		type: DMG_HERO,
		hp
	};
}

export const GAIN_XP = 'GAIN_XP';
export function gainXP(xp) {
	return {
		type: GAIN_XP,
		xp
	};
}

export const LEVEL_UP = 'LEVEL_UP';
export function levelUp(lvl, hp) {
	return {
		type: LEVEL_UP,
		lvl,
		hp
	};
}

export const NEW_POSITION = 'NEW_POSITION';
export function newPosition(){
	return {
		type: NEW_POSITION,
		position: [5, 20]
	};
}

export const RESET_HERO = 'RESET_HERO';
export function resetHero(){
  return {
    type: RESET_HERO
  };
}


