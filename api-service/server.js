const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { Client } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   CONEXIÓN POSTGRESQL
========================= */

const client = new Client({
    host: "database",
    user: "atlas",
    password: "atlas123",
    database: "atlasdb",
    port: 5432,
});

client.connect()
    .then(() => {
        console.log("Conectado a PostgreSQL 🚀");
    })
    .catch((err) => {
        console.error("Error PostgreSQL:", err);
    });

/* =========================
   ENDPOINT PRINCIPAL
========================= */

app.get("/", async (req, res) => {

    try {

        const result = await client.query("SELECT NOW()");

        res.json({
            message: "API funcionando correctamente 🚀",
            database: "PostgreSQL conectado",
            time: result.rows[0]
        });

    } catch (error) {

        res.json({
            error: error.message
        });

    }

});

/* =========================
   USUARIOS
========================= */

app.get("/usuarios", async (req, res) => {

    try {

        const result = await client.query(
            "SELECT * FROM usuarios"
        );

        res.json(result.rows);

    } catch (error) {

        res.json({
            error: error.message
        });

    }

});

/* =========================
   CLIMA EN TIEMPO REAL
========================= */

app.get("/clima", async (req, res) => {

    try {

        const response = await axios.get(
            "https://api.open-meteo.com/v1/forecast?latitude=4.71&longitude=-74.07&current_weather=true"
        );

        const clima = response.data.current_weather;

        res.json({

            ciudad: "Bogotá",

            temperatura: clima.temperature,

            viento: clima.windspeed,

            clima: clima.weathercode,
            hora: clima.time

        });

    } catch (error) {

        res.json({
            error: error.message
        });

    }

});

/* =========================
   SERVIDOR
========================= */

app.listen(3000, () => {
    console.log("API ejecutándose en puerto 3000 🚀");
});