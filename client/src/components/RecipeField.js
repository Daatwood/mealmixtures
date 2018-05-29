import React from 'react';

export default ({ input, label, meta: { active, error, touched } }) => {
	return (
		<div>
			<label>{label}</label>

			<input {...input} />
			<span>{touched && error}</span>
		</div>
	);
};
