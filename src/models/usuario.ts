import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';


export interface IUsuario extends Document{
    nombre: string;
    email: string;
    img: string;
    password: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<string>;
}

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

const Usuario = new Schema({
    nombre: {
        type: String,
        required: true,
        min: 4
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    password: {
        type: String,
        required: true
    }
});

Usuario.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, 10);
};

Usuario.methods.validatePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUsuario>('Usuario', Usuario);
