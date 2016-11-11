export function checkCorrectTheValue(nameG) {
	const name = (/^(([a-z-_0-9іьєї\']{1,7}\s?){1,4})$/ig).test(nameG);

	return name;
}
