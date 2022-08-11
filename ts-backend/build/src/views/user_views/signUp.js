"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const validUser_1 = require("../../auth/validUser");
const signUp = (req, res) => {
    try {
        const { email, password } = req === null || req === void 0 ? void 0 : req.body;
        const isValidUser = (0, validUser_1.validUser)(email, password);
        if (!isValidUser) {
            new Error('In-valid user');
        }
        return res.status(200).json({
            'message': 'valid user',
            'status': 200
        });
    }
    catch (error) {
        return res.status(500).json({
            'message': error === null || error === void 0 ? void 0 : error.message,
            'status': 500
        });
    }
};
exports.signUp = signUp;
