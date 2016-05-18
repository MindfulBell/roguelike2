import React, {Component} from 'react';
import Cell from './cell.js';
import { connect } from 'react-redux';
import { moveHero } from '../actions/index.js';
import { bindActionCreators } from 'redux';


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleKey = this.handleKey.bind(this);
    this.findNeighbors = this.findNeighbors.bind(this);
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
      return neighbors.filter((cell)=>{
        let xCoord = cell.position[0];
        let yCoord = cell.position[1];
          if (xCoord === heroPos[0] && yCoord === heroPos[1]-1) {
            return true;
          }
          else if (xCoord === heroPos[0]-1 && yCoord === heroPos[1]) {
            return true;
          }
          else if (xCoord === heroPos[0] && yCoord === heroPos[1]+1) {
            return true;
          }
          else if (xCoord === heroPos[0]+1 && yCoord === heroPos[1]) {
            return true;
          }
        })
      // top = 0, left = 1, right = 2, bottom = 3; CAN I FIX THIS? Make a new property for them all defininig their position to hero?
    }
    handleKey(e){
      let heroPos = this.props.hero.position;
      let neighbors = this.findNeighbors();
      //THIS IS GOING TO GROW FOR CHECKING NEIGHBORS, MAY NEED REFACTOR!!!
      let move = [heroPos[0], heroPos[1]];
      switch (e.keyCode) {
        case 37:
          if (!neighbors[1].wall) {
            move = neighbors[1].position;
          }          
          break;
        case 38:
          if (!neighbors[0].wall) {
            move = neighbors[0].position;
          }
          break;
        case 39:
          if (!neighbors[2].wall) {
            move = neighbors[2].position;
          }
          break;
        case 40:
          if (!neighbors[3].wall) {
            move = neighbors[3].position;
          } 
          break;
      }
      // pulled from actions, redux usage here
      this.props.moveHero(move)
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
        else if (cell.room) {
          return <Cell key={cellNum+rowNum} room={true} />            
        }        
        else {
          return <Cell key={cellNum+rowNum} wall={true} />
        }
      })
    })

    return (
      <div className='board'>
        {cells}
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
    moveHero: (newPos) => {dispatch(moveHero(newPos))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)