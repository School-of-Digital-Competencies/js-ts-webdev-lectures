import "bulma/css/bulma.min.css";
import { createForm } from "./form";
import { FormValues } from "./components/types";

const formConfig = {
    fields: [
        {
            type: "text" as const,
            name: "name",
            label: "Name",
            placeholder: "Text input",
            required: true
        },
        {
            type: "text" as const,
            name: "username",
            label: "Username",
            placeholder: "Text input",
            value: "bulma",
            state: "success" as const,
            icons: [
                { position: "left" as const, icon: "user" },
                { position: "right" as const, icon: "check" }
            ],
            helpText: "This username is available",
            required: true
        },
        {
            type: "email" as const,
            name: "email",
            label: "Email",
            placeholder: "Email input",
            value: "hello@",
            state: "danger" as const,
            icons: [
                { position: "left" as const, icon: "envelope" },
                { position: "right" as const, icon: "exclamation-triangle" }
            ],
            helpText: "This email is invalid",
            required: true
        },
        {
            type: "select" as const,
            name: "subject",
            label: "Subject",
            options: ["Select dropdown", "With options"],
            placeholder: "Select dropdown",
            required: true
        },
        {
            type: "textarea" as const,
            name: "message",
            label: "Message",
            placeholder: "Textarea",
            required: true
        },
        {
            type: "checkbox" as const,
            name: "terms",
            text: "I agree to the",
            link: {
                text: "terms and conditions",
                href: "#"
            },
            required: true
        },
        {
            type: "radio" as const,
            name: "question",
            options: [
                { value: "yes", text: "Yes" },
                { value: "no", text: "No" }
            ],
            required: true
        }
    ],
    submitButton: {
        text: "Submit",
        color: "link" as const
    },
    cancelButton: {
        text: "Cancel",
        color: "link" as const
    },
    onSubmit: (values: FormValues) => {
        console.log('Form submitted with values:', values);
        // Здесь можно добавить логику обработки данных формы
        // Например, отправка на сервер или валидация
    }
};

const form = createForm(formConfig);
document.body.appendChild(form);
