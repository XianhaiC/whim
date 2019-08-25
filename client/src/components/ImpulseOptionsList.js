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
        <div className="OptionsListHeader row " onClick={() => this.toggleList()}>
          <div className="OptionsListHeaderTitle col-md-2">{headerTitle}</div>
          <div className="OptionsIcon col-md-1">
		  {listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
          </div>
        </div>
      {listOpen && <ul className="OptionsListMenu">
     
        {list.map((item) => (
         <a> <li className="OptionsListItem" key={item.id}> {item.title} </li></a>
        ))}
      </ul>}
      </div>
    )
  }
}

export default ImpulseOptionsList
