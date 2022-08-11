export const validUser = (email: string, password: string) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    let isValidEmail = email.trim().length && validRegex.test(email)
    let isValidPassword = password.trim().length && password.trim().length <= 8 && password.length >= 6
    
    return isValidEmail && isValidPassword
}