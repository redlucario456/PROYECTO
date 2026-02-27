require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// CORS
app.use(cors({
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// DB
if (process.env.NODE_ENV !== 'test') {
    sequelize.sync({ force: false })
        .then(() => console.log('✅ Base de datos sincronizada'))
        .catch(err => console.log('❌ Error de conexión:', err));
}

// RUTAS API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/proyectos', require('./routes/proyectoRoutes'));
app.use('/api/clima', require('./routes/climaRoutes'));

// 🔥 SERVIR FRONTEND (SIN NODE_ENV)
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Middleware de errores
app.use(errorHandler);

// Puerto dinámico (Railway)
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor backend en puerto ${PORT}`);
    });
}

module.exports = app;
