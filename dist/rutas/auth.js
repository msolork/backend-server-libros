"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const autenticacion_1 = require("../middlewares/autenticacion");
const router = express_1.Router();
router.post('/signup', auth_controller_1.signup);
router.post('/login', auth_controller_1.login);
router.get('/profile', autenticacion_1.verificaToken, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map