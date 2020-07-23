
const CODES = {
  A: 65,
  Z: 90
}

function createRow(info, data) {
  const resize = info ? '<div class="row-resize" data-resize="row" ></div>' : ''
  return `
  <div class="row" data-type="resizable">
    <div class="row-border" data-border="row"></div>
    <div class="row-info">
      ${info}
      ${resize}
    </div>
    <div class="row-data">${data}</div>
  </div>
  `
}

function createCell(index) {
  return `
  <div class="cell" contenteditable data-collumn="${index}" data-id="-1:${index}" data-type="cell"></div>
  `
}

function createCollumn(data, index) {
  return `
  <div class="collumn" data-type="resizable" data-collumn="${index}">
    ${data}
    <div class="collumn-resize" data-resize="collumn">
      <div class="collumn-border" data-border="collumn"></div>
    </div> 
  </div>
  `
}

export function createTable(rowsCount = 25, collumnCount = 26) {
  let html = ``
  let collumns = ``
  let cells = ``
  for (let i = 0; i < collumnCount; i++) {
    const symb = String.fromCharCode(CODES.A + i)
    collumns += createCollumn(symb, i)
    cells += createCell(i)
  }
  html += createRow('', collumns)
  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < collumnCount; j++) {
      cells = cells.replace(`id="${i - 1}`, `id="${i}`)
    }
    html += createRow(i + 1, cells)
  }

  return html
}