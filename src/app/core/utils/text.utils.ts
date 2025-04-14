export const pluralizeText = (itemsLength: number, text: string): string => {
	let result = itemsLength + ' ' + text;
	result += itemsLength > 1 ? 's' : '';

	return result;
};
