const obras = [
  { num: "N°12", titulo: "Sin título", artista: "–", tecnica: "Mixta", medidas: "80×100 cm", img: "/12.png" },
  { num: "N°73", titulo: "Sin título", artista: "–", tecnica: "Mixta", medidas: "52×72 cm", img: "/73.png" },
  { num: "N°75", titulo: "Sin título", artista: "–", tecnica: "Óleo", medidas: "100×70 cm", img: "/75.png" },
  { num: "N°39", titulo: "Entre líneas", artista: "Susana Mercado", tecnica: "Mixta", medidas: "90×110 cm", img: null },
  { num: "N°18", titulo: "Paisaje I", artista: "Juan Puyssecur", tecnica: "Acrílico", medidas: "99×96 cm", img: "/18.png" },
  { num: "N°16", titulo: "Sin título", artista: "–", tecnica: "Acrílico", medidas: "80×100 cm", img: "/16.png" },
  { num: "N°44", titulo: "Sin título", artista: "–", tecnica: "Acrílico", medidas: "100×100 cm", img: "/44.png" },
  { num: "N°64", titulo: "Sin título", artista: "–", tecnica: "Acrílico", medidas: "105×65 cm", img: "/64.png" },
  { num: "N°68", titulo: "Sin título", artista: "–", tecnica: "Óleo", medidas: "90×60 cm", img: "/68.png" },
  { num: "N°90", titulo: "Sin título", artista: "–", tecnica: "Mixta", medidas: "–", img: "/90.png" },
  { num: "N°20", titulo: "Sin título", artista: "–", tecnica: "Acrílico", medidas: "90×120 cm", img: null },
  { num: "N°1",  titulo: "Joven", artista: "Peter Sussmann", tecnica: "Óleo", medidas: "60×90 cm", img: null },
  { num: "N°2",  titulo: "Movimiento II", artista: "Ana María Richter", tecnica: "Acrílico", medidas: "80×80 cm", img: null },
  { num: "N°11", titulo: "No me pidas que te digas adiós", artista: "Graciela Casartelli", tecnica: "Acrílico", medidas: "80×100 cm", img: null },
  { num: "N°31", titulo: "Ensayo final", artista: "Gustavo Herrera", tecnica: "Óleo", medidas: "80×120 cm", img: null },
  { num: "N°35", titulo: "Chica Almodóvar", artista: "Catalina Firpo", tecnica: "Acrílico", medidas: "84×120 cm", img: null },
  { num: "N°42", titulo: "Sin título", artista: "Lucas Figueroa", tecnica: "Óleo", medidas: "100×100 cm", img: null },
  { num: "N°50", titulo: "Limonada", artista: "Jorge Alonso", tecnica: "Óleo", medidas: "80×90 cm", img: null },
];

function renderCatalogo(lista) {
  const grid = document.getElementById("artworksGrid");
  if (!grid) return;
  if (lista.length === 0) {
    grid.innerHTML = `<p class="no-results">No se encontraron obras.</p>`;
    return;
  }
  grid.innerHTML = lista.map((o, i) => {
    const imgHtml = o.img
      ? `<div class="artwork-image" style="background-image:url('${o.img}')"></div>`
      : `<div class="artwork-image" style="display:flex;align-items:center;justify-content:center;font-size:48px">🎨</div>`;
    return `
    <div class="artwork-card" onclick="openArtworkModal(${i})">
      ${imgHtml}
      <div class="artwork-info">
        <h3>${o.num} — ${o.titulo}</h3>
        <p class="artwork-details">${o.artista !== "–" ? o.artista + " · " : ""}${o.tecnica} · ${o.medidas}</p>
        <button class="btn-view">Ver obra</button>
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

function openModal(tipo) {
  const ids = { recommendation:"modalRecommendation", artists:"modalArtists", contact:"modalContact", storage:"modalStorage", artwork:"modalArtwork" };
  const el = document.getElementById(ids[tipo]);
  if (el) el.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(tipo) {
  const ids = { recommendation:"modalRecommendation", artists:"modalArtists", contact:"modalContact", storage:"modalStorage", artwork:"modalArtwork" };
  const el = document.getElementById(ids[tipo]);
  if (el) el.classList.remove("active");
  document.body.style.overflow = "";
}

function openArtworkModal(idx) {
  const o = obrasFiltradas[idx];
  if (!o) return;
  const detail = document.getElementById("artworkDetail");
  if (detail) {
    const imgHtml = o.img
      ? `<div class="artwork-detail-image" style="background-image:url('${o.img}')"></div>`
      : `<div class="artwork-detail-image" style="display:flex;align-items:center;justify-content:center;font-size:64px">🎨</div>`;
    detail.innerHTML = `
      <div class="artwork-detail">
        ${imgHtml}
        <div class="artwork-detail-info">
          <div class="artwork-detail-row"><strong>Obra</strong><span>${o.num}</span></div>
          <div class="artwork-detail-row"><strong>Título</strong><span>${o.titulo}</span></div>
          ${o.artista !== "–" ? `<div class="artwork-detail-row"><strong>Artista</strong><span>${o.artista}</span></div>` : ""}
          <div class="artwork-detail-row"><strong>Técnica</strong><span>${o.tecnica}</span></div>
          <div class="artwork-detail-row"><strong>Medidas</strong><span>${o.medidas}</span></div>
          <a href="https://wa.me/5491167313343?text=Hola%2C+me+interesa+la+${encodeURIComponent(o.num)}+%E2%80%94+${encodeURIComponent(o.titulo)}" 
             target="_blank" class="btn-consult">Consultar por esta obra</a>
        </div>
      </div>`;
  }
  openModal("artwork");
}

function contactPlan(plan) {
  const msg = encodeURIComponent(`Hola, me interesa el plan ${plan} de Impulsarte AI`);
  window.open(`https://wa.me/5491167313343?text=${msg}`, "_blank");
}

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

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo(obras);
  document.getElementById("searchInput")?.addEventListener("input", filtrar);
  document.getElementById("techniqueFilter")?.addEventListener("change", filtrar);
  initFaq();
  initModalClose();
});
