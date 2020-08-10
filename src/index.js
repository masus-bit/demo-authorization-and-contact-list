import ReactDOM from "react-dom";
import React from "react";
import { reducer, Operations } from "./reducer/reducer.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../src/components/app/app.jsx";
import createApi from "../src/api/api.js";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { compose } from "recompose";

const api = createApi((...args) => store.dispatch(...args));
export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
store.dispatch(Operations.loadData());
store.dispatch(Operations.changeAuth());

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(`#root`)
  );
};

init();
