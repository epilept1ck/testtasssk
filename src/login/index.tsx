import React, { Component, FormEvent, ChangeEvent } from "react";

import styles from "./styles.scss";

const unwantedChars = new Set(["i", "l", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]);
const aCharCode = "a".charCodeAt(0);
const zCharCode = "z".charCodeAt(0);

interface Props {
  onLoginSuccess(): void;
}

interface State {
  password: string;
  isPasswordValid?: boolean;
  showPassword: boolean;
  validationMessage: string;
}

export default class Login extends Component<Props, State> {
  private inputRef!: HTMLInputElement;

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.togglePassword = this.togglePassword.bind(this);

    this.state = {
      password: "",
      showPassword: false,
      validationMessage: ""
    };
  }

  render() {
    return (
      <div className={styles.login}>
        <h1 className={styles.appTitle}>Chuck Norris Jokes</h1>

        <h2 className={styles.loginTitle}>Login</h2>

        <p className={styles.passwordRules}>Please enter a valid password to access the application</p>

        <form onSubmit={this.handleSubmit} className={styles.form} noValidate>
          <div className={styles.passwordInputContainer}>
            <input
              name="password"
              className={styles.passwordInput}
              type={this.state.showPassword ? "text" : "password"}
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              ref={(e: HTMLInputElement) => (this.inputRef = e)}
              required
            />

            <div className={styles.showPassword} onClick={this.togglePassword}>
              {this.state.showPassword ? "Hide" : "Show"}
            </div>
          </div>

          {this.state.isPasswordValid === false ? <p className={styles.validation}>Invalid Password</p> : null}

          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (this.state.isPasswordValid === true) {
      this.props.onLoginSuccess();
    } else if (typeof this.state.isPasswordValid === "undefined") {
      this.setState({ isPasswordValid: false });
    }
  }

  handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const isPasswordValid = this.isPasswordValid(e.currentTarget.value);

    this.setState({ password: e.currentTarget.value, isPasswordValid });
  }

  isPasswordValid(value: string): boolean {
    // validate length
    if (value.length > 32) return false;

    // validate casing
    if (value.toLowerCase() !== value) return false;

    if (this.containsUnwantedChars(value)) return false;

    if (!this.containsThreeLetterStraight(value)) return false;

    if (!this.containsTwoNonOverlappingPairs(value)) return false;

    return true;
  }

  containsUnwantedChars(value: string): boolean {
    for (const c of value) {
      const charCode = c.charCodeAt(0);
      const outOfAtoZ = charCode < aCharCode || charCode > zCharCode;

      if (unwantedChars.has(c) || outOfAtoZ) return true;
    }

    return false;
  }

  containsThreeLetterStraight(value: string): boolean {
    const numArr = Array.from(value).map(c => c.charCodeAt(0));

    let seqCount = 1;

    for (let i = 1; i < numArr.length; i++) {
      if (numArr[i] - numArr[i - 1] === 1) {
        seqCount++;
      } else {
        seqCount = 1;
      }

      if (seqCount === 3) {
        break;
      }

      if (i === numArr.length - 1) {
        return false;
      }
    }

    return true;
  }

  containsTwoNonOverlappingPairs(value: string): boolean {
    let firstPairStartingIndex: number | null = null;
    const end = value.length - 1;

    for (let i = 0; i < end; i++) {
      const current = value[i];
      const next = value[i + 1];

      if (current === next) {
        if (firstPairStartingIndex === null) {
          firstPairStartingIndex = i;
          continue; // continue finding the next one
        }

        const firstPairOverlapsThisPair = firstPairStartingIndex! + 1 === i;

        if (!firstPairOverlapsThisPair) {
          return true;
        }
      }
    }

    return false;
  }

  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
    this.inputRef.focus();
  }
}
