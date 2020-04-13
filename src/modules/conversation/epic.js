import { ofType, combineEpics } from 'redux-observable';
import { flatMap, pluck } from 'rxjs/operators';

import * as MessageActions from '../message/actions';
import * as ConversationActions from './actions';
import ConversationActionTypes from './actionTypes';
import { randomID } from '../../utils';


/**************************************************
********** YOU DON'T NEED TO EDIT THIS FILE *******
**************************************************/


const startNewConversation = (action$, store$) => action$.pipe(
  ofType(ConversationActionTypes.StartNewConversation),
  pluck('payload'),
  flatMap(({ message }) => {
    // normally we might get the conversation Id from the server, but for this demo app, we're generating it here
    const conversationId = randomID();
    message.conversationId = conversationId;
    return [
      MessageActions.sendMessage(message),
      ConversationActions.goToConversation(conversationId)
    ]
  })
)

export default combineEpics(
  startNewConversation,
)
