import express, {Application} from 'express';
import morgan from 'morgan';

const app: Application = express();

import authRoutes from "./rutas/routes";

// CONFIGURACIONES
app.set('port', 3000);


// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());


//  RUTAS
app.use( '/', authRoutes);



export default app;
