const { toast } = require("../dist/bulma-toast.cjs");

test("toast should be a funcion", () => {
  expect(typeof toast).toBe("function");
});
