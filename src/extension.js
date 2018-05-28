function toast({ message, type, duration, position }) {
  let noticesTop = document.querySelector('.notices.is-top')
  let noticesBottom = document.querySelector('.notices.is-bottom')

  if (!noticesTop) {
    noticesTop = document.createElement('div')
    noticesTop.className = 'notices is-top'
    document.body.appendChild(noticesTop)
  }
  if (!noticesBottom) {
    noticesBottom = document.createElement('div')
    noticesBottom.className = 'notices is-bottom'
    document.body.appendChild(noticesBottom)
  }

  let toast = document.createElement('div')
  let classes = ['notification']
  if (type) classes.push(type)
  if (position) classes.push(position)
  if (type) toast.classList = classes.join(' ')
  toast.innerText = message

  if (position.includes('is-bottom')) noticesBottom.appendChild(toast)
  else noticesTop.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, duration)
}
