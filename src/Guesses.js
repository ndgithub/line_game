import React, { Component } from 'react';
import Record from './Record.js';


class Guesses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			guessList: [],
			controls_inputValue: '',
			controls_showInput: true,
			controls_showInputError: false,
			controls_showPlayAgain: false,
			controls_showGuessButton: true,
		}
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
		if (number >= 0 && number <= 100 && number % 1 === 0 && number.length !== 0) {
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
						actual: this.props.unknownLengthInUnits,
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

			console.log('aslfjkas;fdlkjsa;dlkfj sa;lkfj s;jf');

			this.props.newLine();
		}
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



	render() {
		const guesses = this.state.guessList.map((record, index) => {
			console.log(record.userGuess + "abracadabra");
			return <Record actual={record.actual}
				guess={record.userGuess}
				key={index} />
		});

		const error = this.state.guessList.reduce((totalError, record) => {
			return totalError + Math.abs(record.actual - record.userGuess);
		}, 0)

		let currentGuess = guesses.length < 5 ? guesses.length + 1 : 5;

		return (
			<div>
				<div className="input_container">
					<div className="input_error_container">{this.state.controls_showInputError && <span>Enter a number between 1 and 100</span>}</div>
				</div>
				<div className="stats">
					<div className="guess_list">
						<table>
							<tbody>
								<tr>
									<td>{this.state.controls_showInput &&
										<div><input type="text" id="input" value={this.state.controls_inputValue} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}
											disabled={this.state.controls_showInput ? "" : "disabled"} />
										</div>
									}</td>
									<td colSpan="2"><div className="guess_button_container">
										{this.state.controls_showGuessButton && <div id="guess_button" class="button" onClick={this.enterGuess}>Guess</div>}
										{this.state.controls_showPlayAgain && <div><div id="play_button" class="button" onClick={this.onPlayAgain}>Play Again?</div>
										 <div className="total_error">{`Total Error: ${error}`}</div></div>}
									</div></td>
								</tr>
								{guesses.reverse()}
								<tr>
									<td>You</td>
									<td>Actual</td>
									<td>Off By:</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="counter">{currentGuess + " out of 5"}</div>

				</div>
			</div>
		);
	}

}






export default Guesses;

