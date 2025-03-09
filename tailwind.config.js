import PrimeUI from 'tailwindcss-primeui';
import themePrimitive from './src/theme/theme-primitive';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts}'],
	theme: {
		extend: {
			colors: {
				...themePrimitive,
			},
		},
	},
	plugins: [PrimeUI],
};
