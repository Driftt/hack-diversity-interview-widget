import ConversationActionTypes from './actionTypes'


export const startNewConversation = (message) => ({
  type: ConversationActionTypes.StartNewConversation,
  payload: { message },
})

export const goToConversation = (conversationId) => ({
  type: ConversationActionTypes.GoToConversation,
  payload: { conversationId },
})

export const closeSidebar = () => ({
  type: ConversationActionTypes.CloseSidebar,
})
