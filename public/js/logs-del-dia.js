// Cargar los nombres de las máquinas desde el backend
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/obtener-nombres-maquinas');
        const machines = await response.json();

        const select = document.getElementById('machineId');
        select.innerHTML = '<option value="">Seleccione una máquina</option>';

        machines.forEach(machine => {
            const option = document.createElement('option');
            option.value = machine.id;
            option.textContent = machine.type;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los nombres de las máquinas:', error);
    }
});

// Función para establecer las fechas de inicio y fin a la fecha actual
function setTodayDates() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;
    document.getElementById('endDate').value = today;
}

// Manejar el formulario
document.getElementById('queryForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const machineId = document.getElementById('machineId').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    try {
        const response = await fetch('/logs-del-dia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ machineId, startDate, endDate })
        });

        const data = await response.json();
        document.getElementById('result').style.display = 'block';
        document.getElementById('resultData').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
});

// Manejar el cambio del checkbox
document.getElementById('todayCheckbox').addEventListener('change', (event) => {
    if (event.target.checked) {
        setTodayDates();
    }
});

// Función para copiar el texto al portapapeles
function copyToClipboard() {
    const resultData = document.getElementById('resultData');
    const range = document.createRange();
    range.selectNode(resultData);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Texto copiado al portapapeles!');
}