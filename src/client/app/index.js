import React, {Component} from 'react';
import {render} from 'react-dom';
require("../public/css/style.scss");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return (
      <div>
        <Layout/>
      </div>
    );
  }
}

render(
  <App/>, document.getElementById('app'));
