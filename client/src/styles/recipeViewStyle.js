import { yellow, red } from '@material-ui/core/colors';

const recipeViewStyle = (theme) => ({
	root: {
		flexGrow: 1,
		paddingTop: '20px'
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'left',
		color: theme.palette.text.secondary
	},
	checked: {
		textDecoration: 'line-through'
	},
	size: {
		padding: theme.spacing.unit * 2,
		width: 80,
		height: 80
	},
	sizeIcon: {
		fontSize: 40
	},
	button: {
		margin: theme.spacing.unit
	},
	editButton: {
		color: theme.palette.getContrastText(yellow[500]),
		backgroundColor: yellow[500],
		'&:hover': {
			backgroundColor: yellow[700]
		}
	},
	deleteButton: {
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		'&:hover': {
			backgroundColor: red[700]
		}
	}
});
export default recipeViewStyle;
