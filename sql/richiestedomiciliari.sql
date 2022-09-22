-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Set 15, 2022 alle 14:10
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
CREATE DATABASE IF NOT EXISTS `richiestedomiciliari` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `richiestedomiciliari`;

-- --------------------------------------------------------

--
-- Struttura della tabella `assistiti`
--

CREATE TABLE `assistiti` (
  `id` int(11) NOT NULL,
  `id_usca` int(11) DEFAULT NULL,
  `nome` varchar(60) NOT NULL,
  `cognome` varchar(60) NOT NULL,
  `telefono1` varchar(10) NOT NULL,
  `telefono2` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `indirizzo` text NOT NULL,
  `codicefiscale` varchar(16) NOT NULL,
  `note` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `nascita` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELAZIONI PER TABELLA `assistiti`:
--   `id_usca`
--       `usca` -> `id`
--

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
-- RELAZIONI PER TABELLA `priorita`:
--

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
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `last_update` timestamp NULL DEFAULT NULL,
  `last_update_by` int(11) DEFAULT NULL,
  `deleted_date` timestamp NULL DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `archived_date` timestamp NULL DEFAULT NULL,
  `archived_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELAZIONI PER TABELLA `richieste`:
--   `last_update_by`
--       `users` -> `id`
--   `archived_by`
--       `users` -> `id`
--   `id_assistito`
--       `assistiti` -> `id`
--   `created_by`
--       `users` -> `id`
--   `deleted_by`
--       `users` -> `id`
--   `id_priorita`
--       `priorita` -> `id`
--   `id_tipologia`
--       `tipologie` -> `id`
--

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
-- RELAZIONI PER TABELLA `roles`:
--

--
-- Dump dei dati per la tabella `roles`
--

INSERT INTO `roles` (`id`, `descrizione`, `is_active`, `permissions`) VALUES
(1, 'Admin', 1, '{\"canViewDetails\":true,\"canCreateUser\":true,\"canEditUser\":true,\"canDeleteUser\":true,\"canCreateAssistito\":true,\"canEditAssistito\":true,\"canDeleteAssistito\":true,\"canCreateRequest\":true,\"canDeleteRequest\":true,\"canEditRequest\":true,\"canExport\":true,\"canViewAllRequests\":true,\"canArchiveRequest\":true,\"canUploadSwabs\":true}'),
(2, 'Operatore', 1, '{\"canViewDetails\":false,\"canCreateUser\":false,\"canEditUser\":false,\"canDeleteUser\":false,\"canCreateAssistito\":true,\"canEditAssistito\":true,\"canDeleteAssistito\":false,\"canCreateRequest\":true,\"canDeleteRequest\":false,\"canEditRequest\":true,\"canExport\":false,\"canViewAllRequests\":false,\"canArchiveRequest\":true}');

-- --------------------------------------------------------

--
-- Struttura della tabella `stati_tamponi`
--

CREATE TABLE `stati_tamponi` (
  `id` int(11) NOT NULL,
  `descrizione` varchar(30) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELAZIONI PER TABELLA `stati_tamponi`:
--

--
-- Dump dei dati per la tabella `stati_tamponi`
--

INSERT INTO `stati_tamponi` (`id`, `descrizione`, `is_active`) VALUES
(1, 'DA PROGRAMMARE', 1),
(2, 'PROGRAMMATO', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `tamponi`
--

CREATE TABLE `tamponi` (
  `id` int(11) NOT NULL,
  `id_assistito` int(11) NOT NULL,
  `data_esecuzione` datetime NOT NULL,
  `data_consigliata` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `status` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `last_update_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_update` timestamp NULL DEFAULT NULL,
  `deleted_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELAZIONI PER TABELLA `tamponi`:
--   `id_assistito`
--       `assistiti` -> `id`
--   `status`
--       `stati_tamponi` -> `id`
--

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
-- RELAZIONI PER TABELLA `tipologie`:
--

--
-- Dump dei dati per la tabella `tipologie`
--

INSERT INTO `tipologie` (`id`, `descrizione`, `is_active`) VALUES
(1, 'Vaccinazione', 1),
(2, 'Visita', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `usca`
--

CREATE TABLE `usca` (
  `id` int(11) NOT NULL,
  `descrizione` varchar(35) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELAZIONI PER TABELLA `usca`:
--

--
-- Dump dei dati per la tabella `usca`
--

INSERT INTO `usca` (`id`, `descrizione`, `is_active`) VALUES
(1, 'Messina Nord', 1),
(2, 'Messina Sud', 1);

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
  `role_id` int(11) NOT NULL,
  `id_usca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELAZIONI PER TABELLA `users`:
--   `role_id`
--       `roles` -> `id`
--

-- --------------------------------------------------------

--
-- Struttura stand-in per le viste `vista_assistiti`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `vista_assistiti` (
`id_assistito` int(11)
,`nome` varchar(60)
,`cognome` varchar(60)
,`email` varchar(50)
,`indirizzo` text
,`codicefiscale` varchar(16)
,`note_assistito` text
,`assistito_is_active` tinyint(1)
,`telefono1` varchar(10)
,`telefono2` varchar(10)
,`nascita` datetime
,`id_usca` int(11)
,`usca` varchar(35)
);

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
,`telefono1` varchar(10)
,`telefono2` varchar(10)
,`nascita` datetime
,`id_usca` int(11)
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
,`is_archived` tinyint(1)
,`usca` varchar(35)
,`tipologia` varchar(30)
,`priorita` varchar(10)
);

-- --------------------------------------------------------

--
-- Struttura stand-in per le viste `vista_tamponi`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `vista_tamponi` (
`id_assistito` int(11)
,`nome` varchar(60)
,`cognome` varchar(60)
,`email` varchar(50)
,`indirizzo` text
,`codicefiscale` varchar(16)
,`note_assistito` text
,`assistito_is_active` tinyint(1)
,`telefono1` varchar(10)
,`telefono2` varchar(10)
,`nascita` datetime
,`id_usca` int(11)
,`id_tampone` int(11)
,`data_esecuzione` datetime
,`data_consigliata` datetime
,`tampone_is_active` tinyint(1)
,`id_status` int(11)
,`status` varchar(30)
,`created` timestamp
,`created_by` int(11)
,`last_update` timestamp
,`last_update_by` int(11)
,`usca` varchar(35)
);

-- --------------------------------------------------------

--
-- Struttura per vista `vista_assistiti`
--
DROP TABLE IF EXISTS `vista_assistiti`;

CREATE OR REPLACE ALGORITHM=UNDEFINED DEFINER=`miniced`@`localhost` SQL SECURITY DEFINER VIEW `vista_assistiti`  AS SELECT `a`.`id` AS `id_assistito`, `a`.`nome` AS `nome`, `a`.`cognome` AS `cognome`, `a`.`email` AS `email`, `a`.`indirizzo` AS `indirizzo`, `a`.`codicefiscale` AS `codicefiscale`, `a`.`note` AS `note_assistito`, `a`.`is_active` AS `assistito_is_active`, `a`.`telefono1` AS `telefono1`, `a`.`telefono2` AS `telefono2`, `a`.`nascita` AS `nascita`, `a`.`id_usca` AS `id_usca`, `u`.`descrizione` AS `usca` FROM (`assistiti` `a` left join `usca` `u` on(`a`.`id_usca` = `u`.`id`)) WHERE `a`.`is_active` = 1 ;

-- --------------------------------------------------------

--
-- Struttura per vista `vista_richieste`
--
DROP TABLE IF EXISTS `vista_richieste`;

CREATE OR REPLACE ALGORITHM=UNDEFINED DEFINER=`miniced`@`localhost` SQL SECURITY DEFINER VIEW `vista_richieste`  AS SELECT `a`.`id` AS `id_assistito`, `a`.`nome` AS `nome`, `a`.`cognome` AS `cognome`, `a`.`email` AS `email`, `a`.`indirizzo` AS `indirizzo`, `a`.`codicefiscale` AS `codicefiscale`, `a`.`note` AS `note_assistito`, `a`.`is_active` AS `assistito_is_active`, `a`.`telefono1` AS `telefono1`, `a`.`telefono2` AS `telefono2`, `a`.`nascita` AS `nascita`, `a`.`id_usca` AS `id_usca`, `r`.`id` AS `id_richiesta`, `r`.`id_tipologia` AS `id_tipologia`, `r`.`id_priorita` AS `id_priorita`, `r`.`data` AS `data`, `r`.`note` AS `note_richiesta`, `r`.`is_active` AS `richiesta_is_active`, `r`.`created` AS `created`, `r`.`created_by` AS `created_by`, `r`.`last_update` AS `last_update`, `r`.`last_update_by` AS `last_update_by`, `r`.`is_archived` AS `is_archived`, `u`.`descrizione` AS `usca`, `t`.`descrizione` AS `tipologia`, `p`.`descrizione` AS `priorita` FROM ((((`assistiti` `a` join `richieste` `r` on(`a`.`id` = `r`.`id_assistito`)) left join `usca` `u` on(`a`.`id_usca` = `u`.`id`)) left join `tipologie` `t` on(`r`.`id_tipologia` = `t`.`id`)) left join `priorita` `p` on(`r`.`id_priorita` = `p`.`id`)) WHERE `a`.`is_active` = 1 ;

-- --------------------------------------------------------

--
-- Struttura per vista `vista_tamponi`
--
DROP TABLE IF EXISTS `vista_tamponi`;

CREATE OR REPLACE ALGORITHM=UNDEFINED DEFINER=`miniced`@`localhost` SQL SECURITY DEFINER VIEW `vista_tamponi`  AS SELECT `a`.`id` AS `id_assistito`, `a`.`nome` AS `nome`, `a`.`cognome` AS `cognome`, `a`.`email` AS `email`, `a`.`indirizzo` AS `indirizzo`, `a`.`codicefiscale` AS `codicefiscale`, `a`.`note` AS `note_assistito`, `a`.`is_active` AS `assistito_is_active`, `a`.`telefono1` AS `telefono1`, `a`.`telefono2` AS `telefono2`, `a`.`nascita` AS `nascita`, `a`.`id_usca` AS `id_usca`, `t`.`id` AS `id_tampone`, `t`.`data_esecuzione` AS `data_esecuzione`, `t`.`data_consigliata` AS `data_consigliata`, `t`.`is_active` AS `tampone_is_active`, `t`.`status` AS `id_status`, `s`.`descrizione` AS `status`, `t`.`created` AS `created`, `t`.`created_by` AS `created_by`, `t`.`last_update` AS `last_update`, `t`.`last_update_by` AS `last_update_by`, `u`.`descrizione` AS `usca` FROM (((`assistiti` `a` join `tamponi` `t` on(`a`.`id` = `t`.`id_assistito`)) left join `stati_tamponi` `s` on(`t`.`status` = `s`.`id`)) left join `usca` `u` on(`a`.`id_usca` = `u`.`id`)) WHERE `a`.`is_active` = 1 ;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `assistiti`
--
ALTER TABLE `assistiti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cf` (`codicefiscale`),
  ADD KEY `ndx_user_usca` (`id_usca`);

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
  ADD KEY `fk_richiesta_deleted` (`deleted_by`),
  ADD KEY `fk_richiesta_archived` (`archived_by`);

--
-- Indici per le tabelle `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `stati_tamponi`
--
ALTER TABLE `stati_tamponi`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `tamponi`
--
ALTER TABLE `tamponi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_assistito` (`id_assistito`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `last_update_by` (`last_update_by`),
  ADD KEY `deleted_by` (`deleted_by`),
  ADD KEY `fk_tampone_status` (`status`);

--
-- Indici per le tabelle `tipologie`
--
ALTER TABLE `tipologie`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `usca`
--
ALTER TABLE `usca`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `priorita`
--
ALTER TABLE `priorita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `richieste`
--
ALTER TABLE `richieste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `stati_tamponi`
--
ALTER TABLE `stati_tamponi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `tamponi`
--
ALTER TABLE `tamponi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tipologie`
--
ALTER TABLE `tipologie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `usca`
--
ALTER TABLE `usca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `assistiti`
--
ALTER TABLE `assistiti`
  ADD CONSTRAINT `fk_user_usca` FOREIGN KEY (`id_usca`) REFERENCES `usca` (`id`);

--
-- Limiti per la tabella `richieste`
--
ALTER TABLE `richieste`
  ADD CONSTRAINT `fk_richesta_updated` FOREIGN KEY (`last_update_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_richiesta_archived` FOREIGN KEY (`archived_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_richiesta_assistito` FOREIGN KEY (`id_assistito`) REFERENCES `assistiti` (`id`),
  ADD CONSTRAINT `fk_richiesta_created` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_richiesta_deleted` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_richiesta_priorita` FOREIGN KEY (`id_priorita`) REFERENCES `priorita` (`id`),
  ADD CONSTRAINT `fk_richiesta_tipologia` FOREIGN KEY (`id_tipologia`) REFERENCES `tipologie` (`id`);

--
-- Limiti per la tabella `tamponi`
--
ALTER TABLE `tamponi`
  ADD CONSTRAINT `fk_assistito_tampone` FOREIGN KEY (`id_assistito`) REFERENCES `assistiti` (`id`),
  ADD CONSTRAINT `fk_tampone_status` FOREIGN KEY (`status`) REFERENCES `stati_tamponi` (`id`);

--
-- Limiti per la tabella `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
