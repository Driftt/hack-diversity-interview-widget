import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { startNewConversation } from '../../modules/conversation/actions';

import './style.css'


class StartConversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInput: '',
    };
  }

  onMessageChange = (e) => {
    this.setState({
      messageInput: e.target.value,
    });
  }

  maybeSubmitOrCancel = (e) => {
    if (e.keyCode === 27) {
      e.preventDefault();
      this.props.onClose();
    } else if (e.keyCode === 13) {
      e.preventDefault();
      this.props.dispatcher.startNewConversation({
        body: this.state.messageInput,
        attributes: {
          sentFromGreeting: true,
        }
      });
    }
  }

  render() {
    const {
      onClose,
    } = this.props;

    const {
      messageInput,
    } = this.state;

    return (
      <Fragment>
        <div className="drift-widget-start-conversation">
          <div className="drift-widget-start-conversation--header">
            <h5>Hey there! <span role="img" aria-label="wave">👋</span> Have any questions? Ask away!</h5>
          </div>
          <div className="drift-widget-start-conversation--input-container">
            <input placeholder="Type and press enter to send" autoFocus onChange={this.onMessageChange} value={messageInput} onKeyDown={this.maybeSubmitOrCancel} />
          </div>
        </div>
        <div className="drift-widget-button" onClick={onClose}>
          <span role="img" aria-label="chat bubble">❌</span>
        </div>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    startNewConversation: (message) => dispatch(startNewConversation(message)),
  }
})


export default connect(null, mapDispatchToProps)(StartConversation);
