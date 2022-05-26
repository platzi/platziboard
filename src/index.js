/**
 * PlatziBoard: Pizarra digital con RxJS
 * En esta clase implementamos el operador mergeAll() para activar el mecanismo de dibujo dentro
 * de la pizarra cuando el usuario está presionando el cursor (evento mousedown)
 */
import { fromEvent } from "rxjs";
import { map, mergeAll } from "rxjs/operators";

const canvas = document.getElementById("reactive-canvas");

const cursorPosition = { x: 0, y: 0 };

const updateCursorPosition = (event) => {
  cursorPosition.x = event.clientX - canvas.offsetLeft;
  cursorPosition.y = event.clientY - canvas.offsetTop;
};

const onMouseDown$ = fromEvent(canvas, "mousedown");
onMouseDown$.subscribe(updateCursorPosition);
const onMouseMove$ = fromEvent(canvas, "mousemove");
const onMouseUp$ = fromEvent(canvas, "mouseup");

onMouseDown$.subscribe();

const canvasContext = canvas.getContext("2d");
canvasContext.lineWidth = 8;
canvasContext.strokeStyle = "white";

// El método paintStroke nos permitirá dibujar una línea obteniendo las posiciones del cursor (cursorPosition).
// ✍️ A la vez, mientras el usuario/a mueve el cursor actualizamos esa posición (ver línea 34)
const paintStroke = (event) => {
  canvasContext.beginPath();
  canvasContext.moveTo(cursorPosition.x, cursorPosition.y);
  updateCursorPosition(event);
  canvasContext.lineTo(cursorPosition.x, cursorPosition.y);
  canvasContext.stroke();
  canvasContext.closePath();
};

// 🔀 A través de mergeAll() empezamos a enviar los eventos de onMouseMove$ mapeados en la línea 43,
// para luego enviarlos en un observable de salida al observador paintStroke (ver línea 47 y 31)
const startPaint$ = onMouseDown$.pipe(
  map(() => onMouseMove$),
  mergeAll()
);

startPaint$.subscribe(paintStroke);
