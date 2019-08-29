import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewMessageForm extends React.Component {
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

  //TODO handle case where not logged in
  handleSubmit = e => {
    e.preventDefault();
    const account_session_token = sessionStorage.getItem('account_session_token');
    const spark_session_token = sessionStorage.getItem('spark_session_token');

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
      <div className="NewMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.body}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
