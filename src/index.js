const defaults = {
  message: 'Your message here',
  duration: 2000,
  position: 'top-right',
  closeOnClick: true,
}

let initialized = false
let containers = {}
let positions = {}

function init() {
  containers = {
    noticesTopLeft: document.createElement('div'),
    noticesTopRight: document.createElement('div'),
    noticesBottomLeft: document.createElement('div'),
    noticesBottomRight: document.createElement('div'),
    noticesTopCenter: document.createElement('div'),
    noticesBottomCenter: document.createElement('div'),
    noticesCenter: document.createElement('div'),
  }

  let style =
    'width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;'

  containers.noticesTopLeft.setAttribute('style', `${style}left:0;top:0;text-align:left;align-items:flex-start;`)
  containers.noticesTopRight.setAttribute('style', `${style}right:0;top:0;text-align:right;align-items:flex-end;`)
  containers.noticesBottomLeft.setAttribute('style', `${style}left:0;bottom:0;text-align:left;align-items:flex-start;`)
  containers.noticesBottomRight.setAttribute('style', `${style}right:0;bottom:0;text-align:right;align-items:flex-end;`)
  containers.noticesTopCenter.setAttribute(
    'style',
    `${style}top:0;left:0;right:0;text-align:center;align-items:center;`,
  )
  containers.noticesBottomCenter.setAttribute(
    'style',
    `${style}bottom:0;left:0;right:0;text-align:center;align-items:center;`,
  )
  containers.noticesCenter.setAttribute(
    'style',
    `${style}top:0;left:0;right:0;bottom:0;flex-flow:column;justify-content:center;align-items:center;`,
  )

  Object.keys(containers).forEach(key => document.body.appendChild(containers[key]))

  positions = {
    'top-left': containers.noticesTopLeft,
    'top-right': containers.noticesTopRight,
    'top-center': containers.noticesTopCenter,
    'bottom-left': containers.noticesBottomLeft,
    'bottom-right': containers.noticesBottomRight,
    'bottom-center': containers.noticesBottomCenter,
    center: containers.noticesCenter,
  }

  initialized = true
}

export function toast(params) {
  if (!initialized) init()
  let options = Object.assign({}, defaults, params)

  const toast = createToast(options)
  const container = positions[options.position] || positions[defaults.position]

  container.appendChild(toast)
}

function createToast(options) {
  const toast = document.createElement('div')
  let style = `width:auto;opacity:0.8;pointer-events:auto;display:inline-flex;`
  let classes = ['notification']
  if (options.type) classes.push(options.type)
  toast.classList = classes.join(' ')
  if (options.dismissible) {
    let dismissButton = document.createElement('button')
    dismissButton.className = 'delete'
    dismissButton.addEventListener('click', () => {
      toast.remove()
    })
    toast.insertAdjacentElement('afterbegin', dismissButton)
  } else {
    style += 'padding: 1.25rem 1.5rem'
  }
  if (options.closeOnClick) {
    toast.addEventListener('click', () => {
      toast.remove()
    })
  }
  toast.setAttribute('style', style)
  toast.insertAdjacentText('beforeend', options.message)

  const timer = new Timer(() => {
    toast.remove()
  }, options.duration)

  if (options.pauseOnHover) {
    toast.addEventListener('mouseover', () => {
      timer.pause()
    })
    toast.addEventListener('mouseout', () => {
      timer.resume()
    })
  }
  return toast
}

function Timer(callback, delay) {
  let timer,
    start,
    remaining = delay

  this.pause = function() {
    window.clearTimeout(timer)
    remaining -= new Date() - start
  }

  this.resume = function() {
    start = new Date()
    window.clearTimeout(timer)
    timer = window.setTimeout(callback, remaining)
  }

  this.resume()
}
