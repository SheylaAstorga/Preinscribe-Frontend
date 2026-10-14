#  PreInscribe

Plataforma web de preinscripciones escolares para nivel inicial, primario y secundario.
Trabajo Final Integrador · Tecnicatura Universitaria en Programación · UTN FRT.

> 🚧 Proyecto en desarrollo.

## ¿De qué se trata?

Un portal donde cualquier escuela puede darse de alta y las familias pueden buscar escuelas, preinscribir a sus hijos y seguir el estado de cada solicitud. Las escuelas gestionan sus vacantes, revisan las solicitudes y sacan reportes.

## Roles

| Rol | Qué hace |
|---|---|
| **Familia** | Carga a sus hijos, preinscribe y sigue sus solicitudes |
| **Administrador de escuela** | Gestiona vacantes y resuelve las solicitudes de su escuela |
| **Administrador general** | Gestiona escuelas y usuarios |

## Estrategias SEO

Para mejorar la comprensión del sitio por parte de los motores de búsqueda y facilitar el acceso al contenido público, se incorporan las siguientes prácticas de optimización SEO.

1. **Metadatos HTML**

El archivo index.html contiene metadatos generales para describir la plataforma:

Title: identifica el sitio mediante un título relacionado con las preinscripciones escolares.

Meta description: resume el propósito de PreInscribe y el servicio que ofrece.

Meta robots: declara las directivas index y follow para permitir la indexación y el seguimiento de enlaces, siempre que los buscadores puedan acceder al sitio.


2. **Open Graph**

Se incorporan metadatos Open Graph para definir cómo se presenta el sitio al compartirlo en plataformas compatibles:

og:type

og:site_name

og:locale

og:title

og:description

La URL pública y la imagen de vista previa se configurarán cuando se disponga del dominio y los recursos definitivos.

3. **Optimización de recursos**

Se utilizan conexiones anticipadas (preconnect) a los dominios de Google Fonts para facilitar la carga de la tipografía utilizada por la interfaz.

También se contempla la optimización del tamaño y formato de las imágenes para reducir los tiempos de carga.

4. Estructura y navegación

Se busca organizar el contenido mediante etiquetas HTML semánticas, encabezados jerárquicos y enlaces internos que faciliten la navegación entre las secciones públicas.

5. Diseño responsive y rendimiento

La interfaz se desarrolla con React-Bootstrap para adaptarse a diferentes tamaños de pantalla. Se consideran buenas prácticas de rendimiento, accesibilidad y experiencia de usuario.

## Tecnologías

- **Frontend:** React, Vite, React Router, React-Bootstrap, Axios, SweetAlert2
- **Backend:** Node.js, NestJS
- **Base de datos:** PostgreSQL

## Cómo correrlo

**Requisitos:** Node.js 18+, PostgreSQL 14+ y Git.

```bash
# 1. Clonar
git clone https://github.com/SheylaAstorga/Preinscribe-Frontend.git
cd preinscribe
npm install
npm run dev
```




## Integrantes

- _Astorga Sheyla_
- _Boixados Facundo_

