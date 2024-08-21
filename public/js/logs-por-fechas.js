document.getElementById('logForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    const formData = new FormData(this);
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');

    try {
        const response = await fetch('/logs-por-fechas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ startDate, endDate })
        });

        const data = await response.json();
        document.getElementById('responseData').textContent = JSON.stringify(data, null, 2);
        document.getElementById('resultContainer').style.display = 'block';
    } catch (error) {
        document.getElementById('responseData').textContent = 'Error al obtener los datos.';
    }
});

function copyToClipboard() {
    const textToCopy = document.getElementById('responseData').textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Texto copiado al portapapeles');
        })
        .catch(err => {
            alert('Error al copiar el texto');
        });
}