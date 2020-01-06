-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2020 at 02:35 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laporaja`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_pengaduan`
--

CREATE TABLE `tb_pengaduan` (
  `id_pengaduan` int(11) NOT NULL,
  `id_user` varchar(250) NOT NULL,
  `deskripsi` text NOT NULL,
  `lokasi` text NOT NULL,
  `photo` varchar(250) DEFAULT NULL,
  `jenis_ajuan` text NOT NULL,
  `status` enum('0','1','2','3') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_pengaduan`
--

INSERT INTO `tb_pengaduan` (`id_pengaduan`, `id_user`, `deskripsi`, `lokasi`, `photo`, `jenis_ajuan`, `status`, `createdAt`, `updatedAt`) VALUES
(7, 'fe128930-55a8-4073-a487-a98983504d04', 'Listrik padam sudah 2 minggu', 'Cicalengka, Nagasari', 'http://res.cloudinary.com/erdinsuharyadi/image/upload/v1578307802/laporaja/pengaduan/xooe8x7k9heeczsfupn0.jpg', 'Listrik Padam', '1', '2020-01-06 10:50:03', '2020-01-06 10:50:03'),
(8, 'fe128930-55a8-4073-a487-a98983504d04', 'Jalan berlubang sudah 3 bulan lebih', 'Jl. nagasari karawang', 'http://res.cloudinary.com/erdinsuharyadi/image/upload/v1578310184/laporaja/pengaduan/vweo7eickosrijrafhb9.jpg', 'Jalan berlubang', '1', '2020-01-06 11:29:45', '2020-01-06 11:29:45');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id_user` varchar(250) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `password` varchar(250) NOT NULL,
  `full_name` varchar(250) NOT NULL,
  `no_ktp` varchar(30) NOT NULL,
  `address` text NOT NULL,
  `photo` varchar(250) DEFAULT NULL,
  `token` longtext,
  `level` enum('0','1') NOT NULL,
  `status` enum('0','1') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id_user`, `no_hp`, `password`, `full_name`, `no_ktp`, `address`, `photo`, `token`, `level`, `status`, `createdAt`, `updatedAt`) VALUES
('fe128930-55a8-4073-a487-a98983504d04', '081100001111', '$2a$10$ayT1Ud.iX0aQiqIgdkQUNOvVAP1cSm1Y2../GQSztNRIuaee.YTzG', 'Erdin Suharyadi', '1234567891011121314151', 'Jalan nagasari no 40', 'https://res.cloudinary.com/erdinsuharyadi/image/upload/v1577793878/hiringapp/assets/avatar.jpg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiZmUxMjg5MzAtNTVhOC00MDczLWE0ODctYTk4OTgzNTA0ZDA0Iiwibm9faHAiOiIwODExMDAwMDExMTEiLCJsZXZlbCI6IjEiLCJpYXQiOjE1NzgzMTU1MjUsImV4cCI6MTU3ODkyMDMyNX0.puUWG3NPAacYURfe0VoR63CVdT6QPjb0noqgfqE27Hc', '1', '1', '2020-01-06 12:58:45', '2020-01-06 12:58:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_pengaduan`
--
ALTER TABLE `tb_pengaduan`
  ADD PRIMARY KEY (`id_pengaduan`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `no_hp` (`no_hp`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_pengaduan`
--
ALTER TABLE `tb_pengaduan`
  MODIFY `id_pengaduan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
