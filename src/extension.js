function toast({ message, type, duration, position }) {
  let container = document.querySelector('.notices')
  if (!container) {
    container = document.createElement('div')
    container.className = 'notices'
    document.body.appendChild(container)
  }

  let toast = document.createElement('div')
  let classes = ['notification']
  if(type) classes.push(type)
  if(position) classes.push(position)
  if(type)
  toast.classList = classes.join(' ')
  toast.innerText = message

  container.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, duration)
}
