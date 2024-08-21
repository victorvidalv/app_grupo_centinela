// Manejar el formulario
document
  .getElementById("timeForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const machineId = document.getElementById("machineId").value;

    try {
      const response = await fetch(`/tiempo-trabajado?machineId=${machineId}`);
      const data = await response.json();

      document.getElementById("result").style.display = "block";
      document.getElementById("resultData").textContent = JSON.stringify(
        data,
        null,
        2
      );
    } catch (error) {
      console.error("Error fetching worked time:", error);
    }
  });

// Cargar los nombres de las máquinas desde el backend
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/obtener-nombres-maquinas");
    const machines = await response.json();

    const select = document.getElementById("machineId");
    select.innerHTML = '<option value="">Seleccione una máquina</option>';

    machines.forEach((machine) => {
      const option = document.createElement("option");
      option.value = machine.id;
      option.textContent = machine.type;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar los nombres de las máquinas:", error);
  }
});
