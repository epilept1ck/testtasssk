import { connect } from "react-redux";

import { Joke } from "models";
import { RootState } from "redux/store";
import { addFavourite } from "redux/favourites";
import { setLoading } from "redux/loading";

import App from "./app.component";

interface StateProps {
  favourites: Joke[];
  loading: boolean;
}

interface DispatchProps {
  addFavourite(joke: Joke): void;
  setLoading(value: boolean): void;
}

export default connect<StateProps, DispatchProps, {}, RootState>(
  state => ({ favourites: state.favourites, loading: state.loading }),
  { addFavourite, setLoading }
)(App);
