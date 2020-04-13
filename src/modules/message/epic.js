import { ofType, combineEpics } from 'redux-observable';
import { map, flatMap, startWith, catchError, pluck } from 'rxjs/operators';
import { from, of } from 'rxjs';

import MessageAPI from './api';
import * as MessageActions from './actions';
import MessageActionTypes from './actionTypes';
import { createBeforeServerMessage } from '../../utils';


/**************************************************
********** YOU DON'T NEED TO EDIT THIS FILE *******
**************************************************/



const sendMessage = (action$, store$) => action$.pipe(
  ofType(MessageActionTypes.SendMessage),
  pluck('payload'),
  map(createBeforeServerMessage),
  flatMap((message) => {
    return from(MessageAPI.sendMessage(message))
      .pipe(
        flatMap(({ messageFromServer }) => {
          return of(MessageActions.sendMessageSuccess({ messageFromServer }));
        }),
        catchError(({ messageFromServer, error }) => {
          return of(MessageActions.sendMessageFailed({ messageFromServer, error }));
        }),
        startWith(MessageActions.sendMessagePending({ message })),
      )
  })
)

export default combineEpics(
  sendMessage,
)
