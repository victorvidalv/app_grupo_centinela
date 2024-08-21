const logsPorRangoFechas = (startDate, endDate) => `
    SELECT * FROM logs 
    WHERE local_timestamp BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59' 
    ORDER BY id DESC;
`;
// Agregar status ok u on
const registrosMaquinasPorDia = (machineId, startDate, endDate) => `
   SELECT COUNT(*) AS veces_registrado
    FROM logs
    WHERE machine_id = ${machineId}
    AND local_timestamp BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59'
`;

const obtenerNombresMaquinas = () => `
   SELECT id, type
   FROM machines;
`;

const consumoEnergiaPorMaquina = (machineId, startDate, endDate) => `
  SELECT machine_id, 
       SUM(value) AS total_value 
FROM logs 
WHERE machine_id = ${machineId}
  AND local_timestamp BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59'
GROUP BY machine_id
`;

const tiempoTrabajadoPorMaquina = (machineId) => `
  SELECT machine_id,
    MIN(local_timestamp) AS first_timestamp, 
    MAX(local_timestamp) AS last_timestamp
  FROM logs
  WHERE machine_id = ${machineId}
    AND DATE(local_timestamp) = "2024-08-15";

`;

const estadoActualMaquina = (machineId) => `
  SELECT status, local_timestamp
  FROM logs
  WHERE machine_id = ${machineId}
  ORDER BY local_timestamp DESC
  LIMIT 1
`;

module.exports = {
  logsPorRangoFechas,
  registrosMaquinasPorDia,
  obtenerNombresMaquinas,
  consumoEnergiaPorMaquina,
  tiempoTrabajadoPorMaquina,
  estadoActualMaquina
};
