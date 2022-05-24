/**
 * PlatziBoard: Pizarra digital con RxJS
 * En esta clase implementamos el operador map, que nos permite iterar sobre los valores enviados
 * por un observable (ver línea 14)
 */
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

const canvas = document.getElementById("reactive-canvas");

const cursorPosition = { x: 0, y: 0 };

const onMouseDown$ = fromEvent(canvas, "mousedown").pipe(
  map((event) => {
    cursorPosition.x = event.clientX - canvas.offsetLeft;
    cursorPosition.y = event.clientY - canvas.offsetTop;
    console.log(cursorPosition);
  })
);

const onMouseMove$ = fromEvent(canvas, "mousemove");
const onMouseUp$ = fromEvent(canvas, "mouseup");

onMouseDown$.subscribe();

const canvasContext = canvas.getContext("2d");
canvasContext.lineWidth = 8;
canvasContext.strokeStyle = "white";

canvasContext.beginPath();
canvasContext.moveTo(0, 0);
canvasContext.lineTo(200, 200);
canvasContext.stroke();
canvasContext.closePath();
