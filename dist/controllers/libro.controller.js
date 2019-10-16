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
const libro_1 = __importDefault(require("../models/libro"));
exports.libroController = {
    // ==================================================================================================
    // OBTENER LIBROS
    // ==================================================================================================
    getLibros: (req, res) => {
        let desde = req.query.desde;
        libro_1.default.find({}, ' nombre img')
            .skip(desde)
            .limit(7)
            .exec((err, libros) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando libros',
                    errors: err
                });
            }
            libro_1.default.count({}, (err, conteo) => {
                return res.status(200).json({
                    ok: true,
                    libros: libros,
                    total: conteo
                });
            });
        });
    },
    // ==================================================================================================
    // OBTENER LIBRO
    // ==================================================================================================
    getLibro: (req, res) => {
        let id = req.params.id;
        // @ts-ignore
        libro_1.default.findById(id, 'nombre img', (err, libroDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Libro no encontrado'
                });
            }
            return res.status(200).json({
                ok: true,
                mensaje: 'Correcto',
                libro: libroDB
            });
        });
    },
    // ==================================================================================================
    // CREAR LIBRO
    // ==================================================================================================
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let libro = new libro_1.default({
            titulo: req.body.titulo,
            year: req.body.year,
            categoria: req.body.categoria,
            autor: req.body.autor,
            // @ts-ignore
            usuario: req.usuario._id,
        });
        libro.save((err, libroDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Fallo al crear libro',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                libro: libroDB
            });
        });
    }),
    // ==================================================================================================
    // ACTUALIZAR LIBRO
    // ==================================================================================================
    update: (req, res) => {
        let id = req.params.id;
        let body = req.body;
        libro_1.default.findByIdAndUpdate({ _id: id }, { nombre: body.nombre }, (err, libroActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Fallo al actualizar libro'
                });
            }
            // @ts-ignore
            libroActualizado.password = ':D';
            return res.status(200).json({
                ok: true,
                libro: libroActualizado,
            });
        });
    },
    // ==================================================================================================
    // BORRAR LIBRO POR ID
    // ==================================================================================================
    delete: (req, res) => {
        let id = req.params.id;
        libro_1.default.findByIdAndRemove({ _id: id }, (err, libroEliminado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar libro',
                    errors: err
                });
            }
            if (!libroEliminado) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El libro no existe con ese id'
                });
            }
            return res.status(200).json({
                ok: true,
                libro: libroEliminado
            });
        });
    }
};
//# sourceMappingURL=libro.controller.js.map