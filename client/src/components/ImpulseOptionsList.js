import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../constants';
import FontAwesome from 'react-fontawesome'

class ImpulseOptionsList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      listOpen: false, 
      headerTitle: 'Options',
       
    }

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleAccountLink = this.handleAccountLink.bind(this);
  }

  handleClickOutside() {
    this.setState({
      listOpen: false
    })
  }

  handleAccountLink() {
    const account_session_token = sessionStorage.getItem('account_session_token');
    // TODO: redirect to login page
    if (!this.props.logged_in) return
    fetch(`${API_ROOT}/sparks/${this.props.active_spark_id}`, {
      method: 'PATCH',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${account_session_token}`
      },
      body: JSON.stringify({ account_id: this.props.account_id })
    })
    .then(res => res.json())
    .then(spark => {
      this.props.onAccountLinked(spark.id);
    });
  }

  toggleList() {
    this.setState( prevState => ({listOpen: !prevState.listOpen})) 
  }

  render() {
    const {list} = this.props;
    const {listOpen, headerTitle} = this.state

    return (
      <div className="OptionsListWrapper"> 
        <div className="OptionsListHeader dropdown-header row " onClick={() => this.toggleList()}>
          <div className="OptionsListHeaderTitle col-md-2">
            <button className="btn btn-secondary dropdown-toggle" aria-haspopup="true"
                   aria-expanded="false" type="button">{headerTitle}
            </button>
          </div>
        </div>
        
        {listOpen && <ul className="OptionsListMenu ">
     
          {list.map((item) => (
           <button className="dropdown-item" key={item.id} onClick={this.handleAccountLink}> {item.title} </button>))
          }
        </ul>}
      </div>
    )
  }
}

export default ImpulseOptionsList
