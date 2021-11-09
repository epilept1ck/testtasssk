import { createStore, combineReducers } from "redux";

import { favouritesReducer, FavouritesState } from "./favourites";
import { loadingReducer, LoadingState } from "./loading";

export interface RootState {
  favourites: FavouritesState;
  loading: LoadingState;
}

export default (previousState?: Partial<RootState>) => {
  return createStore(
    combineReducers({ favourites: favouritesReducer, loading: loadingReducer }),
    previousState,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  );
};
