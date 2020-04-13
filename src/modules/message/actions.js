import MessageActionTypes from './actionTypes'


export const sendMessage = (message) => ({
  type: MessageActionTypes.SendMessage,
  payload: { message },
})

export const sendMessagePending = ({ message }) => ({
  type: MessageActionTypes.SendMessagePending,
  payload: { message },
})

export const sendMessageFailed = ({ messageFromServer, error }) => ({
  type: MessageActionTypes.SendMessageFailed,
  payload: { messageFromServer, error },
})

export const sendMessageSuccess = ({ messageFromServer }) => ({
  type: MessageActionTypes.SendMessageSuccess,
  payload: { messageFromServer },
})
