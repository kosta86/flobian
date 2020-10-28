<?php
include_once('db-conn.php');
$requestPayload = file_get_contents("php://input");

$recived_array = json_decode($requestPayload, true);


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


$data = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip=' . getRealIpAddr()));

$lokacija = $data['geoplugin_city'] . ',' . $data['geoplugin_countryName'];


//PDO prepared statement to send to database
try {

    $pdo = new PDO($dsn, $username, $password, $options);

    $query = "INSERT INTO user_input(
                    ime_input,
                    email_input,
                    Da_li_se_osećate_naduto_nakon_jela, 
                    Da_je_vaša_nadutost_teško_podnošljiva_ili_izuzetno_bolna, 
                    Imate_li_često_osećaj_kamena_u_stomaku,
                    Da_li_obavezno_morati_otkopčati_dugme_ili_popustiti_kaiš_nakon_j,
                    Da_li_često_imate_gasove,
                    Da_li_postoje_promene_u_učestalosti_pražnjenja_stolice_dijareja_,
                    Da_li_imate_ponavljajući_bol_u_stomaku_u_proseku_najmanje_1_dann,
                    Da_li_je_bol_povezan_sa_pražnjenjem,
                    Da_li_Vas_neprijatnost_u_stomaku_obavezuje_da_prestanete_sa_svoj,
                    Da_li_inače_u_toku_dana_osećate_nervozu_i_to_utiče_i_na_Vaš_stom
                ) 
                VALUES(
                    :ime, 
                    :email, 
                    :odgovor3, 
                    :odgovor4, 
                    :odgovor5, 
                    :odgovor6, 
                    :odgovor7, 
                    :odgovor8, 
                    :odgovor9, 
                    :odgovor10,
                    :odgovor11,
                    :odgovor12
                )";

    $statement = $pdo->prepare($query);

    $statement->bindParam(':odgovor3', $recived_array[0]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':odgovor4', $recived_array[1]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':odgovor5', $recived_array[2]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':odgovor6', $recived_array[3]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':odgovor7', $recived_array[4]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':odgovor8', $recived_array[5]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':odgovor9', $recived_array[6]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':odgovor10', $recived_array[7]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':odgovor11', $recived_array[8]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':odgovor12', $recived_array[9]['odgovor'], PDO::PARAM_STR);
    $statement->bindParam(':email', $recived_array[10]['inputValue'], PDO::PARAM_STR);
    $statement->bindParam(':ime', $recived_array[11]['inputValue'], PDO::PARAM_STR);

    $statement->execute();

} catch (PDOException $e) {

    echo "Error: " . $e->getMessage();
    
}
