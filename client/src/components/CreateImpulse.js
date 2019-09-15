import React from 'react';
import { connect } from 'react-redux';

class CreateImpusle extends React.Component {
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
        <form onSubmit={this.handleSubmit}>
          <label>Create a new Impulse</label>
          <br />
          <input 
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}/>
          <textarea name="description" 
            rows="10" cols="30" onChange={this.handleDescriptionChange}>
            Description...</textarea>
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default connect(null, {
  createImpulse
})(CreateImpulse);
