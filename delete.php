<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = $data->id;

    $query = "DELETE FROM leaderboard WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Data berhasil dihapus."]);
    } else {
        echo json_encode(["message" => "Gagal menghapus data."]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "ID tidak ditemukan."]);
}

$conn->close();
?>
