"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Libro = new mongoose_1.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es requerido']
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    autor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Autor'
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});
exports.default = mongoose_1.model('Libro', Libro);
//# sourceMappingURL=libro.js.map