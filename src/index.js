import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';


import DriftWidget from './DriftWidget';
import messageReducer from './modules/message/reducer';
import messageEpic from './modules/message/epic';
import conversationReducer from './modules/conversation/reducer';
import conversationEpic from './modules/conversation/epic';

import './index.css';

const epicMiddleware = createEpicMiddleware();
const middlewareEnhancer = applyMiddleware(epicMiddleware);
const composedEnhancers = composeWithDevTools(middlewareEnhancer);

const store = createStore(
  combineReducers({
    message: messageReducer,
    conversation: conversationReducer,
  }),
  undefined,
  composedEnhancers,
)

window.store = store;

epicMiddleware.run(
  combineEpics(
    messageEpic,
    conversationEpic,
  )
)

ReactDOM.render(
  <Provider store={store}>
    <DriftWidget />
  </Provider>,
  document.getElementById('root')
);
