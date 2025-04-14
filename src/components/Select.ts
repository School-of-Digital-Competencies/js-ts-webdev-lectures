import { SelectField } from './types';

export function createSelect(field: SelectField): HTMLElement {
    const options = field.options.map(option => 
        `<option>${option}</option>`
    ).join('');

    const html = `
        <div class="field">
            ${field.label ? `<label class="label">${field.label}</label>` : ''}
            <div class="control">
                <div class="select">
                    <select name="${field.name}" ${field.required ? 'required' : ''}>
                        ${field.placeholder ? 
                            `<option disabled selected>${field.placeholder}</option>` : 
                            ''}
                        ${options}
                    </select>
                </div>
            </div>
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild as HTMLElement;
} 