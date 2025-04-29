import {
  FormConfig,
  FormField,
  FormValues,
  InputField,
  SelectField,
  TextareaField,
  CheckboxField,
  RadioField,
} from "./components/types";
import { createInput } from "./components/Input";
import { createSelect } from "./components/Select";
import { createTextarea } from "./components/Textarea";
import { createCheckbox } from "./components/Checkbox";
import { createRadio } from "./components/Radio";
import {
  createValidationSchema,
  showValidationErrors,
  clearValidationErrors,
} from "./components/validation";

// Основная функция создания формы
export function createForm(config: FormConfig): HTMLElement {
  const form = document.createElement("form");
  form.noValidate = true; // Отключаем HTML5 валидацию

  // Создаем схему валидации
  const validationSchema = createValidationSchema(config.fields);

  // Собираем все поля формы
  config.fields.forEach((field) => {
    let fieldElement: HTMLElement;

    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
        fieldElement = createInput(field as InputField);
        break;
      case "select":
        fieldElement = createSelect(field as SelectField);
        break;
      case "textarea":
        fieldElement = createTextarea(field as TextareaField);
        break;
      case "checkbox":
        fieldElement = createCheckbox(field as CheckboxField);
        break;
      case "radio":
        fieldElement = createRadio(field as RadioField);
        break;
      default:
        throw new Error(`Неизвестный тип поля: ${(field as FormField).type}`);
    }

    form.append(fieldElement);
  });

  // Добавляем кнопки
  if (config.submitButton || config.cancelButton) {
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "field is-grouped";

    if (config.submitButton) {
      const submitControl = document.createElement("div");
      submitControl.className = "control";
      const submitButton = document.createElement("button");
      submitButton.type = config.submitButton.type || "submit";
      submitButton.className = `button is-${
        config.submitButton.color || "primary"
      }`;
      submitButton.textContent = config.submitButton.text;
      submitControl.append(submitButton);
      buttonsDiv.append(submitControl);
    }

    if (config.cancelButton) {
      const cancelControl = document.createElement("div");
      cancelControl.className = "control";
      const cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.className = `button is-${
        config.cancelButton.color || "light"
      }`;
      cancelButton.textContent = config.cancelButton.text;
      cancelControl.append(cancelButton);
      buttonsDiv.append(cancelControl);
    }

    form.append(buttonsDiv);
  }

  // Добавляем обработчик отправки формы
  if (config.onSubmit) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const values: FormValues = {};

      // Собираем значения из всех полей
      config.fields.forEach((field) => {
        if (field.type === "checkbox") {
          values[field.name] = formData.get(field.name) === "on";
        } else if (field.type === "radio") {
          const radioValue = formData.get(field.name);
          values[field.name] = radioValue ? radioValue.toString() : undefined;
        } else {
          const value = formData.get(field.name);
          values[field.name] = value ? value.toString() : undefined;
        }
      });

      // Валидируем значения
      const result = validationSchema.safeParse(values);

      if (!result.success) {
        // Преобразуем ошибки Zod в наш формат
        const errors: Record<string, string[]> = {};
        result.error.errors.forEach((error) => {
          const fieldName = error.path[0] as string;
          if (!errors[fieldName]) {
            errors[fieldName] = [];
          }
          errors[fieldName].push(error.message);
        });

        // Показываем ошибки
        showValidationErrors(form, errors);
        return;
      }

      // Очищаем ошибки, если валидация прошла успешно
      clearValidationErrors(form);

      // Если валидация прошла успешно, вызываем обработчик
      config.onSubmit!(values);
    });
  }

  return form;
}
