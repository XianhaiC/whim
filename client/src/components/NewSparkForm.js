import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewSparkForm extends React.Component {
  state = {
    name: '',
    link_immediately: false
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const spark_session_token = sessionStorage.getItem('spark_session_token');

    if (!spark_session_token) {
      console.log("[ERROR] NewSparkForm: No spark session registered");
      return;
    }

    if (this.props.impulse_id == null) {
      console.log("[ERROR] NewSparkForm: Cannot create spark with no impulse");
      return;
    }

    const account_id = this.state.link_immediately ? this.props.account_id : null;

    if (this.props.account_id == null && this.state.link_immediately) {
      console.log("[INFO] NewSparkForm: Creating spark and linking immediately to account");
    }

    fetch(`${API_ROOT}/sparks`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        AuthorizationSession: `Bearer ${spark_session_token}`
      },
      body: JSON.stringify({
        name: this.state.name,
        impulse_id: this.props.impulse_id,
        session_token: spark_session_token
      })
    })
      .then(res => res.json())
      .then(spark => {
        console.log(spark);

        this.props.onSparkCreated(spark);
      });
  };


  render = () => {
    return (
      <div className="NewSparkForm">
        <form onSubmit={this.handleSubmit}>
          <label>Enter a name!</label>
          <br />
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
};

export default NewSparkForm;

NewSparkForm.defaultProps = {
  'account_id': null,
  'impulse_id': null
}
