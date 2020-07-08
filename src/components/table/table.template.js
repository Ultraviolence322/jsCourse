
const CODES = {
  A: 65,
  Z: 90
}

function createRow(info, data) {
  return `
  <div class="row">
    <div class="row-info">${info}</div>
    <div class="row-data">${data}</div>
  </div>
  `
}

function createCell() {
  return `
  <div class="cell" contenteditable></div>
  `
}

function createCollumn(data) {
  return `
  <div class="collumn">${data}</div>
  `
}

export function createTable(rowsCount = 25, collumnCount = 55) {
  let html = ``
  let collumns = ``
  let cells = ``
  for (let i = 0; i < collumnCount; i++) {
    const symb = String.fromCharCode(CODES.A + i)
    console.log(symb)
    collumns += createCollumn(symb)
    cells += createCell()
  }
  html += createRow('', collumns)
  for (let i = 0; i < rowsCount; i++) {
    html += createRow(i + 1, cells)
  }

  return html
}