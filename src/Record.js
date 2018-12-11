import React from 'react';
import "./index.css";

const Record = (props) => {
	console.log('actual', props.actual);
	console.log('guess', props.guess);
	return (
		<tr>
			<td>{props.guess}</td>
			<td>{props.actual}</td>
			<td>{props.guess - props.actual}</td>
		</tr>

		)

}

export default Record;