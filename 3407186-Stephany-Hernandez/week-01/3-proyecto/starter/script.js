/* ============================================
   E-COMMERCE PAPELERÍA
   ============================================ */

const entityData = {
  name: 'PaperShop Online',
  description: 'Tienda virtual especializada en productos de papelería, útiles escolares y artículos de oficina.',
  identifier: 'ECOM-PS-2026',

  contact: {
    email: 'soporte@papershop.com',
    phone: '+57 300 123 4567',
    location: 'Colombia'
  },

  items: [
    { name: 'Cuadernos', level: 95 },
    { name: 'Lápices', level: 90 },
    { name: 'Marcadores', level: 85 },
    { name: 'Carpetas', level: 80 },
    { name: 'Agendas', level: 88 },
    { name: 'Material artístico', level: 92 }
  ],

  links: [
    { platform: 'Instagram', url: '#', icon: '📸' },
    { platform: 'Facebook', url: '#', icon: '📘' },
    { platform: 'Tienda Online', url: '#', icon: '🛒' }
  ],

  stats: {
    total: 5000,
    active: 1200,
    rating: 4.8,
    custom: 300
  }
};

/* ================= DOM ================= */

const entityName = document.getElementById('userName');
const entityDescription = document.getElementById('userBio');
const itemsList = document.getElementById('skillsList');
const statsContainer = document.getElementById('stats');
const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyEmailBtn');
const toggleItemsBtn = document.getElementById('toggleSkills');
const socialContainer = document.getElementById('socialLinks');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

/* ================= Render Info ================= */

const renderBasicInfo = () => {
  const { name, description } = entityData;
  entityName.textContent = name;
  entityDescription.textContent = description;
};

/* ================= Render Items ================= */

const renderItems = (showAll = false) => {
  const { items } = entityData;
  const itemsToShow = showAll ? items : items.slice(0, 4);

  const itemsHtml = itemsToShow.map(({ name, level }) => `
    <div class="skill-item">
      <div class="skill-name">${name}</div>
      <div class="skill-bar">
        <div class="skill-bar-fill" style="width:${level}%"></div>
      </div>
    </div>
  `).join('');

  itemsList.innerHTML = itemsHtml;
};

/* ================= Render Links ================= */

const renderLinks = () => {
  const { links } = entityData;

  const linksHtml = links.map(({ platform, url, icon }) => `
    <a href="${url}" target="_blank" class="social-link">
      ${icon} ${platform}
    </a>
  `).join('');

  socialContainer.innerHTML = linksHtml;
};

/* ================= Render Stats ================= */

const renderStats = () => {
  const { stats } = entityData;

  const statsArray = [
    { label: 'Productos vendidos', value: stats.total },
    { label: 'Clientes activos', value: stats.active },
    { label: 'Rating', value: stats.rating },
    { label: 'Pedidos mensuales', value: stats.custom }
  ];

  const statsHtml = statsArray.map(({ label, value }) => `
    <div class="stat-item">
      <span class="stat-value">${value}</span>
      <span class="stat-label">${label}</span>
    </div>
  `).join('');

  statsContainer.innerHTML = statsHtml;
};

/* ================= Theme ================= */

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
};

const loadTheme = () => {
  document.documentElement.dataset.theme = 'light';
};

/* ================= Copy ================= */

const copyInfo = () => {
  const { name, description, contact } = entityData;

  const text = `
${name}
${description}
Contacto: ${contact.email}
`.trim();

  navigator.clipboard.writeText(text);
  showToast('¡Información copiada!');
};

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

/* ================= Toggle Items ================= */

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleItemsBtn.textContent = showingAllItems ? 'Mostrar menos' : 'Mostrar más';
};

/* ================= Events ================= */

themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

/* ================= Init ================= */

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('✅ E-Commerce Papelería iniciado');
};

init();


document.getElementById("copyEmailBtn").addEventListener("click", function() {
  const email = document.getElementById("userEmail").textContent;
  navigator.clipboard.writeText(email);
});


const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.toggleAttribute("data-theme", "dark");
});