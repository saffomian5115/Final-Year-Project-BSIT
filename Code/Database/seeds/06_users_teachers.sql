-- =====================================================
-- SEED 06: TEACHERS
-- Password for all: Teacher@123
-- bcrypt hash of "Teacher@123"
-- =====================================================
USE AI_Driven_SMart_LMS;

INSERT INTO users (id, roll_number, email, password_hash, role, is_active) VALUES
(4, NULL, 'dr.kamran@bzu.edu.pk',
 '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'teacher', TRUE),

(5, NULL, 'ms.ayesha@bzu.edu.pk',
 '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'teacher', TRUE),

(6, NULL, 'mr.hassan@bzu.edu.pk',
 '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'teacher', TRUE),

(7, NULL, 'dr.fatima@bzu.edu.pk',
 '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'teacher', TRUE),

(8, NULL, 'mr.usman@bzu.edu.pk',
 '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'teacher', TRUE);

INSERT INTO teacher_profiles (user_id, employee_id, full_name, designation, qualification, specialization, joining_date, phone, email, cnic) VALUES
(4, 'TCH-001', 'Dr. Kamran Mehmood',  'Associate Professor', 'PhD Computer Science',   'Artificial Intelligence, Machine Learning', '2015-08-01', '0301-1111111', 'dr.kamran@bzu.edu.pk',  '36302-1111111-1'),
(5, 'TCH-002', 'Ms. Ayesha Siddiqui', 'Lecturer',            'MS Information Technology', 'Web Development, Databases',             '2019-02-01', '0301-2222222', 'ms.ayesha@bzu.edu.pk',  '36302-2222222-2'),
(6, 'TCH-003', 'Mr. Hassan Raza',     'Lecturer',            'MS Computer Science',    'Programming, Data Structures',              '2020-09-01', '0301-3333333', 'mr.hassan@bzu.edu.pk',  '36302-3333333-3'),
(7, 'TCH-004', 'Dr. Fatima Malik',    'Assistant Professor', 'PhD Mathematics',        'Applied Mathematics, Statistics',           '2017-03-01', '0301-4444444', 'dr.fatima@bzu.edu.pk',  '36302-4444444-4'),
(8, 'TCH-005', 'Mr. Usman Tariq',     'Lecturer',            'MS Software Engineering','Software Engineering, Testing',             '2021-09-01', '0301-5555555', 'mr.usman@bzu.edu.pk',   '36302-5555555-5');

-- Update Department HODs
UPDATE departments SET head_of_department = 4 WHERE id = 1;
UPDATE departments SET head_of_department = 4 WHERE id = 2;
UPDATE departments SET head_of_department = 7 WHERE id = 4;
