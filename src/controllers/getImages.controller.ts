import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const getImagesController = {
  getImage: (req: Request, res: Response) => {
      let tipo = req.params.tipo;
      let img = req.params.img;


      let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

      if (fs.existsSync(pathImagen)){
          res.sendFile( pathImagen );
      }else{
          let pathNoImage = path.resolve(__dirname, '../assets/no-img.jpg');
          res.sendFile(pathNoImage);
      }

  }
};
