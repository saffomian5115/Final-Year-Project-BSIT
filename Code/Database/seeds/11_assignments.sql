-- =====================================================
-- SEED 11: ASSIGNMENTS + SUBMISSIONS
-- =====================================================
USE AI_Driven_Smart_LMS;

-- ── Assignments ──────────────────────────────────────
INSERT INTO assignments
  (id, offering_id, title, description, total_marks, weightage_percent, due_date, file_required, allowed_file_types, plagiarism_check, created_by)
VALUES
-- Offering 1 (Web Technologies)
(1, 1, 'Assignment 1 - HTML Portfolio Page',
 'Create a personal portfolio page using HTML and CSS. Include sections for About, Skills, and Contact.',
 20, 10.00, '2025-02-15 23:59:00', TRUE, '.html,.zip', FALSE, 5),

(2, 1, 'Assignment 2 - CSS Responsive Layout',
 'Design a fully responsive webpage using Flexbox and Grid. Must work on mobile and desktop.',
 20, 10.00, '2025-03-01 23:59:00', TRUE, '.html,.css,.zip', TRUE, 5),

(3, 1, 'Assignment 3 - JavaScript Form Validation',
 'Build a registration form with complete client-side validation using JavaScript.',
 30, 15.00, '2025-03-20 23:59:00', TRUE, '.html,.js,.zip', TRUE, 5),

-- Offering 2 (Computer Networks)
(4, 2, 'Assignment 1 - OSI Model Report',
 'Write a detailed report explaining all 7 layers of the OSI model with real-world examples.',
 25, 10.00, '2025-02-20 23:59:00', TRUE, '.pdf,.docx', FALSE, 6),

(5, 2, 'Assignment 2 - Subnetting Practice',
 'Solve 10 subnetting problems. Show all working steps for each problem.',
 25, 10.00, '2025-03-10 23:59:00', TRUE, '.pdf,.docx', FALSE, 6),

-- Offering 3 (Software Engineering)
(6, 3, 'Assignment 1 - SRS Document',
 'Prepare a complete Software Requirements Specification for a Library Management System.',
 40, 15.00, '2025-02-28 23:59:00', TRUE, '.pdf,.docx', FALSE, 8),

-- Offering 4 (Artificial Intelligence)
(7, 4, 'Assignment 1 - AI Literature Review',
 'Write a 2000-word literature review on any current AI application in healthcare.',
 30, 10.00, '2025-02-25 23:59:00', TRUE, '.pdf', TRUE, 4);


-- ── Submissions ──────────────────────────────────────
-- Assignment 1 (HTML Portfolio) - Offering 1
INSERT INTO assignment_submissions
  (assignment_id, student_id, file_path, remarks, obtained_marks, feedback, status, graded_by, graded_at)
VALUES
(1, 9,  'uploads/submissions/a1_s9_portfolio.zip',  'Used Bootstrap for styling',     18, 'Good work! Clean structure.',           'graded', 5, '2025-02-17 10:00:00'),
(1, 10, 'uploads/submissions/a1_s10_portfolio.zip', 'All sections completed',         20, 'Excellent! Perfect submission.',        'graded', 5, '2025-02-17 10:30:00'),
(1, 11, 'uploads/submissions/a1_s11_portfolio.zip', 'Basic version submitted',        14, 'Missing contact section. Redo CSS.',    'graded', 5, '2025-02-17 11:00:00'),
(1, 12, 'uploads/submissions/a1_s12_portfolio.zip', NULL,                             17, 'Good layout, minor CSS issues.',        'graded', 5, '2025-02-17 11:30:00'),
(1, 13, 'uploads/submissions/a1_s13_portfolio.zip', 'Late submission',                12, 'Submitted late. Basic HTML only.',      'late',   5, '2025-02-17 12:00:00'),
(1, 19, 'uploads/submissions/a1_s19_portfolio.zip', NULL,                             19, 'Very good responsive design.',          'graded', 5, '2025-02-17 12:30:00'),
(1, 20, 'uploads/submissions/a1_s20_portfolio.zip', NULL,                             16, 'Good effort, improve animations.',      'graded', 5, '2025-02-17 13:00:00'),
(1, 21, 'uploads/submissions/a1_s21_portfolio.zip', NULL,                             15, 'Decent work, add more content.',        'graded', 5, '2025-02-17 13:30:00'),
(1, 22, 'uploads/submissions/a1_s22_portfolio.zip', NULL,                             18, 'Nice design and clean code.',           'graded', 5, '2025-02-17 14:00:00');
-- Student 23 did not submit

-- Assignment 4 (OSI Report) - Offering 2
INSERT INTO assignment_submissions
  (assignment_id, student_id, file_path, remarks, obtained_marks, feedback, status, graded_by, graded_at)
VALUES
(4, 9,  'uploads/submissions/a4_s9_osi.pdf',  'Covered all 7 layers with diagrams',  22, 'Well written with good examples.',     'graded', 6, '2025-02-22 10:00:00'),
(4, 10, 'uploads/submissions/a4_s10_osi.pdf', NULL,                                  25, 'Perfect report! Great research.',      'graded', 6, '2025-02-22 10:30:00'),
(4, 11, 'uploads/submissions/a4_s11_osi.pdf', NULL,                                  18, 'Missing examples for layers 5-7.',     'graded', 6, '2025-02-22 11:00:00'),
(4, 14, 'uploads/submissions/a4_s14_osi.pdf', NULL,                                  20, 'Good report, minor formatting issues.','graded', 6, '2025-02-22 11:30:00'),
(4, 15, 'uploads/submissions/a4_s15_osi.pdf', NULL,                                  23, 'Excellent work with references.',      'graded', 6, '2025-02-22 12:00:00');

-- Assignment 7 (AI Literature Review) - Offering 4
INSERT INTO assignment_submissions
  (assignment_id, student_id, file_path, remarks, obtained_marks, feedback, plagiarism_percentage, plagiarism_status, status, graded_by, graded_at)
VALUES
(7, 9,  'uploads/submissions/a7_s9_ai.pdf',  NULL, 27, 'Excellent review with strong references.', 8.5,  'completed', 'graded', 4, '2025-02-27 09:00:00'),
(7, 11, 'uploads/submissions/a7_s11_ai.pdf', NULL, 22, 'Good but needs more recent papers.',       12.0, 'completed', 'graded', 4, '2025-02-27 09:30:00'),
(7, 15, 'uploads/submissions/a7_s15_ai.pdf', NULL, 28, 'Outstanding literature review!',           5.2,  'completed', 'graded', 4, '2025-02-27 10:00:00'),
(7, 18, 'uploads/submissions/a7_s18_ai.pdf', NULL, 25, 'Well structured and well cited.',          7.8,  'completed', 'graded', 4, '2025-02-27 10:30:00'),
(7, 24, 'uploads/submissions/a7_s24_ai.pdf', NULL, 26, 'Great analysis of AI in healthcare.',      6.5,  'completed', 'graded', 4, '2025-02-27 11:00:00');
