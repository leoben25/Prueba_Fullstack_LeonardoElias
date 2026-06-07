const express = require('express');
const cors = require('cors');
require('dotenv').config();

const servicesRoutes = require('./routes/services.routes');
const bookingsRoutes = require('./routes/bookings.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Buki funcionando correctamente',
  });
});

app.use('/api/services', servicesRoutes);
app.use('/api/bookings', bookingsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});