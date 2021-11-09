import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import { Joke } from "models";
import Loading from "loading";
import Home from "home";
import Favourites from "favourites";
import jokeService from "services/joke.service";

import styles from "./styles.scss";

interface Props {
  favourites: Joke[];
  addFavourite(joke: Joke): void;
  loading: boolean;
  setLoading(value: boolean): void;
}

interface State {
  autoFav: boolean;
  jokes: Joke[];
  showFavTitle: boolean;
  isLoggedIn: boolean;
}

export default class App extends Component<Props, State> {
  private intervalId?: number;

  state = {
    autoFav: false,
    jokes: [],
    showFavTitle: window.innerWidth >= 650,
    isLoggedIn: false
  };

  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
    this.startAddingToFavourites = this.startAddingToFavourites.bind(this);
    this.stopAddingToFavourites = this.stopAddingToFavourites.bind(this);
    this.addRandomJokeToFavourites = this.addRandomJokeToFavourites.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);

    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.loading ? <Loading /> : null}

        <header className={styles.header}>
          <h3 className={styles.title}>
            <Link to="/">Chuck Norris Jokes</Link>
          </h3>

          <div className={styles.favourites}>
            <Link to="/favourites">
              {this.state.showFavTitle ? <div className={styles.favouritesTitle}>Favourites</div> : null}

              <svg width="24" height="24">
                <path
                  fill="#fff"
                  d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
                />
              </svg>

              <div className={styles.favouriteCount}>{this.props.favourites.length}</div>
            </Link>
          </div>
        </header>

        <main className={styles.mainContent}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Home
                  autoFav={this.state.autoFav}
                  startAddingFavourites={this.startAddingToFavourites}
                  stopAddingFavourites={this.stopAddingToFavourites}
                />
              )}
            />
            <Route path="/favourites" component={Favourites} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }

  handleLoginSuccess() {
    this.setState({ isLoggedIn: true });
  }

  handleResize() {
    this.setState({ showFavTitle: window.innerWidth >= 650 });
  }

  startAddingToFavourites() {
    this.setState({ autoFav: true });

    this.intervalId = window.setInterval(this.addRandomJokeToFavourites, 5000);

    this.addRandomJokeToFavourites();
  }

  stopAddingToFavourites() {
    this.setState({ autoFav: false });

    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  addRandomJokeToFavourites() {
    if (this.props.favourites.length < 10) {
      this.props.setLoading(true);

      jokeService
        .getRandomJokes(1)
        .then(jokes => {
          setTimeout(() => this.props.setLoading(false), 3000);

          if (this.props.favourites.length < 10) {
            // if joke exists in favourites
            if (this.props.favourites.some(j => j.id === jokes[0].id)) {
              // try again
              this.addRandomJokeToFavourites();
            } else {
              // otherwise add to favourites
              this.props.addFavourite(jokes[0]);
            }
          }
        })
        .catch(e => {
          console.error(e);
          setTimeout(() => this.props.setLoading(false), 1000);
        });
    }
  }
}
