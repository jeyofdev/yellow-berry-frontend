import PrimeUI from 'tailwindcss-primeui';
import { themeBreakpoints } from './src/theme/theme-breakpoints';
import { themeFont } from './src/theme/theme-font';
import { themePrimitive } from './src/theme/theme-primitive';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts}'],
	theme: {
		extend: {
			screens: {
				...themeBreakpoints,
			},
			colors: {
				...themePrimitive,
			},
			fontFamily: {
				...themeFont,
			},
			borderRadius: {
				'4xl': '30px',
			},
		},
	},
	plugins: [PrimeUI],
};
