import { grey } from '@material-ui/core/colors';

const directionStyle = (theme) => ({
	itemChecked: {
		textDecoration: 'line-through',
		color: theme.palette.secondary.dark
	},
	textChecked: {
		color: grey[400]
	},
	avatar: {
		backgroundColor: theme.palette.secondary.dark
	},
	avatarChecked: {
		backgroundColor: grey[400]
	}
});

export default directionStyle;
