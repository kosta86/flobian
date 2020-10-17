<?php

$host = '157.230.121.178';
$dbname = 'MagnalKviz';
$charset = 'utf8mb4';

$username = 'root';
$password = 'kosta1986';
$options = [
			PDO::ATTR_ERRMODE 			 => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false,
		   ];
$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset;";
?>