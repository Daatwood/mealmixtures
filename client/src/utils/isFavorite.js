function isFavorite(user, recipe) {
	return +(user ? user.favorites.indexOf(recipe._id) !== -1 : false);
}
export default isFavorite;
