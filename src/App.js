import React from 'react';
import './App.css';
import BillsToIncome from './components/bills_to_income/index'
import Budgets from './components/budgets/index'
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path='/bills/to/income' component={BillsToIncome} exact />
          <Route path='/budget' component={Budgets} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
