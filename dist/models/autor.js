"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Autor = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'autores' });
exports.default = mongoose_1.model('Autor', Autor);
//# sourceMappingURL=autor.js.map