import React from 'react';
import { connect } from 'react-redux';
import autosize from 'autosize';

import { MAX_MSG_LENGTH } from '../constants';
import { RightbarComponent, getTimeAMPM } from '../helpers';
import { updateMessage, deleteMessage, setActiveThreadId, setRightbarComponent }
  from '../actions/index';

class InspirationDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      edit: false,
      body: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  componentDidUpdate() {
    autosize(this.textarea);
  }

  handleChange(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const body = this.state.body.trim();
    if (!this.validate(body)) return;

    const message = this.getMessage();
    this.props.updateMessage(message.id, body)
    this.setState({ edit: false });
  }

  handleCancel() {
    this.setState({ edit: false });
  }

  handleEdit() {
    const message = this.getMessage();

    this.setState({ edit: true, body: message.body });
  }

  handleDelete() {
    const { impulses, activeImpulseId } = this.props;
    const message = this.getMessage();
    const mainThreadId = impulses[activeImpulseId].message_thread.id;
    this.props.setActiveThreadId(mainThreadId);
    this.props.setRightbarComponent(RightbarComponent.LIST);
    this.props.deleteMessage(message.id);
  }

  validate(body) {
    if (body.length > MAX_MSG_LENGTH
      || body === '') return false;
    return true;
  }

  getMessage() {
    const {activeThreadId,
      impulses, threads } = this.props;
    const activeThread = threads[activeThreadId];
    const impulseThread =
      threads[impulses[activeThread.impulse_id].message_thread.id];;
    const message = impulseThread.messages.find(message =>
      message.id == activeThread.parent_id);
    return message;
  }

  render() {
    const message = this.getMessage();

    const updateDate = new Date(message.updated_at);
    const spark = this.props.sparks[message.spark_id];

    let body = null;

    if (this.state.edit) {
      body = (
        <form>
          <div className="edit-text-wrapper">
            <textarea className="edit-text"
              type="textarea"
              rows="1"
              value={this.state.body}
              onChange={this.handleChange}
              placeholder="Idea goes here..."
              ref={el => this.textarea = el}/>
          </div>
          <div className="bar-buttons edit-buttons">
            <button className="bar-button edit-button"
              onClick={this.handleSubmit}>
              Update
            </button>
            <button className="bar-button edit-button"
              onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      );
    }
    else {
      body = (
        <div className="inspiration-card inspiration-card-details">
          <p className="inspiration-card-text">{message.body}</p>
        </div>
      );
    }

    return (
      <div className="inspiration-details">
        <div className="inspiration-list-header top-header">
          <div className="inspiration-list-info top-info">
            <h3 className="inspiration-list-title">{spark.name}'s inspiration</h3>
            <div className="inspiration-list-sub top-info-sub">
              <p>Last updated at {getTimeAMPM(updateDate)}</p>
            </div>
          </div>
          <div className="inspiration-details-buttons header-buttons">
            <div className="header-button" onClick={this.handleEdit}>
              <i className="fas fa-edit"></i>
            </div>
            <div className="header-button" onClick={this.handleDelete}>
              <i className="fas fa-trash"></i>
            </div>
          </div>
        </div>
        {body}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeImpulseId: state.control.activeImpulseId,
    activeThreadId: state.control.activeThreadId,
    threads: state.threads.threads,
    impulses: state.data.impulses,
    sparks: state.data.sparks
  };
};

export default connect(mapStateToProps, {
  updateMessage,
  deleteMessage,
  setActiveThreadId,
  setRightbarComponent
})(InspirationDetails);

