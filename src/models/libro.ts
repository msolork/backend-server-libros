import {Schema, model, SchemaType} from "mongoose";


const Libro = new Schema({
    titulo: {
       type: String,
       required: [ true, 'El título es requerido']
    },
    year: {
        type: Number,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

export default model('Libro', Libro);
