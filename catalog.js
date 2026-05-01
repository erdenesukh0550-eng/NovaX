const catalog = {
  brands: [
    {
      id: "aodeli",
      name: "AODELI",
      subtitle: "Stage lighting equipment",
      description: "Beam, Wash, Laser, LED PAR, Strobe, Studio, Retro, Waterproof төрлийн гэрлийн каталог.",
      categories: [
        { id: "beam", name: "Beam", desc: "Beam moving head болон stage beam гэрлүүд" },
        { id: "effect-strobe", name: "Effect / Strobe", desc: "Effect, strobe, blinder төрлийн гэрлүүд" },
        { id: "laser", name: "Laser", desc: "Laser light болон show effect төхөөрөмжүүд" },
        { id: "led-par", name: "LED PAR", desc: "LED PAR болон color wash гэрлүүд" },
        { id: "retro", name: "Retro", desc: "Retro style stage effect гэрлүүд" },
        { id: "studio", name: "Studio", desc: "Studio, panel, soft light төрлүүд" },
        { id: "wash", name: "Wash", desc: "Wash moving head болон өргөн цацалттай гэрлүүд" },
        { id: "waterproof", name: "Waterproof", desc: "Outdoor болон waterproof гэрэлтүүлэг" }
      ]
    }
  ]
};

const content = document.getElementById("catalogContent");
const title = document.getElementById("catalogTitle");
const subtitle = document.getElementById("catalogSubtitle");
const breadcrumb = document.getElementById("breadcrumb");
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbCaption = document.getElementById("lbCaption");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let currentImages = [];
let currentIndex = 0;

function setBreadcrumb(items) {
  breadcrumb.innerHTML = items.map((item, i) => {
    const isLast = i === items.length - 1;
    return isLast ? `<span>${item.label}</span>` : `<a href="${item.href}">${item.label}</a><span>›</span>`;
  }).join("");
}

function renderBrands() {
  title.textContent = "Тоног төхөөрөмжийн каталог";
  subtitle.textContent = "Эхлээд брэндээ сонгоно. Дараа нь төрөл рүү орж тухайн folder доторх JPG зургуудыг gallery хэлбэрээр үзнэ.";
  setBreadcrumb([{ label: "Каталог" }]);
  content.innerHTML = `
    <div class="catalog-grid">
      ${catalog.brands.map(brand => `
        <a class="brand-card reveal visible" href="catalog.html#${brand.id}">
          <p class="eyebrow">Brand</p>
          <h3>${brand.name}</h3>
          <p>${brand.description}</p>
        </a>
      `).join("")}
    </div>
    <div class="catalog-info reveal visible">
      Сонголт A идэвхтэй: зурагнууд өөрийн нэрээрээ үлдэнэ. Файлын нэрсийг <b>catalog-data.js</b> дотор жагсааж өгнө.
    </div>
  `;
}

function renderBrand(brand) {
  title.textContent = brand.name;
  subtitle.textContent = brand.description;
  setBreadcrumb([
    { label: "Каталог", href: "catalog.html" },
    { label: brand.name }
  ]);
  content.innerHTML = `
    <div class="catalog-grid">
      ${brand.categories.map(cat => `
        <a class="type-card reveal visible" href="catalog.html#${brand.id}/${cat.id}">
          <p class="eyebrow">${brand.name}</p>
          <h3>${cat.name}</h3>
          <p>${cat.desc}</p>
        </a>
      `).join("")}
    </div>
  `;
}

function encodePathPart(name) {
  return String(name).split("/").map(part => encodeURIComponent(part)).join("/");
}

function listedImagePaths(brandId, categoryId) {
  const list = window.NOVAX_CATALOG_IMAGES?.[brandId]?.[categoryId] || [];
  return list.map(fileName => `catalog/${brandId}/${categoryId}/${encodePathPart(fileName)}`);
}

async function renderGallery(brand, category) {
  title.textContent = `${brand.name} · ${category.name}`;
  subtitle.textContent = "Зураг дээр дараад томоор үзнэ. Баруун/зүүн сум эсвэл keyboard arrow ашиглаж болно.";
  setBreadcrumb([
    { label: "Каталог", href: "catalog.html" },
    { label: brand.name, href: `catalog.html#${brand.id}` },
    { label: category.name }
  ]);
  content.innerHTML = `<div class="empty-gallery">Зургуудыг ачаалж байна...</div>`;

  currentImages = listedImagePaths(brand.id, category.id);

  if (!currentImages.length) {
    content.innerHTML = `
      <div class="gallery-toolbar">
        <a class="btn ghost" href="catalog.html#${brand.id}">← Буцах</a>
        <button class="btn primary" type="button" data-quote-open>Үнийн санал авах</button>
      </div>
      <div class="empty-gallery">
        Энэ folder-ийн зурагны нэрс <b>catalog-data.js</b> дотор хараахан нэмэгдээгүй байна.<br>
        Зургууд folder дотроо өөрийн нэрээрээ үлдэнэ. Харин нэрсийг list-д яг тэр чигээр нь бичнэ:<br>
        <b>catalog/${brand.id}/${category.id}/таны-файлын-нэр.jpg</b>
      </div>
    `;
    document.querySelectorAll("[data-quote-open]").forEach(btn => btn.addEventListener("click", () => document.getElementById("quoteModal")?.classList.add("open")));
    return;
  }

  content.innerHTML = `
    <div class="gallery-toolbar">
      <a class="btn ghost" href="catalog.html#${brand.id}">← Буцах</a>
      <h2>${category.name}</h2>
      <button class="btn primary" type="button" data-quote-open>Үнийн санал авах</button>
    </div>
    <div class="gallery-grid">
      ${currentImages.map((src, i) => `
        <button class="gallery-item" type="button" data-index="${i}">
          <img src="${src}" alt="${brand.name} ${category.name} ${i + 1}">
        </button>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".gallery-item").forEach(btn => btn.addEventListener("click", () => openLightbox(Number(btn.dataset.index))));
  document.querySelectorAll("[data-quote-open]").forEach(btn => btn.addEventListener("click", () => {
    const modal = document.getElementById("quoteModal");
    modal?.classList.add("open");
    modal?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }));
}

function openLightbox(index) {
  currentIndex = index;
  lbImage.src = currentImages[currentIndex];
  lbCaption.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function moveLightbox(dir) {
  if (!currentImages.length) return;
  currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
  lbImage.src = currentImages[currentIndex];
  lbCaption.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

lbClose?.addEventListener("click", closeLightbox);
lbPrev?.addEventListener("click", () => moveLightbox(-1));
lbNext?.addEventListener("click", () => moveLightbox(1));
lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lightbox?.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") moveLightbox(-1);
  if (e.key === "ArrowRight") moveLightbox(1);
});

function router() {
  const hash = location.hash.replace("#", "").trim();
  if (!hash) return renderBrands();
  const [brandId, categoryId] = hash.split("/");
  const brand = catalog.brands.find(b => b.id === brandId);
  if (!brand) return renderBrands();
  if (!categoryId) return renderBrand(brand);
  const category = brand.categories.find(c => c.id === categoryId);
  if (!category) return renderBrand(brand);
  renderGallery(brand, category);
}

window.addEventListener("hashchange", router);
router();
