export default function setupNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const navMenu = document.querySelector(".nav-menu");
  const btnOpen = document.querySelector(".nav-mob-open");
  const SCROLL_THRESHOLD = 80;

  // 🔧 Stili dinamici
  const style = document.createElement("style");
  style.innerHTML = `
    .navbar {
      transition: padding 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    }
    .navbar.compact {
      padding: 10px 170px;
      box-shadow: 0 6px 24px rgba(0,0,0,0.25);
      background: linear-gradient(270deg, rgba(223, 137, 8, 0.2) 50.41%, rgba(180, 21, 255, 0.2) 90.25%);
      border-radius: 50px;
    }
    .fade-hide {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .fade-show {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
    .nav-mob-open {
      display: none;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease;
      cursor: pointer;
      font-size: 24px;
      z-index: 1001;
    }
    .nav-mob-open.fade-show {
      display: inline-block;
      opacity: 1;
      visibility: visible;
    }
    .nav-connect {
      transition: padding 0.3s ease, font-size 0.3s ease, width 0.3s ease;
      white-space: nowrap;
    }
    .navbar.compact .nav-connect {
      padding: 12px 28px;
      font-size: 16px;
      width: auto;
    }
    #back-to-top {
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 30px;
      background: linear-gradient(267deg, #da7c25 0.36%, #b923e1 102.06%);
      color: #fff;
      border: none;
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 999;
    }
    .offcanvas-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1000;
    }
    .offcanvas-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    .offcanvas-menu {
      position: fixed;
      top: 0;
      right: -300px;
      width: 300px;
      height: 100vh;
      background: #fff;
      box-shadow: -4px 0 12px rgba(0,0,0,0.2);
      transition: right 0.3s ease;
      z-index: 1001;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .offcanvas-menu.active {
      right: 0;
    }
    .offcanvas-close {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 24px;
      cursor: pointer;
      background: none;
      border: none;
    }
    .offcanvas-menu li {
      list-style: none;
      font-size: 18px;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // 🔼 Pulsante "↑ Top"
  const backToTopBtn = document.createElement("button");
  backToTopBtn.id = "back-to-top";
  backToTopBtn.textContent = "↑ Top";
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function updateBackToTopVisibility() {
    if (window.scrollY > SCROLL_THRESHOLD * 2) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.pointerEvents = "auto";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.pointerEvents = "none";
    }
  }

  // 🧱 Off-canvas elements
  const offcanvasOverlay = document.createElement("div");
  offcanvasOverlay.className = "offcanvas-overlay";
  document.body.appendChild(offcanvasOverlay);

  const offcanvasMenu = document.createElement("ul");
  offcanvasMenu.className = "offcanvas-menu";

  const closeBtn = document.createElement("button");
  closeBtn.className = "offcanvas-close";
  closeBtn.innerHTML = "✕";
  offcanvasMenu.appendChild(closeBtn);

  // Copia i list item dalla nav-menu
  const navItems = navMenu?.querySelectorAll("li");
  navItems?.forEach(item => {
    const clone = item.cloneNode(true);
    offcanvasMenu.appendChild(clone);
  });

  document.body.appendChild(offcanvasMenu);

  // 🎯 Eventi apertura/chiusura
  btnOpen?.addEventListener("click", () => {
    offcanvasOverlay.classList.add("active");
    offcanvasMenu.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    offcanvasOverlay.classList.remove("active");
    offcanvasMenu.classList.remove("active");
  });

  offcanvasOverlay.addEventListener("click", () => {
    offcanvasOverlay.classList.remove("active");
    offcanvasMenu.classList.remove("active");
  });

  // 🔁 Aggiorna stato navbar
  function updateNavbarState() {
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;

    if (isScrolled) {
      navbar?.classList.add("compact");

      if (!navMenu?.classList.contains("open")) {
        navMenu?.classList.add("fade-hide");
        navMenu.style.pointerEvents = "none";

        btnOpen?.classList.add("fade-show");
        btnOpen.style.pointerEvents = "auto";
        btnOpen.style.display = "inline-block";
        btnOpen.style.opacity = "1";
        btnOpen.style.visibility = "visible";
      }
    } else {
      navbar?.classList.remove("compact");

      navMenu?.classList.remove("fade-hide");
      navMenu.style.pointerEvents = "";

      btnOpen?.classList.remove("fade-show");
      btnOpen.style.pointerEvents = "";
      btnOpen.style.display = "none";
      btnOpen.style.opacity = "0";
      btnOpen.style.visibility = "hidden";

      // Chiudi offcanvas se aperto
      offcanvasOverlay.classList.remove("active");
      offcanvasMenu.classList.remove("active");
    }

    updateBackToTopVisibility();
  }

  // 📡 Eventi scroll e resize
  window.addEventListener("scroll", updateNavbarState, { passive: true });
  window.addEventListener("resize", updateNavbarState);

  // 🚀 Inizializzazione
  updateNavbarState();
}
