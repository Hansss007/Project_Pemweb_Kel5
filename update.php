<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id) &&
    isset($data->nama) &&
    isset($data->skor) &&
    isset($data->game)
) {
    $id = $data->id;
    $nama = htmlspecialchars(strip_tags($data->nama));
    $skor = (int)$data->skor;
    $game = htmlspecialchars(strip_tags($data->game));

    $query = "UPDATE leaderboard SET nama = ?, skor = ?, game = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sisi", $nama, $skor, $game, $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Data berhasil diperbarui."]);
    } else {
        echo json_encode(["message" => "Gagal memperbarui data."]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "Data tidak lengkap."]);
}

$conn->close();
?>
