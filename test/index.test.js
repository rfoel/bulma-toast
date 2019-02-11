const { toast } = require("../dist/bulma-toast.cjs");

test("toast should be a function", () => {
  expect(typeof toast).toBe("function");
});
