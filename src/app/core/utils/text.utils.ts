export const pluralizeText = (itemsLength: number, text: string): string => {
	let result = itemsLength + ' ' + text;
	result += itemsLength > 1 ? 's' : '';

	return result;
};

export const capitalizeFirstLetter = (text: string): string => {
	const formatText = text.replaceAll('-', ' ');

	return formatText.slice(0, 1).toUpperCase() + formatText.slice(1).toLowerCase();
};
