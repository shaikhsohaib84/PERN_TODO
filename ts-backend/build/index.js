"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const models_1 = __importDefault(require("./models"));
const routes_1 = require("./src/routes");
const authRouter = require('./src/auth');
const app = (0, express_1.default)();
const router = express_1.default.Router();
// MIDDLEWARE
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json()); //For cors
app.use('/auth', authRouter);
const port = process.env.PORT || 5000;
models_1.default.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Express JS running');
        (0, routes_1.routes)(app);
    });
});
