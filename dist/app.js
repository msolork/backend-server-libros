"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
const routes_1 = __importDefault(require("./rutas/routes"));
// CONFIGURACIONES
app.set('port', 3000);
// MIDDLEWARES
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
//  RUTAS
app.use('/', routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map