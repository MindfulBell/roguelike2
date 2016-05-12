import React, {Component} from 'react';
import {render} from 'react-dom';
require("../public/css/style.scss");

/*

Boilerplate for any react project w/redux, sass, bootstrap installed
Please don't forget to change your remote origin!!!

*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return (
      <div>
        <h1> INSERT App HERE!</h1>
      </div>
    );
  }
}

render(
  <App/>, document.getElementById('app'));
