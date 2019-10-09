const { toast, setDoc } = require("../src");

describe("toast", () => {
  beforeEach(() => {
    document.body.innerHTML = "<button class='toast'>Toast</button>";
    document.querySelector(".toast").addEventListener("click", () =>
      toast({
        message: "Hello there",
        type: "is-primary",
        position: "top-left",
        dismissible: true,
        duration: 1000,
        pauseOnHover: true,
        animate: { in: "fadeIn", out: "fadeOut" }
      })
    );
  });

  it("should not contain a notification", () => {
    const notification = document.querySelector(".notification");
    expect(notification).toBeFalsy();
  });

  it("should contain a notification", () => {
    const button = document.querySelector(".toast");
    button.click();
    const notification = document.querySelector(".notification");
    expect(notification.textContent).toBe("Hello there");
    expect(notification.classList.contains("is-primary")).toBeTruthy();
  });
});
