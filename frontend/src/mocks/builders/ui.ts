export const buildUiFixture = (
  overrides: Partial<{ displayName: string; initials: string }> = {},
) => ({ displayName: 'Sample administrator', initials: 'SA', ...overrides })
