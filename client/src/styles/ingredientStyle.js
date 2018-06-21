import { grey } from '@material-ui/core/colors';

const ingredientStyle = (theme) => ({
	itemChecked: {
		textDecoration: 'line-through',
		color: theme.palette.secondary.dark
	},
	textChecked: {
		color: grey[400]
	},
	checkbox: {
		color: theme.palette.secondary.dark
	},
	checkboxChecked: {
		color: grey[400]
	}
});

export default ingredientStyle;
