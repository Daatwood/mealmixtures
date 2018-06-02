import React from 'react';
import { ListItem, ListItemText, Typography, Avatar } from '@material-ui/core';

function Direction({ ...props }) {
	const { step, text, avatarStyle, itemStyle, textStyle, ...rest } = props;
	return (
		<ListItem {...rest} role={undefined} button dense>
			<Avatar className={avatarStyle}>{step}.</Avatar>
			<ListItemText className={itemStyle}>
				<Typography variant="body1" className={textStyle}>
					{text}
				</Typography>
			</ListItemText>
		</ListItem>
	);
}

export default Direction;
