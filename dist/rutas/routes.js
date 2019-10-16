"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const login_controller_1 = require("../controllers/login.controller");
const usuario_controller_1 = require("../controllers/usuario.controller");
const categoria_controller_1 = require("../controllers/categoria.controller");
const autor_controller_1 = require("../controllers/autor.controller");
const libro_controller_1 = require("../controllers/libro.controller");
const router = express_1.Router();
router.post('/login', login_controller_1.loginController.login);
// CRUD USUARIOS
router.get('/usuario/:id', usuario_controller_1.usuarioController.getUser);
router.get('/usuario', usuario_controller_1.usuarioController.getUsers);
router.post('/usuario', autenticacion_1.verificaToken, usuario_controller_1.usuarioController.create);
router.put('/usuario/:id', autenticacion_1.verificaToken, usuario_controller_1.usuarioController.update);
router.delete('/usuario/:id', autenticacion_1.verificaToken, usuario_controller_1.usuarioController.delete);
// CRUD CATEGORIAS
router.get('/categoria', categoria_controller_1.categoriaController.getCategorias);
router.get('/categoria/:id', categoria_controller_1.categoriaController.getCategoria);
router.post('/categoria', autenticacion_1.verificaToken, categoria_controller_1.categoriaController.createCategoria);
router.put('/categoria/:id', autenticacion_1.verificaToken, categoria_controller_1.categoriaController.updateCategoria);
router.delete('/categoria/:id', autenticacion_1.verificaToken, categoria_controller_1.categoriaController.deleteCategoria);
// CRUD AUTORES
router.get('/autor', autor_controller_1.autorController.getAutores);
router.get('/autor/:id', autor_controller_1.autorController.getAutor);
router.post('/autor', autenticacion_1.verificaToken, autor_controller_1.autorController.create);
router.put('/autor/:id', autenticacion_1.verificaToken, autor_controller_1.autorController.update);
router.delete('/autor/:id', autenticacion_1.verificaToken, autor_controller_1.autorController.delete);
// CRUD LIBROS
router.get('/libro', libro_controller_1.libroController.getLibros);
router.get('/libro/:id', libro_controller_1.libroController.getLibro);
router.post('/libro', autenticacion_1.verificaToken, libro_controller_1.libroController.create);
router.put('/libro/:id', autenticacion_1.verificaToken, libro_controller_1.libroController.update);
router.delete('/libro/:id', autenticacion_1.verificaToken, libro_controller_1.libroController.delete);
exports.default = router;
//# sourceMappingURL=routes.js.map