const records = JSON.parse(localStorage.getItem('records')) || [];

function saveRecord() {
    const rut = document.getElementById('rut').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const estadoCivil = document.getElementById('estadoCivil').value;
    const comentarios = document.getElementById('comentarios').value;

    const existingRecord = records.find(record => record.rut === rut);

    if (existingRecord) {
        const overwrite = confirm('El registro ya existe. ¿Desea sobrescribirlo?');
        if (!overwrite) return;

        Object.assign(existingRecord, {
            nombres, apellidos, direccion, ciudad,
            telefono, email, fechaNacimiento,
            estadoCivil, comentarios
        });
    } else {
        records.push({
            rut, nombres, apellidos, direccion, ciudad,
            telefono, email, fechaNacimiento,
            estadoCivil, comentarios
        });
    }

    localStorage.setItem('records', JSON.stringify(records));
    alert('Registro guardado con éxito');
    document.getElementById('medicalForm').reset();
}

function searchRecord() {
    const searchSurname = document.getElementById('searchSurname').value.toLowerCase();
    const results = records.filter(record => record.apellidos.toLowerCase().includes(searchSurname));
    const resultsContainer = document.getElementById('searchResults');

    resultsContainer.innerHTML = '';
    if (results.length > 0) {
        results.forEach(record => {
            resultsContainer.innerHTML += `
                <p><strong>RUT:</strong> ${record.rut}</p>
                <p><strong>Nombre:</strong> ${record.nombres} ${record.apellidos}</p>
                <hr>
            `;
        });
    } else {
        resultsContainer.innerHTML = '<p>No se encontraron registros.</p>';
    }
}

function closeForm() {
    if (confirm('¿Está seguro que desea cerrar el formulario?')) {
        window.close();
    }
}
