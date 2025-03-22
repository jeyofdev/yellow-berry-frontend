import { type ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from '@routes/app.routes';
import ThemePreset from '@theme/theme-preset';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: ThemePreset,
				options: {
					cssLayer: {
						name: 'primeng',
						order: 'tailwind-base, primeng, tailwind-utilities',
					},
				},
			},
		}),
	],
};
