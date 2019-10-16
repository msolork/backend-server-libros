import {Request, Response} from "express";
import Libro from "../models/libro";
import jwt from "jsonwebtoken";
import SEED from "../config/config";


export const libroController = {

    // ==================================================================================================
    // OBTENER LIBROS
    // ==================================================================================================

    getLibros: (req: Request, res: Response) => {

        let desde = req.query.desde;


        Libro.find({}, ' nombre img')
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

                Libro.count({}, (err, conteo) => {
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

    getLibro: (req: Request, res: Response) => {
        let id = req.params.id;


        // @ts-ignore
        Libro.findById(id, 'nombre img',(err, libroDB) => {
            if(err) {
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

    create:  async (req: Request, res: Response) => {

        let libro = new Libro({
            titulo: req.body.titulo,
            year: req.body.year,
            categoria: req.body.categoria,
            autor: req.body.autor,
            // @ts-ignore
            usuario: req.usuario._id,
        });


        libro.save((err, libroDB) => {
            if (err){
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
    },


    // ==================================================================================================
    // ACTUALIZAR LIBRO
    // ==================================================================================================

    update: (req: Request, res: Response) => {
        let id = req.params.id;
        let body = req.body;
        Libro.findByIdAndUpdate({_id: id},
            { nombre: body.nombre},
            (err, libroActualizado) => {


                if(err) {
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
                    // body

                });

            });

    },

    // ==================================================================================================
    // BORRAR LIBRO POR ID
    // ==================================================================================================

    delete: (req: Request, res: Response) => {
        let id = req.params.id;
        Libro.findByIdAndRemove({_id: id}, (err, libroEliminado) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar libro',
                    errors: err
                });
            }

            if(!libroEliminado){
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
