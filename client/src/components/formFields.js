export default [
	{ label: 'Recipe Name', name: 'title', required: true },
	{ label: 'Recipe Description', name: 'description', required: true },
	{ label: 'Ingredient', name: 'ingredients', isArray: true, required: true },
	{ label: 'Direction', name: 'directions', isArray: true, required: true }
];
