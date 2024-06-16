<?php
$user_id = $_POST['user_id'];
$time = $date = date('Y-m-d H:i:s');
$deep_link = $_POST['deep_link'];
$name = $_POST['name'];
$username = $_POST['username'];

$connect_data = "host=rc1b-2tdd3qyqwzpike23.mdb.yandexcloud.net port=6432 dbname=eat_smart user=veron password=codemates";
$host = 'rc1b-2tdd3qyqwzpike23.mdb.yandexcloud.net';
$port = '6432';
$dbname = 'eat_smart';
$user = 'veron';
$password = 'codemates';

try {
    $db = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare("INSERT INTO users (user_id, time, deep_link, name, username) VALUES (:user_id, :time, :deep_link, :name, :username)");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':time', $time);
    $stmt->bindParam(':deep_link', $deep_link);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':username', $username);

    $stmt->execute();

} catch (PDOException $ex) {
    error_log("Error inserting data: " . $ex->getMessage());
    echo "Error inserting data. Please try again later." . $ex->getMessage();
}
?>