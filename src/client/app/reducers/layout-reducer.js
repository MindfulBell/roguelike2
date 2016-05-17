import { board } from './board.js';

function randomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//may have to add a ton of parameters to this as it will need to run again on level changes
function buildBoard(w, h) {
      let cells = [];
      let counter = 0;
      for (let i=0; i<h; i++) {
          let row = [];
        for (let j=0; j<w; j++) {
          counter++;
          let cell = {
             position: [j,i],
             enemy: false,
             potion: false,
             weapon: false,
             room: false,
             staircase: false
          };
          // based on imported generated dungeon board, if item is a 0, it is a room
          if (board[counter] !== 0) {
            cell.room = true;
          }
          row.push(cell); 
        }
        cells.push(row);
      }
      cells = addPotion(cells);
      cells = addWeapon(cells);
      cells = addEnemies(cells);
      return cells;
    }

function addPotion(board, num = 4){
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
    let enemy = {lvl: randomInclusive(3,5), hp: randomInclusive(12,20)};
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


export const INITIAL_BOARD_STATE = buildBoard(50,30);

export default function(state = INITIAL_BOARD_STATE, action) {
    switch(action.type) {
        
    }
    return state;
}

/*[[{position: [x,y], enemy: false, potion: false, weapon: false},{},{}]
   [{},{},{}]]*/