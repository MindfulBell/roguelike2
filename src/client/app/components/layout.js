import React, {Component} from 'react';
import Cell from './cell.js';
import { connect } from 'react-redux';


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
      e.preventDefault;
      
    }

  render() {
    let cells = this.props.layout.map((row, rowNum)=>{
      return row.map((cell,cellNum)=>{
        let heroPos = this.props.hero.position;
        if (rowNum === heroPos[0] && cellNum === heroPos[1]) {
          return <Cell key={cellNum+rowNum} hero={true}/>  
        }
        else {
          return <Cell key={cellNum+rowNum}/>
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

export default connect(mapStateToProps)(Layout)