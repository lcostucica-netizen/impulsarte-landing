// ===== CATÁLOGO DE OBRAS =====
const obras = [
  { num: "N°12", titulo: "Sin título", artista: "–", tecnica: "Mixta", medidas: "80×100 cm", precio: 1800000, img: null },
  { num: "N°73", titulo: "Sin título", artista: "–", tecnica: "Mixta", medidas: "52×72 cm", precio: 950000, img: null },
  { num: "N°75", titulo: "Sin título", artista: "–", tecnica: "Óleo", medidas: "100×70 cm", precio: 2100000, img: null },
  { num: "N°39", titulo: "Entre líneas", artista: "Susana Mercado", tecnica: "Mixta", medidas: "90×110 cm", precio: 2000000, img: null },
  { num: "N°18", titulo: "Paisaje I", artista: "Juan Puyssecur", tecnica: "Acrílico", medidas: "99×96 cm", precio: 1600000, img: null },
  { num: "N°16", titulo: "Sin título", artista: "–", tecnica: "Acrílico", medidas: "80×100 cm", precio: 1400000, img: null },
  { num: "N°44", titulo: "Sin título", artista: "–", tecnica: "Acrílico", medidas: "100×100 cm", precio: 1700000, img: null },
  { num: "N°64", titulo: "Sin título", artista: "–", tecnica: "Acrílico", medidas: "105×65 cm", precio: 1200000, img: null },
  { num: "N°68", titulo: "Sin título", artista: "–", tecnica: "Óleo", medidas: "90×60 cm", precio: 1500000, img: null },
  { num: "N°20", titulo: "Sin título", artista: "–", tecnica: "Acrílico", medidas: "90×120 cm", precio: 1900000, img: null },
  { num: "N°1",  titulo: "Joven", artista: "Peter Sussmann", tecnica: "Óleo", medidas: "60×90 cm", precio: 1500000, img: null },
  { num: "N°2",  titulo: "Movimiento II", artista: "Ana María Richter", tecnica: "Acrílico", medidas: "80×80 cm", precio: 1400000, img: null },
  { num: "N°11", titulo: "No me pidas que te digas adiós", artista: "Graciela Casartelli", tecnica: "Acrílico", medidas: "80×100 cm", precio: 1500000, img: null },
  { num: "N°31", titulo: "Ensayo final", artista: "Gustavo Herrera", tecnica: "Óleo", medidas: "80×120 cm", precio: 2200000, img: null },
  { num: "N°35", titulo: "Chica Almodóvar", artista: "Catalina Firpo", tecnica: "Acrílico", medidas: "84×120 cm", precio: 2000000, img: null },
  { num: "N°42", titulo: "Sin título", artista: "Lucas Figueroa", tecnica: "Óleo", medidas: "100×100 cm", precio: 2500000, img: null },
  { num: "N°50", titulo: "Limonada", artista: "Jorge Alonso", tecnica: "Óleo", medidas: "80×90 cm", precio: 2100000, img: null },
];

function formatPrecio(n) {
  return "$" + n.toLocaleString("es-AR");
}

function renderCatalogo(lista) {
  const grid = document.getElementById("artworksGrid");
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#888;padding:40px">No se encontraron obras.</p>`;
    return;
  }

  grid.innerHTML = lista.map((o, i) => {
    const imgSlug = o.num.replace("N°", "n").toLowerCase();
    const qrUrl = `/obra/${imgSlug}`;
    return `
    <div class="artwork-card" onclick="openArtworkModal(${i})">
      <div class="artwork-img-wrap">
        <div class="artwork-img-placeholder">🎨</div>
      </div>
      <div class="artwork-info">
        <div class="artwork-num">${o.num}</div>
        <div class="artwork-title">${o.titulo}</div>
        <div class="artwork-artist">${o.artista !== "–" ? o.artista : ""}</div>
        <div class="artwork-meta">
          <span class="artwork-tag">${o.tecnica}</span>
          <span class="artwork-tag">${o.medidas}</span>
          <span class="artwork-price">${formatPrecio(o.precio)}</span>
        </div>
      </div>
    </div>`;
  }).join("");
}

let obrasFiltradas = [...obras];

function filtrar() {
  const busqueda = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const tecnica = document.getElementById("techniqueFilter")?.value || "";

  obrasFiltradas = obras.filter(o => {
    const matchBusqueda = !busqueda ||
      o.num.toLowerCase().includes(busqueda) ||
      o.titulo.toLowerCase().includes(busqueda) ||
      o.artista.toLowerCase().includes(busqueda);
    const matchTecnica = !tecnica || o.tecnica === tecnica;
    return matchBusqueda && matchTecnica;
  });

  renderCatalogo(obrasFiltradas);
}

// ===== MODALES =====
function openModal(tipo) {
  const ids = {
    recommendation: "modalRecommendation",
    artists: "modalArtists",
    contact: "modalContact",
    storage: "modalStorage",
    artwork: "modalArtwork"
  };
  const el = document.getElementById(ids[tipo]);
  if (el) el.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(tipo) {
  const ids = {
    recommendation: "modalRecommendation",
    artists: "modalArtists",
    contact: "modalContact",
    storage: "modalStorage",
    artwork: "modalArtwork"
  };
  const el = document.getElementById(ids[tipo]);
  if (el) el.classList.remove("active");
  document.body.style.overflow = "";
}

function openArtworkModal(idx) {
  const o = obrasFiltradas[idx];
  if (!o) return;
  const imgSlug = o.num.replace("N°", "n").toLowerCase();
  const detail = document.getElementById("artworkDetail");
  if (detail) {
    detail.innerHTML = `
      <div class="artwork-detail-num">${o.num}</div>
      <div class="artwork-detail-title">${o.titulo}</div>
      <div class="artwork-detail-artist">${o.artista !== "–" ? o.artista : "Artista: a confirmar"}</div>
      <div class="artwork-detail-meta">
        <span class="artwork-detail-tag">${o.tecnica}</span>
        <span class="artwork-detail-tag">${o.medidas}</span>
      </div>
      <div class="artwork-detail-price">${formatPrecio(o.precio)}</div>
      <a href="https://wa.me/5491167313343?text=Hola%2C+me+interesa+la+${encodeURIComponent(o.num)}+%E2%80%94+${encodeURIComponent(o.titulo)}" 
         target="_blank" class="btn-whatsapp" style="display:inline-flex">
        Consultar por esta obra
      </a>
    `;
  }
  openModal("artwork");
}

function contactPlan(plan) {
  const msg = encodeURIComponent(`Hola, me interesa el plan ${plan} de Impulsarte AI`);
  window.open(`https://wa.me/5491167313343?text=${msg}`, "_blank");
}

// ===== FAQ =====
function initFaq() {
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

// ===== CERRAR MODAL AL CLICK FUERA =====
function initModalClose() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo(obras);
  document.getElementById("searchInput")?.addEventListener("input", filtrar);
  document.getElementById("techniqueFilter")?.addEventListener("change", filtrar);
  initFaq();
  initModalClose();
});
