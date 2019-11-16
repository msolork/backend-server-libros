"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("../models/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
exports.loginController = {
    login: (req, res) => {
        let body = req.body;
        usuario_1.default.findOne({ email: body.email }, (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Correo no registrado'
                });
            }
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas'
                });
            }
            // @ts-ignore
            if (!usuarioDB.validatePassword(body.password)) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas'
                });
            }
            let token = jsonwebtoken_1.default.sign({ usuario: usuarioDB }, config_1.default, { expiresIn: 20000 });
            usuarioDB.password = ':D';
            return res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token
            });
        });
    }
};
//# sourceMappingURL=login.controller.js.map