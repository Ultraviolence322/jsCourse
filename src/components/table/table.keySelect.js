
export function keySelect(e, root) {
  const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  const { key } = e
  if (keys.includes(key)) {
    if (key === 'Enter' && e.shiftKey) {

    } else {
      e.preventDefault()

      const id = root.selection.current.id('true')
      const $next = root.$root.find(nextSelection(key, id))
      root.selection.select($next)
      root.$emit('table:select', $next)
    }

  }

  function nextSelection(key, { row, collumn }) {

    switch (key) {
      case 'Enter':
      case 'ArrowDown':
        row++
        break
      case 'Tab':
      case 'ArrowRight':
        collumn++
        break
      case 'ArrowUp':
        row = row - 1 < 0 ? row : row - 1
        break
      case 'ArrowLeft':
        collumn = collumn - 1 < 0 ? collumn : collumn - 1
        break
    }
    return `[data-id="${row}:${collumn}"]`
  }
}

