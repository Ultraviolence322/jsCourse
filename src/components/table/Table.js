import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "@/components/table/table.template";
import { resizeHandler } from "@/components/table/table.resize";
import { selectHandler } from "@/components/table/table.select";
import { keySelect } from "@/components/table/table.keySelect";
import { TableSelection } from "@/components/table/TableSelection";
import { defaultStyles } from '@/scss/constants'
import * as actions from '@/redux/actions'
import { $ } from "@core/dom";
import { parse } from "@core/parse";

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
    return createTable(25, 26, this.store.getState());
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
      console.log(m)
      this.selection.current
        .attr('data-value', m)
        .text(parse(m))
      this.updateTextInStore(m)
    })
    this.$on('formula:enter', m => {
      this.selection.current.focus()
    })
    this.fillCell(this.store.getState())

    const text = $(`[data-id="0:0"]`)
    this.$emit('table:init', text)

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
    const state = this.store.getState()
    Object.keys(state.stylesState).forEach(key => {
      this.$root.find(`[data-id="${key}"]`).css({ ...defaultStyles, ...state.stylesState[key] })
    })
  }

  fillCell(store) {
    const keys = Object.keys(store.dataState)
    keys.forEach(k => {
      $(`[data-id="${k}"]`).attr(`data-value`, store.dataState[k])
      $(`[data-id="${k}"]`).text(parse(store.dataState[k]))
    })
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(e)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.log('resize error', e.message)
    }

  }

  onMousedown(e) {
    this.resizeTable(e)
  }

  onClick(e) {
    selectHandler(e, this, actions)
  }

  onKeydown(e) {
    keySelect(e, this, actions)
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(e) {
    this.updateTextInStore(e.target.innerText)
  }
}

