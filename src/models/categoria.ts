import { Schema, model } from "mongoose";

const Categoria = new Schema({
   nombre: {
       type: String,
       required: [ true, ' La categoria es requerida']
   },
    usuario: {
       type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

export default model('Categoria', Categoria);
