import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

const Welcome = () => <div>Welcome</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Route exact path="/" component={Welcome} />
      </div>
    </BrowserRouter >

  );
}

export default App;
