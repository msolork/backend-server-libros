import {Request, Response} from "express";
import Autor from "../models/autor";
import jwt from "jsonwebtoken";
import SEED from "../config/config";


export const autorController = {

    // ==================================================================================================
    // OBTENER AUTORES
    // ==================================================================================================

    getAutores: (req: Request, res: Response) => {

        let desde = req.query.desde;


        Autor.find({}, ' nombre img')
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

                Autor.count({}, (err, conteo) => {
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

    getAutor: (req: Request, res: Response) => {

        let id = req.params.id;
        // @ts-ignore
        Autor.findById(id, 'nombre img',(err, autorDB) => {
            if(err) {
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

    create:  async (req: Request, res: Response) => {

        let autor = new Autor({
            nombre: req.body.nombre,
             // @ts-ignore
            usuario: req.usuario._id
        });


        autor.save((err, autorDB) => {
            if (err){
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
    },


    // ==================================================================================================
    // ACTUALIZAR AUTOR
    // ==================================================================================================

    update: (req: Request, res: Response) => {
        let id = req.params.id;
        let body = req.body;
        Autor.findByIdAndUpdate({_id: id},
            { nombre: body.nombre },
            (err, autorActualizado) => {


                if(err) {
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

    delete: (req: Request, res: Response) => {
        let id = req.params.id;
        Autor.findByIdAndRemove({_id: id}, (err, autorEliminado) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar autor',
                    errors: err
                });
            }

            if(!autorEliminado){
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
