# Plan de Implementación General: Devo21 (MVP)

Este es el plan macro para construir Devo21 de acuerdo con el documento de especificaciones general. Organizaremos el progreso por los pilares fundamentales del software.

## User Review Required
> [!IMPORTANT]
> - **Autenticación y Registro:** El acceso de todo nuevo usuario (sin importar si luego será admin de iglesia, de grupo o miembro base) queda en estado "Pendiente" esperando la aprobación manual del `Super Admin`. ¿Deseamos que desarrollar este Dashboard de Aprobación sea nuestra primera prioridad (Hito 1)?
> - **Modelado de Datos:** Estructuraremos la base de datos de Firestore en colecciones raíz: `users` (todos los usuarios, donde cada uno tiene un campo `role`), `churches` (iglesias registradas), `groups` (grupos pequeños), y `studies` (los JSONs o contenidos de los devocionales a estudiar).

## Proposed Changes

### FASE 1: Core de Autenticación, Roles y Base de Datos (COMPLETADA ✅)
* **Auth & DB**: Implementado registro y perfiles en Firestore.
* **Estados de Usuario**: Manejo de `PENDING`, `ACTIVE`, `INACTIVE` operativo.
* **Routing Protegido**: Ruteo inteligente basado en roles y estado desde `/`.

### FASE 2: Interfaces Base (El "Cascarón") (COMPLETADA ✅)
* **Super Admin Dashboard (PC)**: Dashboard en `/admin` con gestión de aprobación y `StudyUploader.tsx`.
* **App Mobile-First**: Layout centralizado, `BottomTabs.tsx` y página de perfil funcional.
* **Branding**: Estética premium aplicada a Login, Perfil y Dashboard.

### FASE 3: Motor de Estudios e IA (Agente Socrático) (PRÓXIMA ⏳)
* **Gestor de Estudios**: Lógica para asignar y abrir el archivo JSON correspondiente al día.
* **Interfaz de Chat PWA**: Ventana de conversación fluida tipo WhatsApp. Integración con TTS/SST.
* **Prompts y Validaciones (Gemini)**: Implementación del Agente Socrático con fases de estudio.

### FASE 4: Gamificación y Estructuras Sociales
* **Tracking de Hábitos**: Registro del progreso y cálculo de rachas diarias sincronizado con el reloj del servidor mediante Server Actions.
* **Invitaciones**: Lógica de sumarse a Grupos / Iglesias mediante Links profundos y validación de membresía.
* **Bitácora Pastoral**: Dashboard secundario para los administradores locales para revisar a sus miembros e incidencias de IA.

## Verification Plan
Para el MVP inicial (Fase 1 y 2), validaremos:
1. Probar el flujo un usuario nuevo registrándose y verificando que el UI lo deje atrapado en la pantalla de "En Revisión".
2. Entrar como Super Admin, aprobar ese usuario específico en la DB.
3. El usuario "en revisión" actualiza su pantalla y ahora accede al Layout móvil de la App sin problemas.
