// BASE DE DATOS DE OBRAS
const artworks = [
    { id: 1, title: "Obra #001", dimensions: "60 x 90 cm", technique: "Óleo",     style: "Figurativo expresionista", description: "Obra con gran intensidad emocional y mirada social", img: "https://i.imgur.com/CyrbsPe.jpg" },
    { id: 2, title: "Obra #002", dimensions: "80 x 80 cm", technique: "Acrílico", style: "Abstracto",               description: "Dinámico y expresivo, ideal para espacios modernos",   img: "https://i.imgur.com/tWr8ZRz.jpg" },
    { id: 3, title: "Obra #003", dimensions: "90 x 80 cm", technique: "Acrílico", style: "Abstracto",               description: "Colores vibrantes que transmiten energía",            img: "https://i.imgur.com/NA9kbvd.jpg" },
    { id: 4, title: "Obra #004", dimensions: "80 x 100 cm", technique: "Acrílico",style: "Figurativo",              description: "Fuerza y carácter, perfecto para recepciones",        img: "https://i.imgur.com/k1yFzLY.jpg" },
    { id: 5, title: "Obra #005", dimensions: "120 x 80 cm", technique: "Relieve", style: "Abstracto",               description: "Textura y profundidad única en relieve",              img: "https://i.imgur.com/nfAppsl.jpg" },
    { id: 6, title: "Obra #006", dimensions: "80 x 100 cm", technique: "Acrílico",style: "Abstracto colorido",      description: "Energético y vibrante, ideal para oficinas",          img: "https://i.imgur.com/I4Y3GdB.jpg" },
    { id: 7, title: "Obra #007", dimensions: "80 x 80 cm", technique: "Acrílico", style: "Abstracto",               description: "Composición dinámica con gran impacto visual",       img: "https://i.imgur.com/GIOK6SE.jpg" },
    { id: 8, title: "Obra #008", dimensions: "100 x 80 cm", technique: "Acrílico",style: "Abstracto",               description: "Tonos fríos que transmiten serenidad",               img: "https://i.imgur.com/TAacD5n.jpg" },
    { id: 9, title: "Obra #009", dimensions: "100 x 75 cm", technique: "Acrílico",style: "Abstracto",               description: "Frescura natural con composición equilibrada",       img: "https://i.imgur.com/U6eg7Ja.jpg" }
];

// RENDERIZAR OBRAS
function renderArtworks(filter = {}) {
    const grid = document.getElementById('artworksGrid');
    grid.innerHTML = '';

    let filtered = artworks.filter(art => {
        if (filter.technique && art.technique !== filter.technique) return false;
        if (filter.search && !art.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
        return true;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <p class="no-results">
                No encontramos obras con ese criterio. Probá cambiar el filtro o la búsqueda.
            </p>
        `;
        return;
    }

    filtered.forEach(art => {
        const card = document.createElement('div');
        card.className = 'artwork-card';
        card.innerHTML = `
            <div class="artwork-image" style="background-image: url('${art.img}')"></div>
            <div class="artwork-info">
                <h3>${art.title}</h3>
                <p class="artwork-details">${art.dimensions} · ${art.technique}</p>
                <button class="btn-view" onclick="openArtworkModal(${art.id})">Ver detalles</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ABRIR MODAL OBRA
function openArtworkModal(id) {
    const art = artworks.find(a => a.id === id);
    const detail = document.getElementById('artworkDetail');
    detail.innerHTML = `
        <div class="artwork-detail">
            <div class="artwork-detail-image" style="background-image: url('${art.img}')"></div>
            <div class="artwork-detail-info">
                <button class="back-inline" onclick="closeModal('artwork')">← Volver al catálogo</button>
                <h3>${art.title}</h3>
                <div class="artwork-detail-row">
                    <strong>Dimensiones</strong>
                    <span>${art.dimensions}</span>
                </div>
                <div class="artwork-detail-row">
                    <strong>Técnica</strong>
                    <span>${art.technique}</span>
                </div>
                <div class="artwork-detail-row">
                    <strong>Estilo</strong>
                    <span>${art.style}</span>
                </div>
                <div class="artwork-detail-description">${art.description}</div>
                <a href="https://wa.me/5491167313343?text=Hola! Me interesa la ${art.title}"
                   target="_blank" class="btn-consult">
                    Consultar disponibilidad
                </a>
            </div>
        </div>
    `;
    openModal('artwork');
}

// MODALES GENERALES
function openModal(name) {
    const modal = document.getElementById('modal' + name.charAt(0).toUpperCase() + name.slice(1));
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(name) {
    const modal = document.getElementById('modal' + name.charAt(0).toUpperCase() + name.slice(1));
    if (modal) {
        modal.classList.remove('active');
    }
}

// CERRAR MODAL AL HACER CLICK FUERA
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// FILTROS
document.getElementById('searchInput').addEventListener('input', function() {
    const filters = {
        search: this.value,
        technique: document.getElementById('techniqueFilter').value
    };
    renderArtworks(filters);
});

document.getElementById('techniqueFilter').addEventListener('change', function() {
    const filters = {
        search: document.getElementById('searchInput').value,
        technique: this.value
    };
    renderArtworks(filters);
});

// CONTACTAR PLAN
function contactPlan(plan) {
    const message = encodeURIComponent('Hola! Me interesa el plan ' + plan + ' de Impulsarte AI');
    window.open('https://wa.me/5491167313343?text=' + message, '_blank');
}

// CARGAR OBRAS AL INICIO
renderArtworks();
// FAQ accordion
document.querySelectorAll(".faq-item .faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    item.classList.toggle("open");

    const icon = btn.querySelector(".faq-icon");
    if (icon) icon.textContent = item.classList.contains("open") ? "–" : "+";
  });
});


