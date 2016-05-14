import React from 'react';
import { render } from 'react-dom';
require("../public/css/style.scss");
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './components/app';


render(<Provider store={createStore(reducers)}>
        <App />
      </Provider>
  , document.getElementById('app'));
