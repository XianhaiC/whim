import React from 'react';

import Sidebar from './Sidebar';
import Center from './Center';
import Functionals from '../functionals/Functionals';

const Board = () => {
  return (
    <div className="board">
      <Sidebar />
      <Center />
      <Functionals />
    </div>
  );
};

export default Board;
