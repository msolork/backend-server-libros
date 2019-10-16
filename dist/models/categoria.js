"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Categoria = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, ' La categoria es requerida']
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});
exports.default = mongoose_1.model('Categoria', Categoria);
//# sourceMappingURL=categoria.js.map