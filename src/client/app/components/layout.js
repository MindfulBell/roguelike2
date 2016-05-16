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
    
    handleKey(e){
      let heroPos = this.props.hero.position
      let neighbors = 
      {
        left: [heroPos[0], heroPos[1]-1],
        top: [heroPos[0]-1, heroPos[1]],
        right: [heroPos[0], heroPos[1]+1],
        bottom: [heroPos[0]+1, heroPos[1]]
      };
      let move = neighbors.left;
      switch (e.keyCode) {
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
      this.props.moveHero(move)
    }

  render() {
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
        if (cell.potion !== false) {
          return (
            <Cell key={cellNum+rowNum}
            position={[rowNum, cellNum]}
            potion={true}
            neighbors={neighbors}/>
          )
        }
        if (cell.room) {
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