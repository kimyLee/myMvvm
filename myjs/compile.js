import Watcher from './watch.js'
export default class compiler {
  constructor(el, vm) {
    console.log('init compile')
    this.$el = el.nodeType === 1 ? el : querySelector(el)
    this.vm = vm
    // this.$fragment = this.createFragment(this.$el);
    this.init()
  }
  init () {
    this.compileElement(this.$el)
  }
  compileElement (el) {
    let childnodes = el.childNodes;
    [].slice.call(childnodes).forEach((node) => {
      var text = node.textContent;
      let reg = /\{\{(.*)\}\}/;	          // 表达式文本

      // 按元素节点方式编译
      console.log(node.nodeType, node, text, reg.test(text))
      if (node.nodeType === 1) {
          // this.compile(node);
      } else if (node.nodeType === 3 && reg.test(text)) {
        console.log('找到文本节点了')
        let value = this.vm.$data[RegExp.$1]  
        new Watcher(this.vm, RegExp.$1, function(value, oldValue) {
          node.textContent = typeof value == 'undefined' ? '' : value;
        });
      }
      // 遍历编译子节点
      if (node.childNodes && node.childNodes.length) {
          this.compileElement(node);
      }
    })
    // console.log(childnodes, 'look')
  }
  compile (node) {

  }
  // createFragment (el) {
  //   let fragment = document.createDocumentFragment()
  //   console.log(el.firstChild)
  //   let child
  //   while (c)
  //   return fragment;
  // }
}