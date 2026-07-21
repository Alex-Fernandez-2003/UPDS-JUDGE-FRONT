export type ContestProblemForm = {
  titulo: string
  tiempo: number
  memoria: number
}

export type CreateContestFormValues = {
  nombre: string
  descripcion: string
  fechaInicio: string
  duracionMinutos: number
  contrasena: string
  urlSetProblemas: string
  minutosCongelamiento: number
  codigo: string
  listaProblemas: ContestProblemForm[]
  archivoZip?: File
}

export type CreateContestResponse = {
  codigo: string
  mensaje: string
}

export const problemLetter = (index: number) =>
  String.fromCharCode('A'.charCodeAt(0) + index)
