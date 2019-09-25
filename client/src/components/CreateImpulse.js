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
      <div className="new-impulse">
        <div className="new-impulse-header">
          <h3 className="new-impulse-title">Create a new impulse</h3>
        </div>
        <form>
          <div className="new-impulse-fill">
            <label>Name</label>
            <input
              className="new-impulse-text"
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Enter a name..." />
            <label>Description</label>
            <textarea className="new-impulse-textarea"
              rows="10" cols="30" onChange={this.handleDescriptionChange}
              placeholder="Enter a description..."></textarea>
          </div>
          <button className="new-impulse-submit"
            onClick={this.handleSubmit}>Create</button>
        </form>
      </div>
    );
  }
}

export default connect(null, {
  createImpulse
})(CreateImpulse);
