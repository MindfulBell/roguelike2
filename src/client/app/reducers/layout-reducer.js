function randomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
          let room = false;
          row.push({position, enemy, potion, weapon, room}); 
        }
        cells.push(row);
      }
      return addRooms(cells, 10, 10);
    }
//build rooms: small square, big square, small rectangle, big rectangle
//go over certain elements in the board array and change their room property to true

// [[0,0],[1,0],[2,0],[3,0],
//  [0,1],[1,1],[2,1],[3,1],
//  [0,2],[1,2],[2,2],[3,2],
//  [0,3],[1,3],[2,3],[3,3],
//  [0,4],[1,4],[2,4],[3,4],
//  [0,5],[1,5],[2,5],[3,5]]
function addRooms(board, width, height){
  
  let xStart = randomInclusive(0,20);
  let yStart = randomInclusive(0,20);
  let xEnd = xStart + width;
  let yEnd = yStart + height;
  
  return board.map((row)=>{
    return row.map((cell)=>{
      let cellX = cell.position[0];
      let cellY = cell.position[1];
      if ((cellX >= xStart && cellX <= xEnd) && (cellY >= yStart && cellY <= yEnd)) {
        // return modified object, how to modify?
        let room = true;
        return Object.assign({}, cell, {room})
      }
      else {
        return cell;
      }
    })
  })

  //x size var
  //y size var
  //just make a range for the x, and a range for the y
  //go through entire board, for each: if (x coord > n and < m and y coord > a and < b)...
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


const INITIAL_LEVEL_STATE = buildBoard(40,40);

export default function(state = INITIAL_LEVEL_STATE, action) {
    switch(action.type) {
        
    }
    return state;
}

/*[[{position: [x,y], enemy: false, potion: false, weapon: false},{},{}]
   [{},{},{}]]*/