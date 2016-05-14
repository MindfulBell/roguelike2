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
            style = {backgroundColor: 'blue'}
        }
        return (
            <div className='cell' style={style}>
            </div>
        )
    }
}