import {Request, Response} from "express";
import Categoria from "../models/categoria";
import jwt from "jsonwebtoken";
import SEED from "../config/config";

export const categoriaController = {
    getCategorias: (req: Request, res: Response) => {
        let desde = req.query.desde;

        Categoria.find({}, 'nombre')
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

                Categoria.count({}, (err: any, conteo: any) => {
                    return res.status(200).json({
                        ok: true,
                        categorias: categorias,
                        total: conteo
                    });
                });
            });
    },

    getCategoria: (req: Request, res: Response) => {
        let desde = req.query.desde;
        let id = req.params.id;

        Categoria.findById({id}, (err, categoria) => {
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

    createCategoria: (req: Request, res: Response) => {
        let categoria = new Categoria({
            nombre: req.body.nombre,
            //@ts-ignore
            usuario: req.usuario._id
        });

        categoria.save((err, categoria) => {

            if (err){
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

    updateCategoria: (req: Request, res: Response) => {
        let body  = req.body;
        let id = req.params.id;

        Categoria.findByIdAndUpdate({_id: id},
            {nombre: body.nombre},
            (err, categoria) => {
                if (err){
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


    deleteCategoria: (req: Request, res: Response) => {
        let id = req.params.id;

        Categoria.findByIdAndRemove({_id: id}, (err, categoriaEliminada) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar categoria',
                    errors: err
                });
            }

            if(!categoriaEliminada){
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
