const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const path = require('path'); // Para manejar rutas

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Usar las rutas de productos
app.use('/api/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
