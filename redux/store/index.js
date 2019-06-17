import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { configurePusher } from "pusher-redux";
import { logger } from "redux-logger";

const initialState = {};

const middleware = [thunk, logger];

const enhencers =
  typeof window == "undefined"
    ? compose(applyMiddleware(...middleware))
    : compose(
        applyMiddleware(...middleware)
        // window.__REDUX_DEVTOOLS_EXTENSION__ &&
        //   window.__REDUX_DEVTOOLS_EXTENSION__()
      );

const store = createStore(rootReducer, initialState, enhencers);

export default store;
