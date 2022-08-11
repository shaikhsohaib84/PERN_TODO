import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Todo } from './components/Todo';
import { Login } from './components/Login';
import { Header } from './components/Header';
import './App.css';
import { Signup } from './components/Signup';

const App = React.memo(() => {
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Todo />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
      </Routes>    
    </Router>
    </>
  );
})

export default App;
