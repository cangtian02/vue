class vue extends EventTarget {
  constructor(options) {
    super()

    this.options = options
    this._data = this.options.data
    this.el = document.querySelector(this.options.el)

    this.observe(this._data)
    this.compileNode(this.el)
  }

  observe(data) {
    const self = this
    this._data = new Proxy(data, {
      set(target, prop, newValue) {
        let event = new CustomEvent(prop, {
          detail: newValue
        })

        self.dispatchEvent(event)

        return Reflect.set(...arguments)
      }
    })
  }

  compileNode(el) {
    let child = el.childNodes
    child = [...child]

    child.forEach(node => {
      if (node.nodeType === 3) {
        let text = node.textContent
        let reg = /\{\{\s*([^\s\{\}]+)\s*\}\}/g  // 匹配 {{xx}} 

        if (reg.test(text)) {
          let $1 = RegExp.$1
          
          if (this._data[$1]) {
            node.textContent = text.replace(reg, this._data[$1])
          }

          this.addEventListener($1, e => {
            node.textContent = text.replace(reg, e.detail)
          })
        }
      } else if (node.nodeType === 1) {
        let attr = node.attributes
        
        if (attr.hasOwnProperty('v-model')) {
          let keyName = attr['v-model'].nodeValue
          node.value = this._data[keyName]
          node.addEventListener('input', e => {
            this._data[keyName] = node.value
          })
        }

        this.compileNode(node)
      }
    })
  }

}
