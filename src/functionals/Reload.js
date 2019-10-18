import React from 'react';

class Reload extends React.Component {
  componentDidMount() {
    window.onpopstate = (e) => {
      console.log("RELOAD");
      window.location.reload();
    }
  }

  render() {
    return null;
  }
}

export default Reload;
