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
    template:
      '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    return 0;\n}',
    allowedExtensions: ['.cpp', '.py', '.cs'],
    preferredExtension: '.cpp',
  },
  {
    id: 2,
    label: 'Python 3',
    prismLanguage: 'python',
    template:
      'def solve():\n    pass\n\nif __name__ == "__main__":\n    solve()',
    allowedExtensions: ['.py'],
    preferredExtension: '.py',
  },
  {
    id: 3,
    label: 'C#',
    prismLanguage: 'csharp',
    template:
      'using System;\n\nclass Program {\n    static void Main() {\n    }\n}',
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
