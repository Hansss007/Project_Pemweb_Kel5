<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "a9_game");

$query = "SELECT id, name, score, game FROM leaderboard ORDER BY score DESC";
$result = $conn->query($query);

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
