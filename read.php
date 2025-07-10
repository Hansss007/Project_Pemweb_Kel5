<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "leaderboard-api");


// Cek koneksi
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Koneksi gagal: " . $conn->connect_error]);
    exit();
}

// Query leaderboard
$query = "SELECT id, nama, skor, game FROM leaderboard ORDER BY skor DESC";
$result = $conn->query($query);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
?>
