import jwt from 'jsonwebtoken';

import SEED from '../config/config';

// ==========================================================
//  Verificar TOKEN
// ==========================================================
export const verificaToken = function(req: any, res: any, next: any) {

    let token = req.query.token;
    jwt.verify(token, SEED, (err: any, decoded: any) => {
        if (err){
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

