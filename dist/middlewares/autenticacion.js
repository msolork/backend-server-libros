"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
// ==========================================================
//  Verificar TOKEN
// ==========================================================
exports.verificaToken = function (req, res, next) {
    let token = req.query.token;
    jsonwebtoken_1.default.verify(token, config_1.default, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
//# sourceMappingURL=autenticacion.js.map