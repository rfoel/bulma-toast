function toast(message, type) {
  let container = document.querySelector('.toast-container')
  if (!container) {
    container = document.createElement("div")
    container.className = "toast-container"
    document.body.appendChild(container)
  }

  let toast = document.createElement("div")
  toast.classList = `notification ${type}`
  toast.innerText = message

  container.appendChild(toast)
  console.log(message)
}