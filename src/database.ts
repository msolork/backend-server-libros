import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log('La base de datos esta conectada'))
    .catch(err => console.error(err));
