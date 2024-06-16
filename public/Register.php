<?php
echo $user_id = $_POST['user_id'];
echo $weight = $_POST['weight'];
echo $height = $_POST['height'];
echo $gender = $_POST['gender'];
echo $age = $_POST['age'];
echo $medical_history = $_POST['medical_history'];
echo $goal = $_POST['goal'];
echo $preferences = $_POST['preferences'];
echo $activity = $_POST['activity'];
echo $psychological = $_POST['psychological'];


// $proxy_url = "http://SWs3HAJ3:SJh5ac9K@154.196.38.170:63808";
// $url = 'https://api.openai.com/v1/chat/completions';
// $headers = array(
//     'Authorization: Bearer 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',
//     'Content-Type: application/json'
// );

// $system_message = "
// Ты бот EatSmart: Помощник по питанию и калориям.
// Если пользователь спросит тебя 'какая моя дневная норма каллорий исходя из моих данных?' 
// верни лишь одно и только одно число - количество калорий в день, которое должен потреблять человек, чтобы добиться своих целей
// ";

// $user_message = "
// Какая моя дневная норма каллорий исходя из моих данных?
// Мои данные:
// Вес: {$weight}, рост: {$height}, пол: {$gender}, возраст: {$age}, Медицинские противопоказания: {$medical_history}, Цели в питании: {$goal}, Предпочтения: {$preferences}, Физическая активность(1-минимум, 5-максимум): {$activity}, Наличие стрессов или эмоциональных проблем (1-минимум, 5-максимум): {$psychological}
// ";

// $data = array(
//     'model' => 'gpt-4',
//     'max_tokens' => 200,
//     'temperature' => 0.5,
//     'messages' => array(
//         array('role' => 'system', 'content' => $system_message),
//         array('role' => 'user', 'content' => $user_message)
//     )
// );
// try {
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_URL, $url); // Set the actual URL of the ChatGPT API
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($ch, CURLOPT_POST, true);
//     curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
//     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
//     curl_setopt($ch, CURLOPT_PROXY, $proxy_url); // Set the proxy URL
//     curl_setopt($ch, CURLOPT_PROXYUSERPWD, 'SWs3HAJ3:SJh5ac9K'); // Set the proxy username and password

//     $response = curl_exec($ch);
//     curl_close($ch);
//     echo $response;
//     $json_array = json_decode($response, true);

//     $daily_norm = $json_array['choices'][0]['message']['content'];
// }
// catch (Exception $ex) {
//     echo "Error ". $ex->getMessage();
// }


$connect_data = "host=rc1b-2tdd3qyqwzpike23.mdb.yandexcloud.net port=6432 dbname=eat_smart user=veron password=codemates";
$host = 'rc1b-2tdd3qyqwzpike23.mdb.yandexcloud.net';
$port = '6432';
$dbname = 'eat_smart';
$user = 'veron';
$password = 'codemates';

try {
    $db = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare("INSERT INTO info (user_id, weight, height, gender, age, medical_history, goal, preferences, activity, psychological, daily_norm) VALUES (:user_id, :weight, :height, :gender, :age, :medical_history, :goal, :preferences, :activity, :psychological, :daily_norm)");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':weight', $weight);
    $stmt->bindParam(':height', $height);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':age', $age);
    $stmt->bindParam(':medical_history', $medical_history);
    $stmt->bindParam(':goal', $goal);
    $stmt->bindParam(':preferences', $preferences);
    $stmt->bindParam(':activity', $activity);
    $stmt->bindParam(':psychological', $psychological);
    $stmt->bindParam(':daily_norm', $daily_norm);

    $stmt->execute();

    echo "SUCCESFUL";
} catch (PDOException $ex) {
    error_log("Error inserting data: " . $ex->getMessage());
    echo "Error inserting data. Please try again later." . $ex->getMessage();
}
?>