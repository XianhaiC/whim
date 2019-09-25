import React from 'react';
import { connect } from 'react-redux';

import { createImpulse } from '../actions/index';

class CreateImpulse extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createImpulse(this.state.name, this.state.description);

    this.setState({name: '', description: ''});
  }

  render() {
    return (
      <div className="create-impulse">
        <div className="create-impulse-header">
          <h3 className="create-impulse-title">Create a new impulse</h3>
        </div>
        <form>
          <input 
            className="create-impulse-name"
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            placeholder="Impulse name" />
          <textarea className="create-impulse-description"
            name="description" 
            rows="10" cols="30" onChange={this.handleDescriptionChange}
            placeholder="Impulse description"></textarea>
          <button className="create-impulse-submit"
            onClick={this.handleSubmit}>Create</button>
        </form>
      </div>
    );
  }
}

export default connect(null, {
  createImpulse
})(CreateImpulse);
