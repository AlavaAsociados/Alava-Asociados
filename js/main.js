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
 * 5. Asistente Robot Ejecutivo "Buppy" (Executive Robot Assistant)
 * - Widget flotante permanente en esquina inferior derecha en todas las páginas
 * - Imagen grande de cuerpo completo (con traje y maletín) fuera de la tarjeta
 * - Tarjeta Liquid Glass limpia (sin avatar circular adentro) con BUPPY, Asistente Ejecutivo, pregunta y botón Consúltame ↗
 * - Ventana interactiva de chat al hacer clic en la tarjeta, en el robot o en Consúltame ↗
 * - Respuestas financieras ejecutivas (KPIs, Flujo de Caja, Power BI)
 */
function initExecutiveRobot() {
  if (document.getElementById("executive-robot-container")) return;

  const robotContainer = document.createElement("div");
  robotContainer.id = "executive-robot-container";
  robotContainer.className = "executive-robot-container";
  robotContainer.setAttribute("aria-label", "Buppy — Asistente Ejecutivo");

  robotContainer.innerHTML = `
    <div class="executive-robot-wrapper">
      <!-- Tarjeta / Burbuja Liquid Glass limpia (sin avatar adentro) -->
      <div class="executive-robot-bubble" id="buppy-bubble-card" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false" title="Abrir consulta con Buppy">
        <div class="robot-bubble-header">
          <span class="robot-bubble-name">BUPPY</span>
          <span class="robot-bubble-badge">Asistente Ejecutivo</span>
        </div>
        <p class="robot-bubble-text">¿Analizamos tus indicadores financieros?</p>
        <div class="robot-bubble-action">
          <button type="button" class="robot-bubble-link" id="buppy-consult-btn" aria-label="Consúltame">
            <span>Consúltame &#8599;</span>
          </button>
        </div>
        <div class="robot-bubble-tail"></div>
      </div>

      <!-- Imagen del robot grande de cuerpo completo fuera de la tarjeta -->
      <div class="executive-robot-figure" id="buppy-figure-trigger" role="button" tabindex="0" title="Buppy — Asistente Ejecutivo" aria-label="Abrir consulta con Buppy">
        <img src="assets/img/buppy.svg" onerror="this.onerror=null; this.src='assets/buppy.svg';" alt="Buppy - Asistente Robot Ejecutivo" class="executive-robot-svg" width="90" height="115" />
        <div class="executive-robot-shadow"></div>
      </div>
    </div>

    <!-- Fondo Oscuro Translúcido -->
    <div class="robot-chat-backdrop" id="robot-chat-backdrop" aria-hidden="true"></div>

    <!-- Modal / Ventana de Consulta y Chat Interactivo -->
    <div class="robot-chat-modal" id="robot-chat-modal" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Consulta con Buppy">
      <div class="robot-modal-header">
        <div class="robot-modal-title-group">
          <img src="assets/img/buppy.svg" onerror="this.onerror=null; this.src='assets/buppy.svg';" alt="Buppy" class="robot-modal-avatar" width="28" height="28" />
          <span class="robot-modal-dot"></span>
          <div>
            <h3 class="robot-modal-title">BUPPY</h3>
            <span class="robot-modal-badge">Asistente Ejecutivo</span>
          </div>
        </div>
        <button type="button" class="robot-modal-close" id="robot-modal-close" aria-label="Cerrar ventana de consulta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="robot-modal-body" id="robot-modal-body">
        <div class="robot-chat-bubble-received">
          <p>¿Analizamos tus indicadores financieros o la rentabilidad de tu empresa?</p>
        </div>

        <div class="robot-quick-topics" id="robot-quick-topics">
          <span class="robot-topics-title">Consultas directas:</span>
          <button type="button" class="robot-topic-btn" data-topic="kpis">
            <span>Diagnóstico de KPIs (EBITDA, DSO, CCC)</span>
            <span class="topic-arrow">&#8599;</span>
          </button>
          <button type="button" class="robot-topic-btn" data-topic="flujo">
            <span>Optimización de Flujo de Caja y Tesorería</span>
            <span class="topic-arrow">&#8599;</span>
          </button>
          <button type="button" class="robot-topic-btn" data-topic="bi">
            <span>Dashboards Ejecutivos y Modelación Financiera</span>
            <span class="topic-arrow">&#8599;</span>
          </button>
        </div>

        <div class="robot-response-area" id="robot-response-area" style="display: none;"></div>
      </div>

      <div class="robot-modal-footer">
        <a href="contact.html" class="btn btn-primary robot-modal-cta" id="robot-modal-cta">
          <span>Consúltame en Privado &#8599;</span>
        </a>
      </div>
    </div>
  `;

  document.body.appendChild(robotContainer);

  const bubbleCard = robotContainer.querySelector("#buppy-bubble-card");
  const figureTrigger = robotContainer.querySelector("#buppy-figure-trigger");
  const consultBtn = robotContainer.querySelector("#buppy-consult-btn");
  const chatModal = robotContainer.querySelector("#robot-chat-modal");
  const chatBackdrop = robotContainer.querySelector("#robot-chat-backdrop");
  const modalCloseBtn = robotContainer.querySelector("#robot-modal-close");
  const topicBtns = robotContainer.querySelectorAll(".robot-topic-btn");
  const responseArea = robotContainer.querySelector("#robot-response-area");
  const modalCta = robotContainer.querySelector("#robot-modal-cta");
  const modalBody = robotContainer.querySelector("#robot-modal-body");

  // Respuestas ejecutivas financieras para las consultas rápidas
  const financialResponses = {
    kpis: {
      title: "Diagnóstico de KPIs Financieros & Operativos",
      text: "Evaluación integral de EBITDA (margen operacional sin distorsiones), Days Sales Outstanding (DSO óptimo <45 días) y Ciclo de Conversión de Efectivo (CCC) para liberar capital de trabajo y blindar la liquidez.",
      subject: "KPIs"
    },
    flujo: {
      title: "Optimización de Flujo de Caja & Tesorería",
      text: "Modelos rolling forecast de 13 semanas para anticipar descalces de liquidez, arbitraje de costos de financiamiento bancario y alineación estratégica de cuentas por cobrar vs. pasivos corrientes.",
      subject: "FlujoDeCaja"
    },
    bi: {
      title: "Dashboards Ejecutivos & Modelación Financiera",
      text: "Arquitectura de tableros de control en Power BI integrados con ERPs (SAP NetWeaver / SQL) para conciliación presupuestaria automatizada, análisis de variaciones y toma de decisiones a nivel directivo.",
      subject: "Dashboards"
    }
  };

  const openChatModal = () => {
    if (chatModal && chatBackdrop) {
      chatModal.classList.add("active");
      chatBackdrop.classList.add("active");
      chatModal.setAttribute("aria-hidden", "false");
      if (bubbleCard) bubbleCard.setAttribute("aria-expanded", "true");
    }
  };

  const closeChatModal = () => {
    if (chatModal && chatBackdrop) {
      chatModal.classList.remove("active");
      chatBackdrop.classList.remove("active");
      chatModal.setAttribute("aria-hidden", "true");
      if (bubbleCard) bubbleCard.setAttribute("aria-expanded", "false");
    }
  };

  // Abrir chat al hacer clic en la tarjeta, en el robot grande o en Consúltame ↗
  if (bubbleCard) {
    bubbleCard.addEventListener("click", openChatModal);
    bubbleCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openChatModal();
      }
    });
  }

  if (figureTrigger) {
    figureTrigger.addEventListener("click", openChatModal);
    figureTrigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openChatModal();
      }
    });
  }

  if (consultBtn) {
    consultBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openChatModal();
    });
  }

  // Cerrar chat
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeChatModal);
  }
  if (chatBackdrop) {
    chatBackdrop.addEventListener("click", closeChatModal);
  }

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatModal && chatModal.classList.contains("active")) {
      closeChatModal();
    }
  });

  // Manejo de botones de temas rápidos
  topicBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const topic = btn.getAttribute("data-topic");
      const data = financialResponses[topic];
      if (!data) return;

      topicBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (responseArea) {
        responseArea.innerHTML = `
          <strong>✓ ${data.title}</strong>
          ${data.text}
        `;
        responseArea.style.display = "block";
        if (modalBody) {
          modalBody.scrollTop = modalBody.scrollHeight;
        }
      }

      if (modalCta) {
        modalCta.href = `contact.html?asunto=${encodeURIComponent(data.subject)}`;
        const ctaSpan = modalCta.querySelector("span");
        if (ctaSpan) {
          ctaSpan.textContent = `Consultar con Abraham Alava sobre ${data.subject} \u2197`;
        }
      }
    });
  });
}
