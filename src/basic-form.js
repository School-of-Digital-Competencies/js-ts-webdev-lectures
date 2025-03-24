document.getElementById("basicForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const result = {};

  // Обработка обычных полей
  formData.forEach((value, key) => {
    if (key === "interests") {
      // Для чекбоксов собираем все выбранные значения в массив
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(value);
    } else {
      result[key] = value;
    }
  });

  // Если чекбоксы не выбраны, добавляем пустой массив
  if (!result.interests) {
    result.interests = [];
  }

  document.getElementById("basicFormResult").innerHTML = `
        <div class="notification is-success">
            <pre>${JSON.stringify(result, null, 2)}</pre>
        </div>
    `;
});
