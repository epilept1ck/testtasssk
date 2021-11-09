import { Joke } from "models";

export enum FavouritesActionTypes {
  ADD = "favourites/add",
  REMOVE = "favourites/remove"
}

export interface AddFavouriteAction {
  type: FavouritesActionTypes.ADD;
  payload: Joke;
}

export function addFavourite(joke: Joke): AddFavouriteAction {
  return {
    type: FavouritesActionTypes.ADD,
    payload: joke
  };
}

export interface RemoveFavouriteAction {
  type: FavouritesActionTypes.REMOVE;
  payload: Joke;
}

export function removeFavourite(joke: Joke): RemoveFavouriteAction {
  return {
    type: FavouritesActionTypes.REMOVE,
    payload: joke
  };
}

export type FavouritesAction = AddFavouriteAction | RemoveFavouriteAction;
