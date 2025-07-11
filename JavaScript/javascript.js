function mostrarIframe() {
    const iframe = document.getElementById('iframeCampaña');
    iframe.src = "https://xerezdfc.com/campana-de-socios-2025-26-el-xerez-que-quieres-tu?_gl=1*4agrnq*_up*MQ..*_ga*MTk5OTUwMTExMS4xNzUxODUwMTU2*_ga_TN0ZEHFV8Y*czE3NTE4NTAxNTUkbzEkZzAkdDE3NTE4NTAxNTUkajYwJGwwJGgw";
    iframe.classList.remove('ifroculto');
}

// CARRUSEL 

document.addEventListener("DOMContentLoaded", () => {
  // Controlar el índice activo
  document.querySelectorAll(".titulo").forEach(titulo => {
    if (titulo.tagName.toLowerCase() === 'a') return;

    titulo.addEventListener("click", () => {
      const item = titulo.parentElement;
      const texto = titulo.textContent.trim().toLowerCase();

      document.querySelectorAll(".item").forEach(i => {
        if (i !== item) i.classList.remove("active");
      });
      item.classList.toggle("active");

      const mostrar = item.classList.contains("active");

      mostrarCarrusel("instagram", mostrar && texto.includes("instagram"));
      mostrarCarrusel("carteleria", mostrar && (texto.includes("cartelería") || texto.includes("carteleria")));
      mostrarCarrusel("seo", mostrar && texto.includes("seo"));
    });
  });

  // Mostrar y cargar carrusel según tipo
  function mostrarCarrusel(tipo, mostrar) {
    const id = tipo === "seo" ? "carruselSEO" : `carrusel${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    const wrapper = document.getElementById(id);

    if (!wrapper) return;
    wrapper.classList.toggle("oculto", !mostrar);

    if (mostrar && !wrapper.dataset.cargado) {
      crearCarrusel(wrapper, tipo);
      wrapper.dataset.cargado = "true";
    }
  }

  // Crear carrusel dinámico para imágenes
  function crearCarrusel(wrapper, tipo) {
    const track = wrapper.querySelector(".carrusel-track");
    const izquierda = wrapper.querySelector(".flecha-left");
    const derecha = wrapper.querySelector(".flecha-right");

    const imagenes = {
      instagram: Array.from({ length: 9 }, (_, i) => `instagram${i + 1}`),
      carteleria: Array.from({ length: 7 }, (_, i) => `cartel${i + 1}`),
      seo: Array.from({ length: 3 }, (_, i) => `seo${i + 1}`)
    };

    const rutas = imagenes[tipo];
    if (!rutas) return;

    rutas.forEach((img, i) => {
      const imagen = document.createElement("img");
      imagen.src = `../Imagenes/${img}.png`;
      imagen.alt = `${tipo} ${i + 1}`;
      imagen.onerror = () => {
        imagen.src = `../Imagenes/${img}.jpg`;
      };
      track.appendChild(imagen);
    });

    // Clonar primera y última para efecto circular
    const primera = track.children[0].cloneNode(true);
    const ultima = track.children[rutas.length - 1].cloneNode(true);
    track.insertBefore(ultima, track.firstChild);
    track.appendChild(primera);

    let indice = 1;

    const mover = (transicion = true) => {
      const anchoActual = wrapper.querySelector(".contenedor1").clientWidth;
      track.style.transition = transicion ? "transform 0.5s ease" : "none";
      track.style.transform = `translateX(${-indice * anchoActual}px)`;
    };

    mover(false);

    derecha.addEventListener("click", () => {
      if (indice < rutas.length + 1) {
        indice++;
        mover();
      }
    });

    izquierda.addEventListener("click", () => {
      if (indice > 0) {
        indice--;
        mover();
      }
    });

    track.addEventListener("transitionend", () => {
      if (indice === 0) {
        indice = rutas.length;
        mover(false);
      } else if (indice === rutas.length + 1) {
        indice = 1;
        mover(false);
      }
    });

    window.addEventListener("resize", () => {
      mover(false);
    });
  }
});