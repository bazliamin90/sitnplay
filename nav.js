/* ============================================================
   SHARED PUZZLE NAVIGATION BAR
   ------------------------------------------------------------
   Include this on any page with:
     <script src="nav.js"></script>

   To add a new puzzle page, just add a line to the LINKS array
   below. "match" should be the exact filename of that page
   (used to highlight the current page as active).
   ============================================================ */

const PUZZLE_NAV_LINKS = [
  { label: "Sudoku",  href: "sudoku.html",  match: "sudoku.html"  },
  { label: "Picross", href: "index.html", match: "index.html" },
  { label: "Flow",    href: "flow.html",    match: "flow.html"    },
  { label: "Kakuro",  href: "kakuro.html",  match: "kakuro.html"  },
  // Add more puzzles here, e.g.:
  // { label: "Minesweeper", href: "minesweeper.html", match: "minesweeper.html" },
];

(function renderPuzzleNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const style = document.createElement("style");
  style.textContent = `
    .puzzle-nav-wrap {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(245, 240, 224, 0.92);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border-bottom: 1px solid rgba(40, 35, 28, 0.14);
      box-shadow: 0 2px 10px rgba(40, 35, 28, 0.06);
      font-family: 'JetBrains Mono', 'Source Serif 4', monospace, sans-serif;
      /* fade hint at the edges when content overflows */
      mask-image: linear-gradient(to right, transparent 0, black 18px, black calc(100% - 18px), transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0, black 18px, black calc(100% - 18px), transparent 100%);
    }
    .puzzle-nav {
      display: flex;
      align-items: center;
      justify-content: center; /* centers the row when it's narrower than the viewport */
      gap: 6px;
      flex-wrap: nowrap;
      overflow-x: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      padding: 10px 18px;
      min-width: 100%;
      width: max-content;
      margin: 0 auto;
      scrollbar-width: none; /* Firefox */
    }
    .puzzle-nav::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }
    /* Push page content down so it isn't hidden under the fixed nav bar. */
    body.puzzle-nav-offset {
      padding-top: 56px !important;
    }
    .puzzle-nav a {
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #5C5346;
      padding: 6px 14px;
      border-radius: 999px;
      border: 1px solid transparent;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      white-space: nowrap;
      flex: 0 0 auto;
    }
    .puzzle-nav a:hover {
      background: rgba(181, 73, 44, 0.10);
      color: #B5492C;
    }
    .puzzle-nav a.active {
      background: #2A2520;
      color: #F2ECDC;
      border-color: #2A2520;
    }
    @media (max-width: 480px) {
      .puzzle-nav { gap: 4px; padding: 8px 14px; }
      .puzzle-nav a { font-size: 12px; padding: 5px 10px; }
    }
  `;
  document.head.appendChild(style);

  const navWrap = document.createElement("div");
  navWrap.className = "puzzle-nav-wrap";

  const nav = document.createElement("nav");
  nav.className = "puzzle-nav";

  let activeLink = null;

  PUZZLE_NAV_LINKS.forEach(link => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.label;
    if (link.match === currentPage) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
      activeLink = a;
    }
    nav.appendChild(a);
  });

  navWrap.appendChild(nav);
  document.body.classList.add("puzzle-nav-offset");
  document.body.insertBefore(navWrap, document.body.firstChild);

  // If the active puzzle is scrolled out of view (e.g. far down the list),
  // bring it into view on load so people can see where they are.
  if (activeLink) {
    activeLink.scrollIntoView({ block: "nearest", inline: "center" });
  }
})();
