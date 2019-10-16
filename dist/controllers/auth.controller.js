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
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let usuario = new user_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    usuario.password = yield usuario.encryptPassword(usuario.password);
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Fallo al crear usuario',
                error: err
            });
        }
        // Generar Token
        let token = jsonwebtoken_1.default.sign({ _id: usuarioDB._id }, config_1.default, { expiresIn: 20000 });
        res.status(200).json({
            usuario: usuarioDB,
            token: token
        });
    });
});
exports.login = (req, res) => {
    let body = req.body;
    user_1.default.findOne({ email: body.email }, (err, usuarioDB) => {
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
        let token = jsonwebtoken_1.default.sign({ _id: usuarioDB._id }, config_1.default, { expiresIn: 20000 });
        usuarioDB.password = ':D';
        return res.status(400).json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
};
exports.profile = (req, res) => {
    // @ts-ignore
    user_1.default.findById(req.usuarioId, 'username email', (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario no encontrado'
            });
        }
        return res.status(200).json({
            ok: true,
            mensaje: 'Correcto',
            usuario: usuarioDB
        });
    });
};
//# sourceMappingURL=auth.controller.js.map