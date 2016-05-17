import { board } from './board.js';

function randomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//may have to add a ton of parameters to this as it will need to run again on level changes
function buildBoard(h, w) {
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
      cells = addPotion(cells, 4)
      cells = addWeapon(cells, {name: 'club', att: 5});
      return cells;
    }

// Will need additional checks for walls and other entities obviously...just more of a test to see how i can get stuff on the board
function addPotion(board, num){
  let tempBoard = board;
  let count = num;
  while (count > 0) {
    let x = randomInclusive(0,39);
    let y = randomInclusive(0,39);
    let potion = Math.floor(Math.random()*(15-8 + 1)) + 1;
    let newBoard = tempBoard.map((row) => {
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y && cell.room === true) {
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
function addWeapon(board, weapon){
  let placed = false;
  let newBoard= [];
  while (!placed) {
    let x = randomInclusive(0,39);
    let y = randomInclusive(0,39);
    newBoard = board.map((row)=>{
      return row.map((cell)=>{
        if ((cell.position[0] === x && cell.position === y) && cell.room === true && !cell.potion) {
          placed = true;
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


export const INITIAL_BOARD_STATE = buildBoard(30,50);

export default function(state = INITIAL_BOARD_STATE, action) {
    switch(action.type) {
        
    }
    return state;
}

/*[[{position: [x,y], enemy: false, potion: false, weapon: false},{},{}]
   [{},{},{}]]*/