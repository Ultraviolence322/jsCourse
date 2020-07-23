import { $ } from "@core/dom";

export function selectHandler(e, root) {
  if (e.shiftKey) {
    let ids = []

    const firstCellAttr = root.selection.current.id('true')
    const lastCellAttr = $(e.target).id('true')

    if (firstCellAttr.collumn > lastCellAttr.collumn && firstCellAttr.row > lastCellAttr.row) {
      for (let i = lastCellAttr.row; i < firstCellAttr.row + 1; i++) {
        for (let j = lastCellAttr.collumn; j < firstCellAttr.collumn + 1; j++) {
          ids.push(`${i}:${j}`)
        }
      }
    } else if (firstCellAttr.row > lastCellAttr.row) {
      for (let i = lastCellAttr.row; i < firstCellAttr.row + 1; i++) {
        for (let j = firstCellAttr.collumn; j < lastCellAttr.collumn + 1; j++) {
          ids.push(`${i}:${j}`)
        }
      }
    } else if (firstCellAttr.collumn > lastCellAttr.collumn) {
      for (let i = firstCellAttr.row; i < lastCellAttr.row + 1; i++) {
        for (let j = lastCellAttr.collumn; j < firstCellAttr.collumn + 1; j++) {
          ids.push(`${i}:${j}`)
        }
      }
    }
    else {
      for (let i = firstCellAttr.row; i < lastCellAttr.row + 1; i++) {
        for (let j = firstCellAttr.collumn; j < lastCellAttr.collumn + 1; j++) {
          ids.push(`${i}:${j}`)
        }
      }
    }

    const arr = ids.map(e => root.$root.find(`[data-id="${e}"]`))
    root.selection.selectGroup(arr)
  } else if (e.target.dataset.type === 'cell') {
    const $cell = $(e.target)
    root.selection.select($cell)
    root.$emit('table:select', $cell)
  }
}