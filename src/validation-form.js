// Add event listener to the form for handling form submission
document.getElementById("validationForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data and extract password fields
  const formData = new FormData(e.target);
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const resultDiv = document.getElementById("validationResult");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  // Validate password requirements:
  // - Minimum length of 8 characters
  // - Must contain at least one number
  // - Must contain at least one letter
  // - Must match confirmation password
  const isValid =
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[a-zA-Z]/.test(password) &&
    password === confirmPassword;

  // Update UI based on validation result
  if (isValid) {
    // Remove error styling and show success message
    passwordInput.classList.remove("is-danger");
    confirmPasswordInput.classList.remove("is-danger");
    resultDiv.innerHTML = `
            <div class="notification is-success">
                Пароль соответствует требованиям!
            </div>
        `;
  } else {
    // Add error styling and show error message
    passwordInput.classList.add("is-danger");
    confirmPasswordInput.classList.add("is-danger");
    resultDiv.innerHTML = `
            <div class="notification is-danger">
                Пароль не соответствует требованиям!
            </div>
        `;
  }
});
