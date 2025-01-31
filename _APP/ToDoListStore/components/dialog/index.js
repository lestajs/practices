import './index.css'

export default {
  template() {
    return `
      <dialog class="dialog" ${this.proxy.opened ? 'open' : ''}>
        <div class="close"></div>
        <div spot="content"></slot>
      </dialog>`
  },
  props: {
    proxies: {
      opened: {
        default: false
      }
    },
    methods: {
      onclose: {}
    }
  },
  spots: ['content'],
  actions: ['show', 'close'],
  handlers: {
    opened(v) {
      v ? this.node.dialog.target.showModal() : this.node.dialog.target.close()
    }
  },
  nodes() {
    return {
      dialog: {},
      close: {
        onclick: () => {
          console.log(this.unrelatedProxy('opened'))
          if (this.unrelatedProxy('opened') && !this.method.onclose?.()) this.proxy.opened = false
        }
      }
    }
  },
  methods: {
    show() {
      if (this.unrelatedProxy('opened')) this.proxy.opened = true
    },
    close() {
      if (this.unrelatedProxy('opened')) this.proxy.opened = false
    }
  }
}