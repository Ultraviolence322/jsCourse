import { defaultStyles } from '@/scss/constants'
import { toInlineStyles } from '@core/utils'

const CODES = {
  A: 65,
  Z: 90
}

const GENERAL_COL_WIDTH = 120
const GENERAL_COL_HEIGHT = 24

function createRow(info, data, index, height) {
  const resize = info ? '<div class="row-resize" data-resize="row" ></div>' : ''
  return `
  <div class="row" data-type="resizable" data-row="${index}", style="height: ${height}">
    <div class="row-border" data-border="row"></div>
    <div class="row-info">
      ${info}
      ${resize}
    </div>
    <div class="row-data">${data}</div>
  </div>
  `
}

function createCell(index, width) {
  const styles = toInlineStyles(defaultStyles)
  return `
  <div class="cell" contenteditable data-collumn="${index}" data-id="-1:${index}" data-type="cell" style="${styles}; width: ${width}"></div>
  `
}

function createCollumn(data, index, width) {
  return `
  <div class="collumn" data-type="resizable" data-collumn="${index}" style="width: ${width}">
    ${data}
    <div class="collumn-resize" data-resize="collumn">
      <div class="collumn-border" data-border="collumn"></div>
    </div> 
  </div>
  `
}

export function createTable(rowsCount = 25, collumnCount = 26, state = {}) {
  let html = ``
  let collumns = ``
  let cells = ``

  for (let i = 0; i < collumnCount; i++) {
    let width = (state.colState[i] || GENERAL_COL_WIDTH) + 'px'
    const symb = String.fromCharCode(CODES.A + i)
    collumns += createCollumn(symb, i, width)
    cells += createCell(i, width)
  }
  html += createRow('', collumns, -1)
  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < collumnCount; j++) {
      cells = cells.replace(`id="${i - 1}`, `id="${i}`)
    }
    let height = (state.rowState[i] || GENERAL_COL_HEIGHT) + 'px'
    html += createRow(i + 1, cells, i, height)
  }

  return html
}