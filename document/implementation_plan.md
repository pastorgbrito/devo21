# Plan de Implementación General: Devo21 (MVP)

Este es el plan macro para construir Devo21 de acuerdo con el documento de especificaciones general. Organizaremos el progreso por los pilares fundamentales del software.

## User Review Required
> [!IMPORTANT]
> - **Autenticación y Registro:** El acceso de todo nuevo usuario (sin importar si luego será admin de iglesia, de grupo o miembro base) queda en estado "Pendiente" esperando la aprobación manual del `Super Admin`. ¿Deseamos que desarrollar este Dashboard de Aprobación sea nuestra primera prioridad (Hito 1)?
> - **Modelado de Datos:** Estructuraremos la base de datos de Firestore en colecciones raíz: `users` (todos los usuarios, donde cada uno tiene un campo `role`), `churches` (iglesias registradas), `groups` (grupos pequeños), y `studies` (los JSONs o contenidos de los devocionales a estudiar).

## Proposed Changes

### FASE 1: Core de Autenticación, Roles y Base de Datos
* **Auth & DB**: Implementación de registro (Firebase Auth) y sincronización con un perfil en la colección `users` de Firestore. Modelado de las colecciones `churches` y `groups`.
* **Estados de Usuario**: Manejo del estado `PENDING`, `ACTIVE`, `INACTIVE`.
* **Routing Protegido**: Middleware o HOCs en Next.js para interceptar usuarios no aprobados y mandarlos a `/pending`.

### FASE 2: Interfaces Base (El "Cascarón")
* **Super Admin Dashboard (PC)**: Implementación de la ruta `/admin` con una tabla para gestionar usuarios `PENDING`. Creación del componente `StudyUploader.tsx` para carga de contenido JSON.
* **App Mobile-First (Otros roles)**: Creación del grupo de rutas `(app)` con un layout centralizado (`max-w-md mx-auto`). Implementación de `BottomTabs.tsx` para navegación persistente (Inicio, Estudio, Comunidad, Perfil).
* **Lógica de Acceso**: Implementación de redireccionamientos automáticos basados en `role` y `status` desde la página raíz.

### FASE 3: Motor de Estudios e IA (Agente Socrático)
* **Gestor de Estudios**: Lógica para asignar y abrir el archivo JSON correspondiente al día.
* **Interfaz de Chat PWA**: Ventana de conversación fluida tipo WhatsApp. Integración con TTS/SST.
* **Prompts y Validaciones (Gemini)**: Instanciación rigurosa del agente con Gemini 2.5. Creación de la lógica "fase a fase" (Observación > Interpretación > Aplicación) donde el Agente retorna un flag para habilitar el avance del usuario. Detección de intenciones para alertas emocionales.

### FASE 4: Gamificación y Estructuras Sociales
* **Tracking de Hábitos**: Registro del progreso y cálculo de rachas diarias sincronizado con el reloj del servidor mediante Server Actions.
* **Invitaciones**: Lógica de sumarse a Grupos / Iglesias mediante Links profundos y validación de membresía.
* **Bitácora Pastoral**: Dashboard secundario para los administradores locales para revisar a sus miembros e incidencias de IA.

## Verification Plan
Para el MVP inicial (Fase 1 y 2), validaremos:
1. Probar el flujo un usuario nuevo registrándose y verificando que el UI lo deje atrapado en la pantalla de "En Revisión".
2. Entrar como Super Admin, aprobar ese usuario específico en la DB.
3. El usuario "en revisión" actualiza su pantalla y ahora accede al Layout móvil de la App sin problemas.
