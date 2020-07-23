export class TableSelection {
  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass('selected')
  }

  clear() {
    this.group.forEach(e => e.removeClass('selected'))
    this.group = []
  }

  selectGroup(arr) {
    this.clear()
    this.group = arr
    this.group.forEach(e => e.addClass('selected'))
  }
}