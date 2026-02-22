-- =====================================================
-- SEED 13: EXAMS + RESULTS
-- =====================================================
USE AI_Driven_Smart_LMS;

-- ── Exams ────────────────────────────────────────────
INSERT INTO exams
  (id, offering_id, exam_type, title, total_marks, weightage_percent, exam_date, start_time, end_time, room_number)
VALUES
-- Offering 1 (Web Technologies)
(1, 1, 'midterm', 'Web Technologies Midterm Exam',  50, 30.00, '2025-03-15', '09:00', '11:00', 'Exam Hall A'),
(2, 1, 'final',   'Web Technologies Final Exam',    100, 50.00, '2025-06-01', '09:00', '12:00', 'Exam Hall A'),

-- Offering 2 (Computer Networks)
(3, 2, 'midterm', 'Computer Networks Midterm Exam', 50, 30.00, '2025-03-17', '10:00', '12:00', 'Exam Hall B'),
(4, 2, 'final',   'Computer Networks Final Exam',   100, 50.00, '2025-06-03', '10:00', '13:00', 'Exam Hall B'),

-- Offering 3 (Software Engineering)
(5, 3, 'midterm', 'Software Engineering Midterm',   50, 30.00, '2025-03-18', '11:00', '13:00', 'IT-103'),

-- Offering 4 (Artificial Intelligence)
(6, 4, 'midterm', 'AI Midterm Exam',                50, 30.00, '2025-03-20', '14:00', '16:00', 'IT-201');


-- ── Exam Results ─────────────────────────────────────

-- Midterm 1 (Web Technologies)
INSERT INTO exam_results (exam_id, student_id, obtained_marks, grade, entered_by) VALUES
(1, 9,  44, 'A',  5),
(1, 10, 49, 'A+', 5),
(1, 11, 32, 'C+', 5),
(1, 12, 41, 'A-', 5),
(1, 13, 35, 'B',  5),
(1, 19, 46, 'A+', 5),
(1, 20, 38, 'B+', 5),
(1, 21, 40, 'A-', 5),
(1, 22, 43, 'A',  5),
(1, 23, 25, 'D',  5);

-- Midterm 3 (Computer Networks)
INSERT INTO exam_results (exam_id, student_id, obtained_marks, grade, entered_by) VALUES
(3, 9,  42, 'A',  6),
(3, 10, 47, 'A+', 6),
(3, 11, 30, 'B',  6),
(3, 14, 38, 'B+', 6),
(3, 15, 45, 'A+', 6),
(3, 16, 35, 'B',  6),
(3, 17, 28, 'C+', 6),
(3, 18, 40, 'A-', 6),
(3, 19, 44, 'A',  6),
(3, 20, 36, 'B+', 6);

-- Midterm 6 (AI)
INSERT INTO exam_results (exam_id, student_id, obtained_marks, grade, entered_by) VALUES
(6, 9,  43, 'A',  4),
(6, 11, 35, 'B',  4),
(6, 15, 48, 'A+', 4),
(6, 18, 40, 'A-', 4),
(6, 24, 45, 'A+', 4);


-- ── Grade updates for completed enrollments ──────────
UPDATE enrollments SET grade_letter = 'A',  grade_points = 4.00
WHERE student_id = 9  AND offering_id = 1;
UPDATE enrollments SET grade_letter = 'A+', grade_points = 4.00
WHERE student_id = 10 AND offering_id = 1;
UPDATE enrollments SET grade_letter = 'B',  grade_points = 3.00
WHERE student_id = 11 AND offering_id = 1;
UPDATE enrollments SET grade_letter = 'A-', grade_points = 3.67
WHERE student_id = 12 AND offering_id = 1;
UPDATE enrollments SET grade_letter = 'B+', grade_points = 3.33
WHERE student_id = 13 AND offering_id = 1;
UPDATE enrollments SET grade_letter = 'A+', grade_points = 4.00
WHERE student_id = 19 AND offering_id = 1;
UPDATE enrollments SET grade_letter = 'B+', grade_points = 3.33
WHERE student_id = 20 AND offering_id = 1;
UPDATE enrollments SET grade_letter = 'A-', grade_points = 3.67
WHERE student_id = 21 AND offering_id = 1;
UPDATE enrollments SET grade_letter = 'A',  grade_points = 4.00
WHERE student_id = 22 AND offering_id = 1;
UPDATE enrollments SET grade_letter = 'D',  grade_points = 1.00
WHERE student_id = 23 AND offering_id = 1;
