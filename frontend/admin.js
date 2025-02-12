document.getElementById('addCourseForm').addEventListener('submit', function(event) {
	event.preventDefault();

	const nombre = document.getElementById('courseName').value;
	const descripcion = document.getElementById('courseDescription').value;

	fetch('http://localhost/backend/courses.php', {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: JSON.stringify({
					nombre: nombre,
					descripcion: descripcion
			})
	})
	.then(response => response.json())
	.then(data => {
			if (data.success) {
					alert(data.message);
					loadCourses(); // Recargar la lista de cursos después de agregar uno nuevo
			} else {
					alert(data.message);
			}
	})
	.catch(error => {
			console.error('Error:', error);
	});
});

function loadCourses() {
	fetch('http://localhost/backend/courses.php')
	.then(response => response.json())
	.then(data => {
			const tbody = document.querySelector('#coursesList table tbody'); // Selecciona el tbody de la tabla
			tbody.innerHTML = ''; // Limpia el contenido actual del tbody

			// Recorre cada curso y crea una fila en la tabla
			data.forEach(course => {
					const row = document.createElement('tr');

					// Celda para el ID
					const idCell = document.createElement('td');
					idCell.textContent = course.id;
					row.appendChild(idCell);

					// Celda para el nombre
					const nameCell = document.createElement('td');
					nameCell.textContent = course.nombre;
					row.appendChild(nameCell);

					// Celda para la descripción
					const descCell = document.createElement('td');
					descCell.textContent = course.descripcion;
					row.appendChild(descCell);

					// Agrega la fila al tbody
					tbody.appendChild(row);
			});
	})
	.catch(error => {
			console.error('Error:', error);
	});
}

// Cargar la lista de cursos al cargar la página
loadCourses();