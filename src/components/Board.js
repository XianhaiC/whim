import React from 'react';

import Login from './Login';
import Sidebar from './Sidebar';
import Center from './Center';
import InvitePopup from './InvitePopup';
import LinkPopup from './LinkPopup';

const Board = () => {
  return (
    <div className="board-outer">
      <div className="board">
        <Sidebar />
        <Center />
      </div>
      <InvitePopup />
      <LinkPopup />
    </div>
  );
};

export default Board;
