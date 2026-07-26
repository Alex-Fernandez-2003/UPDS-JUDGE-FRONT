export interface HistoryItem {
  idEnvio: number
  concursoCodigo: string
  problemaTitulo: string
  inciso: string
  lenguaje: string
  veredicto: string
  consumoTiempo: number
  consumoMemoria: number
  fechaEnvio: string
}

export interface HistoryParams {
  resultado?: 'AC' | 'WA' | 'TLE' | 'MLE' | 'CE' | 'RE' | string
  concursoCodigo?: string
  inciso?: string
  pagina?: number
  tamanoPagina?: number
}

export interface HistoryResponse {
  total: number
  pagina: number
  tamanoPagina: number
  datos: HistoryItem[]
}