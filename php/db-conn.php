<?php

$host = 'flobian.com';
$dbname = 'flobianc_kviz';
$charset = 'utf8mb4';

$username = 'flobianc_kvizuser';
$password = '_W?aQ(lLiLj$';
$options = [
			PDO::ATTR_ERRMODE 			 => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false,
		   ];
$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset;";

?>