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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const createTodo_1 = require("./views/todo_views/createTodo");
const deleteTodo_1 = require("./views/todo_views/deleteTodo");
const getAllTodo_1 = require("./views/todo_views/getAllTodo");
const getTodo_1 = require("./views/todo_views/getTodo");
const updateTodo_1 = require("./views/todo_views/updateTodo");
const routes = (app) => {
    // GET - get all todo data
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, getAllTodo_1.getAllTodo)(req, res);
    }));
    // GET - get the selected record from the todo table.
    app.get('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, getTodo_1.getTodo)(req, res);
    }));
    // POST - Save the todo data into todo table
    app.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, createTodo_1.createTodo)(req, res);
    }));
    // PUT - Update the selected todo.
    app.put('/update-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, updateTodo_1.updateTodo)(req, res);
    }));
    //DELETE - Delete the selected todo.
    app.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, deleteTodo_1.deleteTodo)(req, res);
    }));
};
exports.routes = routes;
