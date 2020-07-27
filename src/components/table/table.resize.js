import { $ } from "@core/dom";

export function resizeHandler(e) {
  return new Promise(resolve => {
    if (e.target.dataset.resize) {
      const resizer = $(e.target)
      const parent = resizer.closest('[data-type="resizable"]')
      const coords = parent.getCoords()

      resizer.$el.style.opacity = 1

      let idCollumn
      let arrCollumn
      let delta

      let border

      if (e.target.dataset.resize == 'collumn') {
        resizer.$el.querySelector('[data-border]').style.display = 'block'
        idCollumn = parent.data.collumn
        arrCollumn = document.querySelectorAll(`[data-collumn="${idCollumn}"]`)
        document.onmousemove = event => {
          delta = coords.right - event.pageX
          resizer.css({ right: delta + 'px' })
        }

      } else {
        border = parent.$el.querySelector('[data-border]')
        border.style.display = 'block'
        document.onmousemove = event => {
          delta = coords.bottom - event.pageY
          resizer.css({ bottom: delta + 'px' })
          border.style.bottom = 2 + delta + 'px'
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        resizer.$el.style.opacity = 0
        if (e.target.dataset.resize == 'collumn') {
          resizer.$el.querySelector('[data-border="collumn"]').style.display = 'none'
          resizer.css({ right: -1 + 'px' })
          arrCollumn.forEach(e => {
            e.style.width = coords.width + (-delta) + 'px'
          })
          resolve({
            value: coords.width + (-delta),
            type: e.target.dataset.resize,
            id: e.target.dataset.resize == 'collumn' ? parent.data.collumn : null
          })
        } else {
          parent.$el.querySelector('[data-border]').style.display = 'none'
          resizer.css({ bottom: -1 + 'px' })
          border.style.bottom = 1 + 'px'
          parent.css({ height: coords.height + (-delta) + 'px' })
          resolve({
            value: coords.height + (-delta),
            type: e.target.dataset.resize,
            id: e.target.dataset.resize == 'row' ? parent.data.row : null
          })
        }

      }
    }
  })

}