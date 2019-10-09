import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { API_ROOT, HEADERS, PATH_BOARD, PATH_ROOT } from '../constants';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmed: false,
      invalid: false
    }
  }

  renderRedirect() {
    if (this.state.confirmed) return <Redirect to={PATH_ROOT} />;
  }

  componentDidMount() {
    fetch(`${API_ROOT}/confirmation/${this.props.uuid}`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(account => {
      this.setState({ confirmed: true });

    })
    .catch((e) => {
      this.setState({ invalid: true });
    });
  }

  render() {
    let text = this.state.invalid ?
      <h1>Invalid confirmation link.</h1> :
      <h1>Awaiting confirmation...</h1>;

    return (
      <div className="confirmation">
        {this.renderRedirect()}
        {text}
      </div>
    );
  }
}

export default Confirmation;
