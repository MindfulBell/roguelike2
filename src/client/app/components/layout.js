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
  }
 
    componentDidMount(){
        window.addEventListener('keyup', this.handleKey)
    }
    componentWillUnmount(){
        window.removeEventListener('keyup', this.handleKey)
    }
  // key press, this function will grow as it needs to check the neighbors before it moves
  // biggest check will come from an enemy next to it
    handleKey(e){
      let heroPos = this.props.hero.position
      let neighbors = 
      {
        left: [heroPos[0], heroPos[1]-1],
        top: [heroPos[0]-1, heroPos[1]],
        right: [heroPos[0], heroPos[1]+1],
        bottom: [heroPos[0]+1, heroPos[1]]
      };
      let move = [heroPos[0], heroPos[1]];
      switch (e.keyCode) {
        case 37:
          move = neighbors.left;
          break;
        case 38:
          move = neighbors.top;
          break;
        case 39:
          move = neighbors.right;
          break;
        case 40:
          move = neighbors.bottom;
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
        let neighbors = {
          left: [rowNum, cellNum-1],
          top: [rowNum-1, cellNum],
          right: [rowNum, cellNum+1],
          bottom: [rowNum+1, cellNum]
        }
        // if hero
        if (rowNum === heroPos[0] && cellNum === heroPos[1]) {
          return (
            <Cell key={cellNum+rowNum} 
            hero={true} 
            position={[rowNum, cellNum]} 
            neighbors={neighbors} />)  
        }
        // if potion
        else if (cell.potion !== false) {
          return (
            <Cell key={cellNum+rowNum}
            position={[rowNum, cellNum]}
            potion={true}
            neighbors={neighbors}/>
          )
        }
        // if weapon
        else if (cell.weapon !== false) {
          return (
            <Cell key={cellNum+rowNum}
            position={[rowNum, cellNum]}
            weapon={true}
            neighbors={neighbors}/>
            )
        }
        // if enemy
        else if (cell.enemy !== false) {
          return (
            <Cell key={cellNum+rowNum}
            position={[rowNum, cellNum]}
            enemy={true}
            neighbors={neighbors}/>
            )
        }
        // room has to be the last one. ALL OF THESE NEED TO BE REFACTORED!!
        else if (cell.room) {
          return (
            <Cell key={cellNum+rowNum}
            position={[rowNum, cellNum]}
            room={true}
            neighbors={neighbors}/>
            )
        }
        
        else {
          return <Cell key={cellNum+rowNum} position={[rowNum, cellNum]} neighbors={neighbors}/>
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