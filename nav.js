/* ============================================================
   SHARED PUZZLE NAVIGATION BAR  (nav2.js)
   ------------------------------------------------------------
   Include this on any page with:
     <script src="nav2.js"></script>

   To add a new puzzle page, just add a line to the LINKS array
   below. "match" should be the exact filename of that page
   (used to highlight the current page as active).
   ============================================================ */

const PUZZLE_NAV_LINKS = [
  
  { label: "Dots & Boxes",href: "dotsboxes.html", match: "dotsboxes.html" },
  { label: "Flow",        href: "flow.html",      match: "flow.html"      },
  { label: "Kakuro",      href: "kakuro.html",    match: "kakuro.html"    },
  { label: "Mancala",      href: "mancala.html",    match: "mancala.html"    },
  { label: "Picross",     href: "index.html",     match: "index.html"     },
  { label: "Reversi",     href: "reversi.html",   match: "reversi.html"   },
  { label: "Sudoku",      href: "sudoku.html",    match: "sudoku.html"    },

  // Add more puzzles here, e.g.:
  // { label: "Minesweeper", href: "minesweeper.html", match: "minesweeper.html" },
];

(function renderPuzzleNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const SCROLL_AMOUNT = 160; // px per arrow click

  /* ── Styles ─────────────────────────────────────────── */
  const style = document.createElement("style");
  style.textContent = `
    .pnav-shell {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      height: 52px;
      background: rgba(245, 240, 224, 0.95);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(40, 35, 28, 0.14);
      box-shadow: 0 2px 10px rgba(40, 35, 28, 0.07);
      font-family: 'JetBrains Mono', ui-monospace, monospace;
    }

    /* Arrow buttons */
    @keyframes pnav-pulse {
      0%, 100% { opacity: 1;    transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(0.88); }
    }
    .pnav-arrow {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 100%;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 4px;
      z-index: 2;
      user-select: none;
    }
    .pnav-arrow-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #2A2520;
      color: #F2ECDC;
      font-size: 20px;
      line-height: 1;
      transition: background 0.15s, transform 0.1s;
      animation: pnav-pulse 1.4s ease-in-out infinite;
      box-shadow: 0 2px 6px rgba(40, 35, 28, 0.30);
    }
    .pnav-arrow:hover .pnav-arrow-inner {
      background: #B5492C;
      animation: none;
      transform: scale(1.1);
    }
    .pnav-arrow:active .pnav-arrow-inner {
      transform: scale(0.94);
    }
    .pnav-arrow:disabled {
      opacity: 0;
      pointer-events: none;
    }

    /* Scrollable track */
    .pnav-track {
      flex: 1 1 0;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      /* fade edges to hint overflow */
      mask-image: linear-gradient(to right, transparent 0px, black 16px, black calc(100% - 16px), transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0px, black 16px, black calc(100% - 16px), transparent 100%);
    }
    .pnav-track::-webkit-scrollbar { display: none; }

    /* Inner nav row */
    .pnav-row {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 12px;
      width: max-content;  /* allows row to be wider than track */
      min-width: 100%;     /* but still fills track when few links */
      justify-content: center;
      height: 52px;
    }

    /* Links */
    .pnav-row a {
      flex: 0 0 auto;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #5C5346;
      padding: 6px 14px;
      border-radius: 999px;
      border: 1px solid transparent;
      white-space: nowrap;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .pnav-row a:hover {
      background: rgba(181, 73, 44, 0.10);
      color: #B5492C;
    }
    .pnav-row a.active {
      background: #2A2520;
      color: #F2ECDC;
      border-color: #2A2520;
    }

    /* Offset body so content isn't hidden under fixed nav */
    body.pnav-offset {
      padding-top: 52px !important;
    }

    @media (max-width: 480px) {
      .pnav-arrow { width: 36px; }
      .pnav-arrow-inner { width: 28px; height: 28px; font-size: 17px; }
      .pnav-row { gap: 4px; padding: 0 8px; }
      .pnav-row a { font-size: 12px; padding: 5px 10px; }
    }
  `;
  document.head.appendChild(style);

  /* ── Build DOM ───────────────────────────────────────── */
  const shell = document.createElement("div");
  shell.className = "pnav-shell";

  const btnLeft = document.createElement("button");
  btnLeft.className = "pnav-arrow";
  btnLeft.setAttribute("aria-label", "Scroll navigation left");
  btnLeft.innerHTML = `<span class="pnav-arrow-inner">&#8249;</span>`; // ‹

  const track = document.createElement("div");
  track.className = "pnav-track";

  const row = document.createElement("nav");
  row.className = "pnav-row";

  const btnRight = document.createElement("button");
  btnRight.className = "pnav-arrow";
  btnRight.setAttribute("aria-label", "Scroll navigation right");
  btnRight.innerHTML = `<span class="pnav-arrow-inner">&#8250;</span>`; // ›

  let activeLink = null;
  PUZZLE_NAV_LINKS.forEach(link => {
    const a = document.createElement("a");
    a.href  = link.href;
    a.textContent = link.label;
    if (link.match === currentPage) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
      activeLink = a;
    }
    row.appendChild(a);
  });

  track.appendChild(row);
  shell.appendChild(btnLeft);
  shell.appendChild(track);
  shell.appendChild(btnRight);

  document.body.classList.add("pnav-offset");
  document.body.insertBefore(shell, document.body.firstChild);

  /* ── Arrow click handlers ────────────────────────────── */
  btnLeft.addEventListener("click", () => {
    track.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  });
  btnRight.addEventListener("click", () => {
    track.scrollBy({ left:  SCROLL_AMOUNT, behavior: "smooth" });
  });

  /* ── Show/hide arrows based on scroll position ───────── */
  function updateArrows() {
    const atStart = track.scrollLeft <= 2;
    const atEnd   = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    const canScroll = track.scrollWidth > track.clientWidth;

    btnLeft.disabled  = !canScroll || atStart;
    btnRight.disabled = !canScroll || atEnd;
  }

  track.addEventListener("scroll", updateArrows, { passive: true });
  // Run once after layout so arrows reflect initial state
  requestAnimationFrame(updateArrows);

  /* ── Scroll active link into view on load ────────────── */
  if (activeLink) {
    requestAnimationFrame(() => {
      activeLink.scrollIntoView({ block: "nearest", inline: "center" });
      updateArrows();
    });
  }
})();
