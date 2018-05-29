import React, { Component } from 'react';
import './App.css';
import Guesses from './Guesses.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      refLengthPx:0,
      pxPerUnit:0,
      unknownLengthUnits:0,
      guessList:[],
      controls_inputValue:'',
      controls_showInput:true,
      controls_showInputError:false,
      controls_showPlayAgain: false,
      controls_showGuessButton: true,
      }
      
  }

  render() {
    console.log(this.state.unknownLengthPx * this.state.unitsPerPx)
    return (
      <div className="App">
        <div className="main_container" id="main_container">
          <div className="lines_containers">
            <div className="ref_line_container" style={{width: this.state.refLengthPx}}>
              <p>100</p>
              <div className="ref_line" style={{width: this.state.refLengthPx,height:"20px"}}></div>
            </div>
            <div className="guess_line_container">
              <p>{this.state.unknownLengthUnits}</p>
              <div className="guess_line" style={{width:(this.state.unknownLengthUnits * this.state.pxPerUnit) + "px", height:"20px"}}></div>
            </div>
          </div>
          
          <input type="text" id="guess_input" placeholder="1 to 100" value={this.state.controls_inputValue} onChange={this.handleChange} onKeyPress ={this.handleKeyPress}  disabled = {this.state.controls_showInput ? "" : "disabled" } />
          <div className="error_container">{this.state.controls_showInputError && <span>Enter a number between 1 and 100</span>}</div>
          <div className="guess_button_container">{this.state.controls_showGuessButton && <button id ="guess_button" onClick={this.enterGuess}>Guess</button>}</div>
          <div>
          {this.state.controls_showPlayAgain && <button onClick={this.onPlayAgain}>Play Again?</button>}
          </div>
            <Guesses guessList = {this.state.guessList}/>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log('asdf',document.getElementById("main_container").offsetWidth)
    this.setState(
      {
        refLengthPx: document.getElementById("main_container").offsetWidth,
        pxPerUnit: document.getElementById("main_container").offsetWidth/100,
        unknownLengthUnits: this.getNewLine(),
      }
    );
  }

  onPlayAgain = () => {
    this.setState({guessList:[],
                  inputValue:'',
                  controls_showPlayAgain:false,
                  controls_showGuessButton:true,
                  controls_showInput:true});
  }

  getNewLine = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.enterGuess();
    }
  }

  handleChange = (event) => {
    console.log(event.keyCode);
    let input = event.target.value;
    this.setState({controls_inputValue: input})
    if ((input > 0 && input <= 100 && input % 1 === 0) || (input.length === 0)) {
      this.setState({controls_showInputError:false})
    } else {
      this.setState({controls_showInputError:true})    }
  }


  enterGuess = () => {
    let input = document.getElementById("guess_input").value;
    if (input > 0 && input <= 100 && input % 1 === 0) {
      this.setState(
        {
            guessList: this.state.guessList.concat([{
              actual: this.state.unknownLengthUnits,
              userGuess: input,
          }]),
          controls_inputValue:''}
        ,this.reset);
    } else {
      this.setState({controls_showInputError:true})
    }
  }

  reset = () => {
    console.log('hey')
    if (this.state.guessList.length === 5 ) {
      this.setState({controls_showPlayAgain:true,
                     controls_showGuessButton:false,
                     controls_showInput:false});
    }
    this.setState({
        unknownLengthUnits: this.getNewLine(),
        refLengthPx: document.getElementById("main_container").offsetWidth,
        pxPerUnit: document.getElementById("main_container").offsetWidth/100,
    })
  }

  


}

export default App;
