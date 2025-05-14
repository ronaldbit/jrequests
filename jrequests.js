const r = {
  errorLog: [],
  lastError: null,

  errorHandler: (xhr, error) => {
    const errorInfo = { xhr, error, time: new Date() };
    console.error("Error global:", error, xhr);
    r.lastError = errorInfo;

    // Limitar a los últimos 50 errores
    if (r.errorLog.length >= 50) r.errorLog.shift();
    r.errorLog.push(errorInfo);
  },

  consulta: (options = {}) => {
    const {
      url,
      datos = {},
      type = 'GET',
      dataType = 'json',
      respuesta = () => {},
      error = options.usarErrorGlobal ? r.errorHandler : () => {},
      completado = () => {},
      headers = {},
      enviarComoFormData = false,
      controller = null,
    } = options;

    if (!url) {
      console.error('Se requiere una URL para la solicitud.');
      return;
    }

    XConsulta({
      url,
      datos,
      type,
      dataType,
      respuesta,
      error,
      completado,
      headers,
      enviarComoFormData,
      controller
    });
  },

  cancelar: (controller) => {
    if (controller && typeof controller.abort === 'function') {
      controller.abort();
    }
  },

  log: () => console.table(r.errorLog)
};

const XConsulta = ({
  url,
  datos = {},
  type = 'GET',
  dataType = 'json',
  respuesta = () => {},
  error = () => {},
  completado = () => {},
  headers = {},
  enviarComoFormData = false,
  controller = null
  }) => {
  const xhr = new XMLHttpRequest();
  const inicio = Date.now();

  // Soporte para AbortController
  if (controller instanceof AbortController) {
    controller.signal.addEventListener('abort', () => {
      xhr.abort();
    });
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;

    const duracion = Date.now() - inicio;
    const { status, responseText } = xhr;

    if (status === 200) {
      if (dataType === 'json') {
        try {
          const jsonResponse = JSON.parse(responseText);
          respuesta(jsonResponse);
        } catch (e) {
          error(xhr, 'Error en el análisis JSON');
        }
      } else {
        respuesta(responseText);
      }
    } else {
      error(xhr, `Error en la solicitud: ${status}`);
    }

    completado(xhr, status, duracion);
  };

  xhr.open(type, url, true);

  // Establecer cabeceras personalizadas
  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value);
  });

  // Envío de datos
  if (['POST', 'PUT'].includes(type)) {
    if (enviarComoFormData) {
      const formData = new FormData();
      Object.entries(datos).forEach(([key, value]) => {
        formData.append(key, value);
      });
      xhr.send(formData);
    } else {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(datos));
    }
  } else {
    xhr.send();
  }
};


const R = (arg) => {
  if (typeof arg === 'function') {
    document.addEventListener('DOMContentLoaded', arg);
    return;
  }

  let elements;
  if (typeof arg === 'string') elements = document.querySelectorAll(arg);
  if (arg instanceof HTMLElement) elements = [arg];

  if (!elements || elements.length === 0) return [];

  // ---- Métodos en español ----

  elements.css = (prop, val) => {
    const esCadena = typeof prop === 'string';
    elements.forEach(el => {
      if (esCadena) el.style[prop] = val;
      else Object.entries(prop).forEach(([k, v]) => el.style[k] = v);
    });
    return elements;
  };

  elements.on = (evento, callback, once = false) => {
    elements.forEach(el => el.addEventListener(evento, callback, { once }));
    return elements;
  };

  elements.un = (evento, callback) => {
    elements.forEach(el => el.addEventListener(evento, callback));
    return elements;
  };

  elements.each = (fn) => {
    elements.forEach((el, i) => fn(i, el));
    return elements;
  };

  elements.fadeIn = (duracion = 1000) => {
    elements.forEach(el => {
      const anim = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: duracion });
      anim.onfinish = () => el.style.opacity = 1;
    });
    return elements;
  };

  elements.valor = (nuevoValor) => {
    if (nuevoValor !== undefined) {
      elements.forEach(el => el.value = nuevoValor);
      return elements;
    }
    return elements[0]?.value ?? null;
  };

  elements.atributo = (attr) => elements[0]?.getAttribute(attr) ?? null;

  elements.cambiarAtributo = (attr, val) => {
    elements.forEach(el => el.setAttribute(attr, val));
    return elements;
  };

  elements.texto = (txt) => {
    elements.forEach(el => el.textContent = txt);
    return elements;
  };

  elements.html = (html) => {
    elements.forEach(el => el.innerHTML = html);
    return elements;
  };

  elements.adjuntar = (...childs) => {
    elements.forEach(parent => {
      childs.forEach(child => parent.appendChild(child));
    });
    return elements;
  };

  elements.appendHTML = (html) => {
    elements.forEach(el => el.insertAdjacentHTML('beforeend', html));
    return elements;
  };

  elements.vaciar = () => {
    elements.forEach(el => el.innerHTML = '');
    return elements;
  };

  elements.mostrar = () => {
    elements.forEach(el => el.style.display = '');
    return elements;
  };

  elements.ocultar = () => {
    elements.forEach(el => el.style.display = 'none');
    return elements;
  };

  elements.toggle = () => {
    elements.forEach(el => {
      el.style.display = (el.style.display === 'none') ? '' : 'none';
    });
    return elements;
  };

  elements.agregarClase = (clase) => {
    elements.forEach(el => el.classList.add(clase));
    return elements;
  };

  elements.quitarClase = (clase) => {
    elements.forEach(el => el.classList.remove(clase));
    return elements;
  };

  elements.toggleClase = (clase) => {
    elements.forEach(el => el.classList.toggle(clase));
    return elements;
  };

  elements.tieneClase = (clase) => elements[0]?.classList.contains(clase) ?? false;

  elements.serializar = () => {
    const form = elements[0];
    if (!(form instanceof HTMLFormElement)) return '';
    return new URLSearchParams(new FormData(form)).toString();
  };

  elements.eliminar = () => {
    elements.forEach(el => el.remove());
    return elements;
  };

  elements.deshabilitar = () => {
    elements.forEach(el => el.disabled = true);
    return elements;
  };

  elements.habilitar = () => {
    elements.forEach(el => el.disabled = false);
    return elements;
  };

  elements.animar = (keyframes, opciones = {}) => {
    elements.forEach(el => el.animate(keyframes, opciones));
    return elements;
  };

  elements.toggleTexto = (texto1, texto2) => {
    elements.forEach(el => {
      el.textContent = (el.textContent === texto1) ? texto2 : texto1;
    });
    return elements;
  };

  elements.toggleClaseConCallback = (clase, callback = () => {}) => {
    elements.forEach(el => {
      el.classList.toggle(clase);
      callback(el.classList.contains(clase), el);
    });
    return elements;
  };

  elements.longitud = () => elements.length;

  elements.padre = () => elements[0]?.parentElement ? R(elements[0].parentElement) : [];

  elements.buscar = (selector) => R(elements[0]?.querySelectorAll(selector) || []);

  elements.scrollA = (comportamiento = 'smooth') => {
    elements[0]?.scrollIntoView({ behavior: comportamiento });
    return elements;
  };

  elements.clonar = () => {
    return Array.from(elements).map(el => el.cloneNode(true));
  };

  return elements;
};
