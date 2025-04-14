import { InputField } from './types';

export function createInput(field: InputField): HTMLElement {
    const icons = field.icons?.map(icon => `
        <span class="icon is-small is-${icon.position}">
            <i class="fas fa-${icon.icon}"></i>
        </span>
    `).join('') || '';

    const html = `
        <div class="field">
            ${field.label ? `<label class="label">${field.label}</label>` : ''}
            <div class="control ${field.icons ? field.icons.map(i => `has-icons-${i.position}`).join(' ') : ''}">
                <input 
                    class="input ${field.state ? `is-${field.state}` : ''}"
                    type="${field.type}"
                    name="${field.name}"
                    ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}
                    ${field.value ? `value="${field.value}"` : ''}
                    ${field.required ? 'required' : ''}
                >
                ${icons}
            </div>
            ${field.helpText ? `<p class="help is-${field.state || 'info'}">${field.helpText}</p>` : ''}
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild as HTMLElement;
} 