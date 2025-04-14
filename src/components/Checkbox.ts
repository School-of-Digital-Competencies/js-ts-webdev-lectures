import { CheckboxField } from './types';

export function createCheckbox(field: CheckboxField): HTMLElement {
    const link = field.link ? 
        ` <a href="${field.link.href}">${field.link.text}</a>` : 
        '';

    const html = `
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input 
                        type="checkbox" 
                        name="${field.name}"
                        ${field.required ? 'required' : ''}
                    >
                    ${field.text}${link}
                </label>
            </div>
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild as HTMLElement;
} 