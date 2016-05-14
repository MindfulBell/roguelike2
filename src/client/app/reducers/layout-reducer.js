function buildBoard(h, w) {
      const boardsize = w * 20; // 20 is px size of each cell (see style)
      const totalCells = h*w;
      const cells = [];
      let counter = -1;
      for (let i=0; i<h; i++) {
          let row = [];
        for (let j=0; j<w; j++) {
          counter++;
          row.push({
              position: [i,j]
          }); 
        }
        cells.push(row);
      }
      return cells;
    }
    
const INITIAL_LEVEL_STATE = buildBoard(40,40);
console.log(INITIAL_LEVEL_STATE);

export default function(state = INITIAL_LEVEL_STATE, action) {
    switch(action.type) {
        
    }
    return state;
}