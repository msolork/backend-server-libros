"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.getImagesController = {
    getImage: (req, res) => {
        let tipo = req.params.tipo;
        let img = req.params.img;
        let pathImagen = path_1.default.resolve(__dirname, `../../uploads/${tipo}/${img}`);
        if (fs_1.default.existsSync(pathImagen)) {
            res.sendFile(pathImagen);
        }
        else {
            let pathNoImage = path_1.default.resolve(__dirname, '../assets/no-img.jpg');
            res.sendFile(pathNoImage);
        }
    }
};
//# sourceMappingURL=getImages.controller.js.map