# 🛒 E-Commerce Papelería

Aplicación web de gestión de productos escolares y de oficina. Permite crear, editar, eliminar y filtrar productos con persistencia en el navegador usando `localStorage`.

## ¿De qué trata mi dominio?

Mi dominio es una plataforma de **gestión de productos para una tienda de papelería**, es decir, una aplicación donde se pueden registrar, organizar y administrar artículos escolares y de oficina como cuadernos, lápices, marcadores, tijeras y accesorios de arte. Cada producto tiene un nombre, descripción, categoría, precio en pesos colombianos, stock disponible, nivel de prioridad de reposición y un estado activo o inactivo.

---

## 📸 Vista general

La app cuenta con un formulario de productos, filtros dinámicos, estadísticas en tiempo real y un listado interactivo de productos.

## Screenshots:

![Pagina_principal](screenshots/Captura-1.png)
![Pagina_principal](screenshots/Captura-2.png)
![Pagina_principal](screenshots/Captura-3.png)
![Pagina_principal](screenshots/Captura-4.png)

(Capturas de las principales vistas y funcionalidades de la aplicación.)
---

## 🚀 Tecnologías utilizadas

| Tecnología        | Uso                                        |
| ----------------- | ------------------------------------------ |
| HTML5             | Estructura semántica de la interfaz        |
| CSS3              | Estilos, variables CSS y diseño responsivo |
| JavaScript (ES6+) | Lógica, CRUD, filtros y manejo del DOM     |
| LocalStorage      | Persistencia de datos en el navegador      |

---

## 📁 Estructura del proyecto

```
proyecto/
├── index.html          # Estructura principal de la app
├── styles.css          # Estilos globales y diseño responsivo
└── starter/
    └── script.js       # Lógica completa de la aplicación
```

---

## ✨ Funcionalidades

- **Crear productos** con nombre, descripción, categoría, prioridad, precio y stock.
- **Editar productos** existentes desde el mismo formulario.
- **Eliminar productos** con confirmación.
- **Activar / desactivar** productos con un checkbox (toggle de estado).
- **Filtrar** por estado (disponible / agotado), categoría y prioridad.
- **Buscar** productos en tiempo real por nombre o descripción.
- **Estadísticas** de totales, disponibles, agotados y conteo por categoría.
- **Limpiar agotados** con un solo clic.
- **Formato automático** de precio con separadores de miles (estilo colombiano).
- **Persistencia** de datos con `localStorage` — los datos se mantienen al recargar.

---

## 🗂️ Categorías disponibles


| Categoría |Nombre| Emoji |
|---|---|---|
| school| Útiles Escolares | 🎒 |
| office| Oficina | 📎 |
| art| Arte y Dibujo | 🎨 |
| notebooks| Cuadernos y Libretas | 📓 |
| accessories| Accesorios | ✂️ |

---

## ⚡ Prioridades

| Nivel | Color       |
| ----- | ----------- |
| Alta  | 🔴 Rojo     |
| Media | 🟡 Amarillo |
| Baja  | 🟢 Verde    |

---
## 🔄 Adaptación al dominio

| Concepto Genérico |  Mi Dominio: E-commerce Papelería 🛒 |
|-------------------|------------------------|
| **Elemento** |  Producto de papelería |
| **Propiedades** |  nombre, descripción, categoria, prioridad, precio, stock |
| **Estado activo** | Disponible para venta |
| **Estadísticas** |  Por categoría, disponibilidad y stock |

### 💡 Propiedades específicas del dominio

| Propiedad | Tipo | Descripción |
|---|---|---|
| `price` | `Number` | Precio en COP. Se ingresa con formato `10.000` y se almacena como número entero sin puntos. |
| `stock` | `Number` | Unidades en inventario. Si llega a `0`, el producto se considera **agotado automáticamente**. |

**Lógica de disponibilidad:** un producto es **disponible** solo si `active === true` AND `stock > 0`. Aunque esté activo, si el stock es `0` aparece como agotado.
---


## 🧠 Conceptos de JavaScript aplicados

- **Spread operator** para copiar arrays y objetos sin mutarlos.
- **Array methods**: `map`, `filter`, `reduce`, `find`.
- **LocalStorage** con `JSON.stringify` / `JSON.parse`.
- **Destructuring** de objetos y parámetros.
- **Template literals** para generar HTML dinámico.
- **Event delegation** para manejar eventos en listas dinámicas.
- **Default parameters** en funciones.
---

### Diseño visual (`styles.css`)

El diseño refleja una tienda de papelería moderna y colorida:

- **Fondo:** Gradiente de azul a rosado a amarillo `(#8398f7 → #fd97e4 → #f8ec83)` que transmite energía y creatividad, coherente con un ambiente escolar.
- **Color primario:** Azul suave `#8eaef3` para botones y badges principales.
- **Color secundario:** Lila `#a175ee` que complementa la identidad visual.
- **Tarjetas:** Fondo blanco con sombras suaves para destacar sobre el fondo degradado.
- **Borde de prioridad:** El borde izquierdo de cada tarjeta cambia de color según la urgencia de reposición (`🔴 Alta`, `🟡 Media`, `🟢 Baja`).


## 🛠️ Cómo ejecutar el proyecto

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador.
3. ¡Listo! No se requiere instalación ni servidor.

```bash
# Opcionalmente, con Live Server en VS Code:
# Click derecho sobre index.html → "Open with Live Server"
```

---

## 📊 Modelo de datos

Cada producto almacenado tiene la siguiente estructura:

```js
{
  id: 1718000000000,         // Timestamp único (Date.now())
  name: "Cuaderno Norma",    // Nombre del producto
  description: "100 hojas",  // Descripción
  category: "notebooks",     // Categoría
  priority: "medium",        // Prioridad (low | medium | high)
  price: 10000,              // Precio en COP
  stock: 50,                 // Unidades disponibles
  active: true,              // Estado del producto
  createdAt: "2026-02-21T21:32:47.000Z",     // Fecha de creación (ISO)
  updatedAt: null            // Fecha de última edición (ISO o null)
}
```



## 👨‍💻 Autor

Proyecto desarrollado como ejercicio de aprendizaje — **Semana 02: Gestor de Colección**.

Stephany Camila Hernández Morales- 3407186
Proyecto Week-02 — JavaScript Moderno  
Dominio: E-commerce de productos de papelería

## 📋 Entregables

1. **Código funcional** adaptado a tu dominio asignado
2. **README personal** explicando tu implementación específica
3. **Capturas de pantalla** de la aplicación funcionando
4. **Todo el código debe usar**:
   - Nomenclatura técnica en inglés
   - Comentarios en español
   - Sintaxis ES2023 exclusivamente

---

_Proyecto Week-02 - JavaScript Moderno Bootcamp_
