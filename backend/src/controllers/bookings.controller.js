const pool = require('../config/db');

const getBookings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        b.id,
        b.client_name,
        b.client_email,
        b.booking_date,
        b.booking_time,
        b.status,
        s.name AS service_name,
        s.price AS service_price,
        s.duration AS service_duration
      FROM bookings b
      INNER JOIN services s ON b.service_id = s.id
      ORDER BY b.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: 'Error al listar reservas',
      error: error.message,
    });
  }
};

const createBooking = async (req, res) => {
  try {
    const {
      client_name,
      client_email,
      service_id,
      booking_date,
      booking_time,
    } = req.body;

    if (!client_name || !client_email || !service_id || !booking_date || !booking_time) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios',
      });
    }

    const serviceExists = await pool.query(
      'SELECT id FROM services WHERE id = $1',
      [service_id]
    );

    if (serviceExists.rows.length === 0) {
      return res.status(404).json({
        message: 'El servicio seleccionado no existe',
      });
    }

    const result = await pool.query(
      `INSERT INTO bookings 
       (client_name, client_email, service_id, booking_date, booking_time, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        client_name,
        client_email,
        service_id,
        booking_date,
        booking_time,
        'pending',
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear reserva',
      error: error.message,
    });
  }
};

module.exports = {
  getBookings,
  createBooking,
};