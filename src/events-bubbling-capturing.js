// Event Bubbling & Capturing Example
const grandparent = document.getElementById("grandparent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");
const phaseLog = document.getElementById("phaseLog");
const clearLogButton = document.getElementById("clearLog");

// Capturing phase (true)
grandparent.addEventListener(
  "click",
  (e) => {
    logEvent(`Grandparent (Capturing) - Target: ${e.target.id}`);
  },
  true
);

parent.addEventListener(
  "click",
  (e) => {
    logEvent(`Parent (Capturing) - Target: ${e.target.id}`);
  },
  true
);

// Bubbling phase (false/default)
grandparent.addEventListener("click", (e) => {
  logEvent(`Grandparent (Bubbling) - Target: ${e.target.id}`);
});

parent.addEventListener("click", (e) => {
  logEvent(`Parent (Bubbling) - Target: ${e.target.id}`);
});

child.addEventListener("click", (e) => {
  logEvent(`Child (Target) - Phase: ${getPhaseName(e.eventPhase)}`);
});

function logEvent(message) {
  phaseLog.textContent += `${message}\n`;
  phaseLog.scrollTop = phaseLog.scrollHeight;
}

function getPhaseName(phase) {
  switch (phase) {
    case 1:
      return "Capturing";
    case 2:
      return "At Target";
    case 3:
      return "Bubbling";
    default:
      return "Unknown";
  }
}

clearLogButton.addEventListener("click", () => {
  phaseLog.textContent = "";
});
