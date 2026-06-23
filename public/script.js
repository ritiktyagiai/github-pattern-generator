const ROWS = 7;
const COLS = 53;
const grid = document.getElementById("grid");

if (grid) {
  let data = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(" ")
  );

  let cells = [];

  // Build grid
  for (let r = 0; r < ROWS; r++) {
    cells[r] = [];
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      cell.onclick = () => toggleCell(r, c);
      cell.oncontextmenu = e => {
        e.preventDefault();
        setCell(r, c, false);
      };

      grid.appendChild(cell);
      cells[r][c] = cell;
    }
  }

  function setCell(r, c, active) {
    cells[r][c].classList.toggle("active", active);
    data[r][c] = active ? "3" : " ";
  }

  function toggleCell(r, c) {
    setCell(r, c, data[r][c] === " ");
  }

  /* RESET */
  const resetButton = document.getElementById("reset");
  if (resetButton) {
    resetButton.onclick = () => {
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++)
          setCell(r, c, false);
    };
  }

  /* DOWNLOAD */
  const downloadButton = document.getElementById("download");
  if (downloadButton) {
    downloadButton.onclick = () => {
      const rows = data.map(row => row.join(""));
      const blob = new Blob(
        [JSON.stringify(rows, null, 2)],
        { type: "application/json" }
      );

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "pattern.json";
      a.click();
    };
  }
}
/* ================= THEME TOGGLE ================= */
const toggleBtn = document.getElementById("theme-toggle");
const toggleIcon = toggleBtn.querySelector("i");
const rootElement = document.documentElement;

// Function to set theme
function setTheme(theme) {
  if (theme === "dark") {
    rootElement.setAttribute("data-theme", "dark");
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    rootElement.removeAttribute("data-theme");
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
}

// Check local storage on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  // Optional: Auto-detect system preference if no saved preference
  setTheme("dark");
}

// Toggle event
toggleBtn.onclick = () => {
  const currentTheme = rootElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
};
