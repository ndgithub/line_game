import React, { Component } from 'react';
import './App.css';
import Guesses from './Guesses.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      refLengthPx: 0,
      pxPerGameUnit: 0,
      unknownLengthInUnits: 0,
      guessList: [],
      controls_inputValue: '',
      controls_showInput: true,
      controls_showInputError: false,
      controls_showPlayAgain: false,
      controls_showGuessButton: true,
      controls_guessButtonText: "Guess",
    }

  }

  render() {
    console.log(this.state.unknownLengthPx * this.state.unitsPerPx)
    return (
      <div className="App">
        <div className="title">MEASURE</div>
        <div className="main_container" id="main_container">
          <div id="bar_container">
            <div className="top_scale"><div className="left">0</div><div className="right">100</div></div>
            <div className="ref_line" style={{ width: this.state.refLengthPx }}>
              <div className="guess_line" style={{ width: (this.state.unknownLengthInUnits * this.state.pxPerGameUnit) + "px" }}></div>
            </div>
            <div className="bottom_scale" style={{ width: (this.state.unknownLengthInUnits * this.state.pxPerGameUnit + 5) + "px" }}>x</div>
          </div>
          <div className="user_container">
            <div className="input_container">
              {this.state.controls_showInput &&
                <div>
                  <span>x = </span>
                  <input type="text" id="input" value={this.state.controls_inputValue} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}
                    disabled={this.state.controls_showInput ? "" : "disabled"} />
                </div>
              }
              <div className="input_error_container">{this.state.controls_showInputError && <span>Enter a number between 1 and 100</span>}</div>
              <div className="guess_button_container">
                {this.state.controls_showGuessButton && <button id="guess_button" onClick={this.enterGuess}>{this.state.controls_guessButtonText}</button>}
                {this.state.controls_showPlayAgain && <button onClick={this.onPlayAgain}>Play Again?</button>}
              </div>
            </div>
            <div className="stats_container">
              <Guesses guessList={this.state.guessList} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState(
      {
        refLengthPx: document.getElementById("bar_container").offsetWidth,
        pxPerGameUnit: document.getElementById("bar_container").offsetWidth / 100,
        unknownLengthInUnits: this.getNewLineLength(),
      }
    );
    window.addEventListener("resize", this.handleWindowResize);;
  }

  handleWindowResize = () => {
    this.setState({
      refLengthPx: document.getElementById("bar_container").offsetWidth,
      pxPerGameUnit: document.getElementById("bar_container").offsetWidth / 100
    });
  }

  onPlayAgain = () => {
    this.setState({
      guessList: [],
      inputValue: '',
      controls_showPlayAgain: false,
      controls_showGuessButton: true,
      controls_showInput: true
    });
  }

  getNewLineLength = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.enterGuess();
    }
  }

  handleInputChange = (event) => {
    console.log(event.keyCode);
    let input = event.target.value;
    this.setState({ controls_inputValue: input })
    if (this.validInput(input)) {
      this.setState({ controls_showInputError: false })
    } else {
      this.setState({ controls_showInputError: true })
    }
  }

  validInput = (number) => {
    console.log("asd;lf" + number)
    if (number >= 0 && number <= 100 && number % 1 === 0 && number.length != 0) {
      return true;
    } else {
      return false;
    }
  }
  enterGuess = () => {
    let input = document.getElementById("input").value;
    if (this.validInput(input)) {
      this.setState(
        {
          guessList: this.state.guessList.concat([{
            actual: this.state.unknownLengthInUnits,
            userGuess: input,
          }]),
          controls_inputValue: ''
        }
        , this.reset);
    } else {
      this.setState({ controls_showInputError: true })
    }
  }

  reset = () => {
    console.log('resetting')
    if (this.state.guessList.length === 5) {
      this.setState({
        controls_showPlayAgain: true,
        controls_showGuessButton: false,
        controls_showInput: false
      });
    } else {
      this.setState({
        unknownLengthInUnits: this.getNewLineLength(),
        refLengthPx: document.getElementById("bar_container").offsetWidth,
        pxPerGameUnit: document.getElementById("bar_container").offsetWidth / 100,
      })
    }
  }




}

export default App;
