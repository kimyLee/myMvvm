// 企图创建一个订阅器
export default class Dep {
  constructor() {
    this.target = ''
  }

  addDep (ele) {
    this.target = ele
  }
  
  fire () {
    this.target.update()
  }
}