import React, { Component } from 'react'
import { connect } from 'react-redux';

import { API_ROOT, HEADERS } from '../constants';
import { createInvite, linkAccount } from '../actions/index';

class ImpulseOptions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listOpen: false,
      headerTitle: 'Options',
      optionItems: [
        {
          index: 0,
          title: 'Create Invite Link',
          selection: false,
          key: 'option-links:'
        },
        {
          index: 1,
          title: 'Edit Channel Account',
          selection: false,
          key: 'option-links'
        },
        {
          index: 2,
          title: 'Channel Settings',
          selection: false,
          key: 'option-links'
        },
        {
          index: 3,
          title: 'Link Account',
          selection: false,
          key: 'option-links'
        }
      ]
    }

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleAccountLink = this.handleAccountLink.bind(this);
    this.handleCreateInvite = this.handleCreateInvite.bind(this);
  }

  handleClickOutside() {
    this.setState({
      listOpen: false
    })
  }

  handleAccountLink() {
    this.props.linkAccount(this.props.activeSparkId, this.props.accountId);
  }

  handleCreateInvite() {
    this.props.createInvite(this.props.activeImpulseId);
  }

  toggleList() {
    this.setState( prevState => ({listOpen: !prevState.listOpen}));
  }

  render() {
    const {listOpen, headerTitle, optionItems} = this.state

    return (
      <div className="impulse-options">
        <ul className="options-list">
          <button className="option-item" key="0" onClick={this.handleCreateInvite}> {optionItems[0].title} </button>
          <button className="option-item" key="1"> {optionItems[1].title} </button>
          <button className="option-item" key="2"> {optionItems[2].title} </button>
          <button className="option-item" key="3" onClick={this.handleAccountLink}> {optionItems[3].title} </button>
        </ul>
      </div>
    )
      /*
    return (
      <div className="right-impulse-options">
        <ul className="options-list">
          <button className="option-item" key="0" onClick={this.handleInviteCreate}> {optionItems[0].title} </button>
          <button className="option-item" key="1"> {optionItems[1].title} </button>
          <button className="option-item" key="2"> {option[2].title} </button>
          <button className="option-item" key="3" onClick={this.handleAccountLink}> {optionItem[3].title} </button>
        </ul>

        <div className="OptionsListHeader dropdown-header row " onClick={() => this.toggleList()}>
          <div className="OptionsListHeaderTitle col-md-2">
            <button className="btn btn-secondary dropdown-toggle" aria-haspopup="true"
                   aria-expanded="false" type="button">{headerTitle}
            </button>
          </div>
        </div>

      </div>
    )
    */
  }
}

const mapStateToProps = state => {
  return {
    accountId: state.session.accountId,
    activeImpulseId: state.control.activeImpulseId,
    activeSparkId: state.control.activeSparkId
  };
};

export default connect(mapStateToProps, {
  createInvite,
  linkAccount
})(ImpulseOptions);
