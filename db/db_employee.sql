-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2023 at 06:00 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_employee`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee_list`
--

CREATE TABLE `employee_list` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `position` varchar(255) NOT NULL,
  `salary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_list`
--

INSERT INTO `employee_list` (`id`, `first_name`, `last_name`, `age`, `position`, `salary`) VALUES
(3, 'John', 'Doe', 30, 'Manager', 60000),
(4, 'Jane', 'Smith', 25, 'Developer', 50000),
(5, 'Alice', 'Johnson', 28, 'Designer', 55000),
(6, 'Bob', 'Williams', 35, 'Analyst', 58000),
(7, 'Eva', 'Brown', 32, 'Marketing', 57000),
(8, 'Michael', 'Jones', 27, 'Engineer', 52000),
(9, 'Emily', 'Davis', 29, 'Sales', 54000),
(10, 'William', 'Miller', 31, 'HR', 56000),
(11, 'Olivia', 'Wilson', 35, 'Accountant', 75000),
(12, 'Daniel', 'Taylor', 33, 'Operations', 61000),
(13, 'Sophia', 'Martinez', 34, 'Research', 62000),
(14, 'Alexander', 'Anderson', 30, 'Finance', 63000),
(15, 'Jack', 'Brown', 28, 'Engineer', 62000),
(16, 'Sophie', 'Johnson', 26, 'Developer', 55000),
(17, 'Emma', 'Williams', 29, 'Analyst', 58000),
(18, 'Oliver', 'Martinez', 32, 'Manager', 60000),
(19, 'Charlotte', 'Anderson', 31, 'Designer', 57000),
(20, 'Henry', 'Taylor', 30, 'Marketing', 59000),
(21, 'Grace', 'Davis', 27, 'Sales', 54000),
(22, 'Lucas', 'Miller', 33, 'HR', 60000),
(23, 'Lily', 'Wilson', 25, 'Accountant', 61000),
(24, 'Oscar', 'Jones', 34, 'Operations', 63000),
(25, 'Ava', 'Smith', 35, 'Research', 64000),
(26, 'Noah', 'Brown', 29, 'Finance', 70000),
(27, 'Elijah', 'Harris', 27, 'Engineer', 62000),
(28, 'Mia', 'Scott', 30, 'Developer', 55000),
(29, 'Evelyn', 'Adams', 34, 'Analyst', 60000),
(65, 'Jame', 'Collin', 22, 'Junior Developer', 35000),
(67, 'Geek', 'Laventine', 25, 'Developer', 35000);

-- --------------------------------------------------------

--
-- Table structure for table `employee_list_user`
--

CREATE TABLE `employee_list_user` (
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(300) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_list_user`
--

INSERT INTO `employee_list_user` (`username`, `email`, `password`, `id`) VALUES
('someone1', 'someone1@gmail.com', '$2b$10$cVJbVMIh6URPpYmVGrTqEee2nUUZHXNVtAWBLf46fql1PBMjTtOGi', 4),
('someone2', 'someone2@gmail.com', '$2b$10$ZZdBIQHzvKRFhKAWZ3p9peVUQ8XEaCUdGcCnG31pbuAH4Fil0diQi', 5),
('someone3', 'someone3@gmail.com', '$2b$10$zB0/IsGvpQLZRR2epYgDceBEwMgsqrLAo/og2KTlJ7ToWi4ES978S', 6),
('someone4', 'someone4@gmail.com', '$2b$10$XY1Nhixnei6KRsPg9hKE6uWqre3wPtjH/tC6l6qzHXTmxtHsWYm62', 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee_list`
--
ALTER TABLE `employee_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_list_user`
--
ALTER TABLE `employee_list_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee_list`
--
ALTER TABLE `employee_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `employee_list_user`
--
ALTER TABLE `employee_list_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
