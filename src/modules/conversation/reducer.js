import ConversationActionTypes from './actionTypes';


const SIDEBAR_VIEWS = {
  CONVERSATION: 'CONVERSATION',
  CONVERSATION_LIST: 'CONVERSATION_LIST',
}


const defaultState = {
  selectedConversation: null,
  sidebarView: null,
};

const conversationReducer = (state = defaultState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case ConversationActionTypes.GoToConversation:
      newState.selectedConversation = action.payload.conversationId;
      newState.sidebarView = SIDEBAR_VIEWS.CONVERSATION;
      return newState;
    case ConversationActionTypes.CloseSidebar:
      newState.selectedConversation = null;
      newState.sidebarView = null;
      return newState;
    default:
      return state;
  }
};

export default conversationReducer;
