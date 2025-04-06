import { WeightEnum } from '@enum/weight.enum';

export const parseWeightStringToEnumKey = (weightStr: string): keyof typeof WeightEnum | undefined => {
	weightStr = weightStr.trim().toLowerCase();

	let grams: number | null = null;

	if (weightStr.endsWith('kg')) {
		const kg = parseFloat(weightStr.replace('kg', ''));
		grams = Math.round(kg * 1000);
	} else if (weightStr.endsWith('g')) {
		grams = parseInt(weightStr.replace('g', ''));
	}

	for (const [key, value] of Object.entries(WeightEnum)) {
		if (value === grams) {
			return key as keyof typeof WeightEnum;
		}
	}

	return undefined;
};
