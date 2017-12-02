import Dep from './Dep.js'
export default class observer {
  constructor(data) {
    console.log('init observe')
    this.observe(data)
  }

  observe (data) {
    if (!data || typeof data !== 'object') {
      return
    }
    // 取出所有属性遍历, 绑定setter getter
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive (data, key, val) {
    let Deper = new Dep()
    this.observe(val)                             // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true,                         // 可枚举
        configurable: false,                      // 不能再define
        get: () => {
            window.DepTarget && Deper.addDep(window.DepTarget);
            return val;
        },
        set: (newVal) => {
            Deper.fire()                         // 通知订阅者    
            console.log('我也监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
        }
    });
  }
}