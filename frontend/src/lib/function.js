export const handleLoginWithGithub = () => {
	window.open("/api/auth/github", "_self");
};


export const handleLoginWithGoogle = () => {
	window.open("/api/auth/google", "_self");
};