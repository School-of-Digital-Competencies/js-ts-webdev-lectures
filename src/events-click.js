// Click Events
document.getElementById("clickMe").addEventListener("click", () => {
  document.getElementById("clickOutput").textContent = "Single clicked!";
});

document.getElementById("doubleClickMe").addEventListener("dblclick", () => {
  document.getElementById("clickOutput").textContent = "Double clicked!";
});
