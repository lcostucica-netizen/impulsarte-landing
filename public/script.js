const obras = [
  { num: "N°12", titulo: "Sin título", artista: "Silvia Tchobaniam", tecnica: "Mixta", medidas: "80×100 cm", img: "/12.png", hb: true },
  { num: "N°73", titulo: "Topograph E", artista: "Horacio Pages", tecnica: "Acrílico y áridos", medidas: "52×72 cm", img: "/73.png", hb: true },
  { num: "N°75", titulo: "Sin título", artista: "–", tecnica: "Óleo", medidas: "100×70 cm", img: "/75.png", hb: true },
  { num: "N°18", titulo: "Paisaje I", artista: "Juan Puyssecur", tecnica: "Acrílico s/tela", medidas: "99×96 cm", img: "/18.png", hb: true },
  { num: "N°16", titulo: "Primavera", artista: "Peter Sussmann", tecnica: "Acrílico", medidas: "80×100 cm", img: "/16.png", hb: true },
  { num: "N°44", titulo: "Sin título", artista: "–", tecnica: "Mixta", medidas: "100×100 cm", img: "/44.png", hb: true },
  { num: "N°64", titulo: "Medusas", artista: "Maríu Álvarez", tecnica: "Acrílico", medidas: "105×65 cm", img: "/64.png", hb: true },
  { num: "N°68", titulo: "Sin título", artista: "–", tecnica: "Óleo", medidas: "90×60 cm", img: "/68.png", hb: true },
  { num: "N°90", titulo: "La ciudad de Embore", artista: "Carmen Bruno", tecnica: "Acrílico", medidas: "80×60 cm", img: "/90.png", hb: false },
  { num: "N°31", titulo: "Ensayo final", artista: "Gustavo Herrera", tecnica: "Óleo", medidas: "80×120 cm", img: "https://i.imgur.com/U6eg7Ja.jpeg", hb: false },
  { num: "N°50", titulo: "Limonada", artista: "Jorge Alonso", tecnica: "Óleo", medidas: "80×90 cm", img: "https://i.imgur.com/l4SWSIk.jpeg", hb: false },
  { num: "N°63", titulo: "Sin título", artista: "–", tecnica: "Óleo", medidas: "90×80 cm", img: "https://i.imgur.com/HgCUiuN.jpeg", hb: false },
  { num: "N°36", titulo: "Sin título", artista: "–", tecnica: "Acrílico", medidas: "80×100 cm", img: "https://i.imgur.com/CyrbsPe.jpeg", hb: false },
  { num: "N°29", titulo: "Sin título", artista: "Ghala", tecnica: "Acrílico", medidas: "90×80 cm", img: "https://i.imgur.com/GIOK6SE.jpeg", hb: false },
  { num: "N°25", titulo: "El pájaro canta hasta morir", artista: "Nélida Damato", tecnica: "Acrílico", medidas: "80×100 cm", img: "https://i.imgur.com/nfAppsl.jpeg", hb: false },
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
    const hbBadge = o.hb ? `<div style="font-size:0.78rem;color:#ffd700;margin-bottom:6px;font-weight:600;">🏥 En exhibición · Hospital Británico</div>` : "";
    return `
    <div class="artwork-card" onclick="openArtworkModal(${i})">
      ${imgHtml}
      <div class="artwork-info">
        ${hbBadge}
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
    const hbBadge = o.hb ? `<div style="font-size:0.85rem;color:#ffd700;font-weight:600;margin-bottom:12px;">🏥 En exhibición · Hospital Británico</div>` : "";
    detail.innerHTML = `
      <div class="artwork-detail">
        ${imgHtml}
        <div class="artwork-detail-info">
          ${hbBadge}
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
