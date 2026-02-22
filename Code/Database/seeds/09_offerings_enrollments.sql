-- =====================================================
-- SEED 09: COURSE OFFERINGS + ENROLLMENTS
-- =====================================================
USE AI_Driven_SMart_LMS;

-- ── Course Offerings (Spring 2025 = semester_id 4) ──
INSERT INTO course_offerings
  (id, course_id, semester_id, instructor_id, section, max_students, enrolled_students, room_number, schedule_json, is_active)
VALUES
(1,  7,  4, 5, 'A', 40, 10, 'IT-101', '[{"day":"monday","start_time":"08:00","end_time":"09:30"},{"day":"wednesday","start_time":"08:00","end_time":"09:30"}]', TRUE),
(2,  8,  4, 6, 'A', 40, 10, 'IT-102', '[{"day":"tuesday","start_time":"10:00","end_time":"11:30"},{"day":"thursday","start_time":"10:00","end_time":"11:30"}]', TRUE),
(3,  9,  4, 8, 'A', 40, 5,  'IT-103', '[{"day":"monday","start_time":"11:00","end_time":"12:30"},{"day":"friday","start_time":"11:00","end_time":"12:30"}]',   TRUE),
(4,  10, 4, 4, 'A', 30, 5,  'IT-201', '[{"day":"wednesday","start_time":"02:00","end_time":"03:30"},{"day":"friday","start_time":"02:00","end_time":"03:30"}]', TRUE),
(5,  5,  4, 6, 'B', 40, 5,  'IT-104', '[{"day":"tuesday","start_time":"08:00","end_time":"09:30"},{"day":"thursday","start_time":"08:00","end_time":"09:30"}]', TRUE);


-- ── Course Enrollments ───────────────────────────────
-- Offering 1 (Web Technologies) - BSIT 2022 students
INSERT INTO enrollments (student_id, offering_id, status, is_approved, advisor_approval_requested) VALUES
(19, 1, 'enrolled', TRUE,  TRUE),
(20, 1, 'enrolled', TRUE,  TRUE),
(21, 1, 'enrolled', TRUE,  TRUE),
(22, 1, 'enrolled', TRUE,  TRUE),
(23, 1, 'enrolled', TRUE,  TRUE),
-- BSIT 2021 some students
(9,  1, 'enrolled', TRUE,  TRUE),
(10, 1, 'enrolled', TRUE,  TRUE),
(11, 1, 'enrolled', TRUE,  TRUE),
(12, 1, 'enrolled', TRUE,  TRUE),
(13, 1, 'enrolled', TRUE,  TRUE);

-- Offering 2 (Computer Networks) - BSIT students
INSERT INTO enrollments (student_id, offering_id, status, is_approved, advisor_approval_requested) VALUES
(9,  2, 'enrolled', TRUE, TRUE),
(10, 2, 'enrolled', TRUE, TRUE),
(11, 2, 'enrolled', TRUE, TRUE),
(14, 2, 'enrolled', TRUE, TRUE),
(15, 2, 'enrolled', TRUE, TRUE),
(16, 2, 'enrolled', TRUE, TRUE),
(17, 2, 'enrolled', TRUE, TRUE),
(18, 2, 'enrolled', TRUE, TRUE),
(19, 2, 'enrolled', TRUE, TRUE),
(20, 2, 'enrolled', TRUE, TRUE);

-- Offering 3 (Software Engineering) - Mixed
INSERT INTO enrollments (student_id, offering_id, status, is_approved, advisor_approval_requested) VALUES
(9,  3, 'enrolled', TRUE, TRUE),
(10, 3, 'enrolled', TRUE, TRUE),
(13, 3, 'enrolled', TRUE, TRUE),
(14, 3, 'enrolled', TRUE, TRUE),
(15, 3, 'enrolled', TRUE, TRUE);

-- Offering 4 (Artificial Intelligence) - Final Year
INSERT INTO enrollments (student_id, offering_id, status, is_approved, advisor_approval_requested) VALUES
(9,  4, 'enrolled', TRUE, TRUE),
(11, 4, 'enrolled', TRUE, TRUE),
(15, 4, 'enrolled', TRUE, TRUE),
(18, 4, 'enrolled', TRUE, TRUE),
(24, 4, 'enrolled', TRUE, TRUE);
