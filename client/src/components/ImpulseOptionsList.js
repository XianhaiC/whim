import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../constants';

class ImpulseOptionsList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      listOpen: false, 
      headerTitle: 'Options',
    }

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleAccountLink = this.handleAccountLink.bind(this);
    this.handleInviteCreate = this.handleInviteCreate.bind(this);
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

  handleInviteCreate() {
    fetch(`${API_ROOT}/impulses/${this.props.active_impulse_id}/invite/new`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(impulse => {
      this.props.onInviteCreated(impulse);
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
        
        {listOpen && <ul className="OptionsListMenu">
          <button className="dropdown-item" type="button" key="0" 
                  onClick={this.handleInviteCreate}> {list[0].title} </button>
          <button className="dropdown-item" key="1"> {list[1].title} </button>
          <button className="dropdown-item" key="2"> {list[2].title} </button>
          <button className="dropdown-item" key="3" 
                  onClick={this.handleAccountLink}> {list[3].title} </button>
        </ul>}
      </div>
    )
  }
}

export default ImpulseOptionsList
