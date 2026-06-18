# 🧮 Claude Calculator

A fun little browser calculator built with plain **HTML, CSS, and JavaScript** — no frameworks, no build step. Every correct answer is celebrated with fireworks 🎆 and sound.

## ✨ Features

- **Core arithmetic** — addition, subtraction, multiplication, division
- **Decimal support**, `AC` (clear) and `DEL` (backspace)
- **Full keyboard support** — digits, `+ - * /`, `Enter`/`=`, `Backspace`, `Esc`
- **Divide-by-zero guard** — shows `Error` instead of `Infinity`
- **Floating-point rounding** — `0.1 + 0.2` gives `0.3`, not `0.30000000000000004`
- **Celebrations** — canvas fireworks, a display pop animation, and a sound clip on every valid answer
- **Tap sound** — a synthesized blip on every button/key press
- **Themed background** with a dark overlay for readability

## 🚀 Getting started

Clone the repo, then either open the file directly:

```bash
open public/index.html
```

…or serve it over a local web server (recommended, so audio and the background image always load):

```bash
npm start      # serves the public/ folder via `npx serve`
```

## 🧪 Tests

The arithmetic core lives in [`public/calculator.js`](public/calculator.js) as a pure, testable module shared by both the UI and the tests. Run the unit tests with Node's built-in test runner (zero dependencies):

```bash
npm test
```

This covers `add`, `subtract`, `multiply`, and `divide`, including edge cases like negative numbers, floating-point noise, and divide-by-zero.

## 📁 Project structure

```
.
├── public/
│   ├── index.html       # markup
│   ├── style.css        # styling, background, animations
│   ├── app.js           # UI logic, input handling, tap sound
│   ├── calculator.js    # pure arithmetic core (browser + Node)
│   ├── fireworks.js     # canvas fireworks + celebration sound
│   ├── images/bg.jpg    # background photo
│   └── sounds/faaah.mp3 # celebration sound clip
├── test/
│   └── calculator.test.js
├── package.json
├── LICENSE
└── README.md
```

## 📜 License

[MIT](LICENSE)
