import {Request, Response} from "express";
import Usuario, {IUsuario} from "../models/usuario";
import jwt from "jsonwebtoken";
import SEED from "../config/config";


export const usuarioController = {

    // ==================================================================================================
    // OBTENER USUARIOS
    // ==================================================================================================

    getUsers: (req: Request, res: Response) => {

        let desde = req.query.desde;


        Usuario.find({}, 'email nombre img')
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

                Usuario.count({}, (err, conteo) => {
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

    getUser: (req: Request, res: Response) => {

        // @ts-ignore
        Usuario.findById(req.usuarioId, 'nombre email img',(err, usuarioDB) => {
            if(err) {
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

    create:  async (req: Request, res: Response) => {

        let usuario: IUsuario = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password,
        });

        usuario.password = await usuario.encryptPassword(usuario.password);

        usuario.save((err, usuarioDB) => {
            if (err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Fallo al crear usuario',
                    error: err
                });
            }

            // Generar Token
            let token = jwt.sign({_id: usuarioDB._id}, SEED, {expiresIn: 20000});


            res.status(200).json({
                usuario: usuarioDB,
                token: token
            });
        });
    },


    // ==================================================================================================
    // ACTUALIZAR USUARIO
    // ==================================================================================================

    update: (req: Request, res: Response) => {
        let id = req.params.id;
        let body = req.body;
        Usuario.findByIdAndUpdate({_id: id},
            { nombre: body.nombre, email: body.email, role: body.role },
            (err, usuarioActualizado) => {


                if(err) {
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
                    // body

                });

        });

    },

    // ==================================================================================================
    // BORRAR USUARIO POR ID
    // ==================================================================================================

    delete: (req: Request, res: Response) => {
        let id = req.params.id;
        Usuario.findByIdAndRemove({_id: id}, (err, usuarioEliminado) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar usuario',
                    errors: err
                });
            }

            if(!usuarioEliminado){
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
