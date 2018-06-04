import React from 'react';
import { ListItem, Checkbox, ListItemText, Typography } from '@material-ui/core';

function Ingredient({ ...props }) {
	const { step, text, boxStyle, itemStyle, textStyle, checked, ...rest } = props;
	return (
		<ListItem {...rest} role={undefined} dense button disableGutters>
			<Checkbox checked={checked} tabIndex={-1} className={boxStyle} />
			<ListItemText className={itemStyle}>
				<Typography variant="headline" className={textStyle}>
					{text}
				</Typography>
			</ListItemText>
		</ListItem>
	);
}
export default Ingredient;
