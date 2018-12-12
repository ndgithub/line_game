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
    }

  }

  render() {
    console.log(this.state.unknownLengthPx * this.state.unitsPerPx)
    return (
      <div className="App">
        <div className="title">Guess X</div>
        <div className="main_container container" id="main_container">
          <div className="row">
            
            <div id="bar_container" className="col-12 col-sm-8">
              <div className="top_scale"><div className="left">0</div><div className="right">100</div></div>
              <div className="ref_line" style={{ width: this.state.refLengthPx }}>
                <div className="guess_line" style={{ width: (this.state.unknownLengthInUnits * this.state.pxPerGameUnit) + "px" }}></div>
              </div>
              <div className="bottom_scale" style={{ width: (this.state.unknownLengthInUnits * this.state.pxPerGameUnit + 5) + "px" }}>x</div>
            </div>
            <div className="user_container col-12 col-sm-4">

              <div className="stats_container">
                <Guesses newLine={this.newLine} guessList={this.state.guessList} unknownLengthInUnits={this.state.unknownLengthInUnits} />
              </div>
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

  getNewLineLength = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  newLine = () => {
    this.setState({
      unknownLengthInUnits: this.getNewLineLength(),
      refLengthPx: document.getElementById("bar_container").offsetWidth,
      pxPerGameUnit: document.getElementById("bar_container").offsetWidth / 100,
    })
  }




}

export default App;
