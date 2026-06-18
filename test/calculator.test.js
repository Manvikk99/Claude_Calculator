const test = require("node:test");
const assert = require("node:assert/strict");
const { add, subtract, multiply, divide, calculate } = require("../public/calculator");

test("add", async (t) => {
  await t.test("adds two positive numbers", () => {
    assert.equal(add(2, 3), 5);
  });
  await t.test("handles negative numbers", () => {
    assert.equal(add(-4, 1), -3);
  });
  await t.test("avoids floating-point noise", () => {
    assert.equal(add(0.1, 0.2), 0.3);
  });
});

test("subtract", async (t) => {
  await t.test("subtracts two numbers", () => {
    assert.equal(subtract(10, 4), 6);
  });
  await t.test("can produce a negative result", () => {
    assert.equal(subtract(3, 8), -5);
  });
});

test("multiply", async (t) => {
  await t.test("multiplies two numbers", () => {
    assert.equal(multiply(6, 7), 42);
  });
  await t.test("multiplying by zero gives zero", () => {
    assert.equal(multiply(99, 0), 0);
  });
  await t.test("handles negative numbers", () => {
    assert.equal(multiply(-3, 4), -12);
  });
});

test("divide", async (t) => {
  await t.test("divides two numbers", () => {
    assert.equal(divide(20, 5), 4);
  });
  await t.test("produces a fractional result", () => {
    assert.equal(divide(1, 4), 0.25);
  });
  await t.test("returns 'Error' on divide by zero", () => {
    assert.equal(divide(5, 0), "Error");
  });
});

test("calculate dispatches on operator symbol", async (t) => {
  await t.test("+", () => assert.equal(calculate(2, "+", 3), 5));
  await t.test("-", () => assert.equal(calculate(9, "-", 4), 5));
  await t.test("*", () => assert.equal(calculate(5, "*", 5), 25));
  await t.test("/", () => assert.equal(calculate(8, "/", 2), 4));
});
