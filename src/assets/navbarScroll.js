export default function setupNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const navMenu = document.querySelector(".nav-menu");
  const SCROLL_THRESHOLD = 80;

  // 🔧 Inietta stili dinamici
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
  `;
  document.head.appendChild(style);

  // 🔼 Bottone "↑ Top"
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

  // 🔁 Aggiorna stato navbar & hamburger
  function updateNavbarState() {
    // ogni volta riprendi la reference al nuovo <i class="nav-mob-open">
    const btnOpen = document.querySelector(".nav-mob-open");
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;
    const isLargeScreen = window.innerWidth > 1024;

    if (isLargeScreen) {
      // --- Desktop ---
      if (isScrolled) {
        navbar?.classList.add("compact");

        if (!navMenu.classList.contains("open")) {
          navMenu.classList.add("fade-hide");
          navMenu.style.pointerEvents = "none";

          btnOpen?.classList.add("fade-show");
          btnOpen?.setAttribute(
            "style",
            "display:inline-block; opacity:1; visibility:visible; pointer-events:auto;"
          );
        }
      } else {
        navbar?.classList.remove("compact");

        navMenu.classList.remove("fade-hide");
        navMenu.style.pointerEvents = "";

        btnOpen?.classList.remove("fade-show");
        btnOpen?.setAttribute(
          "style",
          "display:none; opacity:0; visibility:hidden; pointer-events:none;"
        );
      }
    } else {
      // --- Mobile ---
      navbar?.classList.remove("compact");
      navMenu.classList.remove("fade-hide");
      navMenu.style.pointerEvents = "";

      if (!navMenu.classList.contains("open")) {
        btnOpen?.classList.add("fade-show");
        btnOpen?.setAttribute(
          "style",
          "display:inline-block; opacity:1; visibility:visible; pointer-events:auto;"
        );
      } else {
        btnOpen?.classList.remove("fade-show");
        btnOpen?.setAttribute(
          "style",
          "display:none; opacity:0; visibility:hidden; pointer-events:none;"
        );
      }
    }

    updateBackToTopVisibility();
  }

  // 📡 Scroll e resize
  window.addEventListener("scroll", updateNavbarState, { passive: true });
  window.addEventListener("resize", updateNavbarState);

  // 🚀 Inizializzazione
  updateNavbarState();

  // 🔄 Al click su hamburger, X o link, riallinea lo stato dopo il render di React
  document.addEventListener("click", (e) => {
    const target = /** @type {HTMLElement} */ (e.target);
    if (
      target.classList.contains("nav-mob-open") ||
      target.classList.contains("nav-mob-close") ||
      target.closest(".nav-menu li")
    ) {
      // 50ms di delay per far sì che React abbia già aggiornato isOpen → DOM
      setTimeout(updateNavbarState, 50);
    }
  });
}
