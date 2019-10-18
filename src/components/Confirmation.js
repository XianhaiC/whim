import React from 'react';

import history from '../history';
import { API_ROOT, HEADERS, PATH_LOGIN } from '../constants';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmed: false,
      invalid: false
    }
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
      <h1>Invalid confirmation link. :(</h1> :
      <h1>Awaiting confirmation...</h1>;

    if (this.state.confirmed) {
      return (
        <div className="center-form">
          <div className="center-form-wrapper">
            <h2>Account successfully activated!</h2>
            <button onClick={() => history.push(PATH_LOGIN)}>Login</button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="response">
          {text}
        </div>
      );
    }
  }
}

export default Confirmation;
