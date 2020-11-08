-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2020 at 04:03 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flobian_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_input`
--

CREATE TABLE `user_input` (
  `id` int(11) NOT NULL,
  `ime_input` varchar(99) NOT NULL,
  `email_input` varchar(99) NOT NULL,
  `telefon_input` text NOT NULL,
  `vreme_unosa` text NOT NULL,
  `Lokacija` varchar(99) NOT NULL,
  `Da_li_se_osećate_naduto_nakon_jela` text NOT NULL,
  `Da_je_vaša_nadutost_teško_podnošljiva_ili_izuzetno_bolna` text NOT NULL,
  `Imate_li_često_osećaj_kamena_u_stomaku` text NOT NULL,
  `Da_li_obavezno_morati_otkopčati_dugme_ili_popustiti_kaiš_nakon_j` text NOT NULL,
  `Da_li_često_imate_gasove` text NOT NULL,
  `Da_li_postoje_promene_u_učestalosti_pražnjenja_stolice_dijareja_` text NOT NULL,
  `Da_li_imate_ponavljajući_bol_u_stomaku_u_proseku_najmanje_1_dann` text NOT NULL,
  `Da_li_je_bol_povezan_sa_pražnjenjem` text NOT NULL,
  `Da_li_Vas_neprijatnost_u_stomaku_obavezuje_da_prestanete_sa_svoj` text NOT NULL,
  `Da_li_inače_u_toku_dana_osećate_nervozu_i_to_utiče_i_na_Vaš_stom` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_input`
--
ALTER TABLE `user_input`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_input`
--
ALTER TABLE `user_input`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
