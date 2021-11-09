import React, { Component, ChangeEvent } from "react";
import { debounce } from "lodash";

import jokeService from "services/joke.service";
import { Joke } from "models";
import JokeList from "joke-list";

import styles from "./styles.scss";

interface Props {
  autoFav: boolean;
  favourites: Joke[];
  addFavourite(joke: Joke): void;
  startAddingFavourites(): void;
  stopAddingFavourites(): void;
  setLoading(value: boolean): void;
}

interface State {
  showInstructions: boolean;
  jokes: Joke[];
}

export default class Home extends Component<Props, State> {
  state = {
    showInstructions: true,
    jokes: []
  };

  constructor(props) {
    super(props);

    this.fetch10RandomJokes = debounce(this.fetch10RandomJokes.bind(this), 500);
    this.toggleInstructions = this.toggleInstructions.bind(this);
    this.handleAutoFavChange = this.handleAutoFavChange.bind(this);
  }

  render() {
    return (
      <>
        <div className={styles.instructionsHeader} onClick={this.toggleInstructions}>
          <h4 className={styles.instructionsTitle}>Instructions</h4>

          <span className={styles.instructionsToggle}>({this.state.showInstructions ? "Hide" : "Show"})</span>
        </div>

        {this.state.showInstructions ? (
          <ul className={styles.instructionList}>
            <li>Press the button to fetch 10 random jokes</li>
            <li>Add/Remove a joke to your favourites by clicking it</li>
            <li>You can also have a random joke added to your favourites every 5 seconds</li>
            <li>You can only have 10 favourite jokes at a time</li>
            <li>Go to your favourites from the top right icon</li>
          </ul>
        ) : null}

        <button className={styles.fetchJokesButton} onClick={this.fetch10RandomJokes}>
          Generate 10 Random Jokes
        </button>

        <div className={styles.autoFave}>
          <label htmlFor="auto-fave">
            <input type="checkbox" id="auto-fave" checked={this.props.autoFav} onChange={this.handleAutoFavChange} /> I
            don't know what I like, please pick a random favourite for me every 3 seconds.
          </label>
        </div>

        <JokeList jokes={this.state.jokes} />
      </>
    );
  }

  toggleInstructions() {
    this.setState({ showInstructions: !this.state.showInstructions });
  }

  fetch10RandomJokes() {
    this.props.setLoading(true);
    jokeService
      .getRandomJokes(10)
      .then(jokes => {
        setTimeout(() => this.props.setLoading(false), 1000);
        this.setState({ jokes });
      })
      .catch(e => {
        console.error(e);
        setTimeout(() => this.props.setLoading(false), 1000);
      });
  }

  handleAutoFavChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      this.props.startAddingFavourites();
    } else {
      this.props.stopAddingFavourites();
    }
  }
}
