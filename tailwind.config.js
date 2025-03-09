import PrimeUI from 'tailwindcss-primeui';
import { themeFont } from './src/theme/theme-font';
import { themePrimitive } from './src/theme/theme-primitive';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts}'],
	theme: {
		extend: {
			colors: {
				...themePrimitive,
			},
			fontFamily: {
				...themeFont,
			},
		},
	},
	plugins: [PrimeUI],
};
