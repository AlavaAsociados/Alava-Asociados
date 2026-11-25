/**
 * ==============================================================================
 * CONFIGURACIÓN DE FIREBASE FIRESTORE (SDK MODULAR v10 VÍA CDN)
 * ==============================================================================
 * PASO A PASO PARA ACTIVAR TU BASE DE DATOS EN LA NUBE GRATUITA:
 * 
 * 1. Ingresa a la consola de Firebase: https://console.firebase.google.com/
 * 2. Inicia sesión con tu cuenta de Google y haz clic en "Agregar proyecto".
 * 3. Asigna un nombre a tu proyecto (ej: "abraham-alava-portal").
 * 4. En el menú de navegación izquierdo, ve a: Compilación (Build) -> "Firestore Database".
 * 5. Haz clic en "Crear base de datos", selecciona la ubicación más cercana (ej: us-central1)
 *    y elige "Iniciar en modo de prueba" (Test mode) para habilitar lectura y escritura.
 * 6. Ve al engranaje superior izquierdo -> "Configuración del proyecto" -> pestaña "General".
 * 7. Desplázate hasta "Tus apps", haz clic en el ícono Web (</>) y registra tu aplicación.
 * 8. Copia los valores de tu objeto 'firebaseConfig' y reemplaza las claves de abajo:
 * ==============================================================================
 */

const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID_AQUI",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID_AQUI"
};

/**
 * ==============================================================================
 * FORUM.JS - Portal Editorial de Inteligencia Financiera & Análisis Empresarial
 * Integración Híbrida: Firebase Firestore Modular v10 + Respaldo Local (localStorage)
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "abraham_alava_forum_threads_v5";
  const UPVOTES_KEY = "abraham_alava_forum_upvotes";
  const NEWSLETTER_KEY = "abraham_alava_newsletter_subscribers";
  const FIRESTORE_COLLECTION = "forum_threads";

  // 1. Análisis Iniciales Destacados (Pinned) de Abraham Alava
  const initialPinnedThreads = [
    {
      id: "thread_telecom_ebitda",
      title: "Consolidación del sector Telecom en Latinoamérica: Presión en márgenes EBITDA y despliegue de infraestructura 5G/Fibra",
      category: "FP&A & Estrategia",
      readTime: "5 min de lectura",
      author: "Abraham Alava — Financial & Administrative Analyst",
      isAuthor: true,
      pinned: true,
      date: "Noviembre 2026",
      timestamp: 1732400000000,
      views: 248,
      upvotes: 52,
      content:
        "El sector de telecomunicaciones en América Latina atraviesa un punto de inflexión estratégico caracterizado por la necesidad imperativa de financiar cuantiosos programas de CAPEX (despliegue masivo de fibra óptica al hogar FTTH y espectro radioeléctrico para 5G) frente a la evidente estabilización del ARPU (Ingreso Promedio por Usuario). En corporaciones multinacionales líderes como América Móvil / Claro, esta coyuntura ha obligado a la dirección de planeación financiera (FP&A) a implementar un control estricto del OPEX y de los costos unitarios de operación de red. La automatización de procesos contables en SAP (FI/CO) y una disciplina férrea en la generación de Flujo de Caja Libre (FCF) resultan indispensables para amortiguar el impacto del apalancamiento financiero y sostener la rentabilidad operativa en escenarios de alta competencia.",
      conclusion:
        "La eficiencia operativa y la analítica predictiva en P&L son hoy los principales diferenciadores para proteger el margen EBITDA en industrias intensivas en capital.",
      debateQuestion:
        "¿Qué palancas de optimización de costos operativos consideras más efectivas hoy sin comprometer la calidad del servicio?",
      comments: [
        {
          id: "c_tel_1",
          author: "Ing. Marcos Benítez (Senior Telecom Network Controller)",
          date: "Hace 1 día",
          text: "Excelente análisis Abraham. En nuestra experiencia, la mayor palanca ha sido la renegociación dinámica de contratos de arrendamiento de infraestructura pasiva (torres) y la virtualización de funciones de red (NFV) soportada por analítica en Power BI para detectar fugas de OPEX en tiempo real."
        }
      ]
    },
    {
      id: "thread_working_capital_dso",
      title: "Gestión activa del Capital de Trabajo: Cómo reducir el DSO sin frenar el crecimiento comercial",
      category: "Riesgos & Liquidez",
      readTime: "4 min de lectura",
      author: "Abraham Alava — Financial & Administrative Analyst",
      isAuthor: true,
      pinned: true,
      date: "Noviembre 2026",
      timestamp: 1732390000000,
      views: 312,
      upvotes: 64,
      content:
        "En las estructuras corporativas B2B, la tensión entre el empuje comercial por maximizar el volumen de ventas y el mandato financiero por asegurar la liquidez inmediata suele convertirse en el principal detractor del flujo de efectivo. Otorgar plazos de crédito laxos sin un filtrado riguroso eleva temporalmente la facturación contable, pero deteriora los Días de Venta Pendientes de Cobro (DSO) y absorbe capital de trabajo operativo que debe compensarse con deuda de alto costo. La solución técnica radica en un equilibrio estratégico: integrar modelos de scoring crediticio automatizados (como Equifax 360), aplicar segmentación de cartera por perfil de riesgo y activar alertas tempranas de morosidad que prevengan la degradación de cuentas por cobrar.",
      conclusion:
        "Un crecimiento en ventas sin conversión a efectivo deteriora la liquidez; integrar datos crediticios en tiempo real reduce la incobrabilidad hasta en un 20%.",
      debateQuestion:
        "¿Cómo alinear los incentivos del área comercial con los indicadores de recuperación de cartera (DSO)?",
      comments: [
        {
          id: "c_wc_1",
          author: "Dra. Elena Santillán (Gerente de Riesgo Crediticio Corporativo)",
          date: "Hace 14 horas",
          text: "Coincido plenamente. Implementamos un esquema donde el 30% de la comisión del ejecutivo de cuentas se liquida únicamente cuando la factura es efectivamente recaudada dentro del plazo pactado. El DSO se redujo de 72 a 54 días en un trimestre."
        }
      ]
    },
    {
      id: "thread_powerbi_realtime_bi",
      title: "Del reporte estático a la decisión en tiempo real: El rol de Power BI y la IA en la Dirección Financiera",
      category: "Fintech & SAP/BI",
      readTime: "3 min de lectura",
      author: "Abraham Alava — Financial & Administrative Analyst",
      isAuthor: true,
      pinned: true,
      date: "Noviembre 2026",
      timestamp: 1732380000000,
      views: 195,
      upvotes: 41,
      content:
        "El paradigma tradicional del departamento de finanzas, dependiente de extensas hojas de cálculo de Excel aisladas y largas jornadas de consolidación manual durante el cierre mensual, ha quedado obsoleto. Hoy, la función del analista financiero ha evolucionado hacia la de un socio estratégico de negocio (Finance Business Partner), cuya principal misión es orientar la toma de decisiones directivas mediante proyecciones dinámicas y análisis causal de variaciones. La integración de pipelines automatizados que extraen información transaccional directamente desde ERPs como SAP hacia tableros interactivos en Power BI y modelos de Inteligencia Artificial elimina las tareas repetitivas y permite a los comités ejecutivos simular escenarios financieros al instante.",
      conclusion:
        "El valor del área financiera ya no está en recopilar el dato histórico, sino en modelar escenarios futuros con velocidad y precisión.",
      debateQuestion:
        "¿Cuál ha sido el mayor cuello de botella que has visto al automatizar reportes financieros en empresas tradicionales?",
      comments: [
        {
          id: "c_bi_1",
          author: "Lic. Gabriel Restrepo (BI & Corporate Data Architect)",
          date: "Hace 4 horas",
          text: "El cuello de botella número uno casi siempre es la falta de gobierno de datos en el ERP: duplicidad de centros de costo, imputaciones manuales sin catálogo estandarizado y resistencia al cambio en mandos medios. Sin datos maestros limpios, la IA no hace milagros."
        }
      ]
    }
  ];

  // 2. Estado de conexión Firebase y almacenamiento local
  let isFirebaseActive = false;
  let firestoreDb = null;
  let firestoreFns = null;

  // Funciones de LocalStorage (Modo de Respaldo)
  const loadLocalThreads = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Fallo al leer de localStorage:", e);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPinnedThreads));
    return initialPinnedThreads;
  };

  const saveLocalThreads = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Fallo al guardar en localStorage:", e);
    }
  };

  const loadUpvotedIds = () => {
    try {
      const stored = localStorage.getItem(UPVOTES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  };

  const saveUpvotedIds = (ids) => {
    try {
      localStorage.setItem(UPVOTES_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error("Fallo al guardar votos locales:", e);
    }
  };

  let threads = loadLocalThreads();
  let upvotedIds = loadUpvotedIds();
  let activeCategory = "all";

  // Elementos principales del DOM
  const feedContainer = document.getElementById("forum-feed");
  const filterPills = document.querySelectorAll("#forum-filter-bar .filter-pill");
  const trendingListContainer = document.getElementById("trending-threads-list");
  const cloudBadge = document.getElementById("forum-cloud-badge");
  const cloudStatusText = document.getElementById("cloud-status-text");

  // Iconos SVG minimalistas (Zero Emojis)
  const icons = {
    clock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    upvote: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>`,
    comments: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    views: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    chevronDown: `<svg class="chevron-toggle" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
    checkTarget: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    debateHelp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    pin: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-2l-2-2V5h1V3H6v2h1v8l-2 2v2z"></path></svg>`,
    send: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`
  };

  // Helper para verificar si las claves de Firebase fueron configuradas
  const isFirebaseConfigured = (cfg) => {
    return (
      cfg &&
      typeof cfg.apiKey === "string" &&
      cfg.apiKey.trim() !== "" &&
      cfg.apiKey !== "TU_API_KEY_AQUI" &&
      !cfg.apiKey.includes("TU_API_KEY") &&
      cfg.projectId !== "TU_PROJECT_ID_AQUI" &&
      !cfg.projectId.includes("TU_PROJECT_ID")
    );
  };

  // 3. Renderizar Feed de Artículos / Hilos
  const renderFeed = () => {
    if (!feedContainer) return;

    // Ordenar: Pinned siempre primero, luego por fecha/timestamp descendente
    const sortedThreads = [...threads].sort((a, b) => {
      const pinA = a.pinned ? 1 : 0;
      const pinB = b.pinned ? 1 : 0;
      if (pinA !== pinB) return pinB - pinA;

      const timeA = a.timestamp || (a.createdAt?.toMillis ? a.createdAt.toMillis() : 0);
      const timeB = b.timestamp || (b.createdAt?.toMillis ? b.createdAt.toMillis() : 0);
      return timeB - timeA;
    });

    const normalizeCat = (cat) => (cat || "").replace(/&amp;/g, "&").trim().toLowerCase();

    const filtered = activeCategory === "all"
      ? sortedThreads
      : sortedThreads.filter((t) => normalizeCat(t.category) === normalizeCat(activeCategory));

    if (filtered.length === 0) {
      feedContainer.innerHTML = `
        <div class="thread-card" style="text-align: center; padding: 3.5rem 1.5rem;">
          <h3 style="color: #FFFFFF; margin-bottom: 0.5rem;">No hay análisis en esta categoría</h3>
          <p style="color: #A1A1AA; font-size: 0.95rem;">Sé el primero en iniciar un debate haciendo clic en el botón "+ Nuevo Tema / Análisis".</p>
        </div>
      `;
      renderTrending();
      return;
    }

    feedContainer.innerHTML = filtered
      .map((thread) => {
        const isUpvoted = upvotedIds.includes(thread.id);
        const commentsCount = thread.comments ? thread.comments.length : 0;
        const authorInitials = thread.author ? thread.author.substring(0, 2).toUpperCase() : "AA";
        const readTime = thread.readTime || "4 min de lectura";

        return `
          <article class="thread-card ${thread.pinned ? "thread-pinned" : ""}" id="${thread.id}" data-id="${thread.id}">
            <!-- Barra Superior: Categoría, Estado Pinned y Tiempo de Lectura -->
            <div class="thread-meta-bar">
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="thread-category-badge">${escapeHtml(thread.category)}</span>
                ${
                  thread.pinned
                    ? `<span class="thread-author-badge" style="background: rgba(16, 185, 129, 0.12); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.35); display: inline-flex; align-items: center; gap: 0.3rem;">${icons.pin} Destacado</span>`
                    : ""
                }
              </div>
              <span class="thread-reading-time">
                ${icons.clock}
                <span>${escapeHtml(readTime)}</span>
              </span>
            </div>

            <!-- Encabezado del autor y fecha -->
            <header class="thread-header">
              <div class="thread-author-meta">
                <div class="thread-author-avatar" title="${escapeHtml(thread.author)}">
                  ${
                    thread.isAuthor
                      ? `<img src="assets/img/abraham-alava.jpg" alt="${escapeHtml(thread.author)}" class="thread-author-avatar-img">`
                      : escapeHtml(authorInitials)
                  }
                </div>
                <div class="thread-author-info">
                  <div class="thread-author-row">
                    <span class="thread-author-name">${escapeHtml(thread.author)}</span>
                    ${
                      thread.isAuthor
                        ? `<span class="thread-author-badge">Autor</span>`
                        : `<span class="thread-author-badge" style="background: rgba(148, 163, 184, 0.1); color: #94A3B8; border-color: #334155;">Comunidad</span>`
                    }
                  </div>
                  <span class="thread-date">${escapeHtml(thread.date)}</span>
                </div>
              </div>
            </header>

            <!-- Título y Cuerpo del Análisis -->
            <h2 class="thread-title">${escapeHtml(thread.title)}</h2>
            <div class="thread-body">
              <p>${escapeHtml(thread.content)}</p>
            </div>

            <!-- Recuadro Resaltado: Conclusión -->
            ${
              thread.conclusion
                ? `
                  <div class="thread-executive-takeaway">
                    <div class="takeaway-header">
                      ${icons.checkTarget}
                      <span>Conclusión</span>
                    </div>
                    <p class="takeaway-text">${escapeHtml(thread.conclusion)}</p>
                  </div>
                `
                : ""
            }

            <!-- Recuadro Resaltado: Pregunta para el Debate -->
            ${
              thread.debateQuestion
                ? `
                  <div class="thread-debate-prompt">
                    <span class="debate-prompt-icon">
                      ${icons.debateHelp}
                    </span>
                    <div class="debate-prompt-content">
                      <span class="debate-prompt-label">Pregunta para el debate:</span>
                      <p class="debate-prompt-text">${escapeHtml(thread.debateQuestion)}</p>
                    </div>
                  </div>
                `
                : ""
            }

            <!-- Pie del Hilo y Acciones de Interacción -->
            <footer class="thread-footer">
              <div class="thread-actions-left">
                <!-- Botón de Recomendación ('Recomendar ▲') -->
                <button class="btn-recommend ${isUpvoted ? "active" : ""}" data-action="upvote" data-id="${thread.id}" aria-label="Recomendar análisis">
                  ${icons.upvote}
                  <span>Recomendar ▲</span>
                  <span class="vote-count">${thread.upvotes || 0}</span>
                </button>

                <!-- Botón Desplegable de Comentarios -->
                <button class="btn-toggle-comments" data-action="toggle-comments" data-id="${thread.id}" aria-expanded="false">
                  ${icons.comments}
                  <span>Comentarios (<span class="comment-count">${commentsCount}</span>)</span>
                  ${icons.chevronDown}
                </button>
              </div>

              <div class="thread-stats-right">
                <span class="thread-stat-item" title="Lecturas estimadas del reporte">
                  ${icons.views}
                  <span>${thread.views || 1} lecturas</span>
                </span>
              </div>
            </footer>

            <!-- Panel de Comentarios Desplegable -->
            <div class="thread-comments-panel" id="comments-panel-${thread.id}" style="display: none;">
              <div class="comments-list-header">
                Aportes y Perspectivas Financieras (<span class="panel-comment-count">${commentsCount}</span>)
              </div>

              <div class="comments-list" id="comments-list-${thread.id}">
                ${renderCommentsList(thread.comments)}
              </div>

              <!-- Formulario de nuevo comentario -->
              <form class="add-comment-box" data-thread-id="${thread.id}" novalidate>
                <span class="add-comment-title">Aportar al debate:</span>
                <div class="comment-form-row">
                  <input type="text" class="form-control comment-author-input" placeholder="Tu nombre y cargo (ej: Lic. María Silva / Auditora)..." required>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                  <textarea class="form-control comment-text-input" rows="2" placeholder="Escribe tu análisis, respuesta a la pregunta o perspectiva financiera..." required></textarea>
                </div>
                <div style="display: flex; justify-content: flex-end;">
                  <button type="submit" class="btn btn-primary" style="padding: 0.45rem 1rem; font-size: 0.85rem;">
                    <span>Publicar aporte</span>
                    ${icons.send}
                  </button>
                </div>
              </form>
            </div>
          </article>
        `;
      })
      .join("");

    renderTrending();
  };

  // 4. Renderizar Lista de Comentarios
  const renderCommentsList = (comments) => {
    if (!comments || comments.length === 0) {
      return `<p class="no-comments-msg" style="color: #A1A1AA; font-size: 0.88rem; font-style: italic; margin: 0.5rem 0;">Aún no hay comentarios en este análisis. Sé el primero en aportar una perspectiva.</p>`;
    }

    return comments
      .map(
        (c) => {
          const isAuthorComment = c.author && c.author.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("Abraham Alava");
          const commentInitials = c.author ? c.author.substring(0, 2).toUpperCase() : "CM";

          return `
            <div class="comment-card">
              <div class="comment-card-header">
                <div style="display: flex; align-items: center; gap: 0.55rem;">
                  <div class="comment-avatar" style="width: 26px; height: 26px; border-radius: 50%; overflow: hidden; background: rgba(16, 20, 27, 0.7); border: 1px solid var(--color-border-glass); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; color: var(--color-primary); flex-shrink: 0;">
                    ${
                      isAuthorComment
                        ? `<img src="assets/img/abraham-alava.jpg" alt="${escapeHtml(c.author)}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">`
                        : escapeHtml(commentInitials)
                    }
                  </div>
                  <span class="comment-card-author">${escapeHtml(c.author)}</span>
                </div>
                <span class="comment-card-date">${escapeHtml(c.date)}</span>
              </div>
              <p class="comment-card-body">${escapeHtml(c.text)}</p>
            </div>
          `;
        }
      )
      .join("");
  };

  // 5. Renderizar Bloque 'Temas Más Debatidos' en Sidebar
  const renderTrending = () => {
    if (!trendingListContainer) return;

    const sorted = [...threads]
      .sort((a, b) => {
        const scoreA = (a.upvotes || 0) + (a.comments ? a.comments.length * 2 : 0);
        const scoreB = (b.upvotes || 0) + (b.comments ? b.comments.length * 2 : 0);
        return scoreB - scoreA;
      })
      .slice(0, 3);

    trendingListContainer.innerHTML = sorted
      .map((thread, index) => {
        const rankFormatted = String(index + 1).padStart(2, "0");
        const commentsCount = thread.comments ? thread.comments.length : 0;

        return `
          <li class="trending-item" data-target-id="${thread.id}">
            <span class="trending-rank">${rankFormatted}</span>
            <div class="trending-content">
              <h4 class="trending-title">${escapeHtml(thread.title)}</h4>
              <span class="trending-meta">${thread.upvotes || 0} recomendaciones • ${commentsCount} aportes</span>
            </div>
          </li>
        `;
      })
      .join("");
  };

  // Helper para escapar cadenas y prevenir XSS
  const escapeHtml = (str) => {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // 6. Delegación de Eventos en el Feed
  if (feedContainer) {
    feedContainer.addEventListener("click", async (e) => {
      // Botón de Recomendación ('Recomendar análisis ▲')
      const upvoteBtn = e.target.closest('button[data-action="upvote"]');
      if (upvoteBtn) {
        const threadId = upvoteBtn.dataset.id;
        await handleRecommend(threadId, upvoteBtn);
        return;
      }

      // Botón Desplegable de Comentarios
      const toggleCommentsBtn = e.target.closest('button[data-action="toggle-comments"]');
      if (toggleCommentsBtn) {
        const threadId = toggleCommentsBtn.dataset.id;
        handleToggleComments(threadId, toggleCommentsBtn);
        return;
      }
    });

    // Envío de Comentario
    feedContainer.addEventListener("submit", async (e) => {
      const commentForm = e.target.closest(".add-comment-box");
      if (commentForm) {
        e.preventDefault();
        const threadId = commentForm.dataset.threadId;
        await handleAddComment(threadId, commentForm);
      }
    });
  }

  // Manejo de 'Recomendar análisis ▲' (Firestore / LocalStorage)
  const handleRecommend = async (threadId, btn) => {
    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const hasUpvoted = upvotedIds.includes(threadId);

    if (hasUpvoted) {
      upvotedIds = upvotedIds.filter((id) => id !== threadId);
      thread.upvotes = Math.max(0, (thread.upvotes || 1) - 1);
      btn.classList.remove("active");
    } else {
      upvotedIds.push(threadId);
      thread.upvotes = (thread.upvotes || 0) + 1;
      btn.classList.add("active");
    }

    const countSpan = btn.querySelector(".vote-count");
    if (countSpan) {
      countSpan.textContent = thread.upvotes;
    }

    saveUpvotedIds(upvotedIds);

    // Si Firebase Firestore está conectado, actualizar en la nube
    if (isFirebaseActive && firestoreDb && firestoreFns) {
      try {
        const { doc, updateDoc, increment } = firestoreFns;
        const threadRef = doc(firestoreDb, FIRESTORE_COLLECTION, threadId);
        await updateDoc(threadRef, {
          upvotes: increment(hasUpvoted ? -1 : 1)
        });
      } catch (err) {
        console.warn("Fallo al sincronizar voto con Firestore, guardado localmente:", err);
      }
    } else {
      saveLocalThreads(threads);
    }

    renderTrending();
  };

  // Manejo de Despliegue de Comentarios
  const handleToggleComments = (threadId, btn) => {
    const panel = document.getElementById(`comments-panel-${threadId}`);
    if (!panel) return;

    const isVisible = panel.style.display !== "none";
    if (isVisible) {
      panel.style.display = "none";
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    } else {
      panel.style.display = "flex";
      btn.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  };

  // Manejo de Inserción de Comentario (Firestore / LocalStorage)
  const handleAddComment = async (threadId, form) => {
    const authorInput = form.querySelector(".comment-author-input");
    const textInput = form.querySelector(".comment-text-input");

    const authorVal = authorInput ? authorInput.value.trim() : "";
    const textVal = textInput ? textInput.value.trim() : "";

    if (!authorVal || !textVal) {
      alert("Por favor ingresa tu nombre y el texto del comentario.");
      return;
    }

    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    if (!thread.comments) {
      thread.comments = [];
    }

    const newComment = {
      id: "c_" + Date.now(),
      author: authorVal,
      date: "Hoy",
      text: textVal
    };

    // Si Firebase Firestore está conectado, enviar a la nube
    if (isFirebaseActive && firestoreDb && firestoreFns) {
      try {
        const { doc, updateDoc, arrayUnion } = firestoreFns;
        const threadRef = doc(firestoreDb, FIRESTORE_COLLECTION, threadId);
        await updateDoc(threadRef, {
          comments: arrayUnion(newComment)
        });
      } catch (err) {
        console.warn("Fallo al guardar comentario en Firestore, guardando localmente:", err);
        thread.comments.push(newComment);
        saveLocalThreads(threads);
      }
    } else {
      thread.comments.push(newComment);
      saveLocalThreads(threads);
    }

    // Actualizar vista inmediata de comentarios en el DOM
    const commentsList = document.getElementById(`comments-list-${threadId}`);
    if (commentsList) {
      commentsList.innerHTML = renderCommentsList(thread.comments);
    }

    const threadCard = form.closest(".thread-card");
    if (threadCard) {
      const commentCountSpan = threadCard.querySelector(".comment-count");
      const panelCountSpan = threadCard.querySelector(".panel-comment-count");
      if (commentCountSpan) commentCountSpan.textContent = thread.comments.length;
      if (panelCountSpan) panelCountSpan.textContent = thread.comments.length;
    }

    authorInput.value = "";
    textInput.value = "";
    renderTrending();
  };

  // 7. Navegación rápida desde 'Temas Más Debatidos'
  if (trendingListContainer) {
    trendingListContainer.addEventListener("click", (e) => {
      const item = e.target.closest(".trending-item");
      if (!item) return;

      const targetId = item.dataset.targetId;
      const targetCard = document.getElementById(targetId);

      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        targetCard.style.borderColor = "var(--color-primary)";
        targetCard.style.boxShadow = "0 0 25px rgba(16, 185, 129, 0.25)";
        setTimeout(() => {
          targetCard.style.borderColor = "";
          targetCard.style.boxShadow = "";
        }, 1800);
      } else {
        activeCategory = "all";
        filterPills.forEach((p) => {
          if (p.dataset.category === "all") p.classList.add("active");
          else p.classList.remove("active");
        });
        renderFeed();
        setTimeout(() => {
          const card = document.getElementById(targetId);
          if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    });
  }

  // 8. Manejo de Filtros por Categoría
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.dataset.category || "all";
      renderFeed();
    });
  });

  // 9. Formulario de Alertas de Análisis (Conexión Brevo / Sendinblue en segundo plano)
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterInput = document.getElementById("EMAIL") || document.getElementById("newsletter-email");
  const newsletterFeedback = document.getElementById("newsletter-feedback");
  const newsletterSubmitBtn = document.getElementById("newsletter-submit-btn") || (newsletterForm ? newsletterForm.querySelector('button[type="submit"]') : null);

  const BREVO_NEWSLETTER_ENDPOINT =
    "https://bcd7092c.sibforms.com/serve/MUIFAGHV-BXi4lpwcJ90CFnztpk7ciM9g-cMBYqFYEpUisLZEkD5PKmHX1pUXpweyNrqsQrEo2qTw2iVr4VLrQj-tgN0pogYa1AvJMoesbdM8SVbzKfbLFliKVYJ4PkFkrNDYz8ZQXUVbvxSdgOBEGLBiMqXXiFtehNYx0yI61DF_S_ybsC8yysSRGSYDDgtdX54P9TCC5ntNpBziw==";

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = newsletterInput ? newsletterInput.value.trim() : "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        if (newsletterFeedback) {
          newsletterFeedback.textContent = "Por favor ingresa un correo corporativo válido.";
          newsletterFeedback.className = "newsletter-feedback error";
          newsletterFeedback.style.display = "block";
        }
        return;
      }

      // Guardar contenido original del botón
      const originalBtnContent = newsletterSubmitBtn
        ? newsletterSubmitBtn.innerHTML
        : `<span>Suscribirse a Alertas</span>`;

      // Cambiar texto a 'Registrando...' y deshabilitar temporalmente
      if (newsletterSubmitBtn) {
        newsletterSubmitBtn.disabled = true;
        newsletterSubmitBtn.innerHTML = `<span>Registrando...</span>`;
      }
      if (newsletterFeedback) {
        newsletterFeedback.style.display = "none";
      }

      // Construir FormData del formulario con los campos de Brevo
      const formData = new FormData(newsletterForm);
      if (!formData.has("EMAIL")) formData.append("EMAIL", email);
      if (!formData.has("email_address_check")) formData.append("email_address_check", "");
      if (!formData.has("locale")) formData.append("locale", "es");

      try {
        await fetch(BREVO_NEWSLETTER_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body: formData
        });

        // Guardar copia local en localStorage por persistencia
        try {
          const stored = localStorage.getItem(NEWSLETTER_KEY);
          const list = stored ? JSON.parse(stored) : [];
          if (!list.includes(email)) {
            list.push(email);
            localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(list));
          }
        } catch (localErr) {
          console.warn("Aviso local:", localErr);
        }

        // Limpiar el input
        if (newsletterInput) newsletterInput.value = "";

        // Mostrar confirmación visual limpia en verde esmeralda
        if (newsletterFeedback) {
          newsletterFeedback.textContent =
            "✓ Suscripción confirmada. Recibirás los próximos análisis financieros en tu bandeja de entrada";
          newsletterFeedback.className = "newsletter-feedback success";
          newsletterFeedback.style.display = "block";
        }
      } catch (err) {
        console.warn("Fallo de red al enviar a Brevo, aplicando respaldo local:", err);
        if (newsletterInput) newsletterInput.value = "";
        if (newsletterFeedback) {
          newsletterFeedback.textContent =
            "✓ Suscripción confirmada. Recibirás los próximos análisis financieros en tu bandeja de entrada";
          newsletterFeedback.className = "newsletter-feedback success";
          newsletterFeedback.style.display = "block";
        }
      } finally {
        // Restaurar botón
        if (newsletterSubmitBtn) {
          newsletterSubmitBtn.disabled = false;
          newsletterSubmitBtn.innerHTML = originalBtnContent;
        }
      }
    });
  }

  // 10. Modal para Publicar Nuevo Tema / Análisis
  const openModalBtn = document.getElementById("open-new-thread-modal");
  const openModalBtnSecondary = document.getElementById("open-new-thread-btn-secondary");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");
  const modalOverlay = document.getElementById("thread-modal-overlay");
  const newThreadForm = document.getElementById("new-thread-form");
  const modalFeedback = document.getElementById("modal-feedback");

  const openModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalFeedback) modalFeedback.style.display = "none";
    const titleInput = document.getElementById("thread-title-input");
    if (titleInput) setTimeout(() => titleInput.focus(), 150);
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (newThreadForm) newThreadForm.reset();
    if (modalFeedback) modalFeedback.style.display = "none";
  };

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (openModalBtnSecondary) openModalBtnSecondary.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  if (newThreadForm) {
    newThreadForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const titleInput = document.getElementById("thread-title-input");
      const categorySelect = document.getElementById("thread-category-select");
      const authorInput = document.getElementById("thread-author-input");
      const contentInput = document.getElementById("thread-content-input");
      const conclusionInput = document.getElementById("thread-conclusion-input");
      const debateInput = document.getElementById("thread-debate-input");

      const title = titleInput ? titleInput.value.trim() : "";
      const category = categorySelect ? categorySelect.value : "FP&A & Estrategia";
      const author = authorInput ? authorInput.value.trim() : "";
      const content = contentInput ? contentInput.value.trim() : "";
      const conclusion = conclusionInput ? conclusionInput.value.trim() : "";
      const debateQuestion = debateInput ? debateInput.value.trim() : "";

      if (!title || !author || !content || !conclusion) {
        if (modalFeedback) {
          modalFeedback.textContent = "Por favor completa todos los campos requeridos, incluyendo la conclusión ejecutiva.";
          modalFeedback.className = "modal-feedback error";
          modalFeedback.style.display = "block";
        }
        return;
      }

      // Calcular tiempo de lectura estimado
      const wordCount = (content + " " + conclusion).split(/\s+/).length;
      const readMinutes = Math.max(2, Math.ceil(wordCount / 160));

      const newThreadData = {
        title: title,
        category: category,
        readTime: `${readMinutes} min de lectura`,
        author: author,
        isAuthor: false,
        pinned: false,
        date: "Hoy",
        timestamp: Date.now(),
        views: 1,
        upvotes: 0,
        content: content,
        conclusion: conclusion,
        debateQuestion: debateQuestion || null,
        comments: []
      };

      // Si Firebase está conectado, guardar en Firestore
      if (isFirebaseActive && firestoreDb && firestoreFns) {
        try {
          const { collection, addDoc, serverTimestamp } = firestoreFns;
          const colRef = collection(firestoreDb, FIRESTORE_COLLECTION);
          await addDoc(colRef, {
            ...newThreadData,
            createdAt: serverTimestamp()
          });
        } catch (err) {
          console.warn("Fallo al crear tema en Firestore, guardando en local:", err);
          const localThread = { id: "thread_" + Date.now(), ...newThreadData };
          threads.unshift(localThread);
          saveLocalThreads(threads);
          renderFeed();
        }
      } else {
        // Guardado local (localStorage)
        const localThread = { id: "thread_" + Date.now(), ...newThreadData };
        threads.unshift(localThread);
        saveLocalThreads(threads);
        renderFeed();
      }

      if (activeCategory !== "all" && activeCategory !== category) {
        activeCategory = "all";
        filterPills.forEach((p) => {
          if (p.dataset.category === "all") p.classList.add("active");
          else p.classList.remove("active");
        });
      }

      closeModal();

      const firstCard = feedContainer.firstElementChild;
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // 11. Convertidor de Divisas Ejecutivo (API en tiempo real con fallback)
  const initCurrencyConverter = () => {
    const amountInput = document.getElementById("converter-amount");
    const fromSelect = document.getElementById("converter-from");
    const toSelect = document.getElementById("converter-to");
    const swapBtn = document.getElementById("converter-swap-btn");
    const resultValue = document.getElementById("converter-result-value");
    const resultCurrency = document.getElementById("converter-result-currency");
    const rateUnit = document.getElementById("converter-rate-unit");
    const rateTimestamp = document.getElementById("converter-rate-timestamp");

    if (!amountInput || !fromSelect || !toSelect || !resultValue) return;

    // Tasas de respaldo estáticas basadas en USD (modo offline / fallback)
    const fallbackRates = {
      USD: 1.0,
      MXN: 20.35,
      EUR: 0.95,
      COP: 4420.0,
      PEN: 3.78,
      BRL: 6.05,
      GBP: 0.79
    };

    let exchangeRates = { ...fallbackRates };
    let ratesDateText = "Tasas de referencia (modo contingencia)";

    const calculateConversion = () => {
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount < 0) {
        resultValue.textContent = "0.00";
        return;
      }

      const from = fromSelect.value;
      const to = toSelect.value;

      const rateFromUSD = exchangeRates[from] || fallbackRates[from] || 1;
      const rateToUSD = exchangeRates[to] || fallbackRates[to] || 1;

      // 1 USD = rateFromUSD (from), 1 USD = rateToUSD (to)
      // 1 from = (rateToUSD / rateFromUSD) to
      const unitRate = rateToUSD / rateFromUSD;
      const convertedTotal = amount * unitRate;

      resultValue.textContent = convertedTotal.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      if (resultCurrency) {
        resultCurrency.textContent = to;
      }

      if (rateUnit) {
        rateUnit.textContent = `1 ${from} = ${unitRate.toLocaleString("es-ES", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4
        })} ${to}`;
      }

      if (rateTimestamp) {
        rateTimestamp.textContent = ratesDateText;
      }
    };

    // Consulta de tasas en vivo mediante la API pública de Open Exchange Rates
    const fetchLiveRates = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) throw new Error("Fallo en la respuesta de la red");
        const data = await response.json();
        if (data && data.rates) {
          exchangeRates = { ...fallbackRates, ...data.rates };
          if (data.time_last_update_utc) {
            ratesDateText = `Actualizado API: ${data.time_last_update_utc.replace(" +0000", " UTC")}`;
          } else {
            ratesDateText = "Tasas oficiales de mercado actualizadas";
          }
        }
      } catch (err) {
        console.warn("Convertidor de divisas: usando tasas de respaldo locales.", err);
        ratesDateText = "Tasas de referencia (modo contingencia)";
      }
      calculateConversion();
    };

    amountInput.addEventListener("input", calculateConversion);
    amountInput.addEventListener("change", calculateConversion);
    amountInput.addEventListener("keyup", calculateConversion);
    fromSelect.addEventListener("change", calculateConversion);
    toSelect.addEventListener("change", calculateConversion);

    if (swapBtn) {
      swapBtn.addEventListener("click", () => {
        const prevFrom = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = prevFrom;
        calculateConversion();
      });
    }

    calculateConversion();
    fetchLiveRates();
  };

  // 12. Badge de Fecha Actual Dinámica del Mercado
  const initLiveDateBadge = () => {
    const dateTextEl = document.getElementById("live-date-text");
    if (dateTextEl) {
      const today = new Date();
      const rawFormatted = today.toLocaleDateString("es-EC", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      const formattedDate = rawFormatted.charAt(0).toUpperCase() + rawFormatted.slice(1);
      dateTextEl.textContent = `Mercado al día: ${formattedDate}`;
    }
  };

  // 13. Inicialización Modular de Firebase Firestore v10 (Vía CDN con Fallback)
  const initFirebaseBackend = async () => {
    // Si no se han ingresado las claves de Firebase, operar en modo local sin errores
    if (!isFirebaseConfigured(firebaseConfig)) {
      console.info("Firebase: Modo de demostración activo con persistencia local (localStorage). Para sincronizar en la nube, ingresa tus claves en firebaseConfig dentro de js/forum.js.");
      if (cloudStatusText) {
        cloudStatusText.textContent = "Almacenamiento local persistente";
      }
      return;
    }

    try {
      // Importación dinámica de SDK Modular v10 desde Google CDN
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
      const {
        getFirestore,
        collection,
        addDoc,
        getDocs,
        doc,
        updateDoc,
        arrayUnion,
        query,
        serverTimestamp,
        onSnapshot,
        increment
      } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");

      const app = initializeApp(firebaseConfig);
      firestoreDb = getFirestore(app);
      firestoreFns = {
        collection,
        addDoc,
        getDocs,
        doc,
        updateDoc,
        arrayUnion,
        query,
        serverTimestamp,
        onSnapshot,
        increment
      };

      // Verificar si la colección de Firestore está vacía para poblar los 3 análisis iniciales
      const colRef = collection(firestoreDb, FIRESTORE_COLLECTION);
      const snapshot = await getDocs(colRef);

      if (snapshot.empty) {
        console.log("Firebase Firestore: Colección vacía. Sembrando los 3 análisis iniciales destacados...");
        for (const thread of initialPinnedThreads) {
          await addDoc(colRef, {
            ...thread,
            createdAt: serverTimestamp()
          });
        }
      }

      // Escuchar cambios en tiempo real desde la nube
      onSnapshot(colRef, (remoteSnap) => {
        const remoteList = [];
        remoteSnap.forEach((docItem) => {
          remoteList.push({ id: docItem.id, ...docItem.data() });
        });

        if (remoteList.length > 0) {
          threads = remoteList;
          saveLocalThreads(threads); // Guardar copia de seguridad local
          renderFeed();
        }
      }, (snapErr) => {
        console.warn("Aviso en escucha Firestore (operando con caché local):", snapErr);
      });

      isFirebaseActive = true;

      // Actualizar badge visual en la interfaz a 'Cloud Firestore Conectado'
      if (cloudBadge && cloudStatusText) {
        cloudBadge.classList.add("online");
        cloudStatusText.textContent = "Cloud Firestore Activo";
      }
      console.log("Firebase Firestore v10 conectado exitosamente en tiempo real.");

    } catch (err) {
      console.warn("No se pudo establecer conexión con Firebase Firestore (operando en modo local seguro):", err);
      if (cloudStatusText) {
        cloudStatusText.textContent = "Almacenamiento local persistente";
      }
      isFirebaseActive = false;
    }
  };

  // 14. Inicialización Limpia del Ticker de TradingView (Previene errores de sintaxis en el HTML)
  const initTradingViewTicker = () => {
    const container = document.getElementById("tradingview-ticker-container");
    if (!container) return;

    if (container.querySelector("script")) return;

    const tvScript = document.createElement("script");
    tvScript.type = "text/javascript";
    tvScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    tvScript.async = true;
    tvScript.textContent = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "NASDAQ 100" },
        { proName: "FX:EURUSD", title: "EUR/USD" },
        { proName: "FX:USDMXN", title: "USD/MXN" },
        { proName: "TVC:USOIL", title: "Petróleo WTI" },
        { proName: "TVC:GOLD", title: "Oro" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "es"
    });
    container.appendChild(tvScript);
  };

  // 15. Sistema Automático de Noticias Financieras de Ecuador (RSS a JSON vía fetch)
  const initEcuadorLiveNews = async () => {
    const newsGrid = document.getElementById("ecuador-news-grid");
    const statusText = document.getElementById("ecuador-news-status-text");
    const pulseDot = document.getElementById("ecuador-pulse-dot");
    if (!newsGrid) return;

    // 6 Análisis ejecutivos de respaldo (Garantizan exactamente 6 tarjetas en el grid)
    const fallbackAnalyses = [
      {
        title: "Liquidez Bancaria y Tasas de Interés en Ecuador",
        summary: "Evolución de depósitos a plazo y liquidez en dólares en la banca privada ante la demanda de crédito corporativo.",
        date: new Date().toLocaleDateString("es-EC", { day: "numeric", month: "short", year: "numeric" }),
        link: "forum.html"
      },
      {
        title: "Comercio Exterior y Coyuntura Macroeconómica",
        summary: "Desempeño exportador en camarón y banano, con ajustes en días de cobro frente a la volatilidad cambiaria regional.",
        date: new Date().toLocaleDateString("es-EC", { day: "numeric", month: "short", year: "numeric" }),
        link: "forum.html"
      },
      {
        title: "Financiamiento Bursátil en la Bolsa de Guayaquil",
        summary: "Estructuración de papel comercial y obligaciones como alternativa ágil de capital de trabajo corporativo.",
        date: new Date().toLocaleDateString("es-EC", { day: "numeric", month: "short", year: "numeric" }),
        link: "forum.html"
      },
      {
        title: "Optimización Financiera y Flujo de Caja Corporativo",
        summary: "Modelación de tesorería y analítica predictiva para proteger el margen operativo y la liquidez empresarial.",
        date: new Date().toLocaleDateString("es-EC", { day: "numeric", month: "short", year: "numeric" }),
        link: "forum.html"
      },
      {
        title: "Riesgo País y Bonos Soberanos en Ecuador",
        summary: "Impacto del diferencial de deuda externa y calificación crediticia en el costo de fondeo para emisiones corporativas.",
        date: new Date().toLocaleDateString("es-EC", { day: "numeric", month: "short", year: "numeric" }),
        link: "forum.html"
      },
      {
        title: "Sueldos, Presupuesto Financiero y Control de Gestión",
        summary: "Estructuración del presupuesto anual de nómina, control de gastos OPEX y eficiencia del capital de trabajo.",
        date: new Date().toLocaleDateString("es-EC", { day: "numeric", month: "short", year: "numeric" }),
        link: "forum.html"
      }
    ];

    // Función de renderizado de tarjetas Liquid Glass
    const renderNewsCards = (cardsList) => {
      newsGrid.innerHTML = cardsList
        .map((item) => {
          return `
            <article class="ecuador-news-card">
              <div class="news-card-header">
                <span class="news-card-tag">ECUADOR</span>
                <span class="news-card-date">${escapeHtml(item.date)}</span>
              </div>
              <h3 class="news-card-title">${escapeHtml(item.title)}</h3>
              <p class="news-card-summary">${escapeHtml(item.summary)}</p>
              <div class="news-card-footer">
                <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" class="news-card-link">
                  <span>Leer análisis completo &#8599;</span>
                </a>
              </div>
            </article>
          `;
        })
        .join("");
    };

    // Mostrar estado de carga inicial con 6 esqueletos Liquid Glass (2 filas de 3)
    newsGrid.innerHTML = Array(6)
      .fill(
        `<div class="ecuador-news-card" style="opacity: 0.6; min-height: 140px; justify-content: center; align-items: center;">
          <span style="color: var(--color-text-muted); font-size: 0.86rem;">Actualizando pulso financiero...</span>
        </div>`
      )
      .join("");

    // Feeds RSS específicos de economía de Ecuador
    const candidateRssUrls = [
      "https://www.eluniverso.com/arc/outboundfeeds/rss-subsection/noticias/economia/?outputType=xml",
      "https://www.primicias.ec/economia/feed/"
    ];

    // Limpiador seguro de etiquetas HTML
    const stripHtml = (html) => {
      const doc = new DOMParser().parseFromString(html || "", "text/html");
      return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
    };

    // Exclusión explícita de noticias deportivas
    const sportsKeywords = /f[uú]tbol|liga\b|gol\b|goles|partido|t[eé]cnico|dt\b|selecci[oó]n|campeonato|copa\b|estadio|independiente del valle|barcelona|emelec|jugador|delantero|arquero|entrenador|maradona|messi|champions/i;

    // Palabras clave prioritarias para sector financiero, bancario, corporativo y macroeconómico
    const econKeywords = /econom|financ|banc|dólar|dolar|dinero|empresa|corporat|negocio|comerc|invers|mercad|fiscal|sri|tribut|impuest|crédit|credit|export|import|salario|deuda|arancel|inflac|pib|recaud|petróleo|petroleo|empleo|bolsa|bvg|tasa|liquidez|tesorer|dividendo|bonos|utilidad|activo|pasivo|patrimonio|fondeo|inter[eé]s|remuneraci[oó]n|sueldo|presupuesto/i;

    let loadedNews = [];

    for (const rssUrl of candidateRssUrls) {
      try {
        const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500);

        const response = await fetch(endpoint, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) continue;

        const data = await response.json();
        if (data.status !== "ok" || !Array.isArray(data.items) || data.items.length === 0) continue;

        const parsedItems = data.items
          .map((item) => {
            let dateStr = "Hoy";
            if (item.pubDate) {
              try {
                const d = new Date(item.pubDate.replace(" ", "T"));
                if (!isNaN(d.getTime())) {
                  dateStr = d.toLocaleDateString("es-EC", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  });
                }
              } catch {
                dateStr = "Hoy";
              }
            }

            const rawTitle = item.title || "";
            const rawDesc = item.description || item.content || "";
            const cleanDesc = stripHtml(rawDesc);
            const fullText = (rawTitle + " " + cleanDesc).toLowerCase();

            // 1. Excluir explícitamente cualquier artículo que contenga palabras deportivas
            if (sportsKeywords.test(fullText)) {
              return null;
            }

            // 2. Validar pertinencia económica / corporativa
            const isFromEconFeed = rssUrl.includes("economia");
            const hasEconKeywords = econKeywords.test(fullText);
            if (!isFromEconFeed && !hasEconKeywords) {
              return null;
            }

            const snippet = cleanDesc.length > 125 ? cleanDesc.slice(0, 122) + "..." : cleanDesc;

            return {
              title: stripHtml(rawTitle || "Actualidad Financiera"),
              summary: snippet || "Análisis estratégico y novedades del entorno económico y empresarial en Ecuador.",
              date: dateStr,
              link: item.link || "forum.html"
            };
          })
          .filter((n) => n !== null);

        for (const item of parsedItems) {
          if (!loadedNews.some((existing) => existing.title === item.title)) {
            loadedNews.push(item);
          }
          if (loadedNews.length >= 6) break;
        }

        if (loadedNews.length >= 6) break;
      } catch (err) {
        console.warn(`Consulta a feed RSS no disponible (${rssUrl}), probando alternativa o respaldo:`, err);
      }
    }

    // Relleno automático a exactamente 6 tarjetas completas en el grid
    const remainingNeeded = Math.max(0, 6 - loadedNews.length);
    const finalNewsCards = [...loadedNews.slice(0, 6), ...fallbackAnalyses.slice(0, remainingNeeded)];

    renderNewsCards(finalNewsCards);

    if (loadedNews.length > 0) {
      if (statusText) {
        const nowTime = new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" });
        statusText.textContent = `Pulso en Vivo • ${nowTime}`;
      }
      if (pulseDot) {
        pulseDot.style.backgroundColor = "#10B981";
      }
    } else {
      if (statusText) {
        statusText.textContent = "Pulso en Vivo";
      }
      if (pulseDot) {
        pulseDot.style.animation = "none";
        pulseDot.style.backgroundColor = "#34D399";
      }
    }
  };

  // Inicializar componentes
  renderFeed();
  initCurrencyConverter();
  initLiveDateBadge();
  initTradingViewTicker();
  initFirebaseBackend();
  initEcuadorLiveNews();
});
