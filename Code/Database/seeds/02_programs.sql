-- =====================================================
-- SEED 02: PROGRAMS
-- =====================================================
USE AI_Driven_Smart_LMS;

INSERT INTO programs (id, name, code, department_id, duration_years, total_credit_hours, degree_type) VALUES
(1, 'Bachelor of Science in Information Technology', 'BSIT', 1, 4, 130, 'BS'),
(2, 'Bachelor of Science in Computer Science',       'BSCS', 2, 4, 130, 'BS'),
(3, 'Bachelor of Business Administration',           'BBA',  3, 4, 120, 'BBA'),
(4, 'Associate Degree in Information Technology',    'ADIT', 1, 2, 66,  'AD');
