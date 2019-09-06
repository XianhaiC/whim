import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class CreateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      impulse_id: this.props.impulse_id,
      spark_id: this.props.spark_id
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ impulse_id: nextProps.impulse_id, spark_id: nextProps.spark_id });
  };

  handleChange = e => {
    this.setState({ body: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const account_session_token = sessionStorage.getItem('account_session_token');
    const spark_session_token = sessionStorage.getItem('spark_session_token');

    // note that login authentication may fail but session authentication can succeed
    // so long as one succeeds the message will be successfully sent
    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${account_session_token}`,
        AuthorizationSession: `Bearer ${spark_session_token}`
      },
      body: JSON.stringify(this.state)
    });
    this.setState({ body: '' });
  };

  render = () => {
    return (
      <div className="CreateMessage">
        <form onSubmit={this.handleSubmit}>
          <input className="message-text"
            type="text"
            value={this.state.body}
            onChange={this.handleChange}/>
          <input className="message-submit" type="submit"/>
        </form>
      </div>
    );
  };
}

export default CreateMessage;
