// Basic info about addEventListener
// addEventListener('click', function () {
//     //
// });
// addEventListener('click', () => {
//     //
// });

// function handleClick() {
//     //
// }
// const handleArrowClick = () => {
//     //
// };

// addEventListener('click', handleClick);
// addEventListener('click', handleArrowClick);

// Example 1
// const button = document.getElementById("clickMe");

// button.addEventListener("click", () => {
//   console.log("ANother click");
// });

// button.addEventListener("click", function () {
//   console.log("Click");
// });
// End of example 1

// Click Events
document.getElementById("clickMe").addEventListener("click", () => {
  document.getElementById(
    "clickOutput"
  ).innerHTML = `<h1 class="title is-2">Single clicked!</h1>`;
});

document.getElementById("doubleClickMe").addEventListener("dblclick", () => {
  document.getElementById("clickOutput").textContent = "Double clicked!";
});
