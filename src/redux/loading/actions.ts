export enum LoadingActionTypes {
  SET = "loading/set"
}

export interface SetLoadingAction {
  type: LoadingActionTypes.SET;
  payload: boolean;
}

export function setLoading(value: boolean): SetLoadingAction {
  return {
    type: LoadingActionTypes.SET,
    payload: value
  };
}

export type LoadingAction = SetLoadingAction;
