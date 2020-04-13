import React from 'react';
import { connect } from 'react-redux';

import SingleConversation from '../SingleConversation';
import { closeSidebar } from '../../modules/conversation/actions';
import './style.css';


const Sidebar = ({
  dispatcher: {
    closeSidebar,
  },
  sidebarView,
}) => (
  <div className="drift-sidebar-container">
    <div className="drift-sidebar-container--header">
      <div>Chat with us</div>
      <div className="drift-sidebar-header--close" onClick={closeSidebar}>x</div>
    </div>
    {sidebarView === 'CONVERSATION' && <SingleConversation />}
    {sidebarView === 'CONVERSATION_LIST' && <div>this is the list of conversations</div>}
  </div>
)

const mapStateToProps = state => ({
  sidebarView: state.conversation.sidebarView,
})

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    closeSidebar: () => dispatch(closeSidebar()),
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
