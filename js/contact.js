/**
 * ==============================================================================
 * CONTACT.JS - Lógica de la página de contacto (contact.html)
 * Personalizado para: Abraham Danny Alava Delgado
 * Funcionalidades:
 *  1. Botón para copiar el correo al portapapeles con feedback temporal
 *  2. Validación del formulario nativa en Vanilla JS
 *  3. Envío por Correo (mailto:) sin backend
 *  4. Envío por WhatsApp (wa.me) sin backend
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // DATOS REALES DE CONTACTO DE ABRAHAM ALAVA
  const MY_EMAIL = "alavacop7@outlook.es";
  const MY_WHATSAPP_NUMBER = "593992666129"; // Código de país Ecuador (+593) + 992666129

  // 1. Botón para copiar correo electrónico al portapapeles
  const copyEmailBtn = document.getElementById("copy-email-btn");

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(MY_EMAIL);
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = "¡Correo copiado!";
        copyEmailBtn.classList.add("btn-primary");
        copyEmailBtn.classList.remove("btn-outline");

        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
          copyEmailBtn.classList.remove("btn-primary");
          copyEmailBtn.classList.add("btn-outline");
        }, 2500);
      } catch (err) {
        console.error("No se pudo copiar el correo:", err);
        alert(`Correo de Abraham: ${MY_EMAIL}`);
      }
    });
  }

  // 2. Manejo del Formulario de Contacto
  const contactForm = document.getElementById("contact-form");
  const sendWhatsAppBtn = document.getElementById("send-whatsapp-btn");
  const formFeedback = document.getElementById("form-feedback");

  /**
   * Muestra un mensaje de alerta en el contenedor #form-feedback
   * @param {string} message - Mensaje a mostrar
   * @param {'success'|'error'} type - Tipo de mensaje
   */
  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = type; // Asigna clase .success o .error
    formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /**
   * Valida los datos ingresados en el formulario
   * @returns {{isValid: boolean, data?: {name: string, email: string, subject: string, message: string}}}
   */
  function validateForm() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject = subjectInput ? subjectInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    // Validación de campos vacíos
    if (!name || !email || !subject || !message) {
      showFeedback("Por favor completa todos los campos del formulario.", "error");
      return { isValid: false };
    }

    // Expresión regular estándar para validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback("Por favor ingresa un correo electrónico válido.", "error");
      return { isValid: false };
    }

    return {
      isValid: true,
      data: { name, email, subject, message },
    };
  }

  // 3. Envío por Correo Electrónico (mailto)
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita recarga de página

      const validation = validateForm();
      if (!validation.isValid || !validation.data) return;

      const { name, email, subject, message } = validation.data;

      // Construcción del cuerpo del correo electrónico
      const mailBody = `Hola Abraham, mi nombre es ${name} (${email}).%0D%0A%0D%0AMensaje:%0D%0A${encodeURIComponent(
        message
      )}`;
      const mailtoUrl = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(
        `[Portafolio Web] ${subject}`
      )}&body=${mailBody}`;

      showFeedback("Abriendo tu cliente de correo para enviar a Abraham Alava...", "success");

      // Abrir cliente de correo predeterminado
      window.location.href = mailtoUrl;
    });
  }

  // 4. Envío por WhatsApp
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener("click", () => {
      const validation = validateForm();
      if (!validation.isValid || !validation.data) return;

      const { name, email, subject, message } = validation.data;

      // Formato del mensaje para WhatsApp
      const text = `*Nuevo mensaje desde el Portafolio*%0A*Nombre:* ${encodeURIComponent(
        name
      )}%0A*Correo:* ${encodeURIComponent(email)}%0A*Asunto:* ${encodeURIComponent(
        subject
      )}%0A*Mensaje:*%0A${encodeURIComponent(message)}`;

      const whatsappUrl = `https://wa.me/${MY_WHATSAPP_NUMBER}?text=${text}`;

      showFeedback("Redirigiendo al chat de WhatsApp de Abraham Alava...", "success");

      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, "_blank");
    });
  }
});
