// Floating funny quotes that drift across the screen.
(function () {
  const QUOTES = [
    "I'm not broke, I'm pre-rich. 💸",
    "My wallet is like an onion — opening it makes me cry. 🧅",
    "Money talks… mine just says goodbye. 👋",
    "Budget: a way of going broke methodically. 📉",
    "I can count to potato. 🥔",
    "Math: the only place people buy 60 watermelons. 🍉",
    "Bills, bills, bills — and not the fun kind. 🧾",
    "My bank account is on a strict seafood diet: it sees food, it disappears. 🦐",
    "Calculating my net worth… please wait… still waiting… 🤔",
    "5 out of 4 people struggle with fractions. ➗",
    "I'm great with money — at spending it. 🛍️",
    "Why was 6 afraid of 7? Because 7 8 9. 😅",
    "Compound interest: the 8th wonder of being broke. 🌀",
    "Coffee first, calculations later. ☕",
    "Treat yourself… responsibly. Okay, maybe not. 🎉",
  ];

  const COLORS = ["#ff9f43", "#1dd1a1", "#ff6b6b", "#54a0ff", "#feca57", "#ff9ff3"];
  let layer;

  function floatQuote() {
    const el = document.createElement("div");
    el.className = "floating-quote";
    el.textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];

    // random vertical position and drift duration
    const top = 8 + Math.random() * 78;          // 8%–86% down the screen
    const dur = 14 + Math.random() * 12;          // 14s–26s to cross
    const size = 0.95 + Math.random() * 0.6;      // font scale
    el.style.top = top + "vh";
    el.style.fontSize = size + "rem";
    el.style.animationDuration = dur + "s";

    layer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }

  function start() {
    layer = document.getElementById("quotes-layer");
    if (!layer) return;
    floatQuote();                       // one right away
    setInterval(floatQuote, 4500);      // a new one every ~4.5s
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
