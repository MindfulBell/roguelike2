import { REMOVE_ITEM, HIT_ENEMY, NEW_LEVEL } from '../actions/index.js';


//may need to make objects for each level...i.e. level 1 enemies, weapon, potions etc. and on the next level, just inject it all into buildboard as params

//may have to add a ton of parameters to this as it will need to run again on level changes


// add a buildHero function and just make an object here?

//build a function to repeat finding the element in the board otherwise
//there will be a lot of repeat code

//NEXT UP: Button to toggle darkness, add a key for symbols, add icons?, Add a hero status div, level up effect/celebration, Refactor

function findCellMatch(cell, action){
  
  let cellX = cell.position[0];
  let cellY = cell.position[1];
  let newCellX = action.position[0];
  let newCellY = action.position[1];
  
  return (cellX === newCellX && cellY === newCellY);
}

export default function(state = [], action) {
    switch(action.type) {
        
        case REMOVE_ITEM:
          return state.map((row)=>{
            return row.map((cell)=>{
              if (findCellMatch(cell, action)) {
                return Object.assign({}, cell, action.cell);
              }
              else {
                return cell;
              }
            });
          });

        case HIT_ENEMY:
          return state.map((row)=>{
            return row.map((cell)=>{
              if (findCellMatch(cell, action)) {
                // did we damage it enough to kill it? change presence of enemy to false; 
                // else, just reduce its hp to new hp value
                let newHP = action.hit.enemy.hp
                return newHP <= 0 ? Object.assign({}, cell, action.dead) : Object.assign({}, cell, action.hit)
              }
              else {
                return cell;
              }
            });
          });

        case NEW_LEVEL:
          return action.newBoard;


        default:
          return state;
    }
}