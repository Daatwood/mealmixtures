import { grey } from '@material-ui/core/colors';

const checkedListStyle = (theme) => ({
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'left',
		color: theme.palette.text.secondary
	},
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
	},
	checkbox: {
		color: theme.palette.secondary.dark
	},
	checkboxChecked: {
		color: grey[400]
	}
});

export default checkedListStyle;
