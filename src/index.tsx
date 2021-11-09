import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "./redux/store";
import App from "./app";
import "./styles.scss";

const storageKey = "favourite-chuckles";

const favouritesRaw = localStorage.getItem(storageKey);

let store: ReturnType<typeof createStore>;

if (favouritesRaw) {
  store = createStore({ favourites: JSON.parse(favouritesRaw) });
} else {
  store = createStore();
}

store.subscribe(() => {
  localStorage.setItem(storageKey, JSON.stringify(store.getState().favourites));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
