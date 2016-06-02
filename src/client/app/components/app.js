import React, {Component} from 'react';
import Layout from './layout.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return (
      <div>
      <h1 className='title'> Roguelike Dungeon Crawler </h1>
      <h2 className='subtitle'>Built using React + Redux for FreeCodeCamp</h2>
        <Layout/>
      </div>
    );
  }
}
