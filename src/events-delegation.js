// Event Delegation
document.getElementById("itemList").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

let itemCount = 3;
document.getElementById("addItem").addEventListener("click", () => {
  itemCount++;
  const newItem = document.createElement("li");
  newItem.className = "list-item";
  newItem.innerHTML = `Item ${itemCount} <button class="delete is-small ml-2"></button>`;
  document.getElementById("itemList").appendChild(newItem);
});
