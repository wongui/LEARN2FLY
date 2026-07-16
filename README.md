# Learn 2 Fly 🎮

Juego educativo para niños: vuela por 3 mundos (🐟 Biología, 🤖 Espacio, 🦋 Arte),
junta estrellas y responde preguntas para pasar de nivel. En español e inglés.

Es un solo archivo (`index.html`) — no necesita servidor ni compilación.
(Carga Three.js desde internet, así que el dispositivo necesita conexión al abrirlo.)

## Contenido de esta carpeta
- `index.html` — el juego.
- `og-image.png` — imagen para compartir (WhatsApp / redes).
- `favicon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` — íconos.
- `manifest.json` — para "Agregar a inicio" (PWA).
- `google-apps-script.gs` — el código del Sheet (ver más abajo). No se sube a la web.

---

## 1) Publicar en GitHub Pages
1. Crea un repositorio (por ejemplo `learn2fly`) y sube todos los archivos de esta carpeta.
2. En el repo: **Settings → Pages → Branch: main → /(root) → Save**.
3. En 1–2 minutos queda en `https://TUUSUARIO.github.io/learn2fly/`.
4. **Importante para la miniatura de WhatsApp:** abre `index.html` y reemplaza las
   **3** apariciones de `USUARIO` por tu usuario real de GitHub (en las etiquetas
   `og:url`, `og:image` y `twitter:image`). Sin esto, WhatsApp no carga la imagen.

---

## 2) Conectar el Google Sheet (estrellas acumuladas + verificar nombres)

Esto sirve para dos cosas:
- **Acumular estrellas por nombre** entre dispositivos (rating global).
- **Verificar si un nombre ya existe** cuando alguien presiona "Jugar"
  (muestra "disponible" o "ese nombre ya existe").

> Sin este paso el juego funciona igual: las estrellas se acumulan localmente en
> cada dispositivo, pero no hay rating global ni verificación de nombres.

### Pasos (una sola vez)
1. Crea una **Google Sheet** nueva (en blanco).
2. Menú **Extensiones → Apps Script**.
3. Borra el código que aparece y **pega todo el contenido de `google-apps-script.gs`**. Guarda.
4. Arriba a la derecha: **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**.
   - **Ejecutar como:** Yo.
   - **Quién tiene acceso:** **Cualquiera**  ← importante, si no, no funciona.
   - Implementar, autoriza los permisos, y **copia la URL** (termina en `/exec`).
5. Abre `index.html`, busca esta línea (cerca del inicio del `<script>`):
   ```js
   const SHEET_URL='';
   ```
   y pega tu URL entre las comillas:
   ```js
   const SHEET_URL='https://script.google.com/macros/s/AKfyc.../exec';
   ```
6. Sube el `index.html` actualizado. ¡Listo!

### Cómo se comporta la verificación de nombres
- Nombre **libre** → entras directo.
- Nombre **ocupado** en el Sheet → aviso "Ese nombre ya existe, prueba otro" (no entra).
- Nombre que **ya usaste en ESE dispositivo** → te reconoce y entra directo
  (bienvenido de vuelta; tus estrellas se siguen sumando).
- Campo vacío → "Escribe un nombre primero".

### Qué guarda el Sheet
Una hoja llamada **Scores** con: `Nombre | Estrellas | Última vez`.
Cada partida **suma** las estrellas ganadas a la fila de ese nombre.
Para ver el ranking, ordena la columna *Estrellas* de mayor a menor
(o abre la URL `/exec` en el navegador para ver el top 20 en JSON).

### Nota técnica
El juego **escribe** al Sheet sin problema. La **lectura** para verificar nombres
usa JSONP (por eso el paso de "Quién tiene acceso: Cualquiera" es obligatorio).
Si algún día quieres mostrar el ranking dentro del juego, se puede agregar con el
mismo script (`doGet` ya devuelve el top 20).
