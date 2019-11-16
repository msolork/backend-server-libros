import express, {Application} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

const app: Application = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

import authRoutes from "./rutas/routes";


// CONFIGURACIONES
app.set('port', 8000);


// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());


//  RUTAS
app.use( '/', authRoutes);



export default app;
