import Axios from 'axios'

const api = Axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/',
  validateStatus: (status) => status === 200
})

export enum TOPOJSONDetailLevel {
  NONE = 0,
  MACROREGION = 1,
  STATE = 2,
  MESOREGION = 3,
  MICROREGION = 4,
  MUNICIPALITY = 5
}

export interface State {
  id: number
  nome: string
  sigla: string
}

export interface Municipality {
  id: number
  nome: string
}

export async function fetchTopoJSON(
  id: number,
  options?: { detail: TOPOJSONDetailLevel }
): Promise<object> {
  const response = await api.get(`/v2/malhas/${id}`, {
    params: {
      resolucao: options?.detail,
      formato: 'application/json'
    }
  })
  return response.data
}

export async function fetchStates(): Promise<State[]> {
  const { data } = await api.get('/v1/localidades/estados')
  return data
}

export async function fetchMunicipalities(): Promise<Municipality[]> {
  const { data } = await api.get('/v1/localidades/municipios')
  return data
}
