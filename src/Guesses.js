import React from 'react';
import Record from './Record.js';



const Guesses = (props) => {
	
	const guesses = props.guessList.map((record,index) => {
			return <Record actual = {record.actual} 
										 guess = {record.userGuess} 
										 key = {index} />
	});
	
	const error = props.guessList.reduce((totalError,record) => {
			return totalError + Math.abs(record.actual - record.userGuess);
		},0)
	
	let currentGuess = guesses.length < 5 ? guesses.length + 1 : 5;
	return (
		<div className="stats">
			<div className="guess_list">{guesses}</div>
			<div className="counter">{currentGuess + " out of 5"}</div>
			<div className = "total_error">{`Total Error: ${error}`}</div>
		</div>
		); 
}


export default Guesses;