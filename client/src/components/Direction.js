import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Typography, Avatar } from '@material-ui/core';
import directionStyle from '../styles/directionStyle';

const Direction = ({ ...props }) => {
	const { classes, step, text, checked, ...rest } = props;
	const itemStyle = checked ? classes.itemChecked : null;
	const textStyle = checked ? classes.textChecked : null;
	const avatarStyle = checked ? classes.checkedAvatar : classes.avatar;
	return (
		<ListItem {...rest} role={undefined} button dense>
			<Avatar className={avatarStyle}>{step}.</Avatar>
			<ListItemText className={itemStyle}>
				<Typography variant="subheading" className={textStyle}>
					{text}
				</Typography>
			</ListItemText>
		</ListItem>
	);
};

export default withStyles(directionStyle)(Direction);
