# Learn 2 Fly 🐟✨

Juego para niños: vuela por 3 mundos (Arte, Espacio, Biología), junta estrellas y responde preguntas. En español e inglés.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | El juego completo |
| `og-image.png` | Imagen de preview al compartir el link (WhatsApp, etc.) |
| `favicon.svg` / `favicon.png` | Ícono de la pestaña |
| `apple-touch-icon.png` | Ícono al "Agregar a inicio" en iPhone |
| `icon-192.png` / `icon-512.png` + `manifest.json` | Instalación como app |

> El juego carga el motor 3D (three.js) desde internet, así que **necesita conexión** al abrirse. No hay que compilar nada: son archivos estáticos.

## Publicar en GitHub Pages (gratis)

1. Crea un repositorio nuevo en GitHub (por ejemplo `learn2fly`).
2. Sube **todos** estos archivos a la raíz del repo (arrastrar y soltar en la web de GitHub sirve).
3. Ve a **Settings → Pages**.
4. En *Branch* elige `main` y carpeta `/ (root)`. Guarda.
5. En 1–2 minutos tu juego estará en:
   `https://TU-USUARIO.github.io/learn2fly/`

## ⚠️ Importante para que el preview de WhatsApp salga con imagen

WhatsApp necesita la URL **completa** de la imagen. Abre `index.html` y reemplaza `USUARIO` (aparece 3 veces) por tu usuario real de GitHub — o pega tu dominio si usas otro:

```html
<meta property="og:url"   content="https://TU-USUARIO.github.io/learn2fly/"/>
<meta property="og:image" content="https://TU-USUARIO.github.io/learn2fly/og-image.png"/>
<meta name="twitter:image" content="https://TU-USUARIO.github.io/learn2fly/og-image.png"/>
```

Después de publicar, si compartes el link y no aparece la imagen (WhatsApp guarda en caché),
refréscalo pegando la URL en https://developers.facebook.com/tools/debug/ y dando "Scrape Again".

## Tip para iPhone

Para la mejor experiencia sin gestos del navegador, sugiere a los usuarios usar
**Compartir → Agregar a inicio**. Así abre en pantalla completa como una app.

## Cambiar el nombre

Está como "Learn 2 Fly". Para cambiarlo, reemplázalo en `index.html` (etiquetas `<title>` y las `og:`/`twitter:`) y en `manifest.json`.
