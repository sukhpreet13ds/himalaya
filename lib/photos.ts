import credits from './photo-credits.json';
export type Photo = { src: string; small: string; alt: string; author: string; page: string; license: string; licenseUrl: string };
export const photos = credits as Record<string, Photo[]>;
export function photo(key: string, index = 0): Photo { return photos[key][index % photos[key].length]; }
