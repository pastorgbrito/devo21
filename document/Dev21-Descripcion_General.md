# **Proyecto Dev21: Plataforma de Crecimiento Espiritual**

## **1\. Visión del Producto**

**Devo21** es una Progressive Web App (PWA) diseñada para fomentar la disciplina espiritual diaria mediante **estudios bíblicos programados** extraídos de una biblioteca oficial. La plataforma ofrece una curaduría de contenidos con temática y duración definida, integrando **gamificación estricta**, una **jerarquía organizacional eclesiástica** y un **mentor de IA experto en hermenéutica y pedagogía** especializado en el método inductivo.

## **2\. Pilares Tecnológicos y Desafíos**

* **IA Hermenéutica (Agente Socrático):** Entrenada para guiar al usuario a través del método inductivo, asegurando que el progreso sea personal y reflexivo, detectando patrones de crisis emocional.  
* **Sincronización Estricta de Tiempo:** El sistema depende de un reloj de servidor central para validar la puntualidad y las rachas.  
* **Mobile-First (PWA):** Optimización total para lectura móvil: modo oscuro, tipografía dinámica y accesibilidad mediante TTS.  
* **Biblioteca de Contenidos Centralizada:** Contenido provisto por la empresa mediante archivos JSON que contienen el estudio completo y sus metadatos.

## **3\. Arquitectura de Usuarios e Interfaces**

El sistema presenta una segmentación clara tanto en jerarquía como en la experiencia de visualización:

* **Jerarquía de Roles:** `Super Admin` (Empresa) \> `Admin de Iglesia` \> `Admin de Grupo` \> `Miembro`.  
* **Experiencia de Usuario Diferenciada (UI/UX):**  
  * **Interfaz Super Admin:** Panel de control responsivo de pantalla completa (PC) para gestión global y validación de accesos.  
  * **Interfaz de Operación:** Experiencia móvil exclusiva ("App-like") para todos los demás roles, incluso si se accede desde PC.

## **4\. Lógica de Registro y Tipos de Cuenta**

Al momento del registro, el usuario debe definir su perfil de uso:

### **A. Registro como Iglesia**

El usuario que registra una congregación asume el rol de **Administrador de Iglesia** con facultades de gestión de grupos, liderazgo y coadministración.

### **B. Registro Personal**

El usuario que se registra a nivel individual disfruta de la aplicación de forma autónoma, pudiendo unirse a grupos de iglesias mediante invitación o crear y gestionar sus propios grupos personales.

## **5\. Modelo de Acceso y Monetización**

El ingreso a la plataforma está regido por un sistema de validación centralizado:

* **Monetización:** Fase actual **gratuita** (Prueba). Fase futura: suscripción anual por usuario.  
* **Control de Acceso (Super Admin):** La empresa es la única entidad con facultad para autorizar el ingreso de nuevos usuarios al sistema, ya sea para controlar la carga en la fase de prueba o validar el pago en el futuro.  
* **Flujo de Registro e Invitación:**  
  * **Registro Voluntario:** El acceso queda en "Pendiente" hasta la aprobación manual del Super Admin.  
  * **Invitación a No Registrados:** Si una persona recibe un link de invitación y no tiene cuenta, el sistema le guiará al formulario de registro. Una vez completado, su cuenta entrará en estado "Pendiente" y **deberá esperar la aprobación del Super Admin** antes de poder usar la aplicación.  
  * **Pertenencia a Grupos:** Unirse a una Iglesia o Grupo específico es **estrictamente por invitación**. Un usuario aprobado puede aceptar invitaciones para sumarse a estructuras organizacionales.  
* **Validación de Pagos (Fase Futura):** Integración con pasarelas para aprobación automática inmediata tras el cobro exitoso.

## **6\. El "Motor" de Estudios e Inducción (Core Logic)**

Cada lección sigue obligatoriamente las tres fases del **Método Inductivo**:

1. **Observación:** Identificación de hechos en el texto.  
2. **Interpretación:** Significado, contexto y verdades universales.  
3. **Aplicación:** Compromisos concretos "SMART" de 24 horas.  
* **Entrega Secuencial:** La IA bloquea el paso hasta validar la comprensión de la fase actual.  
* **Reglas de Tiempo:** 1 devocional diario (Lunes-Viernes). Fines de semana para reposición.

## **7\. El Agente de IA (Mentor Inductivo)**

* **Experto Multidisciplinario:** Hermenéutica, pedagogía y andragogía.  
* **Método Socrático:** Guía mediante preguntas reflexivas; nunca entrega respuestas directas.  
* **Contexto Histórico/Cultural:** Aporta datos extra-bíblicos para enriquecer la interpretación.  
* **Análisis de Seguridad:** Monitoreo de bienestar emocional con alertas inmediatas a los líderes.

## **8\. Gamificación y Dashboard Pastoral**

* **Métricas:** Puntualidad (Destello), Constancia (Racha) y niveles de crecimiento.  
* **Bitácora Pastoral:** Panel para que los administradores gestionen alertas de riesgo emocional o inactividad detectadas por la IA.

**Nota para el equipo:** El flujo de autenticación debe interceptar a los usuarios cuyo estado sea "Pendiente" o "Inactivo", redirigiéndolos a una pantalla de espera informativa, incluso si han llegado a través de un enlace de invitación válido.
