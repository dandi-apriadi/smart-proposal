-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Jun 2025 pada 15.01
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sp`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` varchar(36) NOT NULL,
  `type` enum('proposal','system','document') NOT NULL,
  `action` varchar(50) NOT NULL,
  `user` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `timestamp` varchar(10) NOT NULL,
  `date` varchar(20) NOT NULL,
  `status` enum('success','warning','error','info') NOT NULL,
  `details` text DEFAULT NULL,
  `user_avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `budget_allocations`
--

CREATE TABLE `budget_allocations` (
  `id` varchar(36) NOT NULL,
  `session_id` varchar(20) NOT NULL,
  `department_id` varchar(36) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `allocation_date` datetime DEFAULT NULL,
  `allocated_by` varchar(36) NOT NULL,
  `status` enum('planned','allocated','utilized') NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `budget_categories`
--

CREATE TABLE `budget_categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(20) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `collaborators`
--

CREATE TABLE `collaborators` (
  `id` varchar(36) NOT NULL,
  `proposal_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `institution` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `departments`
--

CREATE TABLE `departments` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(20) NOT NULL,
  `parent_id` varchar(36) DEFAULT NULL,
  `head_id` varchar(36) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `documents`
--

CREATE TABLE `documents` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `size` varchar(20) NOT NULL,
  `format` varchar(20) NOT NULL,
  `upload_date` datetime DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `entity_type` enum('proposal','report','resource') NOT NULL,
  `entity_id` varchar(36) NOT NULL,
  `uploaded_by` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` varchar(36) NOT NULL,
  `entity_type` enum('proposal','report','final_report') NOT NULL,
  `entity_id` varchar(36) NOT NULL,
  `reviewer` varchar(100) NOT NULL,
  `section` varchar(50) DEFAULT NULL,
  `message` text NOT NULL,
  `date` datetime DEFAULT NULL,
  `status` enum('resolved','unresolved') NOT NULL DEFAULT 'unresolved',
  `response` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `final_reports`
--

CREATE TABLE `final_reports` (
  `id` varchar(36) NOT NULL,
  `proposal_id` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `abstract` text NOT NULL,
  `introduction` text DEFAULT NULL,
  `methodology` text DEFAULT NULL,
  `results` text DEFAULT NULL,
  `discussion` text DEFAULT NULL,
  `conclusion` text DEFAULT NULL,
  `references` text DEFAULT NULL,
  `submission_date` datetime DEFAULT NULL,
  `status` enum('draft','submitted','reviewed','approved','rejected') NOT NULL DEFAULT 'draft'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `financial_reports`
--

CREATE TABLE `financial_reports` (
  `id` varchar(20) NOT NULL,
  `proposal_id` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `report_type` enum('monthly','quarterly','session','final','audit') NOT NULL,
  `period` varchar(50) NOT NULL,
  `submitted_by` varchar(36) NOT NULL,
  `submission_date` datetime DEFAULT NULL,
  `status` enum('draft','submitted','verified','rejected') NOT NULL,
  `format` varchar(10) NOT NULL DEFAULT 'PDF',
  `verification_date` datetime DEFAULT NULL,
  `verified_by` varchar(36) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `fund_utilizations`
--

CREATE TABLE `fund_utilizations` (
  `id` varchar(20) NOT NULL,
  `proposal_id` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `researcher` varchar(100) NOT NULL,
  `faculty` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `submission_date` date NOT NULL,
  `amount_used` decimal(15,2) NOT NULL,
  `total_allocated` decimal(15,2) NOT NULL,
  `status` enum('Menunggu Verifikasi','Terverifikasi','Ditolak') NOT NULL,
  `notes` text DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `laporan_akhir_sessions`
--

CREATE TABLE `laporan_akhir_sessions` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `completion_date` datetime DEFAULT NULL,
  `total_proposals` int(11) DEFAULT NULL,
  `approved` int(11) DEFAULT NULL,
  `rejected` int(11) DEFAULT NULL,
  `revised` int(11) DEFAULT NULL,
  `approval_rate` decimal(5,2) DEFAULT NULL,
  `average_score` decimal(5,2) DEFAULT NULL,
  `average_review_time` varchar(20) DEFAULT NULL,
  `total_budget` varchar(50) DEFAULT NULL,
  `allocated_budget` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `ml_validations`
--

CREATE TABLE `ml_validations` (
  `id` varchar(36) NOT NULL,
  `proposal_id` varchar(20) NOT NULL,
  `accuracy` decimal(5,2) NOT NULL,
  `precision_score` decimal(5,2) NOT NULL,
  `recall` decimal(5,2) NOT NULL,
  `f1_score` decimal(5,2) NOT NULL,
  `false_positive_rate` decimal(5,2) DEFAULT NULL,
  `false_negative_rate` decimal(5,2) DEFAULT NULL,
  `validation_date` datetime DEFAULT NULL,
  `override_by` varchar(36) DEFAULT NULL,
  `override_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `proposals`
--

CREATE TABLE `proposals` (
  `id` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `session_id` varchar(20) NOT NULL,
  `department_id` varchar(36) NOT NULL,
  `status` enum('draft','submitted','under_review','approved','rejected','revision_required') NOT NULL,
  `ml_score` decimal(5,2) DEFAULT NULL,
  `budget` decimal(15,2) NOT NULL,
  `type` varchar(50) NOT NULL,
  `priority` enum('high','medium','low') NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `submitted_at` datetime DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `progress` int(11) NOT NULL DEFAULT 0,
  `reject_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `proposal_details`
--

CREATE TABLE `proposal_details` (
  `proposal_id` varchar(20) NOT NULL,
  `completeness` decimal(5,2) DEFAULT 0.00,
  `format` decimal(5,2) DEFAULT 0.00,
  `budget_validity` decimal(5,2) DEFAULT 0.00,
  `timeline_realism` decimal(5,2) DEFAULT 0.00,
  `innovation_score` decimal(5,2) DEFAULT 0.00,
  `feasibility_score` decimal(5,2) DEFAULT 0.00,
  `methodology_score` decimal(5,2) DEFAULT 0.00,
  `impact_score` decimal(5,2) DEFAULT 0.00,
  `sustainability_score` decimal(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `recent_activities`
--

CREATE TABLE `recent_activities` (
  `id` varchar(36) NOT NULL,
  `user` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `action` varchar(255) NOT NULL,
  `time` varchar(50) NOT NULL,
  `device` varchar(50) NOT NULL,
  `browser` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL,
  `timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `status` enum('completed','pending') NOT NULL,
  `department` varchar(100) NOT NULL,
  `download_count` int(11) NOT NULL DEFAULT 0,
  `file_size` varchar(10) NOT NULL,
  `file_type` varchar(10) NOT NULL,
  `author` varchar(100) NOT NULL,
  `last_modified` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(50) NOT NULL,
  `download_url` varchar(255) DEFAULT NULL,
  `date` varchar(20) NOT NULL,
  `size` varchar(10) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `reviews`
--

CREATE TABLE `reviews` (
  `id` varchar(36) NOT NULL,
  `proposal_id` varchar(20) NOT NULL,
  `reviewer_id` varchar(36) NOT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `recommendation` enum('approve','reject','revise') NOT NULL,
  `review_date` datetime DEFAULT NULL,
  `status` enum('pending','completed') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('qHID34ebR32uWfLSXs-wkFHFzKUjcbcD', '2025-06-15 17:52:13', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-15T16:12:09.820Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":\"4b0c4b5e-9c9e-4b1d-8d7a-8d7a8d7a8d7a\"}', '2025-06-14 15:52:53', '2025-06-14 17:52:13'),
('W7-7kM3R2Dm-CiRq_XFxHm9S4pSJRCGK', '2025-06-16 12:34:11', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-15T18:23:12.158Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":\"4b0c4b5e-9c9e-4b1d-8d7a-8d7a8d7a8d7a\"}', '2025-06-14 18:19:32', '2025-06-15 12:34:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` varchar(255) NOT NULL,
  `role` enum('admin','wadir','dosen','bendahara','reviewer') NOT NULL,
  `email` varchar(100) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `faculty` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `role`, `email`, `status`, `faculty`, `department`, `last_login`, `created_at`, `updated_at`, `username`, `password_hash`, `full_name`, `position`, `profile_image`) VALUES
('4b0c4b5e-9c9e-4b1d-8d7a-8d7a8d7a8d7a', 'wadir', 'dandigeming85@gmail.com', 'active', NULL, NULL, NULL, '2025-06-14 11:40:13', '2025-06-14 11:40:13', 'dandigeming85', '$argon2id$v=19$m=65536,t=3,p=4$aWY4hbrcTqRzEk1VuBHlJg$EyNj61XJIAp0n2JgpioGkmSOQfasMFN4Pzo12ZuUYG8', 'Dandi Mamonto', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `budget_allocations`
--
ALTER TABLE `budget_allocations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `budget_categories`
--
ALTER TABLE `budget_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indeks untuk tabel `collaborators`
--
ALTER TABLE `collaborators`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `code_2` (`code`),
  ADD UNIQUE KEY `code_3` (`code`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indeks untuk tabel `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `final_reports`
--
ALTER TABLE `final_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `financial_reports`
--
ALTER TABLE `financial_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `fund_utilizations`
--
ALTER TABLE `fund_utilizations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `laporan_akhir_sessions`
--
ALTER TABLE `laporan_akhir_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `ml_validations`
--
ALTER TABLE `ml_validations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `proposals`
--
ALTER TABLE `proposals`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `proposal_details`
--
ALTER TABLE `proposal_details`
  ADD PRIMARY KEY (`proposal_id`);

--
-- Indeks untuk tabel `recent_activities`
--
ALTER TABLE `recent_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `idx_users_username` (`username`),
  ADD UNIQUE KEY `idx_users_email` (`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `departments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
