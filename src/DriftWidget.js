import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import WidgetButton from './components/WidgetButton';
import StartConversation from './components/StartConversation';
import Sidebar from './components/Sidebar';
import './DriftWidget.css';


class DriftWidget extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isChatOpen: false,
    }
  }

  onOpenChat = () => {
    this.setState({
      isChatOpen: true,
    });
  }

  onCloseChat = () => {
    this.setState({
      isChatOpen: false,
    });
  }

  render() {
    const {
      isChatOpen,
    } = this.state;

    const {
      sidebarView,
    } = this.props;

    return (
      <div className="drift-widget-container">
        {sidebarView && isChatOpen && <Sidebar onClose={this.onCloseChat} />}
        {!sidebarView && isChatOpen && <StartConversation onClose={this.onCloseChat} onSubmit={this.onStartConversationSubmit} />}
        {!isChatOpen && <WidgetButton onClick={this.onOpenChat} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sidebarView: state.conversation.sidebarView,
})

export default connect(mapStateToProps)(DriftWidget);
