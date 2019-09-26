import React from 'react';
import './App.css';
import Budget from './components/budget/index'
import NewBill from './components/bill/new'
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path='/budget' component={Budget} exact />
          <Route path='/budget/bill/new' component={NewBill} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
