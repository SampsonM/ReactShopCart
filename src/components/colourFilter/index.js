import React from 'react'

function colourFilter(props) {
	return (
		<select onChange={props.updateFilterColour} placeholder="Select an option">
			<option value="">Select colour</option>

			{props.colours.map((colour, i) => 
				<option key={i.toString()} value={colour}>{colour}</option>
			)}
		</select>
	)
}

export default colourFilter
