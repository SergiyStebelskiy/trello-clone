import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import { createLogger } from "redux-logger";
import { loadState, saveState } from "localStorage";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancer(applyMiddleware(createLogger()))
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
