<?php
require 'database.php';

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  if (isset($data['action'])) {
    if ($data['action'] === 'register') {
      // Registrar usuario
      $nombre = $data['nombre'];
      $email = $data['email'];
      $password = password_hash($data['password'], PASSWORD_BCRYPT);

      $find = $conn->prepare("SELECT * FROM usuarios WHERE email = :email");
      $find->bindParam(':email', $email);
      $find->execute();
      if ($find->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'El usuario ya existe']);
      } else {
        // Registrar nuevo usuario
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (:nombre, :email, :password)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        if ($stmt->execute()) {
          echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
        } else {
          echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario']);
        }
      }
    } elseif ($data['action'] === 'login') {
      // Iniciar sesión
      $email = $data['email'];
      $password = $data['password'];

      $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = :email");
      $stmt->bindParam(':email', $email);
      $stmt->execute();
      $user = $stmt->fetch(PDO::FETCH_ASSOC);

      if ($user && password_verify($password, $user['password'])) {
        $token = bin2hex(random_bytes(32));
        echo json_encode(['success' => true, 'token' => $token]);
      } else {
        echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
      }
    }
  }
}
