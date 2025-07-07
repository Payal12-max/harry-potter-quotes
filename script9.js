// DOM Elements
const quoteText = document.getElementById("quote-text");
const quoteChar = document.getElementById("quote-character");
const newQuoteBtn = document.getElementById("new-quote");
const addFavBtn = document.getElementById("add-favorite");
const favList = document.getElementById("favorites-list");
const clearFavBtn = document.getElementById("clear-favorites");
const themeToggle = document.getElementById("theme-toggle");

let currentQuote = null;
let allQuotes = [];

// 🪄 Fetch all spells
async function fetchAllQuotes() {
  try {
    const res = await fetch("https://hp-api.onrender.com/api/spells");
    const data = await res.json();
    allQuotes = data;
    showQuote(); // Show one quote on load
  } catch (err) {
    console.error("Failed to fetch spells:", err);
    quoteText.textContent = "Failed to load spells 🧨";
  }
}

// 💬 Display a random spell
function showQuote() {
  if (allQuotes.length === 0) {
    quoteText.textContent = "No spells available.";
    quoteChar.textContent = "";
    return;
  }

  const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  quoteText.textContent = `"${quote.name}"`;
  quoteChar.textContent = `— ${quote.description}`;
  currentQuote = quote;

  // Fade animation
  const quoteBox = document.getElementById("quote-box");
  quoteBox.classList.remove("fade");
  void quoteBox.offsetWidth;
  quoteBox.classList.add("fade");
}

// ❤️ Add to Favorites
function addToFavorites() {
  if (!currentQuote) return;
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Avoid duplicates
  if (!favorites.find(f => f.name === currentQuote.name)) {
    favorites.push(currentQuote);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

// 🧾 Render Favorites
function renderFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favList.innerHTML = "";
  favorites.forEach(fav => {
    const li = document.createElement("li");
    li.textContent = `"${fav.name}" — ${fav.description}`;
    favList.appendChild(li);
  });
}

// 🧹 Clear Favorites
function clearFavorites() {
  localStorage.removeItem("favorites");
  renderFavorites();
}

// 🌓 Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Event Listeners
newQuoteBtn.addEventListener("click", showQuote);
addFavBtn.addEventListener("click", addToFavorites);
clearFavBtn.addEventListener("click", clearFavorites);

// Initialize
fetchAllQuotes();
renderFavorites();
