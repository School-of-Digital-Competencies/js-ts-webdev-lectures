import { RadioField } from './types';

export function createRadio(field: RadioField): HTMLElement {
    const options = field.options.map(option => `
        <label class="radio">
            <input 
                type="radio" 
                name="${field.name}" 
                value="${option.value}"
                ${field.required ? 'required' : ''}
            >
            ${option.text}
        </label>
    `).join('');

    const html = `
        <div class="field">
            <div class="control">
                ${options}
            </div>
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild as HTMLElement;
} 