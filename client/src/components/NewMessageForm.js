import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewMessageForm extends React.Component {
  state = {
    text: '',
    impulse_id: this.props.impulse_id,
    spark_id: null
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ impulse_id: nextProps.impulse_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  liscenceSpark = () => {
    if (spark_id == null) {
      if (false) {
        //user is logged in
      }
      else {
        createSpark();
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: '' });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
