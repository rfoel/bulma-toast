const baseConfig = {
  duration: 2000,
  position: 'top-right',
  closeOnClick: true,
  opacity: 1,
  single: false,
  offsetTop: 0,
  offsetBottom: 0,
  offsetLeft: 0,
  offsetRight: 0,
  extraClasses: '',
}
let defaults = { ...baseConfig }
let containers = {}
let doc = null
const COMMON_STYLES =
  'width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;'

const CONTAINER_STYLES = (
  position,
  offsetTop,
  offsetBottom,
  offsetLeft,
  offsetRight,
) => {
  switch (position) {
    case 'top-left':
      return `left:${offsetLeft};top:${offsetTop};text-align:left;align-items:flex-start;`
    case 'top-right':
      return `right:${offsetRight};top:${offsetTop};text-align:right;align-items:flex-end;`
    case 'top-center':
      return `top:${offsetTop};left:0;right:0;text-align:center;align-items:center;`
    case 'bottom-left':
      return `left:${offsetLeft};bottom:${offsetBottom};text-align:left;align-items:flex-start;`
    case 'bottom-right':
      return `right:${offsetRight};bottom:${offsetBottom};text-align:right;align-items:flex-end;`
    case 'bottom-center':
      return `bottom:${offsetBottom};left:0;right:0;text-align:center;align-items:center;`
    case 'center':
      return `top:0;left:0;right:0;bottom:0;flex-flow:column;justify-content:center;align-items:center;`
  }
}

function getDocument() {
  return doc ?? document;
}

function findOrCreateContainer(
  appendTo,
  position,
  offsetTop,
  offsetBottom,
  offsetLeft,
  offsetRight,
) {
  if (containers.position) return containers.position

  const container = getDocument().createElement('div')

  container.setAttribute(
    'style',
    COMMON_STYLES +
    CONTAINER_STYLES(
      position,
      offsetTop,
      offsetBottom,
      offsetLeft,
      offsetRight,
    ),
  )
  appendTo.appendChild(container)
  containers.position = container
  return container
}

export function setDefaults(params) {
  defaults = { ...baseConfig, ...params }
}

export function resetDefaults() {
  defaults = { ...baseConfig }
}

export function setDoc(newDoc) {
  for (const key in containers) {
    containers[key].remove()
  }
  containers = {}
  doc = newDoc
}

export function toast(params) {
  if (!params.message) throw new Error('message is required')
  const options = { ...defaults, ...params }

  const toast = new Toast(options)
  const container = findOrCreateContainer(
    options.appendTo || getDocument().body,
    options.position || defaults.position,
    options.offsetTop || defaults.offsetTop,
    options.offsetBottom || defaults.offsetBottom,
    options.offsetLeft || defaults.offsetLeft,
    options.offsetRight || defaults.offsetRight,
  )

  if (options.single) {
    let child = container.lastElementChild
    while (child) {
      container.removeChild(child)
      child = container.lastElementChild
    }
  }

  container.appendChild(toast.element)
}

class Toast {
  constructor(options) {
    this.element = getDocument().createElement('div')
    this.opacity = options.opacity
    this.type = options.type
    this.animate = options.animate
    this.dismissible = options.dismissible
    this.closeOnClick = options.closeOnClick
    this.message = options.message
    this.duration = options.duration
    this.pauseOnHover = options.pauseOnHover
    this.offsetTop = options.offsetTop
    this.offsetBottom = options.offsetBottom
    this.offsetLeft = options.offsetLeft
    this.offsetRight = options.offsetRight
    this.extraClasses = options.extraClasses

    let style = `width:auto;pointer-events:auto;display:inline-flex;white-space:pre-wrap;opacity:${this.opacity};`
    const classes = ['notification', this.extraClasses]
    if (this.type) classes.push(this.type)
    if (this.animate && this.animate.in) {
      const animateInClass = `animate__${this.animate.in}`
      const speed = this.animate.speed
        ? `animate__${this.animate.speed}`
        : 'animate__faster'
      classes.push(`animate__animated ${animateInClass} ${speed}`)
      this.onAnimationEnd(() => this.element.classList.remove(animateInClass))
    }

    this.element.className = classes.join(' ')
    if (this.dismissible) {
      const dismissButton = getDocument().createElement('button')
      dismissButton.className = 'delete'
      dismissButton.addEventListener('click', () => {
        this.destroy()
      })
      this.element.insertAdjacentElement('afterbegin', dismissButton)
    } else {
      style += 'padding: 1.25rem 1.5rem'
    }
    if (this.closeOnClick) {
      this.element.addEventListener('click', () => {
        this.destroy()
      })
    }
    this.element.setAttribute('style', style)

    if (typeof this.message === 'string') {
      this.element.insertAdjacentHTML('beforeend', this.message)
    } else {
      this.element.appendChild(this.message)
    }

    const timer = new Timer(() => {
      this.destroy()
    }, this.duration)

    if (this.pauseOnHover) {
      this.element.addEventListener('mouseover', () => {
        timer.pause()
      })
      this.element.addEventListener('mouseout', () => {
        timer.resume()
      })
    }
  }

  destroy() {
    if (this.animate && this.animate.out) {
      this.element.classList.add(`animate__${this.animate.out}`)
      this.onAnimationEnd(() => {
        this.removeParent(this.element.parentNode)
        this.element.remove()
        delete containers.position
      })
    } else {
      this.removeParent(this.element.parentNode)
      this.element.remove()
      delete containers.position
    }
  }

  removeParent(element) {
    if (element && element.children.length <= 1) {
      element.remove()
    }
  }

  onAnimationEnd(callback = () => { }) {
    const animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      WebkitAnimation: 'webkitAnimationEnd',
    }

    for (const t in animations) {
      if (this.element.style[t] !== undefined) {
        this.element.addEventListener(animations[t], () => callback())
        break
      }
    }
  }
}

class Timer {
  constructor(callback, delay) {
    this.timer
    this.start
    this.remaining = delay
    this.callback = callback

    this.resume()
  }

  pause() {
    if (typeof document === 'undefined') return
    window.clearTimeout(this.timer)
    this.remaining -= new Date() - this.start
  }

  resume() {
    if (typeof document === 'undefined') return
    this.start = new Date()
    window.clearTimeout(this.timer)
    this.timer = window.setTimeout(this.callback, this.remaining)
  }
}
