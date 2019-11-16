import { Request, Response } from "express";
import fs from 'fs';
import Autor from '../models/autor';
import Libro from '../models/libro';
import Usuario from '../models/usuario';



export const uploadController = {
  tipoImg: (req: Request, res: Response) => {
      let tipo = req.params.tipo;
      let id = req.params.id;


      let tiposPermitidos = ['usuarios', 'libros', 'autores'];
      if(tiposPermitidos.indexOf(tipo) < 0){
          return res.status(400).json({
              ok: false,
              mensaje: 'Colección no valida',
              err: { message: 'Tiene que ser una de estas colecciones ' + tiposPermitidos.join(', ')}
          });
      }

      if (!req.files){
          return res.status(400).json({
              ok: false,
              mensaje: 'No seleccino imagen',
              errors: {message: 'Debe seleccionar una imagen'}
          });
      }

      let archivo = req.files.imagen;
      // @ts-ignore
      let nombreCortado = archivo.name.split('.');
      let extension = nombreCortado[nombreCortado.length-1];




      let extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'];
      if (extensionesPermitidas.indexOf(extension) < 0){
          return res.status(400).json({
              ok: false,
              mensaje: 'Extension no valida',
              err: { message: 'Tiene que ser una de estas extensiones ' + extensionesPermitidas.join(', ')}
          });
      }

      // Nombre del archivo
      let nombre = `${id}-${new Date().getMilliseconds()}.${extension}`;

      // Mover el archivo a un path especifico
      let path = `./uploads/${tipo}/${nombre}`;


      // @ts-ignore
      archivo.mv( path, (err: any) => {
          if (err){
              return res.status(500).json({
                  ok: false,
                  mensaje: 'Error al mover el archivo',
                  errors: err
              });
          }

          subirPorTipo(tipo, id, nombre, res);
      });

  }
};


function subirPorTipo(tipo: string, id: string, nombreArchivo: string, res: Response){
    if (tipo === 'usuarios'){
        Usuario.findById(id, (err, usuarioDB) => {
           // Eliminar imagen antigua
           // @ts-ignore
            let pathViejo = `./uploads/usuarios/${usuarioDB.img}`;
            if (fs.existsSync(pathViejo)){
                fs.unlink(pathViejo, err => {

                });
            }

            // @ts-ignore
            usuarioDB.img = nombreArchivo;
            // @ts-ignore
            usuarioDB.save((err, usuarioImg) => {
                usuarioImg.password = ':D';
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioImg
                });
            });
        });
    }else if(tipo === 'libros'){
        Libro.findById(id, (err, libroDB) => {
            // Eliminar imagen antigua
            // @ts-ignore
            let pathViejo = `./uploads/libros/${libroDB.img}`;
            if (fs.existsSync(pathViejo)){
                fs.unlink(pathViejo, err => {

                });
            }

            // @ts-ignore
            libroDB.img = nombreArchivo;
            // @ts-ignore
            libroDB.save((err, libroImg) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de libro actualizada',
                    libro: libroImg
                });
            });
        });
    }else if(tipo === 'autores'){
        Autor.findById(id, (err, autorDB) => {
            // Eliminar imagen antigua
            // @ts-ignore
            let pathViejo = `./uploads/autors/${autorDB.img}`;
            if (fs.existsSync(pathViejo)){
                fs.unlink(pathViejo, err => {

                });
            }

            // @ts-ignore
            autorDB.img = nombreArchivo;
            // @ts-ignore
            autorDB.save((err, autorImg) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de autor actualizada',
                    autor: autorImg
                });
            });
        });
    }

}


