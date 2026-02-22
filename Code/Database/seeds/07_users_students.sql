-- =====================================================
-- SEED 07: STUDENTS
-- Password for all: Student@123
-- bcrypt hash of "Student@123"
-- =====================================================
USE AI_Driven_Smart_LMS;

INSERT INTO users (id, roll_number, email, password_hash, role, is_active) VALUES
-- BSIT 2021 Batch
(9,  'BSIT-21-01', 'ali.hassan@student.bzu.edu.pk',      '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(10, 'BSIT-21-02', 'sara.ahmed@student.bzu.edu.pk',      '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(11, 'BSIT-21-03', 'usman.malik@student.bzu.edu.pk',     '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(12, 'BSIT-21-04', 'fatima.khan@student.bzu.edu.pk',     '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(13, 'BSIT-21-05', 'bilal.qureshi@student.bzu.edu.pk',   '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(14, 'BSIT-21-06', 'zara.butt@student.bzu.edu.pk',       '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(15, 'BSIT-21-07', 'hamza.riaz@student.bzu.edu.pk',      '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(16, 'BSIT-21-08', 'nadia.iqbal@student.bzu.edu.pk',     '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(17, 'BSIT-21-09', 'tariq.mehmood@student.bzu.edu.pk',   '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(18, 'BSIT-21-10', 'amna.farooq@student.bzu.edu.pk',     '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),

-- BSIT 2022 Batch
(19, 'BSIT-22-01', 'omar.sheikh@student.bzu.edu.pk',     '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(20, 'BSIT-22-02', 'hina.nawaz@student.bzu.edu.pk',      '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(21, 'BSIT-22-03', 'asad.ali@student.bzu.edu.pk',        '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(22, 'BSIT-22-04', 'sana.rehman@student.bzu.edu.pk',     '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(23, 'BSIT-22-05', 'danish.siddiqui@student.bzu.edu.pk', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),

-- BSCS Batch
(24, 'BSCS-21-01', 'raheel.aslam@student.bzu.edu.pk',    '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE),
(25, 'BSCS-21-02', 'mehwish.javed@student.bzu.edu.pk',   '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'student', TRUE);

INSERT INTO student_profiles
  (user_id, registration_number, full_name, father_name, date_of_birth, gender, cnic, phone, current_address, city, guardian_phone, guardian_relation)
VALUES
(9,  'BZU-IT-2021-001', 'Ali Hassan',         'Hassan Ali',         '2003-03-15', 'male',   '36302-0000001-1', '0311-1000001', 'Street 1, Multan',      'Multan',     '0311-9000001', 'Father'),
(10, 'BZU-IT-2021-002', 'Sara Ahmed',         'Ahmed Ali',          '2003-05-20', 'female', '36302-0000002-2', '0311-1000002', 'Street 2, Multan',      'Multan',     '0311-9000002', 'Father'),
(11, 'BZU-IT-2021-003', 'Usman Malik',        'Malik Usman',        '2002-11-10', 'male',   '36302-0000003-3', '0311-1000003', 'Street 3, Multan',      'Multan',     '0311-9000003', 'Father'),
(12, 'BZU-IT-2021-004', 'Fatima Khan',        'Khan Sahib',         '2003-07-25', 'female', '36302-0000004-4', '0311-1000004', 'Street 4, Lahore',      'Lahore',     '0311-9000004', 'Father'),
(13, 'BZU-IT-2021-005', 'Bilal Qureshi',      'Qureshi Sahib',      '2002-09-05', 'male',   '36302-0000005-5', '0311-1000005', 'Street 5, Multan',      'Multan',     '0311-9000005', 'Father'),
(14, 'BZU-IT-2021-006', 'Zara Butt',          'Butt Sahib',         '2003-01-18', 'female', '36302-0000006-6', '0311-1000006', 'Street 6, Sahiwal',     'Sahiwal',    '0311-9000006', 'Father'),
(15, 'BZU-IT-2021-007', 'Hamza Riaz',         'Riaz Ahmed',         '2003-06-30', 'male',   '36302-0000007-7', '0311-1000007', 'Street 7, Multan',      'Multan',     '0311-9000007', 'Father'),
(16, 'BZU-IT-2021-008', 'Nadia Iqbal',        'Iqbal Sahib',        '2002-12-12', 'female', '36302-0000008-8', '0311-1000008', 'Street 8, Bahawalpur',  'Bahawalpur', '0311-9000008', 'Father'),
(17, 'BZU-IT-2021-009', 'Tariq Mehmood',      'Mehmood Sahib',      '2003-04-22', 'male',   '36302-0000009-9', '0311-1000009', 'Street 9, Multan',      'Multan',     '0311-9000009', 'Father'),
(18, 'BZU-IT-2021-010', 'Amna Farooq',        'Farooq Ahmed',       '2003-08-14', 'female', '36302-0000010-0', '0311-1000010', 'Street 10, Vehari',     'Vehari',     '0311-9000010', 'Father'),
(19, 'BZU-IT-2022-001', 'Omar Sheikh',        'Sheikh Rashid',      '2004-02-28', 'male',   '36302-0000011-1', '0311-1000011', 'Street 11, Multan',     'Multan',     '0311-9000011', 'Father'),
(20, 'BZU-IT-2022-002', 'Hina Nawaz',         'Nawaz Sahib',        '2004-07-15', 'female', '36302-0000012-2', '0311-1000012', 'Street 12, Multan',     'Multan',     '0311-9000012', 'Father'),
(21, 'BZU-IT-2022-003', 'Asad Ali',           'Ali Khan',           '2004-03-10', 'male',   '36302-0000013-3', '0311-1000013', 'Street 13, Khanewal',   'Khanewal',   '0311-9000013', 'Father'),
(22, 'BZU-IT-2022-004', 'Sana Rehman',        'Rehman Sahib',       '2004-09-05', 'female', '36302-0000014-4', '0311-1000014', 'Street 14, Multan',     'Multan',     '0311-9000014', 'Father'),
(23, 'BZU-IT-2022-005', 'Danish Siddiqui',    'Siddiqui Sahib',     '2004-11-20', 'male',   '36302-0000015-5', '0311-1000015', 'Street 15, Lodhran',    'Lodhran',    '0311-9000015', 'Father'),
(24, 'BZU-CS-2021-001', 'Raheel Aslam',       'Aslam Sahib',        '2003-05-18', 'male',   '36302-0000016-6', '0311-1000016', 'Street 16, Multan',     'Multan',     '0311-9000016', 'Father'),
(25, 'BZU-CS-2021-002', 'Mehwish Javed',      'Javed Sahib',        '2003-10-25', 'female', '36302-0000017-7', '0311-1000017', 'Street 17, Multan',     'Multan',     '0311-9000017', 'Father');
