import { toast, setDoc } from '.'

describe('toast', () => {
  beforeEach(() => {
    document.body.innerHTML = "<button class='toast'>Toast</button>"
    document.querySelector('.toast').addEventListener('click', () =>
      toast({
        message: 'Hello there',
        type: 'is-primary',
        position: 'top-left',
        dismissible: true,
        duration: 1000,
        pauseOnHover: true,
        single: true,
      }),
    )

    setDoc(document) // cleaning up
  })

  it('should not contain a notification', () => {
    const notification = document.querySelector('.notification')
    expect(notification).toBeFalsy()
  })

  it('should contain a notification', () => {
    const button = document.querySelector('.toast')
    button.click()
    const notification = document.querySelector('.notification')
    expect(notification.textContent).toBe('Hello there')
    expect(notification.classList.contains('is-primary')).toBeTruthy()
  })

  it('should remove notification with container on close', () => {
    const button = document.querySelector('.toast')
    button.click()
    const notification = document.querySelector('.notification')
    expect(notification.textContent).toBe('Hello there')
    expect(notification.classList.contains('is-primary')).toBeTruthy()
    notification.querySelector('.delete').click()
    expect(document.body.querySelector('div')).toBeFalsy()
  })
})

describe('animations', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css">
      </head>
      <body>
        <button class='toast'>Toast</button>
      </body>
    `
    document.querySelector('.toast').addEventListener('click', () =>
      toast({
        message: 'Hello there',
        type: 'is-primary',
        position: 'top-left',
        dismissible: true,
        duration: 1000,
        single: true,
        animate: { in: 'fadeIn', out: 'fadeOut' }
      }),
    )

    setDoc(document) // cleaning up
  })

  it('should show notification with animation', () => {
    document.querySelector('.toast').click()
    const notification = document.querySelector('.notification')
    expect(notification.classList.contains('animate__animated')).toBeTruthy()
    expect(notification.classList.contains('animate__fadeIn')).toBeTruthy()
    notification.querySelector('.delete').click()
    expect(notification.classList.contains('animate__fadeOut')).toBeTruthy()
  })
})
