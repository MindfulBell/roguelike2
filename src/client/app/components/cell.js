import React, { Component } from 'react';

export default class Cell extends Component {
    constructor(props){
        super(props);
        this.state={

        };

    }

    render() {
        let style = {};
        if (this.props.hidden) {
            style={backgroundColor: 'black'}
        }
        else if (this.props.hero) {
            style={backgroundColor: 'blue'}
        }
        else if (this.props.potion) {
            style={backgroundColor: 'green'}
        }
        else if (this.props.weapon) {
            style={backgroundColor: 'orange'}
        }
        else if (this.props.boss) {
            style={backgroundColor: 'yellow'}
        }
        else if (this.props.enemy) {
            style={backgroundColor: 'red'}
        }
        else if (this.props.stairs) {
            style={backgroundColor: 'purple'}
        }
        else if (this.props.room) {
            style={backgroundColor: 'white'}
        }
        
        return (
            <div className='cell' style={style}>
            </div>
        )
    }
}