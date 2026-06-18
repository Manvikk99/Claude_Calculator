const display = document.getElementById("display");

// --- Tap sound: a short synthesized blip on every button press. ---
let tapCtx = null;
function playTap() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  if (!tapCtx) tapCtx = new AC();
  if (tapCtx.state === "suspended") tapCtx.resume();

  const now = tapCtx.currentTime;
  const osc = tapCtx.createOscillator();
  const gain = tapCtx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(660, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
  osc.connect(gain).connect(tapCtx.destination);
  osc.start(now);
  osc.stop(now + 0.09);
}

let current = "0";      // what's currently being typed / shown
let previous = null;    // stored operand
let operator = null;    // pending operator
let resetNext = false;  // overwrite display on next digit (after = or operator)

function updateDisplay() {
  display.textContent = current;
}

function inputDigit(digit) {
  if (resetNext) {
    current = digit === "." ? "0." : digit;
    resetNext = false;
    return;
  }
  if (digit === ".") {
    if (!current.includes(".")) current += ".";
    return;
  }
  current = current === "0" ? digit : current + digit;
}

function compute() {
  const a = parseFloat(previous);
  const b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return current;

  if (!operator) return current;
  return String(Calculator.calculate(a, operator, b));
}

function evaluate() {
  if (!operator) return;
  const result = compute();
  current = result;
  previous = null;
  operator = null;
  resetNext = true;
  // celebrate a real numeric answer (not an error)
  if (result !== "Error") {
    if (typeof Fireworks !== "undefined") Fireworks.celebrate();
    display.classList.remove("celebrate");
    void display.offsetWidth; // restart the animation
    display.classList.add("celebrate");
  }
}

function handleOperator(nextOp) {
  if (current === "Error") return;
  if (operator && !resetNext) {
    current = compute();
    updateDisplay();
  }
  previous = current;
  operator = nextOp;
  resetNext = true;
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  resetNext = false;
}

function deleteLast() {
  if (resetNext || current === "Error") return;
  current = current.length > 1 ? current.slice(0, -1) : "0";
}

document.querySelector(".buttons").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  playTap();
  const { action, value } = btn.dataset;

  if (action === "operator") {
    handleOperator(value);
  } else if (action === "equals") {
    evaluate();
  } else if (action === "clear") {
    clearAll();
  } else if (action === "delete") {
    deleteLast();
  } else if (value !== undefined) {
    if (current === "Error") clearAll();
    inputDigit(value);
  }

  updateDisplay();
});

// keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (/[0-9]/.test(key)) inputDigit(key);
  else if (key === ".") inputDigit(".");
  else if (["+", "-", "*", "/"].includes(key)) handleOperator(key);
  else if (key === "Enter" || key === "=") evaluate();
  else if (key === "Backspace") deleteLast();
  else if (key === "Escape") clearAll();
  else return;

  playTap();
  if (current === "Error" && /[0-9]/.test(key)) clearAll();
  updateDisplay();
});

updateDisplay();
