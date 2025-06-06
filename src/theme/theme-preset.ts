import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';
import { MaterialBaseDesignTokens } from '@primeng/themes/material/base';
import { themePrimitive } from './theme-primitive';

const ThemePreset: MaterialBaseDesignTokens = definePreset(Material, {
	primitive: themePrimitive,
	semantic: {
		primary: {
			50: '{orange.50}',
			100: '{orange.100}',
			200: '{orange.200}',
			300: '{orange.300}',
			400: '{orange.400}',
			500: '{orange.500}',
			600: '{orange.600}',
			700: '{orange.700}',
			800: '{orange.800}',
			900: '{orange.900}',
			950: '{orange.950}',
		},
	},
});

export default ThemePreset;
