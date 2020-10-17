<?php
include_once('db-conn.php');
$requestPayload = file_get_contents("php://input");

$recived_array = json_decode($requestPayload, true);
print_r($recived_array[0]['pitanje']);

$test = 'radi test';
/* $pol = $recived_array[0];
$godine = $recived_array[1];
$fizicka_aktivnost = $recived_array[2];
$san = $recived_array[3];
$pritisak = $recived_array[4];
$checked_answers = $recived_array["checkedValuesStr"]; */

/* date_default_timezone_set("Europe/Belgrade");
$vreme_unosa = date("d/m/Y H:i"); */



// Function to get the client ip address // server
function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
/* echo ('getrealipaddr ' . getRealIpAddr());

$data = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip=' . getRealIpAddr()));

$lokacija = $data['geoplugin_city'] . ',' . $data['geoplugin_countryName']; */

//PDO prepared statement to send to database
$pitanje1 = 'Da je vaša nadutost teško podnošljiva ili izuzetno bolna';
try {

    $pdo = new PDO($dsn, $username, $password, $options);

    $query = "INSERT INTO user_input(Pitanje1) VALUES(:test)";

    $statement = $pdo->prepare($query);

    $statement->bindParam(':test', $test, PDO::PARAM_STR);
    /* $statement->bindParam(':godine', $godine, PDO::PARAM_STR);
    $statement->bindParam(':fizicka_aktivnost', $fizicka_aktivnost, PDO::PARAM_STR);
    $statement->bindParam(':san', $san, PDO::PARAM_STR);
    $statement->bindParam(':pritisak', $pritisak, PDO::PARAM_STR);
    $statement->bindParam(':checked_answers', $checked_answers, PDO::PARAM_STR);
    $statement->bindParam(':vreme_unosa', $vreme_unosa, PDO::PARAM_STR);
    $statement->bindParam(':lokacija', $lokacija, PDO::PARAM_STR); */

    $statement->execute();


} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
} 
?>
