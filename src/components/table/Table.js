import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "@/components/table/table.template";
import { resizeHandler } from "@/components/table/table.resize";
import { selectHandler } from "@/components/table/table.select";
import { keySelect } from "@/components/table/table.keySelect";
import { TableSelection } from "@/components/table/TableSelection";


export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)

    this.$emit('table:select', $cell)

    this.$on('formula:input', m => {
      this.selection.current.text(m)
    })
    this.$on('formula:enter', m => {
      this.selection.current.focus()
    })

  }

  onMousedown(e) {
    resizeHandler(e)
  }

  onClick(e) {
    selectHandler(e, this)
  }

  onKeydown(e) {
    keySelect(e, this)
  }

  onInput(e) {
    this.$emit('table:input', e.target.innerText)
  }
}

