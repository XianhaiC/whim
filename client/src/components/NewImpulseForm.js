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

  handleChange = e=> {
    this.setState({name: e.target.value});
  }

  handleSubmit = e => {
    this.setState({ name: ''});
  }

  render = ()=> {
    return (
      <div className="newImpulseForm">
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
