-- =====================================================
-- SEED 04: COURSES
-- =====================================================
USE AI_Driven_SMart_LMS;

INSERT INTO courses (id, code, name, credit_hours, lecture_hours, lab_hours, description, department_id, program_id, semester_level, is_elective) VALUES
-- BSIT Courses
(1,  'IT-101', 'Introduction to Computing',          3, 3, 0, 'Basic computing concepts',              1, 1, 1, FALSE),
(2,  'IT-102', 'Programming Fundamentals',           3, 2, 2, 'Introduction to programming with C++',  1, 1, 1, FALSE),
(3,  'IT-103', 'Calculus and Analytical Geometry',   3, 3, 0, 'Mathematical foundations',              4, 1, 1, FALSE),
(4,  'IT-201', 'Object Oriented Programming',        3, 2, 2, 'OOP concepts using Java',               1, 1, 2, FALSE),
(5,  'IT-202', 'Data Structures and Algorithms',     3, 2, 2, 'Core data structures',                  1, 1, 2, FALSE),
(6,  'IT-203', 'Database Systems',                   3, 2, 2, 'Relational database design and SQL',    1, 1, 3, FALSE),
(7,  'IT-301', 'Web Technologies',                   3, 2, 2, 'HTML, CSS, JavaScript, PHP',            1, 1, 3, FALSE),
(8,  'IT-302', 'Computer Networks',                  3, 3, 0, 'Networking fundamentals',               1, 1, 4, FALSE),
(9,  'IT-303', 'Software Engineering',               3, 3, 0, 'SDLC and software processes',           1, 1, 4, FALSE),
(10, 'IT-401', 'Artificial Intelligence',            3, 3, 0, 'AI fundamentals and applications',      1, 1, 5, FALSE),
(11, 'IT-402', 'Machine Learning',                   3, 2, 2, 'ML algorithms and implementation',      1, 1, 6, TRUE),
(12, 'IT-403', 'Final Year Project I',               3, 0, 6, 'Capstone project part 1',               1, 1, 7, FALSE),

-- BSCS Courses
(13, 'CS-101', 'Programming in C',                   3, 2, 2, 'C programming language',                2, 2, 1, FALSE),
(14, 'CS-201', 'Discrete Mathematics',               3, 3, 0, 'Logic and discrete structures',         4, 2, 2, FALSE),
(15, 'CS-301', 'Operating Systems',                  3, 3, 0, 'OS concepts and design',                2, 2, 3, FALSE),

-- BBA Courses
(16, 'BBA-101', 'Principles of Management',          3, 3, 0, 'Management fundamentals',               3, 3, 1, FALSE),
(17, 'BBA-201', 'Financial Accounting',              3, 3, 0, 'Basic accounting principles',           3, 3, 2, FALSE);

-- ── CLOs for IT-101 ──────────────────────────────────
INSERT INTO course_clos (course_id, clo_number, description, domain, level) VALUES
(1, 'CLO-1', 'Understand basic computing concepts',         'Cognitive', 'Knowledge'),
(1, 'CLO-2', 'Identify hardware and software components',   'Cognitive', 'Comprehension'),
(1, 'CLO-3', 'Use basic office productivity tools',         'Psychomotor', 'Application');

-- ── CLOs for IT-102 ──────────────────────────────────
INSERT INTO course_clos (course_id, clo_number, description, domain, level) VALUES
(2, 'CLO-1', 'Write basic programs in C++',                 'Psychomotor', 'Application'),
(2, 'CLO-2', 'Apply control structures and loops',          'Cognitive', 'Application'),
(2, 'CLO-3', 'Implement functions and arrays',              'Psychomotor', 'Application');
