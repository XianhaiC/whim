import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class CenterCreateImpulse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handle_name = this.handle_name.bind(this);
    this.handle_description = this.handle_description.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
  }

  handle_name = e => {
    this.setState({ name: e.target.value });
  }

  handle_description = e => {
    this.setState({ description: e.target.value });
  }

  handle_submit = e => {
    e.preventDefault();
    console.log("SUBMITTING");
    fetch(`${API_ROOT}/impulses`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(this.props.on_impulse_created);

    this.setState({ name: '', description: '' });
  }

  render = () => {
    return (
      <div className="center_create_impulse">
        <form onSubmit={this.handle_submit}>
          <label>Create a new Impulse</label>
          <br />
          <input 
            type="text"
            value={this.state.name}
            onChange={this.handle_name}/>
          <textarea name="description" 
            rows="10" cols="30" onChange={this.handle_description}>
            Description...</textarea>
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default CenterCreateImpulse;
