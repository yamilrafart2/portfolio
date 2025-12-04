document.addEventListener('DOMContentLoaded', () => {
  
  if (!window.emailjs) {
    console.warn('EmailJS SDK no cargado.');
    return;
  }

  try {
    emailjs.init("lrcbX1P63MWRFro-Q");
  } catch (err) {
    console.warn('Error inicializando EmailJS', err);
  }

  const form = document.getElementById('contactForm');
  const responseEl = document.getElementById('formResponse');
  const submitBtn = document.getElementById('contactSubmit');

  if (!form || !responseEl || !submitBtn) return;

  responseEl.textContent = '';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Enviando...";

    responseEl.classList.remove('success', 'error', 'visible');
    responseEl.classList.add('visible');

    const params = {
      nombre: form.nombre.value,
      email: form.email.value,
      asunto: form.asunto.value,
      mensaje: form.mensaje.value,
    };

    const serviceID = "service_aw0dc36";
    const templateID = "template_666csz2";

    emailjs.send(serviceID, templateID, params)
      .then(() => {
        responseEl.textContent = "✅ ¡Mensaje enviado!";
        responseEl.classList.remove('error');
        responseEl.classList.add('success');
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        responseEl.textContent = "❌ Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.";
        responseEl.classList.remove('success');
        responseEl.classList.add('error');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || 'Enviar';

        setTimeout(() => {
          responseEl.classList.remove('visible', 'success', 'error');
          responseEl.textContent = '';
        }, 6000);
      });
  });
});
