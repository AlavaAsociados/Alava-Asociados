/**
 * ==============================================================================
 * MAIN.JS - Lógica Global Compartida
 * Cargado en las 5 páginas del portafolio.
 * Funcionalidades:
 *  1. Control del menú móvil (hamburguesa) con soporte accesible y responsivo
 *  2. Detección automática y activación del enlace del menú según la página actual
 *  3. Inserción dinámica del año actual en el pie de página
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Control del Menú Móvil (Hamburguesa)
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    // Configurar accesibilidad inicial
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-controls", "nav-menu");

    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    const closeMenu = () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    };

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Cerrar el menú automáticamente al hacer clic en cualquier enlace
    const navLinks = navMenu.querySelectorAll(".nav-link, .btn-nav-cv");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Cerrar el menú al hacer clic en cualquier parte fuera del menú
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Cerrar el menú con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    // Cerrar el menú si la ventana se redimensiona por encima del breakpoint móvil (768px)
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // 2. Detección y activación del enlace del menú según la URL
  const path = window.location.pathname;
  const currentPage = path.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    // Comprueba si coincide con el archivo actual o con la raíz '/' para index.html
    const isHome = (currentPage === "" || currentPage === "index.html") && linkHref === "index.html";
    const isCurrentPage = linkHref === currentPage;

    if (isHome || isCurrentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 3. Año dinámico en el footer
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 4. Filtro Interactivo de Certificaciones en about.html
  const certFiltersContainer = document.getElementById("cert-filters");
  if (certFiltersContainer) {
    const filterButtons = certFiltersContainer.querySelectorAll(".filter-pill");
    const certCards = document.querySelectorAll(".cert-card");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Alternar clase activa en las píldoras de filtro
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const selectedFilter = btn.getAttribute("data-filter");

        certCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");

          if (selectedFilter === "all" || cardCategory === selectedFilter) {
            card.style.display = "flex";
            card.style.opacity = "0";
            card.style.transform = "translateY(8px)";
            
            // Animación suave de entrada
            requestAnimationFrame(() => {
              card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // 5. Asistente Robot Ejecutivo "Buppy" (Executive Robot Assistant)
  initExecutiveRobot();
});

/**
 * Inicializa a Buppy, el Asistente Robot Ejecutivo:
 * - Modo Silencioso en páginas de currículum (index, about, skills, projects, contact)
 * - Modo Interactivo con burbuja Liquid Glass exclusivamente en forum.html
 * - Seguimiento ocular fluido (mousemove) y levitación
 */
function initExecutiveRobot() {
  if (document.getElementById("executive-robot-container")) return;

  const isForum =
    window.location.pathname.toLowerCase().includes("forum.html") ||
    !!document.querySelector(".forum-section");

  const robotContainer = document.createElement("div");
  robotContainer.id = "executive-robot-container";
  robotContainer.className = "executive-robot-container";
  robotContainer.setAttribute("aria-hidden", "false");
  robotContainer.setAttribute("title", "Buppy — Asistente Ejecutivo");

  // Burbuja de diálogo Liquid Glass para Modo Interactivo (solo en forum.html)
  const bubbleHtml = isForum
    ? `
      <div class="executive-robot-bubble" role="tooltip" aria-label="Mensaje de Buppy, asistente financiero">
        <div class="robot-bubble-header">
          <span class="robot-bubble-name">Buppy</span>
          <span class="robot-bubble-badge">Asistente Ejecutivo</span>
        </div>
        <p class="robot-bubble-text">¿Analizamos tus indicadores financieros?</p>
        <a href="contact.html" target="_blank" rel="noopener noreferrer" class="robot-bubble-link">
          <span>Consúltame &#8599;</span>
        </a>
        <div class="robot-bubble-tail"></div>
      </div>
    `
    : "";

  robotContainer.innerHTML = `
    <div class="executive-robot-wrapper">
      ${bubbleHtml}
      <svg class="executive-robot-svg" width="90" height="115" viewBox="0 0 90 115" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Buppy - Asistente Robot Ejecutivo">
        <defs>
          <linearGradient id="robotSuitGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2D3542"/>
            <stop offset="100%" stop-color="#1A202A"/>
          </linearGradient>
          <linearGradient id="robotTieGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#34D399"/>
            <stop offset="100%" stop-color="#059669"/>
          </linearGradient>
          <linearGradient id="robotHeadGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3A4454"/>
            <stop offset="50%" stop-color="#272E3B"/>
            <stop offset="100%" stop-color="#1E242E"/>
          </linearGradient>
          <linearGradient id="robotVisorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0F141C"/>
            <stop offset="100%" stop-color="#080B10"/>
          </linearGradient>
          <linearGradient id="robotBriefcaseGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#28303C"/>
            <stop offset="100%" stop-color="#151920"/>
          </linearGradient>
          <filter id="robotGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- ANTENA CON SIGNO $ -->
        <line x1="45" y1="18" x2="45" y2="8" stroke="#64748B" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="45" cy="7" r="6" fill="#10B981" stroke="#059669" stroke-width="1" filter="url(#robotGlow)"/>
        <text x="45" y="9.5" font-family="system-ui, sans-serif" font-size="8" font-weight="900" fill="#0A0D12" text-anchor="middle">$</text>

        <!-- CABEZA DEL ROBOT (CHASIS METÁLICO) -->
        <rect x="25" y="17" width="40" height="27" rx="8" fill="url(#robotHeadGrad)" stroke="#475569" stroke-width="1.2"/>
        <rect x="27" y="18.5" width="36" height="3" rx="1.5" fill="rgba(255,255,255,0.22)"/>

        <!-- OREJAS / SENSORES AUDITIVOS -->
        <rect x="22" y="24" width="3" height="12" rx="1.5" fill="#475569"/>
        <rect x="65" y="24" width="3" height="12" rx="1.5" fill="#475569"/>

        <!-- VISOR OSCURO -->
        <rect x="28" y="22" width="34" height="17" rx="5" fill="url(#robotVisorGrad)" stroke="#1E293B" stroke-width="1"/>

        <!-- OJOS DEL ROBOT (SEGUIMIENTO PUPILAR) -->
        <!-- Ojo Izquierdo -->
        <circle cx="37" cy="29" r="5" fill="#091410" stroke="rgba(16,185,129,0.3)" stroke-width="0.8"/>
        <g class="robot-pupil-group-left">
          <circle cx="37" cy="29" r="3" fill="#10B981" filter="url(#robotGlow)"/>
          <circle cx="36" cy="28" r="0.9" fill="#FFFFFF"/>
        </g>

        <!-- Ojo Derecho -->
        <circle cx="53" cy="29" r="5" fill="#091410" stroke="rgba(16,185,129,0.3)" stroke-width="0.8"/>
        <g class="robot-pupil-group-right">
          <circle cx="53" cy="29" r="3" fill="#10B981" filter="url(#robotGlow)"/>
          <circle cx="52" cy="28" r="0.9" fill="#FFFFFF"/>
        </g>

        <!-- Sonrisa sutil digital -->
        <path d="M42 36 Q45 37.5 48 36" stroke="#10B981" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.85"/>

        <!-- CUELLO -->
        <rect x="41" y="44" width="8" height="4" rx="1" fill="#334155"/>

        <!-- CUERPO: TRAJE GRIS OSCURO -->
        <path d="M22 48 L68 48 L65 86 L25 86 Z" fill="url(#robotSuitGrad)" stroke="#374151" stroke-width="1.2"/>

        <!-- CAMISA BLANCA EJECUTIVA -->
        <polygon points="41,48 49,48 45,61" fill="#F8FAFC"/>

        <!-- CORBATA VERDE ESMERALDA (#10B981) -->
        <polygon points="43,49 47,49 46.5,53 43.5,53" fill="#10B981"/>
        <polygon points="43.5,53 46.5,53 47.5,67 45,71 42.5,67" fill="url(#robotTieGrad)" stroke="#059669" stroke-width="0.5"/>

        <!-- SOLAPAS DEL TRAJE -->
        <path d="M24 48 L39 63 L34 65 L22 51 Z" fill="#1F2631" stroke="#374151" stroke-width="0.7"/>
        <path d="M66 48 L51 63 L56 65 L68 51 Z" fill="#1F2631" stroke="#374151" stroke-width="0.7"/>

        <!-- PAÑUELO DE BOLSILLO VERDE ESMERALDA (#10B981) -->
        <line x1="56" y1="58" x2="62" y2="58" stroke="#1A202A" stroke-width="1"/>
        <polygon points="57,58 58.5,53 60,58" fill="#10B981" filter="url(#robotGlow)"/>
        <polygon points="59,58 60.5,52 62,58" fill="#34D399"/>

        <!-- BRAZO IZQUIERDO Y MALETÍN EJECUTIVO -->
        <path d="M22 50 L14 66 L12 80" stroke="#374151" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <circle cx="12" cy="80" r="3" fill="#64748B"/>

        <!-- MALETÍN EJECUTIVO -->
        <path d="M10 76 Q12 73 14 76" stroke="#94A3B8" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <rect x="5" y="78" width="16" height="19" rx="2.5" fill="url(#robotBriefcaseGrad)" stroke="#374151" stroke-width="1"/>
        <line x1="5" y1="84" x2="21" y2="84" stroke="#475569" stroke-width="0.8"/>
        <rect x="11.5" y="82.5" width="3" height="3.5" rx="0.5" fill="#10B981" stroke="#059669" stroke-width="0.5"/>

        <!-- BRAZO DERECHO EN POSTURA EJECUTIVA -->
        <path d="M68 50 L75 64 L74 76" stroke="#374151" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <circle cx="74" cy="76" r="3" fill="#64748B"/>

        <!-- PANTALÓN Y ZAPATOS FORMALES -->
        <rect x="31" y="86" width="9" height="17" rx="2" fill="#1C222C" stroke="#2D3542" stroke-width="0.8"/>
        <rect x="50" y="86" width="9" height="17" rx="2" fill="#1C222C" stroke="#2D3542" stroke-width="0.8"/>
        <path d="M29 103 L41 103 C41 106 38 107 29 107 Z" fill="#0F141C"/>
        <path d="M50 103 L62 103 C62 106 59 107 50 107 Z" fill="#0F141C"/>
      </svg>
      <div class="executive-robot-shadow"></div>
    </div>
  `;

  document.body.appendChild(robotContainer);

  // Inicializar seguimiento ocular suave con el cursor del mouse
  initExecutiveRobotEyeTracking(robotContainer);
}

/**
 * Controla el movimiento fluido de los ojos del robot siguiendo el puntero del mouse
 */
function initExecutiveRobotEyeTracking(container) {
  const pupilLeft = container.querySelector(".robot-pupil-group-left");
  const pupilRight = container.querySelector(".robot-pupil-group-right");
  if (!pupilLeft || !pupilRight) return;

  const maxOffset = 2.4; // Desplazamiento máximo en unidades SVG
  let lastX = 0;
  let lastY = 0;
  let ticking = false;

  window.addEventListener(
    "mousemove",
    (e) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          // Centro aproximado de los ojos del robot en la pantalla
          const eyeScreenX = rect.left + rect.width * 0.5;
          const eyeScreenY = rect.top + 34;

          const deltaX = lastX - eyeScreenX;
          const deltaY = lastY - eyeScreenY;
          const distance = Math.hypot(deltaX, deltaY);

          let offsetX = 0;
          let offsetY = 0;

          if (distance > 0) {
            const factor = Math.min(distance / 250, 1) * maxOffset;
            offsetX = (deltaX / distance) * factor;
            offsetY = (deltaY / distance) * factor;
          }

          pupilLeft.setAttribute("transform", `translate(${offsetX.toFixed(2)}, ${offsetY.toFixed(2)})`);
          pupilRight.setAttribute("transform", `translate(${offsetX.toFixed(2)}, ${offsetY.toFixed(2)})`);

          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}
