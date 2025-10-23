/**
 * Form Validation - Just Dev It
 * Sistema de validación de formularios con feedback visual
 */

import { $, $$, isValidEmail, isValidPhone, sanitizeHTML } from '../core/utils.js';

class FormValidator {
    constructor(formId) {
        this.form = typeof formId === 'string' ? $(formId) : formId;
        if (!this.form) return;
        
        this.fields = {};
        this.errors = {};
        
        this.init();
    }
    
    init() {
        this.setupFields();
        this.attachEvents();
    }
    
    /**
     * Configura los campos del formulario
     */
    setupFields() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            const name = input.getAttribute('name');
            if (name) {
                this.fields[name] = {
                    element: input,
                    rules: this.getValidationRules(input),
                    group: input.closest('.form-group')
                };
            }
        });
    }
    
    /**
     * Obtiene las reglas de validación de un input
     */
    getValidationRules(input) {
        const rules = {
            required: input.hasAttribute('required'),
            type: input.getAttribute('type'),
            minLength: input.getAttribute('minlength'),
            maxLength: input.getAttribute('maxlength'),
            pattern: input.getAttribute('pattern'),
            min: input.getAttribute('min'),
            max: input.getAttribute('max')
        };
        
        // Reglas personalizadas desde data attributes
        if (input.dataset.validate) {
            rules.custom = input.dataset.validate;
        }
        
        return rules;
    }
    
    /**
     * Adjunta eventos a los campos
     */
    attachEvents() {
        // Validar en blur
        Object.values(this.fields).forEach(field => {
            field.element.addEventListener('blur', () => {
                this.validateField(field.element.getAttribute('name'));
            });
            
            // Limpiar error en input
            field.element.addEventListener('input', () => {
                this.clearFieldError(field.element.getAttribute('name'));
            });
        });
        
        // Validar en submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(e);
        });
    }
    
    /**
     * Valida un campo específico
     */
    validateField(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return true;
        
        const value = field.element.value.trim();
        const rules = field.rules;
        
        // Required
        if (rules.required && !value) {
            this.setFieldError(fieldName, 'Este campo es requerido');
            return false;
        }
        
        // Si está vacío y no es requerido, es válido
        if (!value && !rules.required) {
            this.clearFieldError(fieldName);
            return true;
        }
        
        // Email
        if (rules.type === 'email' && !isValidEmail(value)) {
            this.setFieldError(fieldName, 'Ingrese un email válido');
            return false;
        }
        
        // Phone
        if (rules.type === 'tel' && !isValidPhone(value)) {
            this.setFieldError(fieldName, 'Ingrese un teléfono válido (ej: +56912345678)');
            return false;
        }
        
        // Min length
        if (rules.minLength && value.length < parseInt(rules.minLength)) {
            this.setFieldError(fieldName, `Mínimo ${rules.minLength} caracteres`);
            return false;
        }
        
        // Max length
        if (rules.maxLength && value.length > parseInt(rules.maxLength)) {
            this.setFieldError(fieldName, `Máximo ${rules.maxLength} caracteres`);
            return false;
        }
        
        // Pattern
        if (rules.pattern) {
            const regex = new RegExp(rules.pattern);
            if (!regex.test(value)) {
                this.setFieldError(fieldName, 'El formato no es válido');
                return false;
            }
        }
        
        // Number min/max
        if (rules.type === 'number') {
            const numValue = parseFloat(value);
            
            if (rules.min && numValue < parseFloat(rules.min)) {
                this.setFieldError(fieldName, `El valor mínimo es ${rules.min}`);
                return false;
            }
            
            if (rules.max && numValue > parseFloat(rules.max)) {
                this.setFieldError(fieldName, `El valor máximo es ${rules.max}`);
                return false;
            }
        }
        
        // Custom validation
        if (rules.custom) {
            const customValidator = this.customValidators[rules.custom];
            if (customValidator && !customValidator(value)) {
                this.setFieldError(fieldName, `Validación personalizada falló`);
                return false;
            }
        }
        
        this.setFieldSuccess(fieldName);
        return true;
    }
    
    /**
     * Valida todos los campos
     */
    validateAll() {
        let isValid = true;
        
        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    /**
     * Establece error en un campo
     */
    setFieldError(fieldName, message) {
        const field = this.fields[fieldName];
        if (!field) return;
        
        this.errors[fieldName] = message;
        
        // Actualizar UI
        field.group?.classList.remove('success');
        field.group?.classList.add('error');
        
        // Remover mensaje anterior
        const oldMessage = field.group?.querySelector('.form-message');
        if (oldMessage) oldMessage.remove();
        
        // Agregar nuevo mensaje
        const messageEl = document.createElement('div');
        messageEl.className = 'form-message form-message-error';
        messageEl.textContent = message;
        field.group?.appendChild(messageEl);
        
        // Accesibilidad
        field.element.setAttribute('aria-invalid', 'true');
        field.element.setAttribute('aria-describedby', `${fieldName}-error`);
        messageEl.id = `${fieldName}-error`;
    }
    
    /**
     * Establece éxito en un campo
     */
    setFieldSuccess(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;
        
        delete this.errors[fieldName];
        
        // Actualizar UI
        field.group?.classList.remove('error');
        field.group?.classList.add('success');
        
        // Remover mensaje
        const oldMessage = field.group?.querySelector('.form-message');
        if (oldMessage) oldMessage.remove();
        
        // Accesibilidad
        field.element.setAttribute('aria-invalid', 'false');
        field.element.removeAttribute('aria-describedby');
    }
    
    /**
     * Limpia el error de un campo
     */
    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;
        
        delete this.errors[fieldName];
        
        field.group?.classList.remove('error', 'success');
        
        const message = field.group?.querySelector('.form-message');
        if (message) message.remove();
        
        field.element.removeAttribute('aria-invalid');
        field.element.removeAttribute('aria-describedby');
    }
    
    /**
     * Obtiene los datos del formulario
     */
    getFormData() {
        const data = {};
        
        Object.entries(this.fields).forEach(([name, field]) => {
            data[name] = sanitizeHTML(field.element.value.trim());
        });
        
        return data;
    }
    
    /**
     * Resetea el formulario
     */
    reset() {
        this.form.reset();
        Object.keys(this.fields).forEach(fieldName => {
            this.clearFieldError(fieldName);
        });
        this.errors = {};
    }
    
    /**
     * Maneja el submit del formulario
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validar todos los campos
        if (!this.validateAll()) {
            // Focus en el primer campo con error
            const firstError = Object.keys(this.errors)[0];
            if (firstError) {
                this.fields[firstError].element.focus();
            }
            return;
        }
        
        // Mostrar estado de carga
        const submitBtn = this.form.querySelector('[type="submit"]');
        const originalText = submitBtn?.textContent;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }
        
        try {
            // Obtener datos
            const formData = this.getFormData();
            
            // Aquí iría la lógica de envío (Formspree, API, etc.)
            const response = await this.submitForm(formData);
            
            if (response.ok) {
                this.showSuccess('¡Formulario enviado exitosamente!');
                this.reset();
            } else {
                throw new Error('Error al enviar el formulario');
            }
            
        } catch (error) {
            this.showError('Hubo un error al enviar el formulario. Por favor, intente nuevamente.');
            console.error('Form submission error:', error);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    }
    
    /**
     * Envía el formulario (integración con backend)
     */
    async submitForm(data) {
        // Si el formulario tiene action, usar fetch
        const action = this.form.getAttribute('action');
        
        if (action) {
            return fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
        
        // Simulación para desarrollo
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ok: true });
            }, 1000);
        });
    }
    
    /**
     * Muestra mensaje de éxito
     */
    showSuccess(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.textContent = message;
        
        this.form.prepend(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
    
    /**
     * Muestra mensaje de error
     */
    showError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-error';
        alert.textContent = message;
        
        this.form.prepend(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
    
    /**
     * Validadores personalizados
     */
    customValidators = {
        rut: (value) => {
            // Validación de RUT chileno
            // Implementar según necesidad
            return true;
        },
        strongPassword: (value) => {
            // Mínimo 8 caracteres, una mayúscula, una minúscula, un número
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            return regex.test(value);
        }
    };
}

// Inicializar formularios
const initForms = () => {
    const forms = $$('form[data-validate]');
    const validators = [];
    
    forms.forEach(form => {
        validators.push(new FormValidator(form));
    });
    
    return validators;
};

export { FormValidator, initForms };
export default FormValidator;
