const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Crear el servidor de express
const app = express();

// CORS
app.use(cors());

// Directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

// Escuchar peticiones
const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});
server.on('error', err => console.log(`Server error: ${err}`));