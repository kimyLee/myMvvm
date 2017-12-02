import observer from './observe.js'
import compiler from './compile.js'
export default class mvvm {
  constructor(option) {
    console.log('init mvvm')
    this.$option = option
    this.$data = option.data
    this.$el = document.querySelector(option.el)
    // 劫持数据 
    new observer(this.$data)
    new compiler(this.$el, this)
  }
}
