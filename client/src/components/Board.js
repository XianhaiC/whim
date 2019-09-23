import React from 'react';

import Login from './Login';
import Sidebar from './Sidebar';
import Center from './Center';
import Functionals from '../functionals/Functionals';

// TODO move login to its own page
const Board = () => {
  return (
    <div className="board">
      <Login />
      <Sidebar />
      <Center />
      <Functionals />
    </div>
  );
};

export default Board;
