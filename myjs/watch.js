export default class watcher {
  constructor(vm, exp, cb) {
    console.log('init watcher')
    this.vm = vm
    this.cb = cb
    this.exp = exp
    this.value = this.get()
    // this.observe(data)
  }
  update () {
    // console.log('carry')
    let value = this.get();              // 取到最新值
    let oldVal = this.value;
    // if (value !== oldVal) {
        this.value = value;
        this.cb(value, oldVal); // 执行Compile中绑定的回调，更新视图
    // }
  }
  // 监听到有新值时候处理
  get () {
    window.DepTarget = this;	          // 将当前订阅者指向自己
    let value = this.vm.$data[this.exp];	          // 触发getter，添加自己到属性订阅器中
    window.DepTarget = null;	          // 添加完毕，重置
    return value;
  }
}