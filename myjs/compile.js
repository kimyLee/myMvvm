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
      if (node.nodeType === 1) {
        this.compile(node);
      } else if (node.nodeType === 3 && reg.test(text)) {
        console.log('找到文本节点111了')
        let value = this.vm.$data[RegExp.$1]
        new Watcher(this.vm, RegExp.$1, function(value, oldValue) {
          console.log('cb', value)
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
  // 编译指令
  compile (node) {
    var nodeAttrs = node.attributes;
    // me = this;

    [].slice.call(nodeAttrs).forEach((attr) => {
        let attrName = attr.name;
        if (this.isDirective(attrName)) {
            let exp = attr.value;
            var dir = attrName.substring(2);
            if (dir !== 'model') {
              return
            }
            // model指令
            // compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
            // this.bind(node, vm, exp, 'model');
            new Watcher(this.vm, exp, function(value, oldValue) {
              node.value = typeof value == 'undefined' ? '' : value;
            });
            
            let val = this.vm.$data[exp]
            node.addEventListener('input', (e) => {
                let newValue = e.target.value
                console.log('change', val, newValue)
                if (val === newValue) {
                  return;
                } 
                this.vm.$data[exp] = newValue 
                // val = newValue;
            });

            node.removeAttribute(attrName);
        }
    });
  }
  isDirective (attr) {
    return attr.indexOf('v-') == 0;
  }

  // createFragment (el) {
  //   let fragment = document.createDocumentFragment()
  //   console.log(el.firstChild)
  //   let child
  //   while (c)
  //   return fragment;
  // }
}