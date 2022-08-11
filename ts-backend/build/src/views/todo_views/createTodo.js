"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = void 0;
const models_1 = __importDefault(require("../../../models"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId = 1, title, description } = req === null || req === void 0 ? void 0 : req.body;
        const query = yield models_1.default.Todo.create({
            UserId: userId,
            title: title,
            description: description
        });
        return res.status(200).json({
            'message': 'Todo created successfully',
            'data': query,
            'status': 200
        });
    }
    catch (error) {
        return res.status(500).json({
            'message': error === null || error === void 0 ? void 0 : error.message,
            'data': {},
            'status': 500
        });
    }
});
exports.createTodo = createTodo;
