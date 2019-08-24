import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewImpulseForm extends React.Component {
  state = {
      title: ''
  };

  handleChange = e=> {
      this.setState({title: e.target.value});
  }

  handleSubmit = e => {
      fetch( '${API_ROOT}/impulses', {
          method: 'POST',
          headers: HEADERS, 
          body: JSON.stringify(this.state)
      });
      this.setState({ title: ''});
  }

  render = ()=> {
      return (
          <div className="newImpulseForm">
              <form onSubmit={this.handleSubmit}>
                  <label>New Impulse: </label>
                  <br />
                  <input 
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                  <input type="submit" />
              </form>
          </div>
      );
  };
}

export default NewImpulseForm;
