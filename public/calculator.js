// Pure arithmetic core for the calculator.
// Works in the browser (attaches to window.Calculator) and in Node (module.exports)
// so the same logic the UI uses can be unit tested.

(function (root) {
  // Round off binary floating-point noise (e.g. 0.1 + 0.2).
  function round(n) {
    return Math.round(n * 1e10) / 1e10;
  }

  function add(a, b) {
    return round(a + b);
  }

  function subtract(a, b) {
    return round(a - b);
  }

  function multiply(a, b) {
    return round(a * b);
  }

  function divide(a, b) {
    if (b === 0) return "Error";
    return round(a / b);
  }

  // Dispatch on an operator symbol; returns a number or "Error".
  function calculate(a, operator, b) {
    switch (operator) {
      case "+": return add(a, b);
      case "-": return subtract(a, b);
      case "*": return multiply(a, b);
      case "/": return divide(a, b);
      default:  return b;
    }
  }

  const Calculator = { add, subtract, multiply, divide, calculate };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Calculator;
  } else {
    root.Calculator = Calculator;
  }
})(typeof self !== "undefined" ? self : this);
