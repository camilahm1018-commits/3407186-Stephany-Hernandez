/* ============================================
import { Product } from './../../../../bc-javascript-es2023/bootcamp/week-12/2-practicas/ejercicio-03-modulos/starter/index';
PROYECTO SEMANA 1- E-COMMERCE PAPELERÍA
   ============================================ */

   // ============================================
// TODO 1: Crear el objeto de datos de tu dominio
// ============================================
const ProductData = {
  name: 'PaperShop Online',
  description: 'Tienda virtual especializada en productos de papelería, útiles escolares y artículos de oficina.',
  identifier: 'ECOM-PS-2026',
  Title: 'Tienda Vrtual de Productos de Papeleria',

  contact: {
    email: 'soporte@papershop.com',
    phone: '+57 313 399 0629',
    location: 'Colombia'
  },

  items: [
    { name: 'Cuadernos', level: 95 },
    { name: 'Lápices', level: 90 },
    { name: 'Marcadores', level: 85 },
    { name: 'Carpetas', level: 70 },
    { name: 'Agendas', level: 88 },
    { name: 'Material artístico', level: 92 },
    { name: 'Adhesivos', level: 75 },
    { name: 'Cartucheras', level: 88 },
    { name: 'Accesorios Tecnologicos', level: 78 },
    { name: 'Papeles Creativos', level: 83 }

  ],

  links: [
    { platform: 'Instagram', url: 'https://www.instagram.com/paper_shop_online/', icon: '📸' },
    { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&id=61579179402678&sk=about', icon: '📘' },
    { platform: 'Tienda Online', url: '#', icon: '🛒' }
  ],

  stats: {
    total: 5000,
    active: 1200,
    rating: 4.8,
    custom: 300
  }
};

// ============================================
// TODO 2: Referencias a elementos del DOM
// ============================================

const ProductName = document.getElementById('userName');
const ProductDescription = document.getElementById('userBio');
const ProductTitle =document.getElementById('userTitle');
const itemsList = document.getElementById('skillsList');
const statsContainer = document.getElementById('stats');
const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyEmailBtn');
const toggleItemsBtn = document.getElementById('toggleSkills');
const socialContainer = document.getElementById('socialLinks');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const locationpoint = document.getElementById("userLocation")
const Email = document.getElementById("userEmail")
const Phone= document.getElementById("userPhone")

// ============================================
// TODO 3: Renderizar información básica
// ============================================

const renderBasicInfo = () => {
  const {
    name,
    description,
    Title,
    contact:  {email, phone, location}
  } = ProductData;
  ProductName.textContent = name;
  ProductDescription.textContent = description;
  locationpoint.textContent = `📍 ${location}`;
  Email.textContent = email;
  Phone.textContent =phone;
  ProductTitle.textContent =Title;
};
// ============================================
// TODO 4: Renderizar lista de elementos
// ============================================

const renderItems = (showAll = false) => {
  const { items } = ProductData;
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

// ============================================
// TODO 5: Renderizar enlaces/referencias
// ============================================

const renderLinks = () => {
  const { links } = ProductData;

  const linksHtml = links.map(({ platform, url, icon }) => `
    <a href="${url}" target="_blank" class="social-link">
      ${icon} ${platform}
    </a>
  `).join('');

  socialContainer.innerHTML = linksHtml;
};

// ============================================
// TODO 6: Calcular y renderizar estadísticas
// ============================================

const renderStats = () => {
  const { stats } = ProductData;

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

// ============================================
// TODO 7: Funcionalidad de cambio de tema
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
};

const loadTheme = () => {
  document.documentElement.dataset.theme = 'light';
};

// ============================================
// TODO 8: Funcionalidad de copiar información
// ============================================

const copyInfo = () => {
  const { name, description, contact } = ProductData;

  const text = `
${name}
${description}
Contacto: ${contact.email}
`.trim();

  navigator.clipboard.writeText(text);
  showToast('¡Información copiada al portapapeles!');
};

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// TODO 9: Funcionalidad de mostrar/ocultar items
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  renderStats();
  toggleItemsBtn.textContent = showingAllItems ? 'Show less' : 'Show More';
};

// ============================================
// TODO 10: Event Listeners
// ============================================

themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Inicializar la aplicación
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('✅ E-Commerce Papelería iniciado');
};

init();
