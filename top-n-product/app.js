// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllProducts} />
        <Route path="/product/:productId" component={ProductDetails} />
      </Switch>
    </Router>
  );
}

export default App;
