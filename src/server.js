const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const logsController = require('./controllers/logsController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.post('/logs-por-fechas', logsController.logsPorFechas);
app.post('/logs-del-dia', logsController.logsPorDia);
app.get('/obtener-nombres-maquinas', logsController.nombresMaquinas);
app.post('/consumo-energia', logsController.consumoEnergia);
app.get('/tiempo-trabajado', logsController.tiempoTrabajado);
app.get('/estatus-maquina', logsController.estadoPorMaquina);



app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
