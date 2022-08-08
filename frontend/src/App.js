import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Todo } from './components/Todo';
import './App.css';

const App = React.memo(() => {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Todo />}></Route>
      </Routes>    
    </Router>
  );
})

export default App;
