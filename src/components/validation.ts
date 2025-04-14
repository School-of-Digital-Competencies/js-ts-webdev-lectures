import { z } from 'zod';
import { FormField } from './types';

// Функция для создания схемы валидации на основе конфигурации формы
export function createValidationSchema(fields: FormField[]) {
    const schema: Record<string, z.ZodTypeAny> = {};

    fields.forEach(field => {
        let fieldSchema: z.ZodString | z.ZodBoolean;

        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'number':
                fieldSchema = z.string();
                if (field.type === 'email') {
                    fieldSchema = fieldSchema.email('Некорректный email');
                }
                if (field.type === 'number') {
                    fieldSchema = z.string().regex(/^\d+$/, 'Должно быть числом');
                }
                break;
            case 'select':
                fieldSchema = z.string();
                break;
            case 'textarea':
                fieldSchema = z.string();
                break;
            case 'checkbox':
                fieldSchema = z.boolean();
                break;
            case 'radio':
                fieldSchema = z.string();
                break;
            default:
                fieldSchema = z.string();
        }

        if (field.required) {
            if (field.type === 'checkbox') {
                fieldSchema = (fieldSchema as z.ZodBoolean).refine((val: boolean): val is boolean => val === true, {
                    message: 'Обязательное поле'
                }) as unknown as z.ZodBoolean;
            } else {
                fieldSchema = (fieldSchema as z.ZodString).min(1, 'Обязательное поле');
            }
        }

        schema[field.name] = fieldSchema;
    });

    return z.object(schema);
}

// Тип для ошибок валидации
export type ValidationErrors = {
    [key: string]: string[];
};

// Функция для отображения ошибок
export function showValidationErrors(
    form: HTMLFormElement,
    errors: ValidationErrors
) {
    // Сначала скрываем все существующие ошибки
    form.querySelectorAll('.help.is-danger').forEach(el => el.remove());
    form.querySelectorAll('.is-danger').forEach(el => {
        el.classList.remove('is-danger');
    });

    // Показываем новые ошибки
    Object.entries(errors).forEach(([fieldName, messages]) => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            // Добавляем класс ошибки к полю
            field.classList.add('is-danger');
            
            // Добавляем сообщение об ошибке
            const help = document.createElement('p');
            help.className = 'help is-danger';
            help.textContent = messages.join(', ');
            
            // Находим родительский элемент control и добавляем сообщение
            const control = field.closest('.control');
            if (control) {
                control.appendChild(help);
            }
        }
    });
}

// Функция для очистки ошибок валидации
export function clearValidationErrors(form: HTMLFormElement) {
    // Удаляем все сообщения об ошибках
    form.querySelectorAll('.help.is-danger').forEach(el => el.remove());
    
    // Убираем класс ошибки со всех полей
    form.querySelectorAll('.is-danger').forEach(el => {
        el.classList.remove('is-danger');
    });
} 