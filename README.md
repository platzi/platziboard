<h1 align="center">🔡 PlatziBoard 🎲</h1>

<p align="center">
  Proyecto del Curso de Programación Reactiva con RxJS
</p>

👋 ¡Hola! Qué genial que ya estés viendo el proyecto que generaremos en este curso.
Este repositorio es una pizarra digital simple utilizando RxJS.

## Guía de instalación del proyecto

1. Instala las dependencias:

```console
npm i rxjs webpack webpack-dev-server
npm i -D webpack-cli
```

2. Genera un `webpack.config.js` dentro del proyecto:

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  mode: "development",
};
```

3. Genera las siguientes carpetas y archivos como se muestra en esta estructura:

```console
public/
    index.html
    style.css
src/
    index.js
webpack.config.js
```

4. Añade la fuente JavaScript al `index.html`:

```html
<script src="./bundle.js"></script>
```

Y los estilos `.css`:

```html
<link rel="stylesheet" href="./style.css" />
```

## Ramas disponibles del curso

| **Clase**                                | **Rama**                   | **Cambio realizado**                             |
| ---------------------------------------- | -------------------------- | ------------------------------------------------ |
| Aplicación de `map` en PlatziBoard       | `18-map-PlatziBoard`       | Implementamos map en Platziboard                 |
| Aplicación de `mergeAll` en PlatziBoard  | `22-mergeAll-PlatziBoard`  | Implementamos mergeAll en PlatziBoard            |
| Aplicación de `takeUntil` en PlatziBoard | `24-takeUntil-PlatziBoard` | Implementamos takeUntil en PlatziBoard           |
| Finalización de PlatziBoard              | `27--PlatziBoard`          | Realizamos los detalles finales para PlatziBoard |
