export default function validate(userData) {
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPassword = new RegExp("[0-9]")
    const errors = {}

    if(!regexEmail.test(userData.email)) {
        errors.email = 'Debe ser un email válido'
    }
    if(!userData.email) {
        errors.email = 'Debe ingresar un email'
    }
    if(userData.email.length > 35) {
        errors.email = 'El email debe tener menos de 35 caracteres'
    }
    if(!regexPassword.test(userData.password)) {
        errors.password = 'El password debe tener al menos un número'
    }
    if(userData.password.length < 6 || userData.password.length > 10) {
        errors.password = 'La contraseña debe tener entre 6 y 10 caracteres'
    }
    return errors
}