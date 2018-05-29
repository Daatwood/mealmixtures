import React from 'react';
import RecipeField from './RecipeField';
import { Field } from 'redux-form';

export default ({ label, fields, meta: { error, submitFailed } }) => (
	<ul>
		<li>
			<button type="button" onClick={() => fields.push()}>
				Add {label}
			</button>
		</li>
		{fields.map((ingredient, index) => (
			<li key={index}>
				<button type="button" title={`Remove ${label}`} onClick={() => fields.remove(index)} />
				<Field name={ingredient} type="text" component={RecipeField} label={`${label} #${index + 1}`} />
			</li>
		))}
		{submitFailed && error && <li className="error">{error}</li>}
	</ul>
);
