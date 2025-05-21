export const allSizes = ['sm', 'm', 'lg'] as const;

export type Size = (typeof allSizes)[number];
