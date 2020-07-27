import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable="" spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.formula = this.$root.find('#formula')
    this.$on('table:init', text => {
      this.formula.text(text.data.value)
    })
    this.$on('table:select', $cell => {
      this.formula.text($cell.data.value || $cell.text())
    })

  }

  storeChanged({ currentText }) {
    this.formula.text(currentText)
    console.log('ch', currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onClick(event) {
    console.log('click!')
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      this.$emit('formula:enter', '')
      event.preventDefault()
    }
  }
}