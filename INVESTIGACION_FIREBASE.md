# 📄 Documento de Investigación: Almacenamiento y Recuperación de Datos en Firebase Firestore

**Asignatura:** Construcción de Software  
**Evaluación:** Evaluación 1 (Trabajo 1)  
**Estudiante:** [Tu Nombre Completo Aquí]  
**Fecha:** Septiembre 2026  

---

## 1. Introducción a Cloud Firestore

**Cloud Firestore** es una base de datos NoSQL documental y escalable alojada en la nube de Google Cloud / Firebase. A diferencia de las bases de datos relacionales tradicionales (que estructuran la información en tablas con filas y columnas rígidas mediante SQL), Firestore modela la información mediante colecciones de documentos semiestructurados. Esto permite flexibilidad de esquemas, sincronización automática en tiempo real y alta disponibilidad sin necesidad de administrar servidores dedicados.

---

## 2. ¿Cómo almacena los datos Firestore? (Modelo de Datos)

El modelo de almacenamiento de Cloud Firestore se organiza en tres conceptos jerárquicos:

1. **Colecciones (*Collections*):** Son contenedores lógicos de documentos (análogas a las carpetas o tablas). En nuestro sistema, por ejemplo, los productos del inventario se almacenan dentro de la colección `"productos"`. Una característica clave es que las colecciones no imponen un esquema estricto; cada documento puede contener campos propios.
2. **Documentos (*Documents*):** Son las unidades básicas de registro. Cada documento almacena campos en pares clave-valor (formato JSON extendido o BSON), soportando tipos como cadenas de texto, números, booleanos, marcas de tiempo y mapas anidados. Además, cada documento tiene un **ID único** alfanumérico generado automáticamente o definido por el usuario.
3. **Subcolecciones (*Subcollections*):** Los documentos pueden albergar a su vez colecciones secundarias, lo que facilita modelar relaciones jerárquicas sin sobrecargar el tamaño del documento principal.

---

## 3. ¿Cómo recupera los datos Firestore? (Consultas y Tiempo Real)

Firestore ofrece dos estrategias fundamentales para la recuperación de datos:

### A. Consultas puntuales bajo demanda (`getDocs` / `getDoc`)
El cliente realiza una petición HTTP/WebSocket para obtener una fotografía estática (*snapshot*) de los datos en ese momento. Es el enfoque tradicional cuando la información no requiere reactividad constante.

### B. Lecturas reactivas en tiempo real (`onSnapshot`)
Es la capacidad distintiva de Firestore y la implementada en este proyecto. Mediante la función `onSnapshot`, la aplicación establece un canal de escucha continuo:
* Cuando cualquier cliente crea, modifica o elimina un registro en la nube, Firestore calcula la diferencia (*delta*).
* Emite un evento en tiempo real hacia la aplicación cliente.
* En React, este evento actualiza el estado (`useState`), redibujando la interfaz al instante sin necesidad de que el usuario recargue la página.

Asimismo, Firestore indexa automáticamente todos los campos escalares de cada documento, permitiendo ejecutar consultas ordenadas y filtradas (`query`, `orderBy`) con un rendimiento independiente del volumen total de la base de datos.

---

## 4. Fuentes Consultadas

1. **Google Firebase Documentation.** (2024). *Cloud Firestore Data Model*. Recuperado de: https://firebase.google.com/docs/firestore/data-model
2. **Google Firebase Documentation.** (2024). *Get realtime updates with Cloud Firestore*. Recuperado de: https://firebase.google.com/docs/firestore/query-data/listen
3. **React Official Documentation.** (2024). *Synchronizing with Effects*. Recuperado de: https://react.dev/learn/synchronizing-with-effects
