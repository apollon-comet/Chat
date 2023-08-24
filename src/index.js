import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/js/App';
import reportWebVitals from './reportWebVitals';

import reducer, { initialState } from './components/js/reducer';
import { StateProvider } from './components/js/stateProvider';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
