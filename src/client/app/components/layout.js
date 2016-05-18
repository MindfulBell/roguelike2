import React, {Component} from 'react';
import Cell from './cell.js';
import { connect } from 'react-redux';
import { moveHero, removeItem } from '../actions/index.js';
import { bindActionCreators } from 'redux';


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleKey = this.handleKey.bind(this);
    this.findNeighbors = this.findNeighbors.bind(this);
    this.checkNeighbors = this.checkNeighbors.bind(this);
    this.getSingleNeighbor = this.getSingleNeighbor.bind(this);
  }
 
    componentDidMount(){
        window.addEventListener('keydown', this.handleKey)
    }
    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleKey)
    }

    // key press, this function will grow as it needs to check the neighbors before it moves
    // biggest check will come from an enemy next to it

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
            console.log('test')
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

    checkNeighbors(neighbors, dir){
      for (let i=0; i<neighbors.length; i++) {
        if (neighbors[i].hasOwnProperty(dir)) {
          return true;
        }
      }
    }

    neighborType(){

    }

    getSingleNeighbor(neighbors, dir){
      for (let i=0; i<neighbors.length; i++) {
        if (neighbors[i].hasOwnProperty(dir)) {
          return neighbors[i];
        }
      }
    }

    //WIRE UP THE POTION GET!


    handleKey(e){
      let heroPos = this.props.hero.position;
      let neighbors = this.findNeighbors();
      let leftNeighbor = this.getSingleNeighbor(neighbors, 'left');
      let topNeighbor = this.getSingleNeighbor(neighbors, 'top');
      let rightNeighbor = this.getSingleNeighbor(neighbors, 'right');
      let botNeighbor = this.getSingleNeighbor(neighbors, 'bot');
      // this.checkNeighbors(neighbors[0])
      //THIS IS GOING TO GROW FOR CHECKING NEIGHBORS, MAY NEED REFACTOR!!!
      let move = [heroPos[0], heroPos[1]];
      switch (e.keyCode) {
        case 37:
          if (this.checkNeighbors(neighbors, 'left') && !leftNeighbor.wall) {
            move = [heroPos[0]-1, heroPos[1]]
            if (leftNeighbor.potion) {
              this.props.removeItem(move)
            }            
          }          
          break;
        case 38:
          if (this.checkNeighbors(neighbors, 'top') && !topNeighbor.wall) {
            move = [heroPos[0], heroPos[1]-1]
          }
          break;
        case 39:
          if (this.checkNeighbors(neighbors, 'right') && !rightNeighbor.wall) {
            move = [heroPos[0]+1, heroPos[1]]
          }
          break;
        case 40:
          if (this.checkNeighbors(neighbors, 'bot') && !botNeighbor.wall) {
            move = [heroPos[0], heroPos[1]+1]
          } 
          break;
      }
      // pulled from actions, redux usage here
      this.props.moveHero(move);
      // if moving into a space with an item, need to dispatch some actions

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
          <h3>Weapon: {this.props.hero.weapon}</h3>
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
    removeItem: (position) => {dispatch(removeItem(position))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)