// Get DOM elements for form manipulation and output
const dynamicForm = document.getElementById("dynamicForm");
const addTextInputBtn = document.getElementById("addTextInput");
const addCheckboxBtn = document.getElementById("addCheckbox");
const showDynamicValuesBtn = document.getElementById("showDynamicValues");
const dynamicOutputDiv = document.getElementById("dynamicOutput");

// Counter to keep track of dynamically added form elements
let inputCount = 0;

// Event listener for form submission
dynamicForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Create FormData object from the form
  const formData = new FormData(dynamicForm);
  const formValues = {};

  // Convert FormData to regular object for display
  for (let [key, value] of formData.entries()) {
    formValues[key] = value;
  }

  // Display the form values
  document.getElementById("dynamicValuesOutput").textContent = JSON.stringify(
    formValues,
    null,
    2
  );
  dynamicOutputDiv.classList.remove("is-hidden");

  // Here you can add code to send the form data to a server
  console.log("Form submitted with values:", formValues);
});

// Event listener for adding text input fields
addTextInputBtn.addEventListener("click", () => {
  inputCount++;
  // Create a new div container for the form field
  const fieldDiv = document.createElement("div");
  fieldDiv.className = "field";

  // Add HTML structure for text input with unique ID and name
  fieldDiv.innerHTML = `
                <label class="label">Text Input ${inputCount}</label>
                <div class="control">
                    <input class="input" type="text" id="dynamicText${inputCount}" 
                           name="textInput${inputCount}" placeholder="Enter something">
                </div>
            `;

  // Append the new field to the form
  dynamicForm.append(fieldDiv);
});

// Event listener for adding checkbox fields
addCheckboxBtn.addEventListener("click", () => {
  inputCount++;
  // Create a new div container for the checkbox field
  const fieldDiv = document.createElement("div");
  fieldDiv.className = "field";

  // Add HTML structure for checkbox with unique ID and name
  fieldDiv.innerHTML = `
                <label class="label">Checkbox ${inputCount}</label>
                <div class="control">
                    <label class="checkbox">
                        <input type="checkbox" id="dynamicCheckbox${inputCount}" 
                               name="checkbox${inputCount}" value="checkbox${inputCount}">
                        Check me
                    </label>
                </div>
            `;

  // Append the new checkbox to the form
  dynamicForm.appendChild(fieldDiv);
});

// Event listener for showing all form values
showDynamicValuesBtn.addEventListener("click", () => {
  // Get all input elements from the form
  const inputs = dynamicForm.querySelectorAll("input");
  const values = {};

  // Iterate through all inputs and collect their values
  inputs.forEach((input) => {
    if (input.type === "checkbox") {
      // For checkboxes, store the checked state
      values[input.id] = input.checked;
    } else {
      // For text inputs, store the input value
      values[input.id] = input.value;
    }
  });

  // Display the collected values in JSON format
  document.getElementById("dynamicValuesOutput").textContent = JSON.stringify(
    values,
    null,
    2
  );
  // Show the output div
  dynamicOutputDiv.classList.remove("is-hidden");
});
