import React from 'react';
import "./index.css";

const Record = (props) => {
	console.log('actual', props.actual);
	console.log('guess', props.guess);
	return (
<<<<<<< HEAD
		<div className="record_container">

			<div className="record_actual record_entry">
				<p>{props.actual}</p>
			</div>

			<div className="record_guess record_entry">
				<p>{props.guess}</p>
			</div>

			<div className="record_difference record_entry">
				<p>{props.guess - props.actual}</p>
			</div>
		</div>
	)
=======
		<tr>
			<td>{props.actual}</td>
			<td>{props.guess}</td>
			<td>{props.guess - props.actual}</td>
		</tr>

		)
>>>>>>> stats_table

}

export default Record;