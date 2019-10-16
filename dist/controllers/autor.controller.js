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
const autor_1 = __importDefault(require("../models/autor"));
exports.autorController = {
    // ==================================================================================================
    // OBTENER AUTORES
    // ==================================================================================================
    getAutores: (req, res) => {
        let desde = req.query.desde;
        autor_1.default.find({}, ' nombre img')
            .skip(desde)
            .limit(7)
            .exec((err, autores) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando autores',
                    errors: err
                });
            }
            autor_1.default.count({}, (err, conteo) => {
                return res.status(200).json({
                    ok: true,
                    autores: autores,
                    total: conteo
                });
            });
        });
    },
    // ==================================================================================================
    // OBTENER AUTOR
    // ==================================================================================================
    getAutor: (req, res) => {
        let id = req.params.id;
        // @ts-ignore
        autor_1.default.findById(id, 'nombre img', (err, autorDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Autor no encontrado'
                });
            }
            return res.status(200).json({
                ok: true,
                mensaje: 'Correcto',
                autor: autorDB
            });
        });
    },
    // ==================================================================================================
    // CREAR AUTOR
    // ==================================================================================================
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let autor = new autor_1.default({
            nombre: req.body.nombre,
            // @ts-ignore
            usuario: req.usuario._id
        });
        autor.save((err, autorDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Fallo al crear autor',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                autor: autorDB
            });
        });
    }),
    // ==================================================================================================
    // ACTUALIZAR AUTOR
    // ==================================================================================================
    update: (req, res) => {
        let id = req.params.id;
        let body = req.body;
        autor_1.default.findByIdAndUpdate({ _id: id }, { nombre: body.nombre }, (err, autorActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Fallo al actualizar autor'
                });
            }
            return res.status(200).json({
                ok: true,
                autor: autorActualizado
            });
        });
    },
    // ==================================================================================================
    // BORRAR AUTOR POR ID
    // ==================================================================================================
    delete: (req, res) => {
        let id = req.params.id;
        autor_1.default.findByIdAndRemove({ _id: id }, (err, autorEliminado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar autor',
                    errors: err
                });
            }
            if (!autorEliminado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El autor no existe con ese id'
                });
            }
            return res.status(200).json({
                ok: true,
                autor: autorEliminado
            });
        });
    }
};
//# sourceMappingURL=autor.controller.js.map