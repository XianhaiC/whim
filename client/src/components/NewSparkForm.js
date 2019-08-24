import React from 'react';

class NewSparkForm extends React.Component {
  state = {
    'name': ''
    'link_immediately': false
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
        'name': "beaver",
        'account_id': account_id,
        'impulse_id': this.state.impulse_id
      })
    })
    .then(res => res.json())
    .then(auth_payload => {
      // store the spark session token in session cookies
    })
  }

  render = () => {
    return (
      <div className="NewSparkForm">
        <form onSubmit={this.handleSubmit}>
          <label>Enter a name!</label>
          <br />
          <input className="NewSparkForm__Input"
            type="text
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

NewSparkForm.defaultProps = {
  'account_id': null,
  'impulse_id': null
}
