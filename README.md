# Wordle — práctica React

Proyecto realizado siguiendo la Unidad 2 del tutorial de Wordle y ampliado con las mejoras del apartado 5.

## Requisitos

- Node.js LTS instalado.
- Visual Studio Code (recomendado).

## Instalar y ejecutar

Abre una terminal en esta carpeta y ejecuta:

```bash
npm install
npm run dev
```

Abre en el navegador la dirección local que muestre Vite (normalmente `http://localhost:5173/`).

## Comprobar la versión final

```bash
npm run build
npm run preview
```

## Pruebas unitarias

Las pruebas usan Vitest. Para instalarlas y ejecutarlas:

```bash
npm install -D vitest
npx vitest run
```

## Archivos principales

- `src/App.jsx`: estado, tablero, reglas, teclado y flujo de partida.
- `src/components/Casilla.jsx`: componente de cada casilla.
- `src/juego.js`: funciones de la lógica del juego.
- `src/juego.test.js`: pruebas unitarias.
- `src/index.css`: estilos.
