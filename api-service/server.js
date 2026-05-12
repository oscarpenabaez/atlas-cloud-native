// api-service/server.js

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'atlas-db',
  database: 'atlasdb',
  password: 'postgres',
  port: 5432,
});

// RUTA USUARIOS
app.get('/usuarios', async (req, res) => {

  try {

    const resultado = await pool.query(
      'SELECT * FROM usuarios ORDER BY id ASC'
    );

    res.json(resultado.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error obteniendo usuarios'
    });

  }

});

// RUTA CLIMA DINÁMICA
app.get('/clima', async (req, res) => {

  try {

    const ciudad = req.query.ciudad || 'Bogota';

    const respuesta = await fetch(
      `https://wttr.in/${ciudad}?format=j1`
    );

    const data = await respuesta.json();

    res.json({
      ciudad: ciudad,
      temperatura: data.current_condition[0].temp_C,
      viento: data.current_condition[0].windspeedKmph
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error consultando clima'
    });

  }

});

const PORT = 3000;

app.listen(PORT, () => {

  console.log(
    `API funcionando en puerto ${PORT}`
  );

});