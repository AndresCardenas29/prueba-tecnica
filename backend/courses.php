<?php
require 'database.php';

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener lista de cursos
    $stmt = $conn->query("SELECT * FROM cursos");
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($cursos);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Crear un nuevo curso
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = $data['nombre'];
    $descripcion = $data['descripcion'];

    $stmt = $conn->prepare("INSERT INTO cursos (nombre, descripcion) VALUES (:nombre, :descripcion)");
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':descripcion', $descripcion);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Curso creado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al crear el curso']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Actualizar un curso
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $nombre = $data['nombre'];
    $descripcion = $data['descripcion'];

    $stmt = $conn->prepare("UPDATE cursos SET nombre = :nombre, descripcion = :descripcion WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':descripcion', $descripcion);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Curso actualizado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el curso']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Eliminar un curso
    $id = $_GET['id'];

    $stmt = $conn->prepare("DELETE FROM cursos WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Curso eliminado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar el curso']);
    }
}
