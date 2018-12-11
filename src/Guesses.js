import React from 'react';
import Record from './Record.js';


class Guesses extends React.Component {


	constructor(props) {
		super(props);
	}


	const guesses = props.guessList.map((record, index) => {
		return <Record actual={record.actual}
			guess={record.userGuess}
			key={index} />
	});

	const error = props.guessList.reduce((totalError, record) => {
		return totalError + Math.abs(record.actual - record.userGuess);
	}, 0)

	let currentGuess = guesses.length < 5 ? guesses.length + 1 : 5;
renderTable = () => {
	return (
		<table>
			<tr>
				<td>Actual</td>
				<td>You</td>
				<td>Off By</td>
			</tr>
			{guesses.map(guessObject => {
				return guessObject.actual
			})}
		</table>
	)
}

render() {

(
	<div className="stats">
		<div className="record_container">
			<div className="record_entry">
				<p>Actual</p>
			</div>
			<div className="record_entry">
				<p>You</p>
			</div>
			<div className="record_entry">
				<p>Off by:</p>
			</div>
		</div>

		<div className="guess_list">{guesses.reverse()}</div>

		<div className="counter">{currentGuess + " out of 5"}</div>
		<div className="total_error">{`Total Error: ${error}`}</div>
	</div>
);}



export default Guesses;