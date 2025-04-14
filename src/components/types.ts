// Типы для иконок
export interface Icon {
    position: 'left' | 'right';
    icon: string;
}

// Базовый интерфейс для всех полей
export interface BaseField {
    label?: string;
    name: string;
    required?: boolean;
    helpText?: string;
    state?: 'success' | 'danger' | 'warning';
    icons?: Icon[];
}

// Интерфейсы для конкретных типов полей
export interface InputField extends BaseField {
    type: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    value?: string;
}

export interface SelectField extends BaseField {
    type: 'select';
    options: string[];
    placeholder?: string;
}

export interface TextareaField extends BaseField {
    type: 'textarea';
    placeholder?: string;
    rows?: number;
}

export interface CheckboxField extends BaseField {
    type: 'checkbox';
    text: string;
    link?: {
        text: string;
        href: string;
    };
}

export interface RadioField extends BaseField {
    type: 'radio';
    options: { value: string; text: string }[];
}

// Тип для всех возможных полей
export type FormField = InputField | SelectField | TextareaField | CheckboxField | RadioField;

// Конфигурация формы
export interface FormConfig {
    fields: FormField[];
    submitButton?: {
        text: string;
        type?: 'submit' | 'button';
        color?: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
    };
    cancelButton?: {
        text: string;
        color?: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
    };
    onSubmit?: FormSubmitHandler;
}

// Интерфейс для значений формы
export interface FormValues {
    [key: string]: string | boolean | string[] | undefined;
}

// Тип для обработчика отправки формы
export type FormSubmitHandler = (values: FormValues) => void; 