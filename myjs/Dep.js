// 企图创建一个订阅器
export default class Dep {
  constructor() {
    this.child = []
  }

  addDep (ele) {
    this.child.push(ele)
  }
  
  fire () {
    this.child.forEach(function(sub) {
      sub.update(); // 调用订阅者的update方法，通知变化
    });
  }
}