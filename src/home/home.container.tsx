import { connect } from "react-redux";

import { Joke } from "models";
import { RootState } from "redux/store";
import { addFavourite } from "redux/favourites";
import { setLoading } from "redux/loading";

import Home from "./home.component";

interface StateProps {
  favourites: Joke[];
}

interface DispatchProps {
  addFavourite(joke: Joke): void;
  setLoading(value: boolean): void;
}

interface OwnProps {
  autoFav: boolean;
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({ favourites: state.favourites }),
  { addFavourite, setLoading }
)(Home);
