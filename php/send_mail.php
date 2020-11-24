<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include_once('send_mail.php');
include_once('db-conn.php');
// Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function



$requestPayload = file_get_contents("php://input");
$recived_array = json_decode($requestPayload, true);



/* if (isset($_POST) && !empty($_POST)) {

  // post data from pitanje.js fetch API
  $user_ime = $_POST["ime"];
  $user_email = $_POST["email"];
  $user_kalorije = round($_POST["kalorije"]);
  $user_iskljucene_namirnice = $_POST["iskljucene_namirnice"];

} */

var_dump(dirname(__DIR__));
function setup_phpmailer()
{
  require '/public_html/wp-includes/PHPMailer/PHPMailer.php';
  require '/public_html/wp-includes/PHPMailer/SMTP.php';
  require '/public_html/wp-includes/PHPMailer/Exception.php';
  /*  require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
  require '../vendor/phpmailer/phpmailer/src/SMTP.php';
  require '../vendor/phpmailer/phpmailer/src/Exception.php'; */

  // Instantiation and passing `true` enables exceptions
  $mail = new PHPMailer(true);



  //Server settings
  $mail->SMTPOptions = array(
    'ssl' => array(
      'verify_peer' => false,
      'verify_peer_name' => false,
      'allow_self_signed' => true
    )
  );
  $mail->SMTPDebug = 2;                                       // Enable verbose debug output
  $mail->Debugoutput = 'error_log';
  $mail->SMTPSecure = 'ssl';
  $mail->isSMTP();                                            // Send using SMTP
  $mail->Host       = 'mail.flobian.com';          // Set the SMTP server to send through
  $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
  $mail->Username   = 'kontakt@flobian.com';     // SMTP username
  $mail->Password   = 'sk8ordiehard!';                        // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
  $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above


  return $mail;
}
$mail = setup_phpmailer();





$user_email = $email = filter_var($recived_array[11]['inputValue'], FILTER_SANITIZE_EMAIL);
$user_ime = filter_var($recived_array[10]['inputValue'], FILTER_SANITIZE_STRING);
$user_telefon = filter_var($recived_array[12]['inputValue'], FILTER_SANITIZE_STRING);
$broj_pozitivnih_odgovora = filter_var($recived_array[14]['brojPozitivnihOdgovora'], FILTER_SANITIZE_STRING);
date_default_timezone_set("Europe/Belgrade");
$vreme_unosa = date("d/m/Y H:i");



function send_mail_plan_to_subscribers($user_ime, $user_email, $user_telefon, $broj_pozitivnih_odgovora, $vreme_unosa, $mail)
{
  $html = "<!DOCTYPE html>
                        <html lang='en'>
                            <head>
                                <meta charset='UTF-8'>
                                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                                <title>UČESTVUJ U IZAZOVU - prijava</title>
                            </head>
                            <body>
                              <div>
                              <hr>
                                <strong><p>Ime:</p></strong>
                                <p>" . $user_ime . "</p>
                              </div>
                              <hr>
                              <div>
                                <strong><p>E-mail:</p></strong>
                                <p>" . $user_email . "</p>
                              </div>
                              <hr>
                              <div>
                                <strong><p>Telefon:</p></strong>
                                <p>" . "$user_telefon" . "</p>
                              </div>
                              <hr>
                              <div>
                                <strong><p>Br. 'DA' odgovora:</p></strong>
                                <p>" . "$broj_pozitivnih_odgovora" . "/10</p>
                              </div>
                              <div>
                                <strong><p>Vreme unosa:</p></strong>
                                <p>" . "$vreme_unosa" . "/10</p>
                              </div>
                              <hr>
                            </body>
                        </html>";



  //Recipients
  $mail->setFrom('flobian-kviz@flobian.com');
  $mail->addAddress('poruci@proton.rs', 'flobian-kviz');     // Add a recipient

  // Content
  $mail->isHTML(true);                                  // Set email format to HTML
  $mail->Subject = 'UČESTVUJ U IZAZOVU - prijava';
  $mail->Body    = $html;
  $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';



  $mail->send();
  echo 'Message has been sent';
}

send_mail_plan_to_subscribers($user_ime, $user_email, $user_telefon, $broj_pozitivnih_odgovora, $vreme_unosa, $mail);
