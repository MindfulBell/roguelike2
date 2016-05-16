import React, { Component } from 'react';

export default class Cell extends Component {
    constructor(props){
        super(props);
        this.state={

        };

    }

    render() {
        let style = {};
        if (this.props.hero) {
            style={backgroundColor: 'blue'}
        }
        else if (this.props.potion) {
            style={backgroundColor: 'green'}
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