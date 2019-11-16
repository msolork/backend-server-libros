import { Router } from "express";

import { verificaToken } from '../middlewares/autenticacion';
import { loginController } from "../controllers/login.controller";
import {usuarioController} from "../controllers/usuario.controller";
import {categoriaController} from "../controllers/categoria.controller";
import {autorController} from "../controllers/autor.controller";
import {libroController} from "../controllers/libro.controller";
import {uploadController} from "../controllers/upload.controller";
import {getImagesController} from "../controllers/getImages.controller";

const router: Router = Router();

router.post('/login', loginController.login);

// CRUD USUARIOS
router.get('/usuario/:id', usuarioController.getUser );
router.get('/usuario', usuarioController.getUsers );
router.post('/usuario', usuarioController.create );
router.put('/usuario/:id', verificaToken, usuarioController.update );
router.delete('/usuario/:id', verificaToken, usuarioController.delete );


// CRUD CATEGORIAS
router.get('/categoria', categoriaController.getCategorias );
router.get('/categoria/:id', categoriaController.getCategoria );
router.post('/categoria', verificaToken, categoriaController.createCategoria );
router.put('/categoria/:id', verificaToken, categoriaController.updateCategoria );
router.delete('/categoria/:id', verificaToken, categoriaController.deleteCategoria );


// CRUD AUTORES
router.get('/autor', autorController.getAutores );
router.get('/autor/:id', autorController.getAutor );
router.post('/autor', verificaToken, autorController.create );
router.put('/autor/:id', verificaToken, autorController.update );
router.delete('/autor/:id', verificaToken, autorController.delete );


// CRUD LIBROS
router.get('/libro', libroController.getLibros );
router.get('/libro/:id', libroController.getLibro );
router.post('/libro', verificaToken, libroController.create );
router.put('/libro/:id', verificaToken, libroController.update );
router.delete('/libro/:id', verificaToken, libroController.delete );


// AGREGAR Y OBTENER IMAGEN 
router.put('/:tipo/:id', uploadController.tipoImg);
router.get('/:tipo/:img', getImagesController.getImage);


export default router;
