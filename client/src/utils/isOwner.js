function isOwner(user, recipe) {
	if (!user || !recipe) return false;
	return user._id === recipe._user;
}
export default isOwner;
