// Form Events
document.getElementById("username").addEventListener("blur", () => {
  const username = document.getElementById("username").value;
  const errorElement = document.getElementById("usernameError");

  if (username.length < 3) {
    errorElement.textContent = "Username must be at least 3 characters";
    document.getElementById("username").classList.add("is-danger");
  } else {
    errorElement.textContent = "";
    document.getElementById("username").classList.remove("is-danger");
  }
});

document.getElementById("demoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("formOutput").textContent = "Form submitted!";
});
