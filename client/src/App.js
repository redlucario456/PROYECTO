import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);
  const [logueado, setLogueado] = useState(false);

  // ⛔ NO usar localhost en producción
  // ✅ Usamos variable de entorno para local y Railway
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // opcional si usas cookies
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        alert("Error en el servidor");
        return;
      }

      const data = await res.json();

      if (data.success) {
        setLogueado(true);
        alert("Login exitoso");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  // 🌤️ CLIMA
  const obtenerClima = async () => {
    try {
      const res = await fetch(`${API_URL}/clima?ciudad=${ciudad}`);
      const data = await res.json();
      setClima(data);
    } catch (error) {
      console.error(error);
      alert("Error al obtener clima");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>App Clima + Login</h1>

      {!logueado ? (
        <div>
          <h2>Login</h2>

          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      ) : (
        <div>
          <h2>Clima</h2>

          <input
            placeholder="Ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />

          <button onClick={obtenerClima}>Buscar</button>

          {clima && clima.main && (
            <div>
              <h3>{clima.name}</h3>
              <p>Temperatura: {clima.main.temp} °C</p>
              <p>{clima.weather[0].description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
