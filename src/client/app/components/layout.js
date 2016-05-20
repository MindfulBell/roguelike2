import React, {Component} from 'react';
import Cell from './cell.js';
import { connect } from 'react-redux';
import { moveHero, removePotion, removeWeapon, pickupPotion, pickupWeapon } from '../actions/index.js';
import { bindActionCreators } from 'redux';


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleKey = this.handleKey.bind(this);
    this.findNeighbors = this.findNeighbors.bind(this);
    this.getSingleNeighbor = this.getSingleNeighbor.bind(this);
    // this.getCell = this.getCell.bind(this);
  }
 
    componentDidMount(){
        window.addEventListener('keydown', this.handleKey)
    }
    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleKey)
    }


    //mapping a new array of neighbors, top, left, bot, right and giving them a new prop based on direction
    findNeighbors(){
      let heroPos = this.props.hero.position
      let layout = this.props.layout;
      //flatten to 1d array for filtering to get small array for 4 neighbors
      let neighbors = []; 
      for (let i=0; i<layout.length; i++) {
        neighbors.push(...layout[i])
      }
      return neighbors.map((cell)=>{
        let xCoord = cell.position[0];
        let yCoord = cell.position[1];
          if (xCoord === heroPos[0] && yCoord === heroPos[1]-1) {
            return Object.assign({}, cell, {top: true})
          }
          else if (xCoord === heroPos[0]-1 && yCoord === heroPos[1]) {
            return Object.assign({}, cell, {left: true})
          }
          else if (xCoord === heroPos[0] && yCoord === heroPos[1]+1) {
            return Object.assign({}, cell, {bot: true})
          }
          else if (xCoord === heroPos[0]+1 && yCoord === heroPos[1]) {
            return Object.assign({}, cell, {right: true})
          }
          else {
            return cell;
          }
        }).filter((cell)=>{
          return cell.top || cell.left || cell.right || cell.bot;
        })
    }

    getSingleNeighbor(neighbors, dir){
      for (let i=0; i<neighbors.length; i++) {
        if (neighbors[i].hasOwnProperty(dir)) {
          return neighbors[i];
        }
      }
    }
    
    // getCell(pos){
    //   let layout = [];
    //   let heroCell = {}
    //   for (let i=0; i<this.props.layout.length; i++) {
    //     layout.push(...layout[i])
    //   }
    //   layout.forEach((cell)=>{
    //     if (cell.position[0] === pos[0] && cell.position[1] === pos[1]) {
    //       heroCell = cell;
    //     }
    //   })
    //   return heroCell;
    // }

    handleKey(e){
      e.preventDefault();
      let heroPos = this.props.hero.position;
      let neighbors = this.findNeighbors();
      // let heroCell = this.getCell(heroPos)

      
      function getMovedTo(neighbors, pos){
        for (let i=0; i<neighbors.length; i++) {
          for (let prop in neighbors[i]){
            let X = neighbors[i][prop][0];
            let Y = neighbors[i][prop][1];
            if (X === pos[0] && Y === pos[1]) {
              return neighbors[i];
            }
            else {
              // return heroCell;
            }
          }
        }
      }
      
      // MAY NOT NEED THESE
      let leftNeighbor = this.getSingleNeighbor(neighbors, 'left');
      let topNeighbor = this.getSingleNeighbor(neighbors, 'top');
      let rightNeighbor = this.getSingleNeighbor(neighbors, 'right');
      let botNeighbor = this.getSingleNeighbor(neighbors, 'bot');
      
      // Get the x,y of the space we are moving to
      let move = [];
      switch (e.keyCode) {
        case 37:
          //left
          move = [heroPos[0]-1, heroPos[1]]
          break;
        case 38:
          //top
          move = [heroPos[0], heroPos[1]-1]
          break;
        case 39:
          //right
          move = [heroPos[0]+1, heroPos[1]]
          break;
        case 40:
          //bot
          move = [heroPos[0], heroPos[1]+1]
          break;
        default: 
          move = [heroPos[0], heroPos[1]];
          break;
      }
      
      // get the cell object you are moving to
      let movingTo = getMovedTo(neighbors, move)
      
      // if it isn't a wall, it isn't a border, and it isn't an enemy
      if (movingTo !== undefined && !movingTo.wall && !movingTo.enemy) {
        this.props.moveHero(move)
        if (movingTo.potion){ 
          this.props.removePotion(move); 
          this.props.healHero(movingTo.potion); 
        }
        else if (movingTo.weapon){ 
          this.props.removeWeapon(move) 
          this.props.getWeaponHero(movingTo.weapon);
        }
        else if (movingTo.stairs){ 
          /* go down stairs */ 
        }
      }
      
      else if (movingTo.enemy) {
        console.log('ENEMY!')
      }
    }

  render() {
    // building the map, pulled layout from global state/redux
    let cells = this.props.layout.map((row, rowNum)=>{
      return row.map((cell,cellNum)=>{
        let heroPos = this.props.hero.position;
        // if hero
        if (rowNum === heroPos[1] && cellNum === heroPos[0]) {
          return <Cell key={cellNum+rowNum} hero={true} /> 
        }
        // if potion
        else if (cell.potion !== false) {
          return <Cell key={cellNum+rowNum} potion={true} />
        }
        // if weapon
        else if (cell.weapon !== false) {
          return <Cell key={cellNum+rowNum} weapon={true} />            
        }
        // if enemy
        else if (cell.enemy !== false) {
          return <Cell key={cellNum+rowNum} enemy={true} />            
        }
        // if stairs
        else if (cell.stairs) {
          return <Cell key={cellNum+rowNum} stairs={true} />            
        }
        // room has to be the last one. ALL OF THESE NEED TO BE REFACTORED!!
        else if (!cell.wall) {
          return <Cell key={cellNum+rowNum} room={true} />            
        }        
        else {
          return <Cell key={cellNum+rowNum} wall={true} />
        }
      })
    })

    return (
      <div>
        <div className='player-stats' style={{backgroundColor: 'white'}}>
          <h3>Level: {this.props.hero.level}</h3>
          <h3>Position: {this.props.hero.position[0]}, {this.props.hero.position[1]}</h3>
          <h3>HP: {this.props.hero.hp}</h3>
          <h3>Weapon: {this.props.hero.weapon.name}</h3>
          <h3>XP: {this.props.hero.xp}</h3>
        </div>
        <div className='board'>
          {cells}
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return { 
    layout: state.layout,
    hero: state.hero
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveHero: (newPos) => {dispatch(moveHero(newPos))},
    removePotion: (position) => {dispatch(removePotion(position))},
    removeWeapon: (position) => {dispatch(removeWeapon(position))},
    healHero: (amt) => {dispatch(pickupPotion(amt))},
    getWeaponHero: (weapon) => {dispatch(pickupWeapon(weapon))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)