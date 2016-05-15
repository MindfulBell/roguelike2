function buildBoard(h, w) {
      const boardsize = w * 20; // 20 is px size of each cell (see style)
      const totalCells = h*w;
      const cells = [];
      let counter = -1;
      let potionCount = 4;
      let weaponAdded = false;
      let enemyCount = 6;
      let stairCaseAdded = false;
      for (let i=0; i<h; i++) {
          let row = [];
        for (let j=0; j<w; j++) {
          counter++;
          let position = [i,j];
          let enemy = false;
          let potion = false;
          let weapon = false;
          let wall = false;
          row.push({position, enemy, potion, weapon, wall}); 
        }
        cells.push(row);
      }
      return addPotion(cells, 4);
    }


// Will need additional checks for walls and other entities obviously...just more of a test to see how i can get stuff on the board
function addPotion(board, num){
  let tempBoard = board;
  for (let i=0; i<num; i++) {
    let x = Math.floor(Math.random()*(38-0 + 1)) + 1;
    let y = Math.floor(Math.random()*(38-0 + 1)) + 1;
    let potion = Math.floor(Math.random()*(15-8 + 1)) + 1;
    let newBoard = tempBoard.map((row) => {
      return row.map((cell)=>{
        if (cell.position[0] === x && cell.position[1] === y) {
          return Object.assign({}, cell, {potion})
        }
        else {
          return cell;
        }
      })
    })
    tempBoard = newBoard;
  }
  return tempBoard;
}

const INITIAL_LEVEL_STATE = buildBoard(40,40);

export default function(state = INITIAL_LEVEL_STATE, action) {
    switch(action.type) {
        
    }
    return state;
}

/*[[{position: [x,y], enemy: false, potion: false, weapon: false},{},{}]
   [{},{},{}]]*/