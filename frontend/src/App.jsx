// frontend/src/App.jsx

import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [clima, setClima] = useState(null);

  // CONSULTAR CLIMA
  useEffect(() => {

    fetch("/clima")
      .then((res) => res.json())
      .then((data) => setClima(data))
      .catch((err) => console.error(err));

  }, []);

  // REGISTRAR CONSULTA PDF
  const registrarConsulta = async (reporte) => {

    try {

      await fetch("/registrar-consulta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reporte,
        }),
      });

    } catch (error) {

      console.error(error);

    }

  };

  // GPS CELULAR
  const obtenerUbicacion = () => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        alert(
          `Latitud: ${position.coords.latitude}
Longitud: ${position.coords.longitude}`
        );

      },

      (error) => {

        alert("No se pudo obtener la ubicación");

        console.error(error);

      }

    );

  };

  return (

    <div
      style={{
        display: "flex",
        backgroundColor: "#eef2f7",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "220px",
          backgroundColor: "white",
          padding: "30px 20px",
          boxShadow: "2px 0px 10px rgba(0,0,0,0.05)",
        }}
      >

        <h1
          style={{
            color: "#2563eb",
            marginBottom: "40px",
          }}
        >
          ☁️ ATLAS
        </h1>

        <div style={{ marginBottom: "25px" }}>🏠 Panel de control</div>
        <div style={{ marginBottom: "25px" }}>🌦️ Clima</div>
        <div style={{ marginBottom: "25px" }}>📍 GPS</div>
        <div style={{ marginBottom: "25px" }}>⚙️ Servicios</div>
        <div style={{ marginBottom: "25px" }}>📋 Registros</div>
        <div style={{ marginBottom: "25px" }}>🔐 Configuración</div>

      </div>

      {/* CONTENIDO */}

      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >

        <h1
          style={{
            fontSize: "60px",
            color: "#1e293b",
            marginBottom: "10px",
          }}
        >
          ATLAS Nativo de la nube
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "22px",
          }}
        >
          Plataforma financiera desplegada con arquitectura de microservicios
        </p>

        {/* TARJETAS */}

        <div
          style={{
            display: "flex",
            gap: "30px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >

          {/* CLIMA */}

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              width: "220px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
            }}
          >

            <h2>🌦️ Clima Actual</h2>

            {clima && (
              <>
                <p style={{ marginTop: "20px" }}>
                  📍 {clima.ciudad}
                </p>

                <h1
                  style={{
                    color: "#2563eb",
                    fontSize: "60px",
                  }}
                >
                  {clima.temperatura} °C
                </h1>

                <p>
                  💨 {clima.viento} km/h
                </p>
              </>
            )}

          </div>

          {/* API */}

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              width: "220px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >

            <h2>🟢 Estado API</h2>

            <h1
              style={{
                color: "#16a34a",
                fontSize: "55px",
              }}
            >
              EN LÍNEA
            </h1>

            <p>Microservicios activos</p>

          </div>

          {/* CONSULTAS */}

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "30px",
              width: "220px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >

            <h2>📊 Consultas API</h2>

            <h1
              style={{
                color: "#f97316",
                fontSize: "70px",
              }}
            >
              24
            </h1>

            <p style={{ color: "#16a34a" }}>
              +15% frente a ayer
            </p>

          </div>

        </div>

        {/* GPS */}

        <div
          style={{
            marginTop: "40px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
          }}
        >

          <h1>📍 Ubicación GPS</h1>

          <p
            style={{
              marginTop: "15px",
              color: "#64748b",
            }}
          >
            Consulta la ubicación actual del dispositivo móvil en tiempo real.
          </p>

          <button
            onClick={obtenerUbicacion}
            style={{
              marginTop: "20px",
              padding: "15px 25px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Obtener ubicación
          </button>

        </div>

        {/* REPORTES */}

        <div
          style={{
            marginTop: "50px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
          }}
        >

          <h1
            style={{
              marginBottom: "30px",
            }}
          >
            📄 Informes financieros
          </h1>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>

              <tr
                style={{
                  borderBottom: "1px solid #ddd",
                }}
              >

                <th
                  style={{
                    textAlign: "left",
                    padding: "15px",
                  }}
                >
                  Informe
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "15px",
                  }}
                >
                  Acción
                </th>

              </tr>

            </thead>

            <tbody>

              {/* REPORTE 1 */}

              <tr>

                <td style={{ padding: "15px" }}>
                  Balance General
                </td>

                <td style={{ padding: "15px" }}>

                  <a
                    href="/reportes/reporte1.pdf"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      registrarConsulta("reporte1.pdf")
                    }
                    style={{
                      marginRight: "20px",
                      color: "#2563eb",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Ver PDF
                  </a>

                  <a
                    href="/reportes/reporte1.pdf"
                    download
                    style={{
                      color: "#16a34a",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Descargar
                  </a>

                </td>

              </tr>

              {/* REPORTE 2 */}

              <tr>

                <td style={{ padding: "15px" }}>
                  Flujo de Caja
                </td>

                <td style={{ padding: "15px" }}>

                  <a
                    href="/reportes/reporte2.pdf"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      registrarConsulta("reporte2.pdf")
                    }
                    style={{
                      marginRight: "20px",
                      color: "#2563eb",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Ver PDF
                  </a>

                  <a
                    href="/reportes/reporte2.pdf"
                    download
                    style={{
                      color: "#16a34a",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Descargar
                  </a>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default App;