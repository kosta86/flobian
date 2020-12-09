<?php
include_once('db-conn.php');
$requestPayload = file_get_contents("php://input");

$recived_array = json_decode($requestPayload, true);

$user_email = filter_var($recived_array[13]['inputValue'], FILTER_SANITIZE_EMAIL);
$user_ime = filter_var($recived_array[12]['inputValue'], FILTER_SANITIZE_STRING);
$user_telefon = filter_var($recived_array[14]['inputValue'], FILTER_SANITIZE_STRING);


//PDO prepared statement to send to database
try {

    $pdo = new PDO($dsn, $username, $password, $options);

    $query = "INSERT INTO user_contact(
                    ime,
                    email,
                    telefon
                ) 
                VALUES(
                    :ime,
                    :email,
                    :telefon
                )";

    $statement = $pdo->prepare($query);

    $statement->bindParam(':ime', $user_ime, PDO::PARAM_STR);
    $statement->bindParam(':email', $user_email, PDO::PARAM_STR);
    $statement->bindParam(':telefon', $user_telefon, PDO::PARAM_STR);

    $statement->execute();

    echo "Contact sent to DB!";
} catch (PDOException $e) {

    echo "Error: " . $e->getMessage();
}
