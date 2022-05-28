/**
 * PlatziBoard: Pizarra digital con RxJS
 * En esta clase aplicamos el operador takeUntil para que cuando el usuario deje de presionar el cursor
 * (cuando se emite un evento dentro de onMouseUp$), el cursor dejará de dibujar sobre la pizarra.
 * También definimos un botón de reinicio de la pizarra para borrar los dibujos realizados.
 */
import { fromEvent, merge } from "rxjs";
import { map, mergeAll, takeUntil } from "rxjs/operators";

const canvas = document.getElementById("reactive-canvas");
const restartButton = document.getElementById("restart-button");

const cursorPosition = { x: 0, y: 0 };

const updateCursorPosition = (event) => {
  cursorPosition.x = event.clientX - canvas.offsetLeft;
  cursorPosition.y = event.clientY - canvas.offsetTop;
};

const onMouseDown$ = fromEvent(canvas, "mousedown");
onMouseDown$.subscribe(updateCursorPosition);
const onMouseUp$ = fromEvent(canvas, "mouseup");
// ✅ Definimos que onMouseMove$ (como observable) se completará cuando se emita un evento en onMouseUp$
const onMouseMove$ = fromEvent(canvas, "mousemove").pipe(takeUntil(onMouseUp$));

const canvasContext = canvas.getContext("2d");
canvasContext.lineWidth = 8;
canvasContext.lineJoin = "round"; // ⬅️ Con lineJoin cambiamos el estilo de trazo de la pizarra
canvasContext.lineCap = "round"; // ⬅️
canvasContext.strokeStyle = "white";

// El método paintStroke nos permitirá dibujar una línea obteniendo las posiciones del cursor (cursorPosition).
// ✍️ A la vez, mientras el usuario/a mueve el cursor actualizamos esa posición (ver línea 37)
const paintStroke = (event) => {
  canvasContext.beginPath();
  canvasContext.moveTo(cursorPosition.x, cursorPosition.y);
  updateCursorPosition(event);
  canvasContext.lineTo(cursorPosition.x, cursorPosition.y);
  canvasContext.stroke();
  canvasContext.closePath();
};

const startPaint$ = onMouseDown$.pipe(
  map(() => onMouseMove$),
  mergeAll()
);

let startPaintSubscription = startPaint$.subscribe(paintStroke);

const onLoadWindow$ = fromEvent(window, "load");
const onRestartClick$ = fromEvent(restartButton, "click");

// 🔀 Aquí fusionamos los observables onLoadWindow$ y onRestartClick$
// Con esto podemos iniciar la pizarra cuando cargamos la página por primera vez o cuando damos un click
// en el botón de Reiniciar.
const restartWhiteboard$ = merge(onLoadWindow$, onRestartClick$);

restartWhiteboard$.subscribe(() => {
  startPaintSubscription.unsubscribe();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  startPaintSubscription = startPaint$.subscribe(paintStroke);
});
