<?php
    $user_id = $_POST['argument'];
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
        
        $res = $db->query("SELECT COALESCE(SUM(CAST(user_history.calories AS FLOAT)), 0) AS total_calories FROM user_history WHERE user_id = $user_id AND is_eat = True AND  date_trunc('day', time) = date_trunc('day', now());");
        if ($res!== false) {

            $rows = $res->fetchAll(PDO::FETCH_ASSOC);
            $calories = json_encode($rows);

        }


        $res = $db->query("SELECT COALESCE(SUM(CAST(user_history.grams AS FLOAT)), 0) AS total_grams FROM user_history WHERE user_id = $user_id AND is_eat = True AND  date_trunc('day', time) = date_trunc('day', now() );");
        if ($res!== false) {

            $rows = $res->fetchAll(PDO::FETCH_ASSOC);
            $grams = json_encode($rows);
            
        }


        $res = $db->query("SELECT COALESCE(SUM(CAST(user_history.squirrels AS FLOAT)), 0) AS total_squirrels FROM user_history WHERE user_id = $user_id AND is_eat = True AND  date_trunc('day', time) = date_trunc('day', now() );");
        if ($res!== false) {

            $rows = $res->fetchAll(PDO::FETCH_ASSOC);
            $squirrels = json_encode($rows);

        }


        $res = $db->query("SELECT COALESCE(SUM(CAST(user_history.fats AS FLOAT)), 0) AS total_fats FROM user_history WHERE user_id = $user_id AND is_eat = True AND  date_trunc('day', time) = date_trunc('day', now());");
        if ($res!== false) {
            $rows = $res->fetchAll(PDO::FETCH_ASSOC);
            $fats = json_encode($rows);
        }


        $res = $db->query("SELECT COALESCE(SUM(CAST(user_history.carbohydrates AS FLOAT)), 0) AS total_carbohydrates FROM user_history WHERE user_id = $user_id AND is_eat = True AND  date_trunc('day', time) = date_trunc('day', now());");
        if ($res!== false) {

            $rows = $res->fetchAll(PDO::FETCH_ASSOC);
            $carbohydrates = json_encode($rows);
        }
        


        $res = $db->query("SELECT COUNT(*) FROM user_history WHERE user_id = $user_id AND is_eat = True AND  date_trunc('day', time) = date_trunc('day', now());");
        if ($res!== false) {
            $rows = $res->fetchAll(PDO::FETCH_ASSOC);
            $count = json_encode($rows);
        }

        $res = $db->query("SELECT daily_norm FROM info WHERE user_id = $user_id");
        if ($res!== false) {
            $rows = $res->fetchAll(PDO::FETCH_ASSOC);
            $daily_norm = json_encode($rows);
        }
        
        $calories = str_replace('[', "", $calories);
        $calories = str_replace(']', "", $calories);
        $calories = str_replace('}', "", $calories);

        $grams = str_replace('[', "", $grams);
        $grams = str_replace(']', "", $grams);
        $grams = str_replace('}', "", $grams);
        $grams = str_replace('{', "", $grams);

        $squirrels = str_replace('[', "", $squirrels);
        $squirrels = str_replace(']', "", $squirrels);
        $squirrels = str_replace('}', "", $squirrels);
        $squirrels = str_replace('{', "", $squirrels);

        $fats = str_replace('[', "", $fats);
        $fats = str_replace(']', "", $fats);
        $fats = str_replace('}', "", $fats);
        $fats = str_replace('{', "", $fats);

        $carbohydrates = str_replace('[', "", $carbohydrates);
        $carbohydrates = str_replace(']', "", $carbohydrates);
        $carbohydrates = str_replace('}', "", $carbohydrates);
        $carbohydrates = str_replace('{', "", $carbohydrates);

        $count = str_replace('{', "", $count);
        $count = str_replace('[', "", $count);
        $count = str_replace(']', "", $count);
        $count = str_replace('}', "", $count);

        $daily_norm = str_replace('[', "", $daily_norm);
        $daily_norm = str_replace('{', "", $daily_norm);
        $daily_norm = str_replace('}', "", $daily_norm);
        $daily_norm = str_replace(']', "}", $daily_norm);

        echo  $calories . ',' . $grams . ',' . $squirrels . ',' . $fats . ',' . $carbohydrates . ',' . $count . ',' . $daily_norm;

    } catch (PDOException $ex) {
        echo "Exception" . $ex->getMessage();
}




//     try {
//         $db = new PDO("pgsql:host=". $host. ';port ='. $port. ';dbname='. $dbname, $user, $password);
        
//         $res = $db->query("SELECT calories, grams, squirrels, fats, carbohydrates FROM user_history WHERE user_id = $user_id AND is_eat = true ;");
//         if ($res!== false) {
//             $rows = $res->fetchAll(PDO::FETCH_ASSOC);
//             $history = json_encode($rows);
//         }

//         $res = $db->query("SELECT daily_norm FROM info WHERE user_id = $user_id");
//         if ($res!== false) {
//             $rows = $res->fetchAll(PDO::FETCH_ASSOC);

//             $daily_norm = json_encode($rows);
//         }
        
//         $history = str_replace('[', "", $history);
//         $history = str_replace(']', "", $history);
//         $history = str_replace('}', "", $history);
         
//         $daily_norm = str_replace('{', "", $daily_norm);
//         $daily_norm = str_replace('}', "", $daily_norm);

//         $daily_norm = str_replace('[', ",", $daily_norm);
//         $daily_norm = str_replace(']', "}", $daily_norm);

//         echo  $history . $daily_norm;

//     } catch (PDOException $ex) {
//         echo "Exception" . $ex->getMessage();
// }


    // $db_connect = pg_connect($connect_data);
    // if (!$db_connect) {
    //     die("Ошибка подключения: " . pg_result_error());
    // }
    // echo 'ЭТО ЮЗЕР АЙДИ ПЕРЕДАННЫЙ В ЗАПРОСЕ:' . $user_id . "КОНЕц";
    // $query = pg_query($db_connect, "SELECT * FROM user_history");

    // if (!$query) {
    //         die ("Ошибка выполнения запроса");
    // }


    // while ($result = pg_fetch_array($query)) {
    //     echo "<p> User_id: {$result['user_id']}. Съедено или нет: {$result['is_eat']}  Название: {$result['food_name']} Время: {$result['time']} </p> ";
    // }

    // $data = [
    //     "food_name" => $result['food_name'],
    //     "is_eat" =>  $result['is_eat'],
    // ];

    // pg_free_result($query);
    // pg_close();

    // return json_encode($data);


    // $result = 'результат обработки аргумента';
    // echo $result;
?>
