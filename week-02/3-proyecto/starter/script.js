/**
 * ============================================
 * PROYECTO SEMANA 02 - GESTOR DE COLECCIÓN
 * Archivo inicial para el aprendiz
 * ============================================
 *

 *
 * ============================================
 */

// ============================================
// ESTADO GLOBAL
// ============================================

// Array que almacena todos los elementos de tu colección
let items = [];

// ID del elemento que se está editando (null si es nuevo)
let editingItemId = null;

// ============================================
// TODO 1: DEFINIR CATEGORÍAS DE TU DOMINIO
// ============================================


const CATEGORIES = {
  school: { name: 'Útiles Escolares', emoji: '🎒' },
  office: { name: 'Oficina', emoji: '📎' },
  art: { name: 'Arte y Dibujo', emoji: '🎨' },
  notebooks: { name: 'Cuadernos y Libretas', emoji: '📓' },
  accessories: { name: 'Accesorios', emoji: '✂️' },
};

// Prioridades genéricas (adapta los nombres si es necesario)
const PRIORITIES = {
  high: { name: 'Alta', color: '#ef4444' },
  medium: { name: 'Media', color: '#f59e0b' },
  low: { name: 'Baja', color: '#22c55e' },
};

// ============================================
// TODO 2: PERSISTENCIA (LocalStorage)
// ============================================

/**
 * Carga los elementos desde LocalStorage
 * @returns {Array} Array de elementos guardados, o array vacío
 */
const loadItems = () => {
  // TODO: Implementa la carga desde localStorage
  // 1. Obtén el valor de localStorage con la key de tu dominio
  // 2. Si existe, usa JSON.parse() para convertirlo a array
  // 3. Si no existe, retorna array vacío []
  // 4. Usa el operador ?? para el valor por defecto
  //
  // EJEMPLO:
  // const stored = localStorage.getItem('celestialBodies');
  // return stored ? JSON.parse(stored) : [];
  // O más moderno:
return JSON.parse(localStorage.getItem('stationeryProducts') ?? '[]');
};

/**
 * Guarda los elementos en LocalStorage
 * @param {Array} items - Array de elementos a guardar
 */
const saveItems = itemsToSave => {
  // TODO: Implementa el guardado en localStorage
  // 1. Usa JSON.stringify() para convertir el array a string
  // 2. Guarda con localStorage.setItem()
localStorage.setItem('stationeryProducts', JSON.stringify(itemsToSave));
};

// ============================================
// TODO 3: CRUD - CREAR ELEMENTO
// ============================================

/**
 * Crea un nuevo elemento con los datos proporcionados
 * @param {Object} itemData - Datos del nuevo elemento
 * @returns {Array} Nuevo array de elementos (sin mutar el original)
 */
const createItem = (itemData = {}) => {

  // Crear el nuevo producto
  const newItem = {
    id: Date.now(),
    name: itemData.name ?? '',
    description: itemData.description ?? '',
    category: itemData.category ?? 'Útiles Escolares',
    priority: itemData.priority ?? 'high',
    // Datos agregados de mi dominio
    price: Number(itemData.price) ?? 0,
    stock: Number(itemData.stock) ?? 0,
    //
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,

    // Spread operator (permite agregar más campos si existen)
    ...itemData
  };

  // Crear nuevo array sin mutar el original
  const newItems = [...items, newItem];

  // Guardar en localStorage
  saveItems(newItems);

  // Retornar nuevo estado
  return newItems;

};

// ============================================
// TODO 4: CRUD - ACTUALIZAR ELEMENTO
// ============================================

// ============================================
// TODO 4: CRUD - ACTUALIZAR ELEMENTO
// ============================================

/**
 * Actualiza un elemento existente
 * @param {Number} id - ID del elemento a actualizar
 * @param {Object} updates - Propiedades a actualizar
 * @returns {Array} Nuevo array con el elemento actualizado
 */
const updateItem = (id, updates) => {

  // recorremos todos los items
  const updatedItems = items.map(item =>

    // si encontramos el item por ID
    item.id === id
      ? {
          ...item,          // mantiene datos anteriores
          ...updates,       // agrega cambios nuevos
          updatedAt: new Date().toISOString() // fecha de actualización
        }
      : item // si no coincide, lo deja igual
  );

  // guardamos en localStorage
  saveItems(updatedItems);

  // retornamos el nuevo array
  return updatedItems;
};

// ============================================
// TODO 5: CRUD - ELIMINAR ELEMENTO
// ============================================

/**
 * Elimina un elemento por su ID
 * @param {Number} id - ID del elemento a eliminar
 * @returns {Array} Nuevo array sin el elemento eliminado
 */
const deleteItem = id => {

  // creamos nuevo array sin el item eliminado
  const filteredItems = items.filter(item => item.id !== id);

  // actualizamos la variable global
  items = filteredItems;

  // guardamos en localStorage
  saveItems(filteredItems);

  // retornamos el nuevo array
  return filteredItems;
};

// ============================================
// TODO 6: CRUD - TOGGLE ESTADO ACTIVO
// ============================================


const toggleItemActive = id => {

  const updatedItems = items.map(item =>
    item.id === id
      ? {
          ...item,
          active: !item.active, // invierte estado
          updatedAt: new Date().toISOString()
        }
      : item
  );

  // actualizar variable global
  items = updatedItems;

  // guardar cambios
  saveItems(updatedItems);

  return updatedItems;
};

/**
 * Elimina todos los elementos inactivos
 * @returns {Array} Nuevo array solo con elementos activos
 */
const clearInactive = () => {

  const activeItems = items.filter(item => item.active);

  // actualizar variable global
  items = activeItems;

  // guardar en localStorage
  saveItems(activeItems);

  return activeItems;
};

// ============================================
// TODO 7: FILTROS Y BÚSQUEDA
// ============================================

/**
 * Filtra elementos por estado (activo/inactivo)
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} status - 'all' | 'active' | 'inactive'
 * @returns {Array} Elementos filtrados
 */
const filterByStatus = (itemsToFilter, status = 'all') => {

  if (status === 'all') return itemsToFilter;

  if (status === 'active')
    return itemsToFilter.filter(item => item.active);

  if (status === 'inactive')
    return itemsToFilter.filter(item => !item.active);

  return itemsToFilter;
};

/**
 * Filtra elementos por categoría
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} category - Categoría a filtrar o 'all'
 * @returns {Array} Elementos filtrados
 */
const filterByCategory = (itemsToFilter, category = 'all') => {

  if (category === 'all') return itemsToFilter;

  return itemsToFilter.filter(
    item => item.category === category
  );
};

/**
 * Filtra elementos por prioridad
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} priority - Prioridad a filtrar o 'all'
 * @returns {Array} Elementos filtrados
 */
const filterByPriority = (itemsToFilter, priority = 'all') => {

  if (priority === 'all') return itemsToFilter;

  return itemsToFilter.filter(
    item => item.priority === priority
  );
};

/**
 * Busca elementos por texto en nombre y descripción
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} query - Texto a buscar
 * @returns {Array} Elementos que coinciden
 */
const searchItems = (itemsToFilter, query) => {

  if (!query || query.trim() === '')
    return itemsToFilter;

  const searchTerm = query.toLowerCase();

  return itemsToFilter.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    (item.description ?? '')
      .toLowerCase()
      .includes(searchTerm)
  );
};

/**
 * Aplica todos los filtros de forma encadenada
 * @param {Array} itemsToFilter - Array de elementos
 * @param {Object} filters - Objeto con todos los filtros
 * @returns {Array} Elementos filtrados
 */
const applyFilters = (itemsToFilter, filters = {}) => {
  // TODO: Implementa aplicación de filtros encadenada
  // Usa destructuring con default values para los filtros
  //
  const {
    status = 'all',
    category = 'all',
    priority = 'all',
    search = ''
  } = filters;
  //
  // // Encadena los filtros
  let result = filterByStatus(itemsToFilter, status);

  result = filterByCategory(result, category);

  result = filterByPriority(result, priority);

  result = searchItems(result, search);

  return result;
};

// ============================================
// TODO 8: ESTADÍSTICAS
// ============================================

/**
 * Calcula estadísticas generales de los productos
 * @param {Array} itemsToAnalyze - Array de productos
 * @returns {Object} Objeto con estadísticas calculadas
 */
const getStats = (itemsToAnalyze = []) => {

  // --------------------------------------------------
  // 1 TOTAL DE PRODUCTOS
  // --------------------------------------------------
  // Cuenta cuántos productos existen en el array
  const total = itemsToAnalyze.length;


  // --------------------------------------------------
  // 2️ PRODUCTOS ACTIVOS
  // --------------------------------------------------
  // filter() crea un nuevo array SOLO con productos activos
  // luego length cuenta cuántos hay
  const active = itemsToAnalyze.filter(item => item.active).length;


  // --------------------------------------------------
  // 3️ PRODUCTOS INACTIVOS
  // --------------------------------------------------
  // Se calcula restando los activos al total
  const inactive = total - active;


  // --------------------------------------------------
  // 4️ CONTEO POR CATEGORÍA
  // --------------------------------------------------
  // reduce() recorre todos los productos y va acumulando
  // cuántos hay por cada categoría
  //
  // acc = acumulador (objeto donde guardamos resultados)
  // item = producto actual del recorrido
  const byCategory = itemsToAnalyze.reduce((acc, item) => {

    // Si la categoría no existe aún → empieza en 0
    // Luego suma 1 cada vez que aparece
    acc[item.category] = (acc[item.category] ?? 0) + 1;

    // Siempre debemos retornar el acumulador
    return acc;

  }, {}); // {} = objeto inicial vacío


  // --------------------------------------------------
  // 5️ CONTEO POR PRIORIDAD
  // --------------------------------------------------
  // Funciona igual que el anterior pero usando prioridad
  const byPriority = itemsToAnalyze.reduce((acc, item) => {

    acc[item.priority] = (acc[item.priority] ?? 0) + 1;

    return acc;

  }, {});


  // --------------------------------------------------
  // 6️ RETORNAR TODAS LAS ESTADÍSTICAS
  // --------------------------------------------------
  // Se devuelve un objeto con toda la información calculada
  return {
    total,        // número total de productos
    active,       // productos activos
    inactive,     // productos inactivos
    byCategory,   // conteo por categoría
    byPriority    // conteo por prioridad
  };
};

// ============================================
// TODO 9: RENDERIZADO - ELEMENTO INDIVIDUAL
// ============================================

/**
 * Obtiene el emoji de una categoría
 */
const getCategoryEmoji = category => {
  return CATEGORIES[category]?.emoji ?? '📌';
};

/**
 * Formatea fecha ISO a formato legible
 */
const formatDate = dateString => {
  const date = new Date(dateString);

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Renderiza un elemento individual como HTML
 */
const renderItem = item => {

  //  Agregamos price y stock al destructuring
  const {
    id,
    name,
    description,
    category,
    priority,
    price,
    stock,
    active,
    createdAt
  } = item;

  return `
    <div 
      class="item ${active ? '' : 'inactive'} priority-${priority}" 
      data-item-id="${id}"
    >

      <!-- Checkbox -->
      <input 
        type="checkbox"
        class="item-checkbox"
        ${active ? 'checked' : ''}
      >

      <!-- Contenido -->
      <div class="item-content">

        <h3 class="item-name">${name}</h3>

        ${description ? `
          <p class="item-description">${description}</p>
        ` : ''}

        <!-- Información extra del producto -->
        <div class="item-product-info">

          <!-- Precio -->
          <span class="badge badge-price">
            💲Precio:  $${price.toLocaleString()}
          </span>

          <!-- Stock -->
          <span class="badge badge-stock ${stock === 0 ? 'out-stock' : ''}">
            📦 Stock: ${stock}
          </span>

        </div>

        <!-- Metadatos -->
        <div class="item-meta">

          <span class="badge badge-category">
            ${getCategoryEmoji(category)}
            ${CATEGORIES[category]?.name ?? category}
          </span>

          <span class="badge badge-priority priority-${priority}">
            ${PRIORITIES[priority]?.name ?? priority}
          </span>

          <span class="item-date">
            📅 ${formatDate(createdAt)}
          </span>

        </div>
      </div>

      <!-- Acciones -->
      <div class="item-actions">
        <button class="btn-edit" title="Editar">✏️</button>
        <button class="btn-delete" title="Eliminar">🗑️</button>
      </div>

    </div>
  `;
};

// ============================================
// TODO 10: RENDERIZADO - LISTA COMPLETA
// ============================================

/**
 * Renderiza la lista completa de elementos
 * @param {Array} itemsToRender - Array de elementos a renderizar
 */
const renderItems = itemsToRender => {
  const itemList = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');

  // 1. Si no hay productos
  if (!itemsToRender || itemsToRender.length === 0) {
    // limpia la lista
    itemList.innerHTML = '';

    // muestra mensaje vacío
    emptyState.style.display = 'block';
    return;
  }

  // 2. Si hay productos
  emptyState.style.display = 'none';

  // map → convierte cada item en HTML usando renderItem()
  // join('') → une todos los HTML en un solo string
  const html = itemsToRender.map(renderItem).join('');

  // insertar en el DOM
  itemList.innerHTML = html;
};

/**
 * Renderiza las estadísticas en el DOM
 * @param {Object} stats - Objeto con estadísticas
 */
const renderStats = stats => {

  //  estadísticas principales
  document.getElementById('stat-total').textContent = `${stats.total}`;
  document.getElementById('stat-active').textContent = `${stats.active}`;
  document.getElementById('stat-inactive').textContent = `${stats.inactive}`;

  // estadísticas por categoría
  const categoryStats = Object.entries(stats.byCategory)
    .map(([category, count]) => {
      const emoji = getCategoryEmoji(category);
      const name = CATEGORIES[category]?.name ?? category;
      return `${emoji} ${name}: ${count}`;
    })
    .join(' | ');

  document.getElementById('stats-details').textContent = categoryStats;
};

// ============================================
// TODO 11: EVENT HANDLERS/controladores de eventos
// ============================================

/**
 * Maneja el envío del formulario (crear/editar)
 * @param {Event} e - Evento del formulario
 */
const handleFormSubmit = e => {
  e.preventDefault();

  // TODO: Obtén los valores del formulario
  // Adapta los campos a tu dominio
  //
//  obtener valores del formulario
  const name = document.getElementById('item-name').value.trim();
  const description = document.getElementById('item-description').value.trim();
  const category = document.getElementById('item-category').value;
  const priority = document.getElementById('item-priority').value;
  //segun mi dominio
  const price = Number(document.getElementById('item-price').value);
  const stock = Number(document.getElementById('item-stock').value);

  // TODO: Valida que el nombre no esté vacío
    if (!name) {
      alert('El nombre del producto es obligatorio');
      return;
    }

  // TODO: Crea el objeto con los datos
  const itemData = {
    name,description,category,priority,price,stock
  };

  // TODO: Si hay editingItemId, actualiza; si no, crea nuevo
  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  // TODO: Resetea el formulario y re-renderiza
  resetForm();
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**activar y desactivar prducto
 * Maneja el click en checkbox de un elemento
 * @param {Number} itemId - ID del elemento
 */
const handleItemToggle = itemId => {
  items = toggleItemActive(itemId);

  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Maneja el click en botón editar
 * @param {Number} itemId - ID del elemento a editar
 */
const handleItemEdit = itemId => {

  // buscar producto
  const itemToEdit = items.find(item => item.id === itemId);
  if (!itemToEdit) return;

  // llenar formulario
  document.getElementById('item-name').value = itemToEdit.name;
  document.getElementById('item-description').value = itemToEdit.description ?? '';
  document.getElementById('item-category').value = itemToEdit.category;
  document.getElementById('item-priority').value = itemToEdit.priority;
  document.getElementById('item-price').value = itemToEdit.price ?? 0;
  document.getElementById('item-stock').value = itemToEdit.stock ?? 0;

  // cambiar UI
  document.getElementById('form-title').textContent = '✏️ Editar Producto';
  document.getElementById('submit-btn').textContent = 'Actualizar';
  document.getElementById('cancel-btn').style.display = 'inline-block';

  // guardar id en edición
  editingItemId = itemId;
};

/**
 * Maneja el click en botón eliminar
 * @param {Number} itemId - ID del elemento a eliminar
 */
const handleItemDelete = itemId => {

  const confirmDelete = confirm(
    '¿Estás seguro de que deseas eliminar este producto?'
  );

  if (!confirmDelete) return;

  items = deleteItem(itemId);

  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Obtiene los filtros actuales del DOM
 * @returns {Object} Objeto con los valores de los filtros
 */
const getCurrentFilters = () => {
  return {
    status: document.getElementById('filter-status').value,
    category: document.getElementById('filter-category').value,
    priority: document.getElementById('filter-priority').value,
    search: document.getElementById('search-input').value
  };
};

/**
 * Aplica los filtros actuales y retorna los elementos filtrados
 * @returns {Array} Elementos filtrados
 */
const applyCurrentFilters = () => {
  const filters = getCurrentFilters();
  return applyFilters(items, filters);
};

/**
 * Maneja cambios en los filtros
 */
const handleFilterChange = () => {
  // TODO: Aplica filtros y re-renderiza
  const filteredItems = applyCurrentFilters();
  renderItems(filteredItems);
};

/**
 * Resetea el formulario a su estado inicial
 */
const resetForm = () => {
  // TODO: Limpia el formulario
  document.getElementById('item-form').reset();

  document.getElementById('form-title').textContent ='➕ Nuevo Producto';

  document.getElementById('submit-btn').textContent ='Crear';

  document.getElementById('cancel-btn').style.display = 'none';

  editingItemId = null;
};

// ============================================
// TODO 12: EVENT LISTENERS
// ============================================

/**
 * Adjunta todos los event listeners necesarios
 */
const attachEventListeners = () => {

  // Envío del formulario (crear / editar)
  document
    .getElementById('item-form').addEventListener('submit', handleFormSubmit);

  //  Botón cancelar edición
  document
    .getElementById('cancel-btn').addEventListener('click', resetForm);

  // Filtros
  document
    .getElementById('filter-status').addEventListener('change', handleFilterChange);

  document
    .getElementById('filter-category').addEventListener('change', handleFilterChange);

  document
    .getElementById('filter-priority').addEventListener('change', handleFilterChange);

  // búsqueda en tiempo real
  document
    .getElementById('search-input').addEventListener('input', handleFilterChange);


  // Botón limpiar productos inactivos
  document
    .getElementById('clear-inactive').addEventListener('click', () => {

      if (!confirm('¿Eliminar todos los productos inactivos?')) return;

      items = clearInactive();

      renderItems(applyCurrentFilters());
      renderStats(getStats(items));
    });


  // EVENT DELEGATION (MUY IMPORTANTE)
  document
    .getElementById('item-list').addEventListener('click', e => {

      const itemElement = e.target.closest('.item');
      if (!itemElement) return;

      const itemId = parseInt(itemElement.dataset.itemId);

      // checkbox activo/inactivo
      if (e.target.classList.contains('item-checkbox')) {
        handleItemToggle(itemId);
      }

      // botón editar
      else if (e.target.classList.contains('btn-edit')) {
        handleItemEdit(itemId);
      }

      // botón eliminar
      else if (e.target.classList.contains('btn-delete')) {
        handleItemDelete(itemId);
      }
    });
};

// ============================================
// TODO 13: INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {

  // 1. Cargar productos guardados
  items = loadItems();

  // 2. Renderizar lista inicial
  renderItems(items);

  // 3. Renderizar estadísticas
  renderStats(getStats(items));

  // 4. Activar todos los eventos
  attachEventListeners();

  //  5. Mensaje en consola
  console.log('Aplicación de e-commerce papelería iniciada correctamente');
};


// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
//
// FUNCIONALIDAD:
// ✓ Puedo crear nuevos elementos
// ✓ Puedo editar elementos existentes
// ✓ Puedo eliminar elementos
// ✓ Puedo marcar como activo/inactivo
// ✓ Los filtros funcionan correctamente
// ✓ La búsqueda funciona en tiempo real
// ✓ Las estadísticas se actualizan
// ✓ Los datos persisten al recargar (localStorage)
//
// CÓDIGO:
// ✓ Uso spread operator para copiar arrays/objetos
// ✓ Uso array methods (map, filter, reduce, find)
// ✓ NUNCA muto el estado directamente
// ✓ Default parameters donde corresponde
// ✓ Destructuring para extraer propiedades
// ✓ Template literals para todo el HTML
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
//
// DOMINIO:
// ✓ Adaptado completamente a mi dominio asignado
// ✓ Categorías específicas de mi dominio
// ✓ Propiedades adicionales relevantes
// ✓ Emojis y textos coherentes con el dominio

