import React from 'react';

import Login from './Login';
import Sidebar from './Sidebar';
import Center from './Center';
import Functionals from '../functionals/Functionals';
import InvitePopup from './InvitePopup';
import LinkPopup from './LinkPopup';

// TODO move login to its own page
const Board = () => {
  return (
    <div className="board-outer">
      <div className="board">
        <Sidebar />
        <Center />
      </div>
      <Functionals />
      <InvitePopup />
      <LinkPopup />
    </div>
  );
};

export default Board;
