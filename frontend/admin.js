document
	.getElementById("addCourseForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const nombre = document.getElementById("courseName").value;
		const descripcion = document.getElementById("courseDescription").value;

		fetch("http://localhost/backend/courses.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nombre: nombre,
				descripcion: descripcion,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					alert(data.message);
					loadCourses(); // Recargar la lista de cursos después de agregar uno nuevo
				} else {
					alert(data.message);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	});

function loadCourses() {
	fetch("http://localhost/backend/courses.php")
		.then((response) => response.json())
		.then((data) => {
			const tbody = document.querySelector("#coursesList table tbody"); // Selecciona el tbody de la tabla
			tbody.innerHTML = ""; // Limpia el contenido actual del tbody

			// Recorre cada curso y crea una fila en la tabla
			data.forEach((course) => {
				const row = document.createElement("tr");

				// Celda para el ID
				const idCell = document.createElement("td");
				idCell.textContent = course.id;
				row.appendChild(idCell);

				// Celda para el nombre
				const nameCell = document.createElement("td");
				const txtInput = document.createElement("input");
				txtInput.type = "text";
				txtInput.value = course.nombre;
				nameCell.appendChild(txtInput);
				row.appendChild(nameCell);

				// Celda para la descripción
				const descCell = document.createElement("td");
				const txtArea = document.createElement("textarea");
				txtArea.value = course.descripcion;
				descCell.appendChild(txtArea);
				row.appendChild(descCell);

				// celda para el boton de eliminar
				const deleteCell = document.createElement("td");
				const deleteButton = document.createElement("button");
				deleteButton.textContent = "Eliminar";
				deleteButton.classList.add("btn-delete"); // Agrega una clase para estilizar el botón
				deleteButton.addEventListener("click", () => {
					// Llama a una función para eliminar el curso (por ejemplo, eliminarCurso(course.id));
					alert(`Se ha eliminado el curso: ${course.nombre}`);
					deleteCourse(course.id);
				});
				deleteCell.appendChild(deleteButton);
				row.appendChild(deleteCell);

				// Celda para el boton de editar
				const editCell = document.createElement("td");
				const editButton = document.createElement("button");
				editButton.textContent = "Editar";
				editButton.classList.add("btn-edit"); // Agrega una clase para estilizar el botón
				editButton.addEventListener("click", () => {
					// Llama a una función para editar el curso (por ejemplo, editarCurso(course.id));
					alert(`Se ha editado el curso: ${course.nombre}`);
					editCourse({
						id: course.id,
						nombre: txtInput.value,
						descripcion: txtArea.value,

					});
				});
				editCell.appendChild(editButton);
				row.appendChild(editCell);

				// Agrega la fila al tbody
				tbody.appendChild(row);
			});
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

// Cargar la lista de cursos al cargar la página
loadCourses();

const deleteCourse = (id) => {
	console.log({ id });

	fetch(`http://localhost/backend/courses.php?id=${id}`, { method: "DELETE" })
		.then((response) => response.json())
		.then((data) => {
			console.log("Curso eliminado:", data);
			// Actualiza la lista de cursos después de eliminar uno
			loadCourses();
		})
		.catch((error) => {
			console.error("Error al eliminar curso:", JSON.stringify(error));
		});
};

const editCourse = (data) => {
	const { id, nombre, descripcion } = data;

	fetch(`http://localhost/backend/courses.php`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id, nombre, descripcion }),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Curso editado:", data);
			// Actualiza la lista de cursos después de editar uno
			loadCourses();
		})
		.catch((error) => {
			console.error("Error al editar curso:", JSON.stringify(error));
		});
};
