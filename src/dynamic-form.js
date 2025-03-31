const dynamicForm = document.getElementById("dynamicForm");
const addTextInputBtn = document.getElementById("addTextInput");
const addCheckboxBtn = document.getElementById("addCheckbox");
const showDynamicValuesBtn = document.getElementById("showDynamicValues");
const dynamicOutputDiv = document.getElementById("dynamicOutput");

let inputCount = 0;

addTextInputBtn.addEventListener("click", () => {
  inputCount++;
  const fieldDiv = document.createElement("div");
  fieldDiv.className = "field";

  fieldDiv.innerHTML = `
                <label class="label">Text Input ${inputCount}</label>
                <div class="control">
                    <input class="input" type="text" id="dynamicText${inputCount}" 
                           placeholder="Enter something">
                </div>
            `;

  dynamicForm.appendChild(fieldDiv);
});

addCheckboxBtn.addEventListener("click", () => {
  inputCount++;
  const fieldDiv = document.createElement("div");
  fieldDiv.className = "field";

  fieldDiv.innerHTML = `
                <label class="label">Checkbox ${inputCount}</label>
                <div class="control">
                    <label class="checkbox">
                        <input type="checkbox" id="dynamicCheckbox${inputCount}" value="checkbox${inputCount}">
                        Check me
                    </label>
                </div>
            `;

  dynamicForm.appendChild(fieldDiv);
});

showDynamicValuesBtn.addEventListener("click", () => {
  const inputs = dynamicForm.querySelectorAll("input");
  const values = {};

  inputs.forEach((input) => {
    if (input.type === "checkbox") {
      values[input.id] = input.checked;
    } else {
      values[input.id] = input.value;
    }
  });

  document.getElementById("dynamicValuesOutput").textContent = JSON.stringify(
    values,
    null,
    2
  );
  dynamicOutputDiv.classList.remove("is-hidden");
});
