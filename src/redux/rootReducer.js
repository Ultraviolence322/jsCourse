import {
  TABLE_RESIZE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  APPLY_STYLE,
  CHANGE_TITLE
} from '@/redux/types'

export function rootReducer(state, action) {
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'row' ? 'rowState' : 'colState'
      return { ...state, [field]: value(state, field, action) }
    case CHANGE_TEXT:
      field = 'dataState'
      return { ...state, currentText: action.data.value, [field]: value(state, field, action) }
    case CHANGE_STYLES:
      return { ...state, currentStyles: action.data }
    case APPLY_STYLE:
      field = 'stylesState'
      const val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = { ...val[id], ...action.data.value }
      })
      return { ...state, [field]: val, currentStyles: { ...state.currentStyles, ...action.data.value } }
    case CHANGE_TITLE:
      return { ...state, title: action.data }
    default: return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}