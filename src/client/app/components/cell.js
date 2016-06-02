import React from 'react';

export default function Cell(props){

    let style = {};
    if (props.hidden) {
        style={backgroundColor: 'black'};
    }
    else if (props.hero) {
        style={backgroundColor: 'blue'};
    }
    else if (props.potion) {
        style={backgroundColor: 'green'};
    }
    else if (props.weapon) {
        style={backgroundColor: 'orange'};
    }
    else if (props.boss) {
        style={backgroundColor: 'yellow'};
    }
    else if (props.enemy) {
        style={backgroundColor: 'red'};
    }
    else if (props.stairs) {
        style={backgroundColor: 'purple'};
    }
    else if (props.room) {
        style={backgroundColor: 'white'};
    }
    
    return (
        <div className='cell' style={style}>
        </div>
    );
}