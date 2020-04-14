const defaults = {
  message: "Your message here",
  duration: 2000,
  position: "top-right",
  closeOnClick: true,
  opacity: 1,
  single: false, // Addig the ability to have a single one only.
};

const COMMON_STYLES =
  "width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;";

const CONTAINER_STYLES = {
  "top-left": "left:0;top:0;text-align:left;align-items:flex-start;",
  "top-right": "right:0;top:0;text-align:right;align-items:flex-end;",
  "top-center": "top:0;left:0;right:0;text-align:center;align-items:center;",
  "bottom-left": "left:0;bottom:0;text-align:left;align-items:flex-start;",
  "bottom-right": "right:0;bottom:0;text-align:right;align-items:flex-end;",
  "bottom-center": "bottom:0;left:0;right:0;text-align:center;align-items:center;",
  "center": "top:0;left:0;right:0;bottom:0;flex-flow:column;justify-content:center;align-items:center;"
};

let containers = {};
let doc = document;

function findOrCreateContainer(position) {
  if (containers.position) return containers.position;

  const container = doc.createElement("div");

  container.setAttribute("style", COMMON_STYLES + CONTAINER_STYLES[position]);

  doc.body.appendChild(container);

  containers.position = container;

  return container;
}

export function toast(params) {
  let options = Object.assign({}, defaults, params);

  const toast = new Toast(options);
  const container = findOrCreateContainer(options.position || defaults.position);

  // Remove current toasts when single is true.
  if (options.single) {
    let child = container.lastElementChild;  
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }
  }

  container.appendChild(toast.element);
}

export function setDoc(newDoc) {
  for (let key in containers) {
    containers[key].remove();
  }

  containers = {};

  doc = newDoc;
}

class Toast {
  constructor(options) {
    this.element = doc.createElement("div");
    this.opacity = options.opacity;
    this.type = options.type;
    this.animate = options.animate;
    this.dismissible = options.dismissible;
    this.closeOnClick = options.closeOnClick;
    this.message = options.message;
    this.duration = options.duration;
    this.pauseOnHover = options.pauseOnHover;

    let style = `width:auto;pointer-events:auto;display:inline-flex;white-space:pre-wrap;opacity:${
      this.opacity
    };`;
    let classes = ["notification"];
    if (this.type) classes.push(this.type);
    if (this.animate && this.animate.in) {
      // Adding the option to set animation speed available in animate.css, 'faster' is the default
      let speed = this.animate.speed || 'faster';
      classes.push(`animated ${this.animate.in} ${speed}`);
      this.onAnimationEnd(() => this.element.classList.remove(this.animate.in));
    }

    this.element.className = classes.join(" ");
    if (this.dismissible) {
      let dismissButton = doc.createElement("button");
      dismissButton.className = "delete";
      dismissButton.addEventListener("click", () => {
        this.destroy();
      });
      this.element.insertAdjacentElement("afterbegin", dismissButton);
    } else {
      style += "padding: 1.25rem 1.5rem";
    }
    if (this.closeOnClick) {
      this.element.addEventListener("click", () => {
        this.destroy();
      });
    }
    this.element.setAttribute("style", style);

    if (typeof this.message === "string") {
      this.element.insertAdjacentHTML("beforeend", this.message);
    } else {
      this.element.appendChild(this.message);
    }

    const timer = new Timer(() => {
      this.destroy();
    }, this.duration);

    if (this.pauseOnHover) {
      this.element.addEventListener("mouseover", () => {
        timer.pause();
      });
      this.element.addEventListener("mouseout", () => {
        timer.resume();
      });
    }
  }

  destroy() {
    if (this.animate && this.animate.out) {
      this.element.classList.add(this.animate.out);
      this.onAnimationEnd(() => this.removeParent(this.element));
    } else {
      this.removeParent(this.element);
    }
  }

  removeParent(element) {
    if (element.parentNode) element.parentNode.remove();
  }

  onAnimationEnd(callback = () => {}) {
    const animations = {
      animation: "animationend",
      OAnimation: "oAnimationEnd",
      MozAnimation: "mozAnimationEnd",
      WebkitAnimation: "webkitAnimationEnd"
    };

    for (const t in animations) {
      if (this.element.style[t] !== undefined) {
        this.element.addEventListener(animations[t], () => callback());
        break;
      }
    }
  }
}

class Timer {
  constructor(callback, delay) {
    this.timer;
    this.start;
    this.remaining = delay;
    this.callback = callback;

    this.resume();
  }

  pause() {
    window.clearTimeout(this.timer);
    this.remaining -= new Date() - this.start;
  }

  resume() {
    this.start = new Date();
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(this.callback, this.remaining);
  }
}