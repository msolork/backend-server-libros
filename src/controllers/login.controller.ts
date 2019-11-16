import { Response, Request } from "express";
import Usuario, {IUsuario} from '../models/usuario';
import jwt from 'jsonwebtoken';
import SEED from '../config/config';
import router from "../rutas/routes";


export const loginController = {

    login: (req: Request, res: Response) => {

        let body = req.body;
        Usuario.findOne({email: body.email}, (err, usuarioDB) => {
            if (err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Correo no registrado'
                });
            }

            if (!usuarioDB){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas'
                });
            }

            // @ts-ignore
            if (!usuarioDB.validatePassword(body.password)){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas'
                });
            }

            let token = jwt.sign({usuario: usuarioDB}, SEED, {expiresIn: 20000});
            usuarioDB.password = ':D';

            return res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token
            });

        });


    }



};
