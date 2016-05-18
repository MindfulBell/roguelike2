import { board } from './board.js';

function randomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//may need to make objects for each level...i.e. level 1 enemies, weapon, potions etc. and on the next level, just inject it all into buildboard as params

//may have to add a ton of parameters to this as it will need to run again on level changes
function buildBoard(w, h) {
      let cells = [];
      let counter = 0;
      for (let y=0; y<h; y++) {
          let row = [];
        for (let x=0; x<w; x++) {
          counter++;
          let cell = {
             position: [x,y],
             enemy: false,
             potion: false,
             weapon: false,
             room: false,
             stairs: false,
             hero: false, // need to inject his position from the hero reducer?
             wall: false
          };
          // based on imported generated dungeon board, if item is a 0, it is a room
          if (board[counter] !== 0) {
            cell.room = true;
          }
          else {
            cell.wall = true;
          }
          row.push(cell); 
        }
        cells.push(row);
      }
      cells = addPotions(cells);
      cells = addWeapon(cells);
      cells = addEnemies(cells);
      cells = addStairs(cells);
      return cells;
    }

function addPotions(board, num = 4){
  let tempBoard = board;
  let count = num;
  while (count > 0) {
    let x = randomInclusive(0,49);
    let y = randomInclusive(0,29);
    let potion = randomInclusive(8,15);
    let newBoard = tempBoard.map((row) => {
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y && cell.room) {
          count--;
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


function addWeapon(board, weapon = {name: 'club', att: 5}){
  let newBoard= [];
  let foundSpot = false;
  while (!foundSpot) {
  let x = randomInclusive(0,49);
  let y = randomInclusive(0,29);
  newBoard = board.map((row)=>{
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y && cell.room && !cell.potion) {
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


function addEnemies(board, num = 6){
  let tempBoard = board;
  let count = num;
  while (count > 0) {
    let x = randomInclusive(0,49);
    let y = randomInclusive(0,29);
    let enemy = {lvl: randomInclusive(2,4), hp: randomInclusive(12,20), xp: randomInclusive(6, 10)};
    let newBoard = tempBoard.map((row) => {
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y && cell.room && !cell.potion && !cell.weapon) {
          count--;
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

function addStairs(board, stairs = true){
  // if last level...no staircase!!!
  let newBoard= [];
  let foundSpot = false;
  while (!foundSpot) {
  let x = randomInclusive(0,49);
  let y = randomInclusive(0,29);
  newBoard = board.map((row)=>{
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y && cell.room && !cell.potion && !cell.weapon && !cell.enemy) {
          foundSpot = true;
          return Object.assign({}, cell, {stairs})
        }
        else {
          return cell;
        }
      })
    })
  }
  return newBoard;
}

// add a buildHero function and just make an object here?
const INITIAL_BOARD_STATE = buildBoard(50,30);

export default function(state = INITIAL_BOARD_STATE, action) {
    switch(action.type) {
        
    }
    return state;
}

/*[[{position: [x,y], enemy: false, potion: false, weapon: false},{},{}]
   [{},{},{}]]*/