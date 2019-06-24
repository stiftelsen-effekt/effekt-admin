import React from 'react';
import './App.css';

import { createStore, Action } from 'redux';
import { AppState } from './models/state'

const initialState: AppState = {
  count: 0
}

const reducer = (state: AppState = initialState, action: Action<any>) => {
  console.log("Reducer", state, action);
  return state;
}
const store = createStore(reducer);
console.log(store);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>GiEffektivt admin panel is alive!</p>
      </header>
    </div>
  );
}

export default App;
