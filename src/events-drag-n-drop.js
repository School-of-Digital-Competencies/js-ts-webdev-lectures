// Drag and Drop
const dragItem = document.getElementById("dragItem");
const dropZone = document.getElementById("dropZone");

dragItem.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "Dragged Item");
  dragItem.classList.add("is-light");
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  dropZone.textContent = `Dropped: ${data}`;
  dropZone.classList.remove("dragover");
  dragItem.classList.remove("is-light");
});
