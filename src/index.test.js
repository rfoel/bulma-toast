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

  it('should not remove parent while there are other toasts', (done) => {
    const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
    // One toast for a second
    toast({
      message: 'Hello there',
      type: 'is-primary',
      position: 'top-left',
      dismissible: true,
      duration: 1000,
      pauseOnHover: true,
      single: false,
    });
    // One toast for a half a second
    toast({
      message: 'Hello there',
      type: 'is-primary',
      position: 'top-left',
      dismissible: true,
      duration: 500,
      pauseOnHover: true,
      single: false,
    });
    Promise.all([
      timeoutPromise(100)
        .then(() => {
          // after 100ms, there should be 2 toasts
          expect(document.querySelectorAll('.notification').length).toBe(2)
        }),
      timeoutPromise(600)
        .then(() => {
          // after 600ms, there should be 1 toasts
          expect(document.querySelectorAll('.notification').length).toBe(1)
        }),
      timeoutPromise(1100)
        .then(() => {
          // after 110ms, there should be 0 toasts
          expect(document.querySelectorAll('.notification').length).toBe(0)
        }),
    ])
      .then(() => done())
      .catch((e) => done(e))
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
