"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoria_1 = __importDefault(require("../models/categoria"));
exports.categoriaController = {
    getCategorias: (req, res) => {
        let desde = req.query.desde;
        categoria_1.default.find({}, 'nombre')
            .skip(desde)
            .limit(7)
            .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando categorias',
                    errors: err
                });
            }
            categoria_1.default.count({}, (err, conteo) => {
                return res.status(200).json({
                    ok: true,
                    categorias: categorias,
                    total: conteo
                });
            });
        });
    },
    getCategoria: (req, res) => {
        let desde = req.query.desde;
        let id = req.params.id;
        categoria_1.default.findById({ id }, (err, categoria) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }
            return res.status(200).json({
                ok: true,
                categoria: categoria
            });
        });
    },
    createCategoria: (req, res) => {
        let categoria = new categoria_1.default({
            nombre: req.body.nombre,
            //@ts-ignore
            usuario: req.usuario._id
        });
        categoria.save((err, categoria) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al crear categoria',
                    errors: err
                });
            }
            return res.status(200).json({
                ok: true,
                categoria: categoria
            });
        });
    },
    updateCategoria: (req, res) => {
        let body = req.body;
        let id = req.params.id;
        categoria_1.default.findByIdAndUpdate({ _id: id }, { nombre: body.nombre }, (err, categoria) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar categoria',
                    errors: err
                });
            }
            return res.status(200).json({
                ok: true,
                categoria: categoria
            });
        });
    },
    deleteCategoria: (req, res) => {
        let id = req.params.id;
        categoria_1.default.findByIdAndRemove({ _id: id }, (err, categoriaEliminada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar categoria',
                    errors: err
                });
            }
            if (!categoriaEliminada) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La categoria no existe con ese id'
                });
            }
            return res.status(200).json({
                ok: true,
                categoria: categoriaEliminada
            });
        });
    }
};
//# sourceMappingURL=categoria.controller.js.map