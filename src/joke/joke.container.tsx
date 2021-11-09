import { connect } from "react-redux";

import { Joke } from "models";
import { RootState } from "redux/store";
import { addFavourite, removeFavourite } from "redux/favourites";

import JokeComponent from "./joke.component";

interface StateProps {
  isFavourite: boolean;
  favouriteCount: number;
}

interface DispatchProps {
  addFavourite(joke: Joke): void;
  removeFavourite(joke: Joke): void;
}

interface OwnProps {
  joke: Joke;
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  (state, ownProps) => ({
    favouriteCount: state.favourites.length,
    isFavourite: state.favourites.some(j => j.id == ownProps.joke.id)
  }),
  { addFavourite, removeFavourite }
)(JokeComponent);
