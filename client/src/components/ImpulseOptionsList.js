import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

class ImpulseOptionsList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      listOpen: false, 
      headerTitle: 'Options',
       
    }
  }

  handleClickOutside() {
    this.setState({
      listOpen: false
    })
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
           <a className="dropdown-item" key={item.id}> {item.title} </a>))
          }
        </ul>}
      </div>
    )
  }
}

export default ImpulseOptionsList
