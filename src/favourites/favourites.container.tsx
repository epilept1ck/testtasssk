import { connect } from "react-redux";

import { Joke } from "models";
import { RootState } from "redux/store";

import Favourites from "./favourites.component";

interface StateProps {
  favourites: Joke[];
}

export default connect<StateProps, {}, {}, RootState>(state => ({ favourites: state.favourites }))(Favourites);
