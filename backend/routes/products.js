const express = require('express');
const pool = require('../database/connection');
const router = express.Router();

// Obtener todos los productos (con filtros opcionales)
router.get('/', async (req, res) => {
    const { descripcion = '', rubro = '' } = req.query;
    try {
        let query = `
            SELECT pro.Codigo, pro.Descripcion, pro.Precio, rub.Descripcion AS Rubro, pro.URLImagen
            FROM productos pro
            LEFT JOIN rubros rub ON rub.Codigo = pro.Rubro
            WHERE 1=1
        `;
        const params = [];

        if (descripcion) {
            query += ` AND pro.Descripcion LIKE ?`;
            params.push(`%${descripcion}%`);
        }

        if (rubro) {
            query += ` AND rub.Codigo = ?`;
            params.push(rubro);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Obtener todos los rubros
router.get('/rubros', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rubros');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener rubros:', error);
        res.status(500).json({ error: 'Error al obtener rubros' });
    }
});

module.exports = router;