import React from 'react';

class EmptyThread extends React.Component {
  render() {
    return (
      <div className="empty">
        <h2>No messages so far!</h2>
        <p>Start the discussion by sending messages or by creating inspirations below</p>
        <p>Inspirations capture snippets of ideas, like post-it notes do. They can be used to share ideas, ask questions, or provide solutions</p>
        <p>Select an inspiration to open up it's chat thread. From there, you can send messages in response to that inspiration!</p>
      </div>
    );
  }
}

export default EmptyThread;
