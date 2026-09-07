# 🛠️ Sistema de Inventario - Ferretería (React + Firebase Firestore)

**Asignatura:** Construcción de Software  
**Evaluación:** Evaluación 1 (Trabajo 1)  
**Estudiante:** [Tu Nombre Completo Aquí]  
**Repositorio GitHub:** [Enlace a tu repositorio de GitHub aquí]  

---

## 📋 Descripción del Proyecto

Aplicación web desarrollada en **React** y **Vite**, conectada en tiempo real a **Firebase Cloud Firestore**. Permite a un negocio (almacén / ferretería) digitalizar el control de su inventario, reemplazando el registro manual en papel.

### Funcionalidades Principales:
1. **Reportes de Inventario (`reporte.jsx`):** Resumen en tiempo real del estado del almacén: total de variedad de productos, unidades totales en stock, valorización monetaria total del inventario y alertas automáticas para productos con stock crítico (≤ 5 unidades).
2. **Formulario Controlado (`form.jsx`):** Registro de nuevos productos y edición de existentes con validación de campos obligatorios, categorías predefinidas y tipado numérico para precio y stock.
3. **Listado Reactivo (`table.jsx`):** Visualización tabular en tiempo real de los productos, con botones para editar y eliminar registros (con confirmación de usuario).
4. **Persistencia en la Nube con Firestore (`productosService.js`):** Operaciones CRUD completas (*Create, Read, Update, Delete*) sincronizadas en tiempo real mediante `onSnapshot`.

---

## 🚀 Tecnologías Utilizadas

* **React 19**
* **Vite 8**
* **Firebase SDK v12 (Cloud Firestore)**
* **JavaScript (ES6+)**

---

## ⚙️ Requisitos Previos

* **Node.js** (versión 18 o superior)
* **npm** (incluido con Node.js)
* Cuenta en [Firebase Console](https://console.firebase.google.com/)

---

## 📥 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone [URL_DE_TU_REPOSITORIO]
cd ferreteria-react
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
El proyecto utiliza variables de entorno protegidas para no exponer credenciales en el control de versiones.

1. Copia el archivo de ejemplo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
2. Abre el archivo `.env` y coloca tus credenciales reales obtenidas de la consola de Firebase:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key_aqui
   VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu-proyecto
   VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre en tu navegador la URL que indique la consola (por defecto: `http://localhost:5173`).

---

## 🔒 Reglas de Seguridad de Firestore (Modo Desarrollo)

En la consola de Firebase, dentro de **Firestore Database > Reglas**, configurar:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{productoId} {
      allow read, write: if true;
    }
  }
}
```

---

## 📂 Estructura del Proyecto

```text
ferreteria-react/
├── .env.example                # Plantilla de variables de entorno (pública)
├── .env                        # Credenciales reales de Firebase (ignorado en Git)
├── .gitignore                  # Reglas para excluir node_modules y .env
├── index.html
├── package.json
├── vite.config.js
├── README.md                   # Documentación principal
├── INVESTIGACION_FIREBASE.md   # Informe de investigación sobre Firestore
└── src/
    ├── main.jsx                # Punto de entrada de la aplicación
    ├── formApp.jsx             # Componente contenedor: estado y orquestación
    ├── components/
    │   ├── form.jsx            # Formulario de creación y edición
    │   ├── table.jsx           # Tabla de visualización de inventario
    │   └── reporte.jsx         # Panel de resumen y métricas del inventario
    └── firebase/
        ├── config.js           # Inicialización de Firebase con variables de entorno
        └── productosService.js # Funciones CRUD desacopladas para Firestore
```
