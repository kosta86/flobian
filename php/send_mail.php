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


function setup_phpmailer()
{
  require '/home/kostajov/vendor/phpmailer/phpmailer/src/PHPMailer.php';
  require '/home/kostajov/vendor/phpmailer/phpmailer/src/SMTP.php';
  require '/home/kostajov/vendor/phpmailer/phpmailer/src/Exception.php';
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
  $mail->SMTPDebug = 2;                     // Enable verbose debug output
  $mail->Debugoutput = 'error_log';
  $mail->SMTPSecure = 'ssl';
  $mail->isSMTP();                                            // Send using SMTP
  $mail->Host       = 'kostajovanovic.a2hosted.com';                    // Set the SMTP server to send through
  $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
  $mail->Username   = 'keto@kostajovanovic.a2hosted.com';                     // SMTP username
  $mail->Password   = 'Keto12345678*';                                      // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
  $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

  
  return $mail;
}
$mail = setup_phpmailer();




function send_subscription_mail($mail, $recived_array)
{
  $user_email = $recived_array[11]['inputValue'];
  $user_ime = $recived_array[10]['inputValue'];
  $user_telefon = $recived_array[12]['inputValue'];
  $broj_pozitivnih_odgovora = $recived_array[14]['brojPozitivnihOdgovora'];


  function send_mail_plan_to_subscribers($user_ime, $user_email, $user_telefon, $broj_pozitivnih_odgovora, $mail)
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
                                <strong><p>Ime</p></strong>
                                <p>". $user_ime."</p>
                              </div>
                              </ br style='border: 1px solid black'>
                              <div>
                                <strong><p>E-mail</p></strong>
                                <p>".$user_email."</p>
                              </div>
                              <div>
                                <strong><p>Telefon</p></strong>
                                <p>"."$user_telefon"."</p>
                              </div>
                              <div>
                                <strong><p>Br. 'DA' odgovora</p></strong>
                                <p>".$broj_pozitivnih_odgovora."/10</p>
                              </div>
                                
                            </body>
                        </html>";



      //Recipients
      $mail->setFrom('flobian@kostajovanovic.a2hosted.com');
      $mail->addAddress('kosta.jovanovic86@gmail.com', $user_ime);     // Add a recipient

      // Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = 'UČESTVUJ U IZAZOVU - prijava';
      $mail->Body    = $html;
      $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

      

      $mail->send();
      echo 'Message has been sent';
  }
  send_mail_plan_to_subscribers($user_ime, $user_email, $user_telefon, $broj_pozitivnih_odgovora, $mail);
}


// send mail with link to customized meal plan
send_subscription_mail($mail, $recived_array);