"use strict";
// import {Express, Request, Response} from 'express'
// const app = express()
// const router = express.Router()
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
// export const authRoute = (app: Express) => {
//     app.get('/auth/', (req: Request, res: Response) => {
//         console.log(' HIT HIT HIT ')
//         return res.json({
//             message: 'sign-in'
//         })
//     })
//     app.get('/signup', (req, res) => {
//         res.json({
//             message: 'sign-up'
//         })
//     })
// }
// export default authRoute
const express_1 = __importDefault(require("express"));
const signUp_1 = require("../views/user_views/signUp");
const authRouter = express_1.default.Router();
authRouter.get('/', (req, res) => {
    res.json({
        'message': 'sign-up'
    });
});
authRouter.get('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, signUp_1.signUp)(req, res);
}));
module.exports = authRouter;
