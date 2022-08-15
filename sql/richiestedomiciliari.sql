-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Ago 15, 2022 alle 17:38
-- Versione del server: 10.5.15-MariaDB-0+deb11u1
-- Versione PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `richiestedomiciliari`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `assistiti`
--

CREATE TABLE `assistiti` (
  `id` int(11) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `cognome` varchar(60) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `indirizzo` text NOT NULL,
  `codicefiscale` varchar(16) NOT NULL,
  `note` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `assistiti`
--

INSERT INTO `assistiti` (`id`, `nome`, `cognome`, `telefono`, `email`, `indirizzo`, `codicefiscale`, `note`, `is_active`) VALUES
(1, 'Ivo', 'Pugliese', '3935397897', 'elsoft74@gmail.com', 'Via della liberta\' 15 - Roccella Jonica (RC)', 'PGLVIO74M20H224C', 'Inserimento di test', 1),
(2, 'IVO', 'PUGLIESE', '3431234242', 'a@b.com', 'VIA DI CASA MIA', 'PAG', 'Do Re Mi ', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `priorita`
--

CREATE TABLE `priorita` (
  `id` int(11) NOT NULL,
  `descrizione` varchar(10) NOT NULL,
  `valore` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `priorita`
--

INSERT INTO `priorita` (`id`, `descrizione`, `valore`, `is_active`) VALUES
(1, 'Verde', 1, 1),
(2, 'Giallo', 2, 1),
(3, 'Rosso', 3, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `richieste`
--

CREATE TABLE `richieste` (
  `id` int(11) NOT NULL,
  `id_assistito` int(11) NOT NULL,
  `id_tipologia` int(11) NOT NULL,
  `id_priorita` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `note` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `last_update` timestamp NULL DEFAULT NULL,
  `last_update_by` int(11) DEFAULT NULL,
  `deleted_date` timestamp NULL DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `richieste`
--

INSERT INTO `richieste` (`id`, `id_assistito`, `id_tipologia`, `id_priorita`, `data`, `note`, `is_active`, `created`, `created_by`, `last_update`, `last_update_by`, `deleted_date`, `deleted_by`) VALUES
(1, 2, 2, 1, '2022-08-15 00:00:00', 'Richiesta aggiornata', 1, '2022-08-14 21:24:18', 1, '2022-08-15 14:18:20', 1, NULL, NULL),
(2, 2, 1, 2, '2022-08-17 00:00:00', 'bbnam', 0, '2022-08-15 08:46:28', 1, NULL, NULL, '2022-08-15 14:51:39', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `descrizione` varchar(20) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1,
  `permissions` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `roles`
--

INSERT INTO `roles` (`id`, `descrizione`, `is_active`, `permissions`) VALUES
(1, 'Admin', 1, '{\"canViewDetails\":true,\"canCreateUser\":true,\"canEditUser\":true,\"canDeleteUser\":true,\"canCreateAssistito\":true,\"canEditAssistito\":true,\"canDeleteAssistito\":true,\"canCreateRequest\":true,\"canDeleteRequest\":true,\"canEditRequest\":true}'),
(2, 'Operatore', 1, '{\"canViewDetails\":false,\"canCreateUser\":false,\"canEditUser\":false,\"canDeleteUser\":false,\"canCreateAssistito\":true,\"canEditAssistito\":true,\"canDeleteAssistito\":false,\"canCreateRequest\":true,\"canDeleteRequest\":false,\"canEditRequest\":true}');

-- --------------------------------------------------------

--
-- Struttura della tabella `tipologie`
--

CREATE TABLE `tipologie` (
  `id` int(11) NOT NULL,
  `descrizione` varchar(30) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `tipologie`
--

INSERT INTO `tipologie` (`id`, `descrizione`, `is_active`) VALUES
(1, 'Vaccinazione', 1),
(2, 'Visita', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `cognome` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(64) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `nome`, `cognome`, `username`, `email`, `password`, `is_active`, `role_id`) VALUES
(1, 'Ivo', 'Pugliese', 'iwok', 'ivo@ivopugliese.it', '27b1c75f7de9997ec5a2ac654e8a7c85cfab3d6221b2ed1b5bf80a2c708c9e4e', 1, 1),
(4, 'a', 'a', 'iwok2', 'sa', 'fa1de4364cfd94d75e7bda5d0583bcb136d6437c88a36dc06bcd64566a3530ae', 0, 1),
(5, 'i', 'p', 'iwokop', 'elsoft74@gmail.com', '27b1c75f7de9997ec5a2ac654e8a7c85cfab3d6221b2ed1b5bf80a2c708c9e4e', 1, 2);

-- --------------------------------------------------------

--
-- Struttura stand-in per le viste `vista_richieste`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `vista_richieste` (
`id_assistito` int(11)
,`nome` varchar(60)
,`cognome` varchar(60)
,`email` varchar(50)
,`indirizzo` text
,`codicefiscale` varchar(16)
,`note_assistito` text
,`assistito_is_active` tinyint(1)
,`telefono` varchar(10)
,`id_richiesta` int(11)
,`id_tipologia` int(11)
,`id_priorita` int(11)
,`data` datetime
,`note_richiesta` text
,`richiesta_is_active` tinyint(1)
,`created` timestamp
,`created_by` int(11)
,`last_update` timestamp
,`last_update_by` int(11)
,`deleted_date` timestamp
,`deleted_by` int(11)
);

-- --------------------------------------------------------

--
-- Struttura per vista `vista_richieste`
--
DROP TABLE IF EXISTS `vista_richieste`;

CREATE ALGORITHM=UNDEFINED DEFINER=`miniced`@`localhost` SQL SECURITY DEFINER VIEW `vista_richieste`  AS SELECT `a`.`id` AS `id_assistito`, `a`.`nome` AS `nome`, `a`.`cognome` AS `cognome`, `a`.`email` AS `email`, `a`.`indirizzo` AS `indirizzo`, `a`.`codicefiscale` AS `codicefiscale`, `a`.`note` AS `note_assistito`, `a`.`is_active` AS `assistito_is_active`, `a`.`telefono` AS `telefono`, `r`.`id` AS `id_richiesta`, `r`.`id_tipologia` AS `id_tipologia`, `r`.`id_priorita` AS `id_priorita`, `r`.`data` AS `data`, `r`.`note` AS `note_richiesta`, `r`.`is_active` AS `richiesta_is_active`, `r`.`created` AS `created`, `r`.`created_by` AS `created_by`, `r`.`last_update` AS `last_update`, `r`.`last_update_by` AS `last_update_by`, `r`.`deleted_date` AS `deleted_date`, `r`.`deleted_by` AS `deleted_by` FROM (`assistiti` `a` left join `richieste` `r` on(`a`.`id` = `r`.`id_assistito`)) WHERE `a`.`is_active` = 1 ;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `assistiti`
--
ALTER TABLE `assistiti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cf` (`codicefiscale`);

--
-- Indici per le tabelle `priorita`
--
ALTER TABLE `priorita`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `richieste`
--
ALTER TABLE `richieste`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_richiesta_assistito` (`id_assistito`),
  ADD KEY `fk_richiesta_tipologia` (`id_tipologia`),
  ADD KEY `fk_richiesta_priorita` (`id_priorita`),
  ADD KEY `fk_richiesta_created` (`created_by`),
  ADD KEY `fk_richesta_updated` (`last_update_by`),
  ADD KEY `fk_richiesta_deleted` (`deleted_by`);

--
-- Indici per le tabelle `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `tipologie`
--
ALTER TABLE `tipologie`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usrname` (`username`),
  ADD KEY `fk_users_roles` (`role_id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `assistiti`
--
ALTER TABLE `assistiti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `priorita`
--
ALTER TABLE `priorita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `richieste`
--
ALTER TABLE `richieste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `tipologie`
--
ALTER TABLE `tipologie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `richieste`
--
ALTER TABLE `richieste`
  ADD CONSTRAINT `fk_richesta_updated` FOREIGN KEY (`last_update_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_richiesta_assistito` FOREIGN KEY (`id_assistito`) REFERENCES `assistiti` (`id`),
  ADD CONSTRAINT `fk_richiesta_created` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_richiesta_deleted` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_richiesta_priorita` FOREIGN KEY (`id_priorita`) REFERENCES `priorita` (`id`),
  ADD CONSTRAINT `fk_richiesta_tipologia` FOREIGN KEY (`id_tipologia`) REFERENCES `tipologie` (`id`);

--
-- Limiti per la tabella `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
