const axios = require("axios");
const {
  logsPorRangoFechas,
  registrosMaquinasPorDia,
  obtenerNombresMaquinas,
  consumoEnergiaPorMaquina,
  tiempoTrabajadoPorMaquina,
  estadoActualMaquina,
} = require("../queries/queries.js");


// Función auxiliar para realizar consultas a la API
const ejecutarConsulta = async (query) => {
  const token = process.env.API_KEY;

  try {
    const response = await axios.post(
      `${process.env.API_URL}`,
      { query },
      {
        headers: { Authorization: `${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al ejecutar la consulta:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error al ejecutar la consulta.");
  }
};


// Función para obtener logs por rango de fechas
const logsPorFechas = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const query = logsPorRangoFechas(startDate, endDate);
    const data = await ejecutarConsulta(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Función para obtener logs del día por máquina
const logsPorDia = async (req, res) => {
  const { machineId, startDate, endDate } = req.body;

  try {
    const query = registrosMaquinasPorDia(machineId, startDate, endDate);
    const data = await ejecutarConsulta(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funcion para conseguir nombres de las máquinas
const nombresMaquinas = async (req, res) => {
  try {
    const query = obtenerNombresMaquinas();
    const data = await ejecutarConsulta(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para obtener el consumo de energía por máquina
const consumoEnergia = async (req, res) => {
  const { machineId, startDate, endDate } = req.body;

  try {
    const query = consumoEnergiaPorMaquina(machineId, startDate, endDate);
    const data = await ejecutarConsulta(query);

    if (data.length > 0) {
      res.json({
        machine_id: data[0].machine_id,
        total_value: `${data[0].total_value} kwh`,
      });
    } else {
      res.status(404).json({
        error: "No se encontraron datos para el ID de la máquina proporcionado",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para obtener el tiempo trabajado hoy por máquina
const tiempoTrabajado = async (req, res) => {
  const { machineId } = req.query;

  try {
    const query = tiempoTrabajadoPorMaquina(machineId);
    const data = await ejecutarConsulta(query);

    if (data.length > 0) {
      const timeDifferenceSeconds =
        Math.abs(new Date(data[0].last_timestamp) - new Date(data[0].first_timestamp)) / 1000;

      res.json({
        machine_id: machineId,
        tiempo_trabajado: timeDifferenceSeconds,
      });
    } else {
      res.status(404).json({
        error: "No se encontraron datos para el ID de la máquina proporcionado",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener el estado actual de la máquina
const estadoPorMaquina = async (req, res) => {
  const { machineId } = req.query;

  try {
    const query = estadoActualMaquina(machineId);
    const data = await ejecutarConsulta(query);

    if (data.length > 0) {
      res.json({
        machine_id: machineId,
        status: data[0].status,
        last_timestamp: data[0].local_timestamp,
      });
    } else {
      res.status(404).json({
        error: "No se encontró el estado de la máquina.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  logsPorFechas,
  logsPorDia,
  nombresMaquinas,
  consumoEnergia,
  tiempoTrabajado,
  estadoPorMaquina,
};
