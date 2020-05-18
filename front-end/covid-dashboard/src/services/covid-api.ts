import axios from 'axios'
import * as xlsx from 'xlsx'

export interface Stats {
  regiao?: string
  estado?: string
  municipio?: string
  coduf?: string
  codmun?: string
  codRegiaoSaude?: string
  nomeRegiaoSaude?: string
  data: string
  semanaEpi?: string
  populacaoTCU2019?: string
  casosAcumulado?: string
  obitosAcumulado?: string
  Recuperadosnovos?: string
  emAcompanhamentoNovos?: string
}

const api = axios.create({
  baseURL: 'https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod',
  headers: {
    'x-parse-application-id': 'unAFkcaNDeXajurGB7LChj8SgQYS2ptm'
  },
  validateStatus: (status) => status === 200
})

export async function fetchStats(): Promise<Stats[]> {
  const { data } = await api.get('/PortalGeral')
  if (!data.results.length) {
    throw new Error('unexpected empty response')
  }

  const url = data.results[0].arquivo.url
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`unexpected status ${response.status} download ${url}`)
  }

  const rawXlsx = await response.arrayBuffer()
  const parsedXlsx = xlsx.read(rawXlsx, { type: 'array' })
  return parsedXlsx.SheetNames.reduce((rows: Stats[], sheet) => {
    const json = xlsx.utils.sheet_to_json<Stats>(parsedXlsx.Sheets[sheet])
    return rows.concat(json)
  }, [])
}
