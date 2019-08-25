import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewSparkForm extends React.Component {
  state = {
    name: '',
    link_immediately: false
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

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
      headers: HEADERS,
      body: JSON.stringify({
        name: this.state.name,
        account_id: account_id,
        impulse_id: this.props.impulse_id
      })
    })
      .then(res => res.json())
      .then(response => {
        const auth_payload = response.auth_payload;
        const spark = response.spark;
        localStorage.setItem(`spark_${spark.id}_session_token`, auth_payload.auth_token);
        this.props.onSparkCreation(spark);
      });
  }

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
}

export default NewSparkForm;

NewSparkForm.defaultProps = {
  'account_id': null,
  'impulse_id': null
}
