import React, { Component } from 'react';
import Container from "./components/Container/container";
import Board from "./components/Board/board";
import Clock from "./components/Clock/clock";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      play: false,
      solve: false,
      result: null,
      bestTime: "99:99",
    }
  }

  startGame = () => {
    this.setState({
      play: true,
      solve: false,
      result: null,
    });
  }

  endGame = (key) => {
    this.setState({
      play: false,
      solve: key === "solve",
    });
  }

  getResult = (result) => {
    if (result === "complete") {
        this.endGame();
    }

    if (result === "incomplete" && this.state.solve) {
      this.endGame();
      result = "solved"
    }

    this.setState({
      result: result,
    });
  }

  getTime = (time) => {
    if (time < this.state.bestTime && !this.state.solve) {
      this.setState({
        bestTime: time,
      });
    }
  }

  render() {
    return (
      <Container>

        <span className={`backgroundSpan result-${this.state.result}`}>

          <Board
            play={this.state.play}
            getResult={this.getResult}
            endGame={this.endGame}
          />

          <div className="buttons">

            {/* New Game */}

            <button
              className={`btn btn-dark btn-sm button shown-${!this.state.play}`}
              id="newGame"
              onClick={(event) => {
                event.preventDefault();
                this.startGame();
              }}
            >
              New Game
            </button>

            {/* Solve */}

            <button
              className={`btn btn-danger btn-sm button shown-${this.state.play}`}
              id="solveGame"
              onClick={(event) => {
                event.preventDefault();
                this.endGame("solve");
              }}
            >
              Solve
          </button>

          </div>

          <Clock
            start={this.startGame}
            play={this.state.play}
            getTime={this.getTime}
          />

          {this.state.bestTime !== "99:99" ? (
            <div id="bestTime">
                <p>BEST TIME</p>
                {this.state.bestTime}
            </div>
          ) : (
            <></>
          )}

        </span>

      </Container>
    )
  }
}

export default App;
