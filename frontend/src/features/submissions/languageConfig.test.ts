import { describe, expect, it } from 'vitest'
import {
  LANGUAGE_CONFIGS,
  MAX_SOURCE_FILE_SIZE_BYTES,
  getLanguageConfig,
} from './languageConfig'
import { validateSubmitSolution } from './schemas/sumbitSolution'

describe('submission language configuration', () => {
  it('is the canonical source for labels, Prism keys, templates, and extensions', () => {
    expect(LANGUAGE_CONFIGS.map(({ id, label }) => [id, label])).toEqual([
      [1, 'C++ 17'],
      [2, 'Python 3'],
      [3, 'C#'],
    ])
    expect(getLanguageConfig(1)?.allowedExtensions).toEqual([
      '.cpp',
      '.py',
      '.cs',
    ])
    expect(getLanguageConfig(2)).toMatchObject({
      prismLanguage: 'python',
      preferredExtension: '.py',
    })
    expect(getLanguageConfig(3)).toMatchObject({
      prismLanguage: 'csharp',
      preferredExtension: '.cs',
    })
  })

  it('exposes exactly the canonical aggregate source extensions', async () => {
    const { allSourceExtensions } = await import('./languageConfig')
    expect(allSourceExtensions).toEqual(['.cpp', '.py', '.cs'])
  })

  it.each([
    [1, 'solution.cpp'],
    [1, 'SOLUTION.CPP'],
    [2, 'solution.py'],
    [2, 'SOLUTION.PY'],
    [3, 'solution.cs'],
    [3, 'SOLUTION.CS'],
  ])(
    'accepts a matching language extension for language %s: %s',
    (id, name) => {
      expect(
        validateSubmitSolution({
          incisoProblema: 'A',
          idLenguaje: id,
          mode: 'upload',
          file: new File(['code'], name),
        }),
      ).toEqual({ isValid: true, errors: {} })
    },
  )

  it.each(['solution.cc', 'solution.cxx', 'solution.c'])(
    'rejects the removed C++ alias %s',
    (name) => {
      expect(
        validateSubmitSolution({
          incisoProblema: 'A',
          idLenguaje: 1,
          mode: 'upload',
          file: new File(['code'], name),
        }).errors.file,
      ).toMatch(/no corresponde/)
    },
  )

  it('rejects an extension belonging to a different language', () => {
    expect(
      validateSubmitSolution({
        incisoProblema: 'A',
        idLenguaje: 2,
        mode: 'upload',
        file: new File(['code'], 'solution.cpp'),
      }).errors.file,
    ).toMatch(/no corresponde/)
  })

  it('enforces the existing 2 MiB UI limit', () => {
    const tooLarge = new File(
      [new Uint8Array(MAX_SOURCE_FILE_SIZE_BYTES + 1)],
      'solution.py',
    )
    expect(
      validateSubmitSolution({
        incisoProblema: 'A',
        idLenguaje: 2,
        mode: 'upload',
        file: tooLarge,
      }).errors.file,
    ).toMatch(/2 MiB/)
  })
})
