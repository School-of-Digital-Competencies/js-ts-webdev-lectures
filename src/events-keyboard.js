// Keyboard Events
document.getElementById("keyInput").addEventListener("keydown", (e) => {
  document.getElementById(
    "keyOutput"
  ).textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
});
