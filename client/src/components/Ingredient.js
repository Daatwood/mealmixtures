import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, Checkbox, ListItemText, Typography } from '@material-ui/core';
import ingredientStyle from '../styles/ingredientStyle';

const Ingredient = ({ ...props }) => {
	const { classes, text, checked, ...rest } = props;
	const itemStyle = checked ? classes.itemChecked : null;
	const textStyle = checked ? classes.textChecked : null;
	const boxStyle = checked ? classes.checkboxChecked : classes.checkbox;
	return (
		<ListItem {...rest} role={undefined} dense button disableGutters>
			<Checkbox className={boxStyle} checked={checked} tabIndex={-1} />
			<ListItemText className={itemStyle}>
				<Typography variant="headline" className={textStyle}>
					{text}
				</Typography>
			</ListItemText>
		</ListItem>
	);
};
export default withStyles(ingredientStyle)(Ingredient);
