const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clearBtn");
const colorPicker = document.getElementById("colorPicker");
const brushSizeInput = document.getElementById("brushSize");
const brushTypeSelect = document.getElementById("brushType");
const saveBtn = document.getElementById("saveBtn");

// Set canvas size based on screen size
function setCanvasSize() {
  canvas.width = Math.min(window.innerWidth * 0.8, 1000);
  canvas.height = Math.min(window.innerHeight * 0.6, 600);
}

setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// Variables to store the current state
let drawing = false;
let currentColor = "#000000";
let currentBrushSize = 5;
let currentBrushType = "pencil";

// Event listeners for tool interactions
colorPicker.addEventListener("input", (e) => (currentColor = e.target.value));
brushSizeInput.addEventListener(
  "input",
  (e) => (currentBrushSize = e.target.value)
);
brushTypeSelect.addEventListener(
  "change",
  (e) => (currentBrushType = e.target.value)
);
clearBtn.addEventListener("click", clearCanvas);
saveBtn.addEventListener("click", saveDrawing);

// Start and stop drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

// Function to start drawing
function startDrawing() {
  drawing = true;
  ctx.beginPath();
}

// Function to stop drawing
function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

// Function to handle drawing on canvas
function draw(event) {
  if (!drawing) return;

  ctx.lineWidth = currentBrushSize;
  ctx.lineCap = "round";

  switch (currentBrushType) {
    case "pencil":
      ctx.strokeStyle = currentColor;
      ctx.lineTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop
      );
      break;

    case "spray":
      ctx.strokeStyle = currentColor;
      for (let i = 0; i < 10; i++) {
        const offsetX = (Math.random() - 0.5) * currentBrushSize * 2;
        const offsetY = (Math.random() - 0.5) * currentBrushSize * 2;
        ctx.fillRect(
          event.clientX - canvas.offsetLeft + offsetX,
          event.clientY - canvas.offsetTop + offsetY,
          1,
          1
        );
      }
      break;

    case "eraser":
      ctx.strokeStyle = "#FFAA80"; // Eraser matches the background color
      ctx.lineTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop
      );
      break;
  }
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to save the drawing as an image
function saveDrawing() {
  const link = document.createElement("a");
  link.download = "myDrawing.png";
  link.href = canvas.toDataURL();
  link.click();
}
