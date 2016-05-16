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
      <h1 style={{textAlign: 'center', color: 'white'}}> RogueLike Dungeon Crawler </h1>
        <Layout />
      </div>
    );
  }
}
