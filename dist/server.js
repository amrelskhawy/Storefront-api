"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("./middlewares/error.middleware");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const address = "localhost:3000";
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
app.get('/', function (req, res) {
    res.json({ title: 'STOREFRONT BACKEND', instructions: 'nav to localhost:3000/api/users or /api/products or /api/orders , when you are Already Authenticate!!' });
});
// Handling Errors
app.use(error_middleware_1.errorMiddleWare);
app.listen(config_1.default.port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
