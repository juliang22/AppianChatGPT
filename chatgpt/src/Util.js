export function isHexCode(str) {
	return /^#([0-9A-F]{3}){1,2}$/i.test(str);
}

export function isValidUrl(str) {
	try {
		new URL(str);
		return true;
	} catch (e) {
		return false;
	}
}