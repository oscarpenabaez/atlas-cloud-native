// frontend/src/App.jsx

import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [usuarios, setUsuarios] = useState([]);
  const [clima, setClima] = useState(null);
  const [ciudad, setCiudad] = useState("Bogota");
  const [cargando, setCargando] = useState(false);

  // CONSULTAR USUARIOS
  useEffect(() => {

    fetch("/usuarios")
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          setUsuarios([]);
        }

      })
      .catch((err) => {

        console.error(err);
        setUsuarios([]);

      });

  }, []);

  // CONSULTAR CLIMA
  const consultarClima = async () => {

    try {

      setCargando(true);

      const respuesta = await fetch(
        `/clima?ciudad=${ciudad}`
      );

      const data = await respuesta.json();

      setClima(data);

    } catch (error) {

      console.error(error);

    } finally {

      setCargando(false);

    }

  };

  // CLIMA INICIAL
  useEffect(() => {

    consultarClima();

  }, []);

  return (

    <div style={{
      padding: "30px",
      fontFamily: "Arial",
      backgroundColor: "#f4f7fb",
      minHeight: "100vh"
    }}>

      <h1 style={{
        color: "#1e293b",
        fontSize: "50px"
      }}>
        ATLAS Nativo de la nube
      </h1>

      <p style={{
        fontSize: "20px",
        color: "#64748b"
      }}>
        Plataforma financiera desplegada con arquitectura de microservicios
      </p>

      <hr />

      <h2 style={{ marginTop: "40px" }}>
        Consultar clima
      </h2>

      <input
        type="text"
        placeholder="Escriba una ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
        style={{
          padding: "12px",
          width: "250px",
          marginRight: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={consultarClima}
        style={{
          padding: "12px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Consultar
      </button>

      {cargando && (
        <p style={{ marginTop: "20px" }}>
          Cargando clima...
        </p>
      )}

      {clima && (

        <div style={{
          marginTop: "30px",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          width: "300px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
        }}>

          <h2>{clima.ciudad}</h2>

          <h1 style={{
            color: "#2563eb",
            fontSize: "55px"
          }}>
            {clima.temperatura}°C
          </h1>

          <p>
            💨 Viento: {clima.viento} km/h
          </p>

        </div>

      )}

      <hr style={{ marginTop: "50px" }} />

      <h2>Usuarios registrados</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: "20px",
          backgroundColor: "white",
          borderCollapse: "collapse",
          width: "100%"
        }}
      >

        <thead>

          <tr>

            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>

          </tr>

        </thead>

        <tbody>

          {usuarios.map((usuario) => (

            <tr key={usuario.id}>

              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default App;