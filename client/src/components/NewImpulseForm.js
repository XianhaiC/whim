import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewImpulseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({name: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${API_ROOT}/impulses`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(this.props.onImpulseCreated);
    this.setState({ name: ''});
  }

  render = () => {
    return (
      <div className="NewImpulseForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Impulse: </label>
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
  };
}

export default NewImpulseForm;
