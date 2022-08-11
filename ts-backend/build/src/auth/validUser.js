"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validUser = void 0;
const validUser = (email, password) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    email = email.trim();
    password = email.trim();
    let isValidEmail = email.length && email.match(validRegex);
    let isValidPassword = password.length && password.length <= 8;
    return isValidEmail && isValidPassword;
};
exports.validUser = validUser;
