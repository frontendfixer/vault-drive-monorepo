/* eslint-disable @typescript-eslint/no-explicit-any */
import z from 'zod'

// import { getAllSettings } from '@/actions/admin/system-parameters';

const constantsSchema = z.object({
	ICON_SIZE: z.number(),
	GRID_ICON_SIZE: z.number(),
	GRID_ICON_SIZE_MOBILE: z.number(),
	FOLDER_ICON_SIZE: z.number(),
	MAX_RETRIES: z.number(),
	MAX_FILE_SIZE: z.number(),
	MAX_FILES: z.number(),
	MAX_CONCURRENT_UPLOADS: z.number(),
	MAX_FILE_SIZE_FOR_FOLDER_UPLOAD: z.number(),
	MAX_FILES_FOR_FOLDER_UPLOAD: z.number(),
	MAX_CONCURRENT_UPLOADS_FOR_FOLDER: z.number(),
	DEFAULT_SETTINGS: z.object({
		language: z.string(),
		theme: z.enum(['default', 'dracula', 'perpetuity', 'mocha-mousse']),
	}),
})

export type Constants = z.infer<typeof constantsSchema>
export type ConstantsKeys = keyof Constants

const defaultConstants: z.infer<typeof constantsSchema> = {
	ICON_SIZE: 30,
	GRID_ICON_SIZE: 220,
	GRID_ICON_SIZE_MOBILE: 180,
	FOLDER_ICON_SIZE: 30,
	MAX_RETRIES: 3,
	MAX_FILE_SIZE: 2 * 1024 * 1024 * 1024, // 2GB
	MAX_FILES: 30,
	MAX_CONCURRENT_UPLOADS: 5,
	MAX_FILE_SIZE_FOR_FOLDER_UPLOAD: 50 * 1024 * 1024, // 50MB
	MAX_FILES_FOR_FOLDER_UPLOAD: 30,
	MAX_CONCURRENT_UPLOADS_FOR_FOLDER: 5,

	DEFAULT_SETTINGS: {
		language: 'en',
		theme: 'default',
	},
}

const lastFetchedAt = 0
// Allow lazy-loading overrides from DB
let cachedConstants: z.infer<typeof constantsSchema> | null = null

export async function updateCachedConstants(params: Partial<Constants>) {
	cachedConstants = constantsSchema.parse({
		...{ ...(cachedConstants ?? defaultConstants) },
		...params,
	})
}

// export async function getConstants(): Promise<z.infer<typeof constantsSchema>> {
//   const now = Date.now();
//   if (cachedConstants && now - lastFetchedAt < 5 * 60 * 1000) {
//     return cachedConstants;
//   }

//   try {
//     const dbSettings = await getAllSettings();
//     const dbSettingsObject = dbSettings.reduce<Record<string, any>>(
//       (acc, setting) => {
//         acc[setting.key] = parseSetting(setting.value);
//         return acc;
//       },
//       {},
//     );

//     const merged = {
//       ...defaultConstants,
//       ...dbSettingsObject,
//     };

//     lastFetchedAt = now;
//     cachedConstants = constantsSchema.parse(merged);
//     return cachedConstants;
//   } catch (error) {
//     console.warn(
//       '⚠️ Failed to load DB constants, falling back to defaults',
//       error,
//     );
//     return defaultConstants;
//   }
// }

// Helper: parse number, JSON, or fallback to string
function parseSetting(value: any): any {
	if (typeof value === 'string') {
		try {
			return JSON.parse(value)
		} catch {
			const num = Number(value)
			return isNaN(num) ? value : num
		}
	}
	return value
}

export const CONSTANTS = constantsSchema.parse(defaultConstants)
