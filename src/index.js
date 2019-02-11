const defaults = {
  message: "Your message here",
  duration: 2000,
  position: "top-right",
  closeOnClick: true,
  opacity: 1
};

let initialized = false;
let containers = {};
let positions = {};
let doc = document;

function init() {
  containers = {
    noticesTopLeft: doc.createElement("div"),
    noticesTopRight: doc.createElement("div"),
    noticesBottomLeft: doc.createElement("div"),
    noticesBottomRight: doc.createElement("div"),
    noticesTopCenter: doc.createElement("div"),
    noticesBottomCenter: doc.createElement("div"),
    noticesCenter: doc.createElement("div")
  };

  let style =
    "width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;";

  containers.noticesTopLeft.setAttribute(
    "style",
    `${style}left:0;top:0;text-align:left;align-items:flex-start;`
  );
  containers.noticesTopRight.setAttribute(
    "style",
    `${style}right:0;top:0;text-align:right;align-items:flex-end;`
  );
  containers.noticesBottomLeft.setAttribute(
    "style",
    `${style}left:0;bottom:0;text-align:left;align-items:flex-start;`
  );
  containers.noticesBottomRight.setAttribute(
    "style",
    `${style}right:0;bottom:0;text-align:right;align-items:flex-end;`
  );
  containers.noticesTopCenter.setAttribute(
    "style",
    `${style}top:0;left:0;right:0;text-align:center;align-items:center;`
  );
  containers.noticesBottomCenter.setAttribute(
    "style",
    `${style}bottom:0;left:0;right:0;text-align:center;align-items:center;`
  );
  containers.noticesCenter.setAttribute(
    "style",
    `${style}top:0;left:0;right:0;bottom:0;flex-flow:column;justify-content:center;align-items:center;`
  );

  for (let key in containers) {
    doc.body.appendChild(containers[key])
  }

  positions = {
    "top-left": containers.noticesTopLeft,
    "top-right": containers.noticesTopRight,
    "top-center": containers.noticesTopCenter,
    "bottom-left": containers.noticesBottomLeft,
    "bottom-right": containers.noticesBottomRight,
    "bottom-center": containers.noticesBottomCenter,
    center: containers.noticesCenter
  };

  initialized = true;
}

export function toast(params) {
  if (!initialized) init();
  let options = Object.assign({}, defaults, params);

  const toast = new Toast(options);
  const container = positions[options.position] || positions[defaults.position];

  container.appendChild(toast.element);
}

export function setDoc(newDoc) {
  for (let key in containers) {
    let element = containers[key];
    element.parentNode.removeChild(element);
  }

  doc = newDoc;
  init();
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

    let style = `width:auto;pointer-events:auto;display:inline-flex;opacity:${
      this.opacity
      };`;
    let classes = ["notification"];
    if (this.type) classes.push(this.type);
    if (this.animate && this.animate.in) {
      classes.push(`animated ${this.animate.in}`);
      this.onAnimationEnd(() => this.element.classList.remove(this.animate.in));
    }
    this.element.classList = classes.join(" ");
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
      this.onAnimationEnd(() => this.element.remove());
    } else {
      this.element.remove();
    }
  }

  onAnimationEnd(callback = () => { }) {
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
