export type ContestProblemForm = {
  titulo: string
  tiempo: number
  memoria: number
}

export type EditableContestProblemForm = ContestProblemForm & {
  inciso: string
  cantidadCasosPrueba: number
  colorGlobo: string
}

export type EditContestFormValues = Omit<
  CreateContestFormValues,
  'codigo' | 'listaProblemas'
> & {
  codigo: string
  listaProblemas: EditableContestProblemForm[]
}

export type EditableContestDto = {
  codigo: string
  nombre: string
  descripcion: string
  fechaInicio: string
  duracionMinutos: number
  esPrivado: boolean
  urlSetProblemas: string
  minutosCongelamiento: number
  listaProblemas: EditableContestProblemForm[]
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

export type EstadoTiempoConcurso = 'Activo' | 'Proximo' | 'Finalizado'
export type EstadoTiempoAdmin = EstadoTiempoConcurso
export type FiltroEstadoConcurso =
  'todos' | 'activos' | 'proximos' | 'finalizados'
export type ModalidadConcurso = 'Publico' | 'Privado'

export type ConcursoListProblem = {
  inciso: string
  titulo: string
  colorGlobo: string
}

export type ConcursoListItem = {
  idConcurso: number
  nombre: string
  descripcion: string
  codigo: string
  estadoTiempo: EstadoTiempoConcurso
  modalidad: ModalidadConcurso
  fechaInicio: string
  fechaFin: string
  fechaCongelamiento: string
  duracionMinutos: number
  minutosCongelamiento: number
  cantidadProblemas: number
  cantidadParticipantes: number
  yaInscrito: boolean
  segundosRestantes: number | null
  miPuesto: number | null
  miProblemasResueltos: number | null
  /** Active problems returned by the administrative list for the balloon modal. */
  problemas?: ConcursoListProblem[]
}

export type ListConcursosParams = {
  filtro: FiltroEstadoConcurso
  modalidad?: ModalidadConcurso
  busqueda?: string
  pagina: number
  tamanoPagina: number
}

export type ListConcursosResponse = {
  total: number
  pagina: number
  tamanoPagina: number
  concursos: ConcursoListItem[]
}

export type ConcursosAdminResumen = {
  activos: number
  proximos: number
  finalizados: number
}

export const problemLetter = (index: number) =>
  String.fromCharCode('A'.charCodeAt(0) + index)
