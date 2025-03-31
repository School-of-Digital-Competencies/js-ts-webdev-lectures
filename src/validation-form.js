document.getElementById("validationForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const resultDiv = document.getElementById("validationResult");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const isValid =
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[a-zA-Z]/.test(password) &&
    password === confirmPassword;

  // Управление классами для полей ввода
  if (isValid) {
    passwordInput.classList.remove("is-danger");
    confirmPasswordInput.classList.remove("is-danger");
    resultDiv.innerHTML = `
            <div class="notification is-success">
                Пароль соответствует требованиям!
            </div>
        `;
  } else {
    passwordInput.classList.add("is-danger");
    confirmPasswordInput.classList.add("is-danger");
    resultDiv.innerHTML = `
            <div class="notification is-danger">
                Пароль не соответствует требованиям!
            </div>
        `;
  }
});
