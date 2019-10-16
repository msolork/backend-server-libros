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
const usuario_1 = __importDefault(require("../models/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
exports.usuarioController = {
    // ==================================================================================================
    // OBTENER USUARIOS
    // ==================================================================================================
    getUsers: (req, res) => {
        let desde = req.query.desde;
        usuario_1.default.find({}, 'email nombre img')
            .skip(desde)
            .limit(7)
            .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }
            usuario_1.default.count({}, (err, conteo) => {
                return res.status(200).json({
                    ok: true,
                    usuarios: usuarios,
                    total: conteo
                });
            });
        });
    },
    // ==================================================================================================
    // OBTENER USUARIO
    // ==================================================================================================
    getUser: (req, res) => {
        // @ts-ignore
        usuario_1.default.findById(req.usuarioId, 'nombre email img', (err, usuarioDB) => {
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
    },
    // ==================================================================================================
    // CREAR USUARIO
    // ==================================================================================================
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let usuario = new usuario_1.default({
            nombre: req.body.nombre,
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
    }),
    // ==================================================================================================
    // ACTUALIZAR USUARIO
    // ==================================================================================================
    update: (req, res) => {
        let id = req.params.id;
        let body = req.body;
        usuario_1.default.findByIdAndUpdate({ _id: id }, { nombre: body.nombre, email: body.email, role: body.role }, (err, usuarioActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Fallo al actualizar usuario'
                });
            }
            // @ts-ignore
            usuarioActualizado.password = ':D';
            return res.status(200).json({
                ok: true,
                usuario: usuarioActualizado,
            });
        });
    },
    // ==================================================================================================
    // BORRAR USUARIO POR ID
    // ==================================================================================================
    delete: (req, res) => {
        let id = req.params.id;
        usuario_1.default.findByIdAndRemove({ _id: id }, (err, usuarioEliminado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar usuario',
                    errors: err
                });
            }
            if (!usuarioEliminado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario no existe con ese id'
                });
            }
            return res.status(200).json({
                ok: true,
                usuario: usuarioEliminado
            });
        });
    }
};
//# sourceMappingURL=usuario.controller.js.map