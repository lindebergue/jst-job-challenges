import { combineReducers } from 'redux'

import {
  Action,
  UIState,
  UIActionType,
  DataState,
  DataActionType
} from './types'

function uiReducer(
  state: UIState = {
  },
  action: Action
): UIState {
  switch (action.type) {
    case UIActionType.SELECT_LOCATION:
      return {
        selectedLocation: action.payload.location
      }

    case UIActionType.CLEAR_SELECTED_LOCATION:
      return {}

    default:
      return state
  }
}

function dataReducer(
  state: DataState = {
    overview: {
      loading: false,
      error: false
    },
    search: {
      loading: false,
      error: false,
      results: []
    }
  },
  action: Action
): DataState {
  switch (action.type) {
    case DataActionType.OVERVIEW_LOADING:
      return {
        ...state,
        overview: {
          ...state.overview,
          loading: true,
          error: false
        }
      }

    case DataActionType.OVERVIEW_ERROR:
      return {
        ...state,
        overview: {
          ...state.overview,
          loading: false,
          error: true
        }
      }

    case DataActionType.OVERVIEW_OK:
      return {
        ...state,
        overview: {
          loading: false,
          error: false,
          ...action.payload
        }
      }

    case DataActionType.SEARCH_LOADING:
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
          error: false
        }
      }

    case DataActionType.SEARCH_ERROR:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          error: true
        }
      }

    case DataActionType.SEARCH_OK:
      return {
        ...state,
        search: {
          loading: false,
          error: false,
          results: action.payload.results
        }
      }

    default:
      return state
  }
}

export default combineReducers({
  ui: uiReducer,
  data: dataReducer
})
