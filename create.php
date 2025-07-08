<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "a9_game");

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->nama) &&
    !empty($data->skor) &&
    !empty($data->game)
) {
    $stmt = $conn->prepare("INSERT INTO leaderboard (name, score, game) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $data->nama, $data->skor, $data->game);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "Leaderboard berhasil ditambahkan."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Gagal menambahkan leaderboard."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Data tidak lengkap."]);
}
?>
