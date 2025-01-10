const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost", // Cambiar si usas un servicio en la nube
    user: "root", // Usuario de tu base de datos
    password: "password123", // Contraseña de tu base de datos
    database: "sistema_login",
});

// Ruta para registrar usuarios
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Verificar si el email ya está registrado
    const [rows] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length > 0) {
        return res.status(400).json({ message: "El email ya está registrado." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await db.promise().query("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)", [
        username,
        email,
        hashedPassword,
    ]);
    res.status(201).json({ message: "Usuario registrado correctamente." });
});

// Ruta para iniciar sesión
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const [rows] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0) {
        return res.status(400).json({ message: "Email o contraseña incorrectos." });
    }

    const user = rows[0];

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Email o contraseña incorrectos." });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso.", user: { id: user.id, username: user.username } });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
