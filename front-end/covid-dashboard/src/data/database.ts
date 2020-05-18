import Dexie from 'dexie'

export interface DatasetInfo {
  lastUpdate: Date
}

export interface Location {
  id: string
  name: string
  population?: number
  geometry?: object
}

interface LocationStats {
  locationId: string
  topoJSONId: string
  date: Date
  confirmed: number
  deaths: number
  recovered: number
}

class DashboardDatabase extends Dexie {
  readonly datasetInfo!: Dexie.Table<DatasetInfo, string>
  readonly location!: Dexie.Table<Location, string>
  readonly locationStats!: Dexie.Table<LocationStats, string>

  constructor() {
    super('DashboardDatabase', { autoOpen: true })
    this.version(1).stores({
      datasetInfo: '++',
      location: 'id',
      locationStats: '++'
    })
  }
}

export const db = new DashboardDatabase()
