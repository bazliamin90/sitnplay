const headerTemplate3 = document.createElement('template');

headerTemplate3.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Lora:wght@600;700&display=swap');

:host {
    display: block;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 998;
    --bg-card: #f6f1e4;
    --bg-card-hover: #f9f5ea;
    --ink: #262220;
    --ink-soft: #514a40;
    --muted: #9b9382;
    --accent: #b8502f;
    --line: #ded6bf;
    --font-serif: 'Lora', Georgia, 'Times New Roman', serif;
    --font-mono: 'JetBrains Mono', 'Space Mono', 'Courier New', monospace;
}

/* === Header Styling === */
.header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 auto;
    padding: 2px 14px;
    max-width: 600px;
    background-color: var(--bg-card);
    background-image: repeating-linear-gradient(0deg, rgba(38, 34, 32, 0.025) 0px, rgba(38, 34, 32, 0.025) 1px, transparent 1px, transparent 3px);
    box-shadow: 0 4px 12px rgba(38, 34, 32, 0.12);
    border-bottom: 2px solid var(--ink);
    border-radius: 0 0 16px 16px;
    transition: background-color 0.3s ease;
}

.header:hover {
    background-color: var(--bg-card-hover);
}

/* === Menu Buttons === */
.menu {
    border: 2px solid var(--ink);
    background-color: var(--bg-card);
    border-radius: 8px;
    padding: 5px 8px;
    font-size: 14px;
    cursor: pointer;
    display: block;
    object-fit: contain;
    box-shadow: 0 2px 0 rgba(38, 34, 32, 0.18);
    transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
}

.menu:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 0 rgba(38, 34, 32, 0.22);
    background-color: var(--bg-card-hover);
}

.menu:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 rgba(38, 34, 32, 0.18);
}

/* === Title === */
h1 {
    font-family: var(--font-mono);
    font-size: 15px;
    text-align: left;
    display: flex;
    align-items: center;
    padding: 5px 0;
    margin: 0;
    max-width: 50rem;
}

h1 a {
    display: inline-flex;
    align-items: center;
    font-family: var(--font-serif);
    font-weight: 700;
    text-decoration: none;
    color: var(--ink);
    background-color: var(--bg-card);
    border: 2px solid var(--ink);
    border-radius: 8px;
    padding: 6px 12px;
    box-shadow: 0 2px 0 rgba(38, 34, 32, 0.18);
    transition: background-color 0.15s ease, color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

h1 a::after {
    content: '.';
    color: var(--accent);
    margin-left: 1px;
}

h1 a:hover {
    background-color: var(--ink);
    color: var(--bg-card);
    transform: translateY(-1px);
    box-shadow: 0 3px 0 rgba(38, 34, 32, 0.22);
}

h1 a:hover::after {
    color: var(--accent);
}

/* === Scroll Box === */
.scroll-box {
    position: fixed;
    top: 5vh;
    left: 0;
    height: 80vh;
    width: 260px;
    max-width: 90%;
    border-right: 2px solid var(--ink);
    padding: 16px 14px;
    background-color: var(--bg-card);
    background-image: repeating-linear-gradient(0deg, rgba(38, 34, 32, 0.02) 0px, rgba(38, 34, 32, 0.02) 1px, transparent 1px, transparent 3px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* momentum scrolling */
    touch-action: pan-y;
    box-shadow: 4px 0 16px rgba(38, 34, 32, 0.18);
    transform: translateX(-110%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    border-radius: 0 16px 16px 0;
    scroll-behavior: smooth;
}

.scroll-box.visible {
    transform: translateX(0);
}

/* === Scroll fade top/bottom === */
.fade-top,
.fade-bottom {
    position: sticky;
    left: 0;
    height: 22px;
    z-index: 10;
    pointer-events: none;
}

.fade-top {
    top: 0;
    background: linear-gradient(to bottom, var(--bg-card), rgba(246, 241, 228, 0));
}

.fade-bottom {
    bottom: 0;
    background: linear-gradient(to top, var(--bg-card), rgba(246, 241, 228, 0));
}

/* === Close message === */
.close-message {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 12px;
    text-align: center;
}

/* === Search Box === */
.search-box {
    width: 80%;
    padding: 7px 10px;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--ink);
    background-color: var(--bg-card);
    border: 2px solid var(--ink);
    border-radius: 8px;
    outline: none;
    box-shadow: 0 2px 0 rgba(38, 34, 32, 0.12);
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.search-box::placeholder {
    color: var(--muted);
}

.search-box:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(184, 80, 47, 0.18);
}

/* === List Section === */
.scroll-box ol {
    font-family: var(--font-mono);
    margin: 36px 0;
    padding: 0;
    list-style-position: outside;
    padding-left: 2.4em;
    color: var(--ink-soft);
}

.scroll-box ol a {
    font-family: var(--font-mono);
    text-decoration: underline dotted var(--muted);
    text-underline-offset: 3px;
    color: var(--ink);
    transition: color 0.2s ease;
}

.scroll-box ol a:hover {
    color: var(--accent);
}

.scroll-box li {
    font-size: 0.8em;
    padding-bottom: 10px;
}

.scroll-box b {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.78em;
    font-weight: 700;
    color: var(--accent);
}

.scroll-box hr {
    border: none;
    border-top: 1.5px solid var(--ink);
    opacity: 0.85;
    margin: 16px 0 6px;
}

.hrnone {
    border-top: 1px solid transparent !important;
    margin: 0 0 8px !important;
}

/* === Overlay Background === */
#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(38, 34, 32, 0.55);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
    z-index: 999;
}

#overlay.visible {
    opacity: 1;
    visibility: visible;
}

/* === Responsive Mobile Adjustment === */
@media (max-width: 600px) {
    .scroll-box {
        width: 75%;
    }

    h1 {
        font-size: 13px;
    }
}
</style>

<div class="header">
    <img src="menu.svg" class="menu" alt="☰">
    <h1><a href="index.html">Baz: Sit & Play</a></h1>
</div>

<div id="overlay"></div>

<div class="scroll-box" id="scroll-box">
    <div class="fade-top"></div>

    <div class="close-message">Click outside this box to close it</div>

    <input
        type="text"
        class="search-box"
        id="search-box"
        placeholder="Search..."
        aria-label="Search list items"
    />

    <ol id="list">
        <li><a href="#">---</a></li>
        <hr><b>Games</b><hr class="hrnone">
        <li><a href="flow.html">Flow</a></li>
        <li><a href="kakuro.html">Kakuro</a></li>
        <li><a href="index.html">Picross</a></li>
        <li><a href="sudoku.html">Sudoku</a></li>
    </ol>

    <div class="fade-bottom"></div>
</div>
`;

class Header3 extends HTMLElement {
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild(headerTemplate3.content.cloneNode(true));

        const menu = shadowRoot.querySelector('.menu');
        const scrollBox = shadowRoot.querySelector('#scroll-box');
        const overlay = shadowRoot.querySelector('#overlay');
        const searchBox = shadowRoot.querySelector('#search-box');
        const list = shadowRoot.querySelector('#list');
        const fadeTop = shadowRoot.querySelector('.fade-top');
        const fadeBottom = shadowRoot.querySelector('.fade-bottom');

        // === Touch scroll blocker (fixed for mobile) ===
        function blockBackgroundScroll(e) {
            const path = e.composedPath();
            if (!path.includes(scrollBox)) e.preventDefault();
        }

        // === Menu toggle ===
        menu.addEventListener('click', e=>{e.stopPropagation(); toggleScrollBox();});
        scrollBox.addEventListener('click', e=>e.stopPropagation());
        searchBox.addEventListener('click', e=>e.stopPropagation());
        overlay.addEventListener('click', hideScrollBox);

        document.addEventListener('click', e=>{
            const path = e.composedPath();
            if(scrollBox.classList.contains('visible') && !path.includes(scrollBox) && !path.some(el=>el.classList && el.classList.contains('menu'))){
                hideScrollBox();
            }
        });

        function toggleScrollBox() { 
            scrollBox.classList.contains('visible') ? hideScrollBox() : showScrollBox(); 
        }

        function showScrollBox() {
            scrollBox.classList.add('visible');
            overlay.classList.add('visible');

            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;

            document.addEventListener('touchmove', blockBackgroundScroll, {passive:false});
            updateFadeShadows();
        }

        function hideScrollBox() {
            scrollBox.classList.remove('visible');
            overlay.classList.remove('visible');

            document.body.style.overflow = '';
            document.body.style.paddingRight = '';

            document.removeEventListener('touchmove', blockBackgroundScroll);
        }

        // === Scroll fade shadows ===
        scrollBox.addEventListener('scroll', updateFadeShadows);
        function updateFadeShadows() {
            const atTop = scrollBox.scrollTop <= 5;
            const atBottom = scrollBox.scrollHeight - scrollBox.clientHeight - scrollBox.scrollTop <= 5;
            fadeTop.style.opacity = atTop ? "0" : "1";
            fadeBottom.style.opacity = atBottom ? "0" : "1";
        }

        // === Search filter ===
        searchBox.addEventListener('input', ()=>{
            const filter = searchBox.value.toLowerCase();
            list.querySelectorAll('li').forEach(li=>{
                li.style.display = li.textContent.toLowerCase().includes(filter) ? '' : 'none';
            });
            list.querySelectorAll('b, hr').forEach(el=>{
                el.style.display = filter ? 'none' : '';
            });
        });
    }
}

customElements.define('header3-component', Header3);
