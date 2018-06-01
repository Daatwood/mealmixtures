import React from 'react';
import RecipeField from './RecipeField';
import { Button, Typography, IconButton, Paper } from '@material-ui/core';
import { List, ListItem, ListItemSecondaryAction } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import { Field } from 'redux-form';

export default ({ label, fields, meta: { error, submitFailed } }) => (
	<Paper>
		<List>
			<ListItem>
				<Typography variant="button">{label + 's'}</Typography>
				<ListItemSecondaryAction>
					<Button variant="fab" mini color="primary" aria-label="add" onClick={() => fields.push()}>
						<AddIcon />
					</Button>
				</ListItemSecondaryAction>
			</ListItem>
			{submitFailed && error && <ListItem style={{ color: 'red' }}>{error}</ListItem>}
			{fields.map((val, index) => (
				<ListItem key={index} dense>
					<Field name={val} type="text" component={RecipeField} label={`${label} #${index + 1}`} />
					<ListItemSecondaryAction>
						<IconButton aria-label={`Remove ${label}`} onClick={() => fields.remove(index)}>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</List>
	</Paper>
);
