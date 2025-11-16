// Simple helpers around localStorage for the weather app.
// Keys are centralized here to avoid typos across components.

const USER_KEY = "weather_user";
const LOGGED_IN_KEY = "weather_user_logged_in";

function safeParse(json) {
	// Parse with fallback to null
	try {
		return JSON.parse(json);
	} catch {
		return null;
	}
}

export function setUser(user) {
	// Store the user object as JSON
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
	const raw = localStorage.getItem(USER_KEY);
	return raw ? safeParse(raw) : null;
}

export function clearUser() {
	localStorage.removeItem(USER_KEY);
}

export function setLoggedIn(isLoggedIn) {
	localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(Boolean(isLoggedIn)));
}

export function isLoggedIn() {
	const raw = localStorage.getItem(LOGGED_IN_KEY);
	if (!raw) return false;
	const parsed = safeParse(raw);
	return Boolean(parsed);
}

export function logout() {
	// Only clear the login flag; keep registered user data unless explicitly removed
	localStorage.removeItem(LOGGED_IN_KEY);
}

export const storageKeys = {
	user: USER_KEY,
	loggedIn: LOGGED_IN_KEY,
};

export default {
	setUser,
	getUser,
	clearUser,
	setLoggedIn,
	isLoggedIn,
	logout,
	storageKeys,
};


