<?php
$user_id = $_POST['user_id'];
    // ваш код для обработки аргумента
    // Здесь ваш код для получения данных
    // $connect_data = "host=rc1b-2tdd3qyqwzpike23.mdb.yandexcloud.net port=6432 dbname=eat_smart user=veron password=codemates";
    $connect_data = "host=rc1b-2tdd3qyqwzpike23.mdb.yandexcloud.net port=6432 dbname=eat_smart user=veron password=codemates";
    $host = 'rc1b-2tdd3qyqwzpike23.mdb.yandexcloud.net';
    $port = '6432';
    $dbname = 'eat_smart';
    $user = 'veron';
    $password = 'codemates';

    try {
        $db = new PDO("pgsql:host=". $host. ';port ='. $port. ';dbname='. $dbname, $user, $password);
        
        $res = $db->query("SELECT COUNT(*) FROM info WHERE user_id = $user_id;");
        if ($res!== false) {
            $rows = $res->fetchAll(PDO::FETCH_ASSOC);
            $count = $rows[0]['count'];
            echo $count;
        }

    } catch (PDOException $ex) {
        echo "Exception" . $ex->getMessage();
}


?>