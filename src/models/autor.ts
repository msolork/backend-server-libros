import { Schema, model } from 'mongoose';

const Autor = new Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'autores' });

export default model('Autor', Autor);
