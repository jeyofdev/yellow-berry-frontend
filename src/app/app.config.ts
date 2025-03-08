import {
	type ApplicationConfig,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import ThemePreset from './theme/theme-preset';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: ThemePreset,
				options: {
					cssLayer: {
						name: 'primeng',
						order: 'base, components, primeng, utilities',
					},
				},
			},
		}),
	],
};
