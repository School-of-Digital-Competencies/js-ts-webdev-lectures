// Add event listener to the form with id "basicForm" to handle form submission
document.getElementById("basicForm").addEventListener("submit", (e) => {
  // Prevent default form submission behavior
  e.preventDefault();

  // Create FormData object from the form element to collect all form fields
  const formData = new FormData(e.target);
  const result = {};

  // Process all form fields
  formData.forEach((value, key) => {
    if (key === "interests") {
      // For checkboxes, collect all selected values into an array
      // Initialize the array if it doesn't exist
      if (!result[key]) {
        result[key] = [];
      }
      // Add the selected value to the array
      result[key].push(value);
    } else {
      // For regular form fields, store the value directly
      result[key] = value;
    }
  });

  // If no checkboxes were selected, initialize an empty array for interests
  if (!result.interests) {
    result.interests = [];
  }

  // Display the form data as formatted JSON in a success notification
  document.getElementById("basicFormResult").innerHTML = `
        <div class="notification is-success">
            <pre>${JSON.stringify(result, null, 2)}</pre>
        </div>
    `;
});
