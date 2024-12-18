// Selectores de elementos del formulario
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

// Función principal para manejar el envío del formulario
async function handleSubmit(event) {
    event.preventDefault();
    
    try {
        // Obtener el botón y guardar su texto original
        const button = form.querySelector('button[type="submit"]');
        const originalButtonText = button.innerHTML;

        // Mostrar estado de carga
        button.innerHTML = 'Enviando...';
        button.disabled = true;

        // Enviar formulario a Formspree
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        // Manejar la respuesta
        if (response.ok) {
            // Limpiar formulario y mostrar mensaje de éxito
            form.reset();
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            formStatus.classList.remove('hidden');
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        // Mostrar mensaje de error
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
        formStatus.classList.remove('hidden');
    } finally {
        // Restaurar el botón a su estado original
        const button = form.querySelector('button[type="submit"]');
        button.innerHTML = 'Enviar Mensaje';
        button.disabled = false;

        // Ocultar los mensajes después de 5 segundos
        setTimeout(() => {
            formStatus.classList.add('hidden');
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
        }, 5000);
    }
}

// Agregar event listener cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});