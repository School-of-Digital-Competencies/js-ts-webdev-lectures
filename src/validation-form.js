document.getElementById("validationForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const resultDiv = document.getElementById("validationResult");

  const isValid =
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[a-zA-Z]/.test(password) &&
    password === confirmPassword;

  if (isValid) {
    resultDiv.innerHTML = `
            <div class="notification is-success">
                Пароль соответствует требованиям!
            </div>
        `;
  } else {
    resultDiv.innerHTML = `
            <div class="notification is-danger">
                Пароль не соответствует требованиям!
            </div>
        `;
  }
});
