import { TextareaField } from './types';

export function createTextarea(field: TextareaField): HTMLElement {
    const html = `
        <div class="field">
            ${field.label ? `<label class="label">${field.label}</label>` : ''}
            <div class="control">
                <textarea 
                    class="textarea"
                    name="${field.name}"
                    ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}
                    ${field.rows ? `rows="${field.rows}"` : ''}
                    ${field.required ? 'required' : ''}
                ></textarea>
            </div>
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild as HTMLElement;
} 