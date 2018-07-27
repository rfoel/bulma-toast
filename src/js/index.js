import defaultOptions from './defaultOptions'

class BulmaToast {
  constructor() {
    this.container = {}
    this.init()
  }

  init() {
    let noticesTop = document.querySelector('.notices.is-top')
    let noticesBottom = document.querySelector('.notices.is-bottom')

    if (!noticesTop || !noticesBottom) {
      noticesTop = document.createElement('div')
      noticesBottom = document.createElement('div')
      noticesTop.className = 'notices is-top'
      noticesBottom.className = 'notices is-bottom'
      this.container = {
        noticesTop,
        noticesBottom
      }
      document.body.appendChild(noticesTop)
      document.body.appendChild(noticesBottom)
    }

  }

  toast(options) {
    options = {
      ...defaultOptions,
      ...options,
    }

    const toast = document.createElement('div')
    const classes = ['notification']
    if (options.type) classes.push(options.type)
    if (options.position) classes.push(options.position)
    toast.classList = classes.join(' ')
    if (options.dismissible) {
      const dismissButton = document.createElement('button')
      dismissButton.className = 'delete'
      dismissButton.addEventListener('click', () => {
        toast.remove()
      })
      toast.insertAdjacentElement('afterbegin', dismissButton)
    }
    toast.insertAdjacentText('beforeend', options.message)

    if (options.position.includes('is-bottom')) this.container.noticesBottom.appendChild(toast)
    else this.container.noticesTop.appendChild(toast)

    setTimeout(() => {
      toast.remove()
    }, options.duration)
  }
}

const bulmaToast = new BulmaToast()

export default bulmaToast