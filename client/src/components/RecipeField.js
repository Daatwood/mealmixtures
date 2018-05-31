import React from 'react';

import { TextField } from '@material-ui/core';

export default ({ input, label, multiline, meta: { active, error, touched } }) => {
	return (
		<TextField
			{...input}
			error={touched && !!error}
			helperText={touched && error}
			id="error"
			label={label}
			multiline={multiline}
			fullWidth
		/>
	);
};
