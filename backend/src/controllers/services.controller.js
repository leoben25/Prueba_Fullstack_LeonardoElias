const pool = require('../config/db');

const getServices = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: 'Error al listar servicios',
      error: error.message,
    });
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;

    if (!name || !price || !duration) {
      return res.status(400).json({
        message: 'Nombre, precio y duración son obligatorios',
      });
    }

    const result = await pool.query(
      `INSERT INTO services (name, description, price, duration)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, description || '', price, duration]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear servicio',
      error: error.message,
    });
  }
};

module.exports = {
  getServices,
  createService,
};