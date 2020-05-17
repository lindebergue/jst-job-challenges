import { Action as BaseAction } from 'redux'
import { ThunkAction as BaseThunkAction } from 'redux-thunk'

export type Action = DataAction | UIAction
export type ThunkAction = BaseThunkAction<void, State, void, Action>

export interface State {
  ui: UIState
  data: DataState
}

//
// UI State
//

export interface UIState {
  selectedLocationID?: number
  selectedLocationName?: string
}

export enum UIActionType {
  SELECT_LOCATION = 'ui/SELECT_LOCATION',
  CLEAR_SELECTED_LOCATION = 'ui/CLEAR_SELECTED_LOCATION'
}

export type UIAction =
  | UISelectLocationAction
  | UIClearSelectedLocationAction

interface UISelectLocationAction extends BaseAction<UIActionType.SELECT_LOCATION> {
  payload: {
    locationId: number
    locationName: string
  }
}

interface UIClearSelectedLocationAction extends BaseAction<UIActionType.CLEAR_SELECTED_LOCATION> {
}

//
// Data state
//

export interface DataState {
  overview: OverviewData
  search: SearchData
}

interface OverviewData {
  loading: boolean
  error: boolean
  cases?: {
    confirmed: number
    recovered: number
    deaths: number
    lethality: number
  }
  historyValues?: object
  mapTopoJSONData?: object
  mapValues?: object
  updatedAt?: Date
}

interface SearchData {
  loading: boolean
  error: boolean
  results: SearchResult[]
}

interface SearchResult {
  locationId: number
  locationName: string
}

export enum DataActionType {
  OVERVIEW_LOADING = 'data/OVERVIEW_LOADING',
  OVERVIEW_ERROR = 'data/OVERVIEW_ERROR',
  OVERVIEW_OK = 'data/OVERVIEW_OK',

  SEARCH_LOADING = 'data/SEARCH_LOADING',
  SEARCH_ERROR = 'data/SEARCH_ERROR',
  SEARCH_OK = 'data/SEARCH_OK'
}

export type DataAction =
| DataOverviewLoadingAction
| DataOverviewErrorAction
| DataOverviewOkAction
| DataSearchLoadingAction
| DataSearchErrorAction
| DataSearchOkAction

interface DataOverviewLoadingAction extends BaseAction<DataActionType.OVERVIEW_LOADING> {
}

interface DataOverviewErrorAction extends BaseAction<DataActionType.OVERVIEW_ERROR> {
}

interface DataOverviewOkAction extends BaseAction<DataActionType.OVERVIEW_OK> {
  payload: Omit<OverviewData, 'loading' | 'error'>
}

interface DataSearchLoadingAction extends BaseAction<DataActionType.SEARCH_LOADING> {
}

interface DataSearchErrorAction extends BaseAction<DataActionType.SEARCH_ERROR> {
}

interface DataSearchOkAction extends BaseAction<DataActionType.SEARCH_OK> {
  payload: {
    results: SearchResult[]
  }
}
