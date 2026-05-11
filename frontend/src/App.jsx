import { useEffect, useState } from "react";

function App() {

  const [usuarios, setUsuarios] = useState([]);
  const [clima, setClima] = useState(null);

  /* =========================
     USUARIOS
  ========================= */

  useEffect(() => {

    async function cargarUsuarios() {

      try {

        const response = await fetch(
          "http://localhost:3000/usuarios"
        );

        const data = await response.json();

        setUsuarios(data);

      } catch (error) {

        console.log(error);

      }

    }

    cargarUsuarios();

  }, []);

  /* =========================
     CLIMA
  ========================= */

  useEffect(() => {

    async function cargarClima() {

      try {

        const response = await fetch(
          "http://localhost:3000/clima"
        );

        const data = await response.json();

        setClima(data);

      } catch (error) {

        console.log(error);

      }

    }

    cargarClima();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100 flex">

      {/* =========================
          SIDEBAR
      ========================= */}

      <div className="w-64 bg-white shadow-lg p-6">

        <h1 className="text-4xl font-bold text-blue-600 mb-10">
          ☁️ ATLAS
        </h1>

        <ul className="space-y-6 text-gray-700 font-medium">

          <li className="bg-blue-100 p-3 rounded-xl text-blue-600">
            🏠 Dashboard
          </li>

          <li>
            👥 Usuarios
          </li>

          <li>
            🌦️ Clima
          </li>

          <li>
            ⚙️ Servicios
          </li>

          <li>
            📋 Logs
          </li>

          <li>
            🔐 Configuración
          </li>

        </ul>

      </div>

      {/* =========================
          CONTENIDO
      ========================= */}

      <div className="flex-1 p-10">

        <h1 className="text-6xl font-bold text-slate-800">
          ATLAS Nativo de la nube
        </h1>

        <p className="text-gray-500 mt-3 mb-10 text-xl">
          Plataforma financiera desplegada con arquitectura de microservicios
        </p>

        {/* =========================
            TARJETAS
        ========================= */}

        <div className="grid grid-cols-4 gap-6">

          {/* CLIMA */}

          <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">
              🌦️ Clima Actual
            </h2>

            {
              clima && (

                <div className="space-y-3 text-lg">

                  <p>
                    📍 {clima.ciudad}
                  </p>

                  <p className="text-5xl font-bold text-blue-600">
                    {clima.temperatura}°C
                  </p>

                  <p>
                    💨 {clima.viento} km/h
                  </p>

                </div>

              )
            }

          </div>

          {/* USUARIOS */}

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <h2 className="text-2xl font-bold mb-6">
              👥 Usuarios
            </h2>

            <h1 className="text-7xl font-bold text-purple-600">
              {usuarios.length}
            </h1>

            <p className="text-gray-500 mt-4">
              Usuarios registrados
            </p>

          </div>

          {/* API */}

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <h2 className="text-2xl font-bold mb-6">
              🟢 Estado API
            </h2>

            <h1 className="text-5xl font-bold text-green-600">
              EN LÍNEA
            </h1>

            <p className="text-gray-500 mt-4">
              Microservicios activos
            </p>

          </div>

          {/* CONSULTAS */}

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <h2 className="text-2xl font-bold mb-6">
              📊 Consultas API
            </h2>

            <h1 className="text-7xl font-bold text-orange-500">
              24
            </h1>

            <p className="text-green-600 mt-4">
              +15% vs ayer
            </p>

          </div>

        </div>

        {/* =========================
            TABLA USUARIOS
        ========================= */}

        <div className="bg-white rounded-3xl shadow-md mt-10 p-8">

          <h2 className="text-3xl font-bold mb-6">
            Usuarios registrados
          </h2>

          <table className="w-full">

            <thead>

              <tr className="text-left border-b">

                <th className="p-4">ID</th>

                <th className="p-4">Nombre</th>

                <th className="p-4">Correo</th>

                <th className="p-4">Estado</th>

              </tr>

            </thead>

            <tbody>

              {
                usuarios.map((usuario) => (

                  <tr
                    key={usuario.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {usuario.id}
                    </td>

                    <td className="p-4 font-semibold">
                      {usuario.nombre}
                    </td>

                    <td className="p-4">
                      {usuario.correo}
                    </td>

                    <td className="p-4">

                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

                        Activo

                      </span>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default App;