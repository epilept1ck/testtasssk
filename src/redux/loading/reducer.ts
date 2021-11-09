import { LoadingState, initialLoadingState } from "./state";
import { LoadingActionTypes, LoadingAction } from "./actions";

export function loadingReducer(state = initialLoadingState, action: LoadingAction): LoadingState {
  switch (action.type) {
    case LoadingActionTypes.SET: {
      return action.payload;
    }

    default:
      return state;
  }
}
