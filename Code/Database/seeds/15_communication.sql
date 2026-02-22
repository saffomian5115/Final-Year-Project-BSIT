-- =====================================================
-- SEED 15: ANNOUNCEMENTS + NOTICES + CHAT GROUPS
-- =====================================================
USE AI_Driven_SMart_LMS;

-- ── Announcements ────────────────────────────────────
INSERT INTO announcements
  (id, title, content, created_by, target_type, target_id, priority, pinned_until)
VALUES
(1, 'Welcome to Spring 2025 Semester',
 'Dear Students, Welcome to Spring 2025 semester. Classes will begin from February 3, 2025. Please ensure your course registrations are complete. Best regards, Administration.',
 1, 'all', NULL, 'normal', '2025-02-10'),

(2, 'Fee Submission Deadline - URGENT',
 'This is to inform all students that the last date for fee submission is February 28, 2025. After this date a fine of Rs. 100/day will be charged. Please submit your fee immediately.',
 1, 'all', NULL, 'urgent', '2025-02-28'),

(3, 'Web Technologies - Lab Makeup Class',
 'Dear Students, A makeup lab session for Web Technologies (IT-301) will be held on Saturday February 22, 2025 at 10:00 AM in Lab 3. Attendance is mandatory.',
 5, 'course', 1, 'high', NULL),

(4, 'Computer Networks - Quiz 1 Schedule',
 'Quiz 1 for Computer Networks will be held on February 11, 2025 during class time. The quiz will cover OSI Model and TCP/IP. Duration: 15 minutes.',
 6, 'course', 2, 'normal', NULL),

(5, 'IT Department - HEC Accreditation Visit',
 'The HEC accreditation team will be visiting our department on March 5-6, 2025. Students are requested to maintain discipline and wear their ID cards during this period.',
 4, 'department', 1, 'high', '2025-03-06'),

(6, 'AI Course - Guest Lecture on NLP',
 'A guest lecture on Natural Language Processing will be conducted by Dr. Tariq from LUMS on February 28, 2025 at 3:00 PM in Seminar Hall. All IT students are welcome.',
 4, 'department', 1, 'normal', NULL),

(7, 'Midterm Exam Schedule Announced',
 'Midterm exams will be held from March 15-22, 2025. Detailed schedule has been posted on the notice board. Students are advised to prepare accordingly.',
 1, 'all', NULL, 'high', '2025-03-22');


-- ── Notice Board ─────────────────────────────────────
INSERT INTO notice_board
  (id, title, content, category, posted_by, expiry_date, is_public, views)
VALUES
(1, 'Spring 2025 Exam Schedule',
 'Midterm Examinations Spring 2025\n\nWeb Technologies:    March 15, 09:00 AM - Exam Hall A\nComputer Networks:  March 17, 10:00 AM - Exam Hall B\nSoftware Engineering: March 18, 11:00 AM - IT-103\nArtificial Intelligence: March 20, 02:00 PM - IT-201\n\nRules:\n1. Bring your university ID card\n2. No mobile phones allowed\n3. Report 15 minutes before exam',
 'Academic', 1, '2025-03-25', TRUE, 142),

(2, 'Final Year Project Guidelines 2025',
 'Dear Final Year Students,\n\nPlease note the following deadlines:\n- Project Proposal: March 1, 2025\n- Progress Report 1: April 1, 2025\n- Progress Report 2: May 1, 2025\n- Final Submission: June 1, 2025\n- Defense: June 15-20, 2025\n\nAll documentation must be submitted in prescribed format.',
 'Academic', 4, '2025-06-30', TRUE, 89),

(3, 'Campus Maintenance Notice',
 'The university swimming pool and sports complex will remain closed from February 20-28, 2025 for annual maintenance. All other facilities will remain operational.',
 'Administrative', 1, '2025-02-28', TRUE, 45),

(4, 'Scholarship Applications Open',
 'Applications for Need-Based Scholarship Spring 2025 are now open. Eligible students with CGPA >= 2.5 and family income below Rs. 50,000/month may apply.\n\nDeadline: March 15, 2025\nForms available at: Scholarship Office, Admin Block',
 'Financial', 1, '2025-03-15', TRUE, 210),

(5, 'IT Department Seminar Series',
 'IT Department Seminar Series 2025\n\nTopic: "Future of Artificial Intelligence in Pakistan"\nSpeaker: Dr. Umar Saif (Former Chairman, Punjab IT Board)\nDate: February 27, 2025\nTime: 2:00 PM\nVenue: Main Auditorium\n\nAll students and faculty are welcome.',
 'Events', 4, '2025-02-28', TRUE, 178);


-- ── Chat Groups ──────────────────────────────────────
INSERT INTO chat_groups
  (id, name, group_type, offering_id, created_by, is_active, moderation_required)
VALUES
(1, 'Web Technologies - Section A',    'class',   1, 5, TRUE, FALSE),
(2, 'Computer Networks - Section A',   'class',   2, 6, TRUE, FALSE),
(3, 'Software Engineering - Section A','class',   3, 8, TRUE, FALSE),
(4, 'Artificial Intelligence - Sec A', 'class',   4, 4, TRUE, FALSE),
(5, 'IT Department General Chat',      'department', NULL, 4, TRUE, TRUE),
(6, 'BSIT 2021 Batch Group',           'general', NULL, 1, TRUE, FALSE);


-- ── Chat Group Members ───────────────────────────────

-- Group 1 (Web Technologies) - Teacher + Enrolled Students
INSERT INTO chat_group_members (group_id, user_id, role) VALUES
(1, 5,  'teacher'),
(1, 9,  'member'), (1, 10, 'member'), (1, 11, 'member'),
(1, 12, 'member'), (1, 13, 'member'), (1, 19, 'member'),
(1, 20, 'member'), (1, 21, 'member'), (1, 22, 'member'), (1, 23, 'member');

-- Group 2 (Computer Networks) - Teacher + Enrolled Students
INSERT INTO chat_group_members (group_id, user_id, role) VALUES
(2, 6,  'teacher'),
(2, 9,  'member'), (2, 10, 'member'), (2, 11, 'member'),
(2, 14, 'member'), (2, 15, 'member'), (2, 16, 'member'),
(2, 17, 'member'), (2, 18, 'member'), (2, 19, 'member'), (2, 20, 'member');

-- Group 4 (AI)
INSERT INTO chat_group_members (group_id, user_id, role) VALUES
(4, 4,  'teacher'),
(4, 9,  'member'), (4, 11, 'member'), (4, 15, 'member'),
(4, 18, 'member'), (4, 24, 'member');

-- Group 6 (BSIT 2021 Batch)
INSERT INTO chat_group_members (group_id, user_id, role) VALUES
(6, 4,  'monitor'),
(6, 9,  'member'), (6, 10, 'member'), (6, 11, 'member'),
(6, 12, 'member'), (6, 13, 'member'), (6, 14, 'member'),
(6, 15, 'member'), (6, 16, 'member'), (6, 17, 'member'), (6, 18, 'member');


-- ── Sample Messages ──────────────────────────────────
INSERT INTO messages
  (group_id, sender_id, message, message_type, sent_at)
VALUES
(1, 5,  'Assalam o Alaikum! Welcome to Web Technologies class chat. Please use this group for course-related queries only.', 'system', '2025-02-03 09:00:00'),
(1, 9,  'Walaikum Assalam Sir! Thank you for adding us.', 'text', '2025-02-03 09:05:00'),
(1, 10, 'Sir, will assignment 1 require Bootstrap or pure CSS?', 'text', '2025-02-03 09:10:00'),
(1, 5,  'Pure CSS and HTML only for Assignment 1. Bootstrap is optional for Assignment 2 onwards.', 'text', '2025-02-03 09:15:00'),
(1, 12, 'Sir what is the file size limit for submission?', 'text', '2025-02-05 11:00:00'),
(1, 5,  'Maximum 10MB per file. Compress your project folder before uploading.', 'text', '2025-02-05 11:05:00'),
(1, 19, 'Sir can we use Flexbox in Assignment 1?', 'text', '2025-02-10 08:30:00'),
(1, 5,  'Yes, Flexbox is allowed and encouraged!', 'text', '2025-02-10 08:35:00'),

(2, 6,  'Welcome to Computer Networks group. Quiz 1 will be on Feb 11 during class. Prepare OSI model.', 'text', '2025-02-04 10:00:00'),
(2, 9,  'Sir, should we memorize all 7 layers with protocols?', 'text', '2025-02-04 10:30:00'),
(2, 6,  'Yes, know all layers with their functions and at least 2 protocols each.', 'text', '2025-02-04 10:35:00'),
(2, 15, 'Sir is subnetting included in Quiz 1?', 'text', '2025-02-05 09:00:00'),
(2, 6,  'No, subnetting will be in Quiz 2. Quiz 1 only covers OSI and TCP/IP.', 'text', '2025-02-05 09:05:00'),

(4, 4,  'Welcome AI class! This semester we cover search algorithms, ML basics, and neural networks.', 'text', '2025-02-03 14:00:00'),
(4, 9,  'Sir which programming language will we use for implementations?', 'text', '2025-02-03 14:30:00'),
(4, 4,  'Python primarily. Make sure you have Python 3.10+ installed with scikit-learn.', 'text', '2025-02-03 14:35:00'),
(4, 24, 'Sir will we implement neural networks from scratch?', 'text', '2025-02-05 15:00:00'),
(4, 4,  'We will use PyTorch for neural networks. No need to code from scratch.', 'text', '2025-02-05 15:05:00');
