# Hello Hack.Diversity!

This application is a mockup of the Drift widget. It's a sandbox that mimics the kind of environment you might see on day 1 as an engineer here.


## Prologue: The Best of the Best

The widget is the #1 value of Drift. It's our flagship product, the first impression, and the most important thing to keep up and running smoothly.

You are an engineer responsible for improving our widget. There are two important improvements we want to make to message sending in our widget:

1. Show the "message status" of the sent messages in the conversation view.
2. Build retry logic for failed sends of a message.

Someone who has since left Drift built the widget, leaving you to implement the core logic of these features without their guidance.

Work with your interview team (who can help you to navigate the project) to setup the app, and to complete the challenges below.

## Setup

1. Fork this repo
2. Install the react devtools from: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
3. Install the Redux devtools from: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
3. Install the dependencies with `yarn install`
4. Start the application with `yarn start`

If it starts correctly, your browser should automatically open to a localhost page with the widget.

## Your Goals

1. Complete as many of the challenges as you can. 
2. Submit your work by emailing a link to your repo to Drift along with anything you think we should know about your submission.

# Challenges

## Challenge 1: Widget Inspection

This is your warm-up. 🔥

⁉️️ Open up the JavaScript console and use the React and Redux debug tools to inspect the app

✅ Inspect the React tree to view a component's props & state.

## Challenge 2: Reverse order of messages

⁉️️ Messages appear in the conversation in reverse order - make them show in the correct order

✅ Messages appear (going top to bottom) oldest to newest

## Challenge 3: Group messages by timestamp

⁉️️ Our research shows that site visitors are confused about when they sent their messages

✅ Messages are grouped in 5 minute intervals

## Challenge 4: Add more context to messages

⁉️️ Our customers (who are also marketers) want to know more information about the site visitors

✅ Messages have more information in their "context"


# Resources

## React - primer

React allows you to create components that you can render as if they are HTML tags.

These components can take attributes from what renders them (props) and manage internal attributes (state).

Here is a quick tutorial for React: https://reactjs.org/tutorial/tutorial.html


## Redux - primer

Redux allows you to create a global application state (it's vague/broad on purpose).

React-Redux allows you to easily hook your React components to the global Redux store.

Here is a typical example of a component that gets props from the global store:


```javascript
import React from 'react'
import { connect } from 'react-redux'


const GlobalCounter = (props) => (
  <div>
    <div>Global count: {props.count}</div>
    <button onClick={props.globalIncrement}>Increment</button>
  </div>
)

// mapStateToProps is a way to map the global "state" to your local component's "props"
const mapStateToProps = state => {
  return {
    count: store.globalCounter.count,
  }
}

// mapDispatchToProps is a way to map the redux store's "dispatcher" to your local component's "props"
const mapDispatchToProps = dispatch => {
  return {
    globalIncrement: () => dispatch({ type: 'GLOBAL_INCREMENT' })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GlobalCounter)
```

To listen to the dispatcher, you'll need a reducer. Here is an example of a reducer that listens for the "GLOBAL_INCREMENT" action:

```javascript
// reducer.js

const defaultState = {
  count: 0,
}

// this is a "reducer" function, which takes its state and an action and is run every time the
// redux dispatcher receives an action. It takes its subtree of the redux state and must return
// the new value of the state
const globalCountReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'GLOBAL_INCREMENT':
      return { count: state.count + 1 }
    default:
      return state
  }
}
```

## RxJS

We use RxJS to do "asynchronous" work (such as API calls) triggered by our redux actions.

You can create what RxJS calls an "epic" to listen and respond to redux actions.

Here is an example:

```javascript
import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

import CounterAPI from './api';


// these are complicated, but the idea is that you're "streaming" actions and you need to return actions
// back to the stream
const tellServerThatIncrementHappened = (action$, store$) => action$.pipe(
  ofType('GLOBAL_INCREMENT'),
  // we use flatMap instead of just map here because the inner function returns an Observable, and
  // we want that to be "flattened" back to the stream
  flatMap(() => {
    // important to note that the epics get called after the reducers, so we have
    // the updated count value here
    const count = store$.getState().globalCount.count

    return from(CounterAPI.incrementTo(count))
      .pipe(
        // we could alternatively use "map" here instead of flatMap, and remove the
        // "of" function call inside this
        flatMap((res) => {
          // each of these are actions that get dispatched back into the redux store
          // and can be listened to by reducers
          return of({ type: 'GLOBAL_INCREMENT_SUCCESS', response: res })
        }),
        catchError((err) => {
          return of({ type: 'GLOBAL_INCREMENT_FAILED', response: err })
        }),
        startWith({ type: 'GLOBAL_INCREMENT_PENDING' }),
      )
  })
)

export default combineEpics(
  tellServerThatIncrementHappened,
)
```
