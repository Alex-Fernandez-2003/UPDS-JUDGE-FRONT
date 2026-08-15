export type SubmissionLanguageConfig = {
  id: number
  label: string
  prismLanguage: 'cpp' | 'python' | 'csharp'
  template: string
  allowedExtensions: readonly string[]
  preferredExtension: string
}

export const MAX_SOURCE_FILE_SIZE_BYTES = 2 * 1024 * 1024

export const LANGUAGE_CONFIGS: readonly SubmissionLanguageConfig[] = [
  {
    id: 1,
    label: 'C++ 17',
    prismLanguage: 'cpp',
    template: '',
    allowedExtensions: ['.cpp', '.py', '.cs'],
    preferredExtension: '.cpp',
  },
  {
    id: 2,
    label: 'Python 3',
    prismLanguage: 'python',
    template: '',
    allowedExtensions: ['.py'],
    preferredExtension: '.py',
  },
  {
    id: 3,
    label: 'C#',
    prismLanguage: 'csharp',
    template: '',
    allowedExtensions: ['.cs'],
    preferredExtension: '.cs',
  },
] as const

export const getLanguageConfig = (id: number) =>
  LANGUAGE_CONFIGS.find((language) => language.id === id)

export const sourceFilenameForLanguage = (id: number) => {
  const extension = getLanguageConfig(id)?.preferredExtension
  return extension ? `solucion${extension}` : 'solucion'
}

export const allSourceExtensions = Array.from(
  new Set(
    LANGUAGE_CONFIGS.flatMap(({ allowedExtensions }) => allowedExtensions),
  ),
)
