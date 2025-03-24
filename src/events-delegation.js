// Event Delegation

// with delegation - good
let itemCount = 3;
document.getElementById("addItem").addEventListener("click", () => {
  itemCount++;
  const newItem = document.createElement("li");
  newItem.className = "list-item";
  newItem.innerHTML = `Item ${itemCount} <button class="delete is-small ml-2"></button>`;
  document.getElementById("itemList").appendChild(newItem);
});

const ul = document.getElementById("itemList");
ul.addEventListener("click", (event) => {
  console.log(event.target, event.target.tagName);

  if (event.target.tagName !== "BUTTON") {
    return;
  }

  event.target.parentNode.classList.toggle("has-text-warning-light");
});

// without delegation - bad
// function handleClick(event) {
//   event.target.parentNode.classList.toggle("has-text-warning-light");
// }

// let itemCount = 3;
// document.getElementById("addItem").addEventListener("click", () => {
//   itemCount++;
//   const newItem = document.createElement("li");
//   newItem.className = "list-item";
//   newItem.innerHTML = `Item ${itemCount} <button class="delete is-small ml-2"></button>`;
//   document.getElementById("itemList").appendChild(newItem);

//   newItem.addEventListener("click", handleClick);
// });

// const allButtons = document.querySelectorAll("li > button");
// allButtons.forEach((button) => {
//   button.addEventListener("click", handleClick);
// });
