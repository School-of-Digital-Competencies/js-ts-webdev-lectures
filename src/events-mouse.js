// Mouse Events
const mouseBox = document.getElementById("mouseBox");

mouseBox.addEventListener("mouseenter", () => {
  mouseBox.classList.add("has-background-primary-light");
  document.getElementById("mouseOutput").textContent = "Mouse entered";
});

mouseBox.addEventListener("mouseleave", () => {
  mouseBox.classList.remove("has-background-primary-light");
  document.getElementById("mouseOutput").textContent = "Mouse left";
});

mouseBox.addEventListener("mousedown", () => {
  mouseBox.textContent = "Mouse down";
  mouseBox.classList.add("has-background-primary");
});

mouseBox.addEventListener("mouseup", () => {
  mouseBox.textContent = "Hover over me!";
  mouseBox.classList.remove("has-background-primary");
});
