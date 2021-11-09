import React, { Component } from "react";
import { unescape } from "lodash";
import cx from "classnames";

import { Joke as JokeModel } from "models";

import styles from "./styles.scss";

interface Props {
  joke: JokeModel;
  favouriteCount: number;
  isFavourite: boolean;
  addFavourite(joke: JokeModel): void;
  removeFavourite(joke: JokeModel): void;
}

interface State {
  shaking: boolean;
}

export default class Joke extends Component<Props, State> {
  state = {
    shaking: false
  };

  constructor(props) {
    super(props);

    this.addOrRemoveFavourite = this.addOrRemoveFavourite.bind(this);
  }

  componentDidUpdate(_: Readonly<Props>, prevState: Readonly<State>) {
    if (this.state.shaking && !prevState.shaking) {
      setTimeout(() => this.setState({ shaking: false }), 500);
    }
  }

  render() {
    const Heart = this.props.isFavourite ? HeartFilled : HeartOutline;

    return (
      <div
        className={cx(
          styles.joke,
          this.props.isFavourite && styles.jokeFavourite,
          this.state.shaking && styles.jokeCantFave
        )}
        onClick={this.addOrRemoveFavourite}
      >
        <div className={styles.favouriteIcon}>
          <Heart />
        </div>

        <div className={styles.jokeText}>{unescape(this.props.joke.joke)}</div>
      </div>
    );
  }

  addOrRemoveFavourite() {
    if (this.props.isFavourite) {
      this.props.removeFavourite(this.props.joke);
    } else if (this.props.favouriteCount < 10) {
      this.props.addFavourite(this.props.joke);
    } else if (!this.state.shaking) {
      this.setState({ shaking: true });
    }
  }
}

function HeartOutline() {
  return (
    <svg width="24" height="24">
      <path
        fill="#ff5e5e"
        d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
      />
    </svg>
  );
}

function HeartFilled() {
  return (
    <svg width="24" height="24">
      <path
        fill="#ff5e5e"
        d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
      />
    </svg>
  );
}
