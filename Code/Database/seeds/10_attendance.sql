-- =====================================================
-- SEED 10: LECTURE SESSIONS + ATTENDANCE
-- =====================================================
USE AI_Driven_Smart_LMS;

-- ── Lecture Sessions (Offering 1 - Web Technologies) ─
INSERT INTO lecture_sessions
  (id, offering_id, session_date, start_time, end_time, topic, session_type, attendance_marked, marked_by, marked_at)
VALUES
(1,  1, '2025-02-03', '08:00', '09:30', 'Introduction to Web Technologies', 'lecture', TRUE, 5, '2025-02-03 09:35:00'),
(2,  1, '2025-02-05', '08:00', '09:30', 'HTML Basics',                      'lecture', TRUE, 5, '2025-02-05 09:35:00'),
(3,  1, '2025-02-10', '08:00', '09:30', 'CSS Fundamentals',                 'lecture', TRUE, 5, '2025-02-10 09:35:00'),
(4,  1, '2025-02-12', '08:00', '09:30', 'CSS Layouts and Flexbox',          'lecture', TRUE, 5, '2025-02-12 09:35:00'),
(5,  1, '2025-02-17', '08:00', '09:30', 'JavaScript Introduction',          'lecture', TRUE, 5, '2025-02-17 09:35:00'),
(6,  1, '2025-02-19', '08:00', '09:30', 'JavaScript DOM Manipulation',      'lecture', TRUE, 5, '2025-02-19 09:35:00'),
(7,  1, '2025-02-24', '08:00', '09:30', 'JavaScript Events',                'lecture', TRUE, 5, '2025-02-24 09:35:00'),
(8,  1, '2025-02-26', '08:00', '09:30', 'Responsive Design',                'lecture', TRUE, 5, '2025-02-26 09:35:00'),

-- Offering 2 - Computer Networks
(9,  2, '2025-02-04', '10:00', '11:30', 'Introduction to Networks',         'lecture', TRUE, 6, '2025-02-04 11:35:00'),
(10, 2, '2025-02-06', '10:00', '11:30', 'OSI Model',                        'lecture', TRUE, 6, '2025-02-06 11:35:00'),
(11, 2, '2025-02-11', '10:00', '11:30', 'TCP/IP Protocol',                  'lecture', TRUE, 6, '2025-02-11 11:35:00'),
(12, 2, '2025-02-13', '10:00', '11:30', 'IP Addressing',                    'lecture', TRUE, 6, '2025-02-13 11:35:00');

-- ── Lecture Attendance ───────────────────────────────

-- Offering 1 Sessions 1-8
-- Student 9 (Ali) - Good attendance (7/8 = 87%)
INSERT INTO lecture_attendance (session_id, student_id, status, marked_by) VALUES
(1, 9, 'present', 5), (2, 9, 'present', 5), (3, 9, 'present', 5), (4, 9, 'present', 5),
(5, 9, 'present', 5), (6, 9, 'present', 5), (7, 9, 'absent',  5), (8, 9, 'present', 5);

-- Student 10 (Sara) - Perfect attendance (8/8 = 100%)
INSERT INTO lecture_attendance (session_id, student_id, status, marked_by) VALUES
(1, 10, 'present', 5), (2, 10, 'present', 5), (3, 10, 'present', 5), (4, 10, 'present', 5),
(5, 10, 'present', 5), (6, 10, 'present', 5), (7, 10, 'present', 5), (8, 10, 'present', 5);

-- Student 11 (Usman) - Low attendance (5/8 = 62%) SHORT ALERT
INSERT INTO lecture_attendance (session_id, student_id, status, marked_by) VALUES
(1, 11, 'present', 5), (2, 11, 'absent',  5), (3, 11, 'absent',  5), (4, 11, 'present', 5),
(5, 11, 'absent',  5), (6, 11, 'present', 5), (7, 11, 'present', 5), (8, 11, 'absent',  5);

-- Student 12 (Fatima)
INSERT INTO lecture_attendance (session_id, student_id, status, marked_by) VALUES
(1, 12, 'present', 5), (2, 12, 'present', 5), (3, 12, 'late',    5), (4, 12, 'present', 5),
(5, 12, 'present', 5), (6, 12, 'absent',  5), (7, 12, 'present', 5), (8, 12, 'present', 5);

-- Student 13 (Bilal)
INSERT INTO lecture_attendance (session_id, student_id, status, marked_by) VALUES
(1, 13, 'present', 5), (2, 13, 'absent',  5), (3, 13, 'present', 5), (4, 13, 'absent',  5),
(5, 13, 'present', 5), (6, 13, 'present', 5), (7, 13, 'absent',  5), (8, 13, 'present', 5);

-- Remaining 5 students for offering 1
INSERT INTO lecture_attendance (session_id, student_id, status, marked_by) VALUES
(1, 19, 'present', 5),(2, 19, 'present', 5),(3, 19, 'present', 5),(4, 19, 'present', 5),
(5, 19, 'absent', 5), (6, 19, 'present', 5),(7, 19, 'present', 5),(8, 19, 'present', 5),
(1, 20, 'present', 5),(2, 20, 'absent', 5), (3, 20, 'present', 5),(4, 20, 'present', 5),
(5, 20, 'present', 5),(6, 20, 'present', 5),(7, 20, 'absent', 5), (8, 20, 'present', 5),
(1, 21, 'present', 5),(2, 21, 'present', 5),(3, 21, 'present', 5),(4, 21, 'absent', 5),
(5, 21, 'present', 5),(6, 21, 'present', 5),(7, 21, 'present', 5),(8, 21, 'present', 5),
(1, 22, 'present', 5),(2, 22, 'present', 5),(3, 22, 'absent', 5), (4, 22, 'present', 5),
(5, 22, 'present', 5),(6, 22, 'late', 5),   (7, 22, 'present', 5),(8, 22, 'present', 5),
(1, 23, 'absent', 5), (2, 23, 'absent', 5), (3, 23, 'present', 5),(4, 23, 'absent', 5),
(5, 23, 'present', 5),(6, 23, 'absent', 5), (7, 23, 'present', 5),(8, 23, 'absent', 5);

-- ── Attendance Summaries (auto-calculated) ──────────
INSERT INTO attendance_summary
  (student_id, offering_id, total_classes, attended_classes, percentage, alert_triggered, last_updated)
VALUES
(9,  1, 8, 7, 87.50, FALSE, '2025-02-26'),
(10, 1, 8, 8, 100.00,FALSE, '2025-02-26'),
(11, 1, 8, 5, 62.50, TRUE,  '2025-02-26'),
(12, 1, 8, 7, 87.50, FALSE, '2025-02-26'),
(13, 1, 8, 5, 62.50, TRUE,  '2025-02-26'),
(19, 1, 8, 7, 87.50, FALSE, '2025-02-26'),
(20, 1, 8, 6, 75.00, FALSE, '2025-02-26'),
(21, 1, 8, 7, 87.50, FALSE, '2025-02-26'),
(22, 1, 8, 7, 87.50, FALSE, '2025-02-26'),
(23, 1, 8, 3, 37.50, TRUE,  '2025-02-26');

-- ── Campus Gates ─────────────────────────────────────
INSERT INTO campus_gates
  (id, gate_name, gate_code, gate_type, location_description, ip_address, is_active)
VALUES
(1, 'Main Entrance Gate', 'GATE-MAIN', 'main',       'Main entrance of BZU campus',       '192.168.1.10', TRUE),
(2, 'IT Department Gate', 'GATE-IT',   'department',  'IT Department side entrance',       '192.168.1.11', TRUE),
(3, 'Library Gate',       'GATE-LIB',  'library',     'Central library entrance',          '192.168.1.12', TRUE),
(4, 'Lab Block Gate',     'GATE-LAB',  'lab',         'Computer lab block entrance',       '192.168.1.13', TRUE);

INSERT INTO gate_cameras (id, gate_id, camera_name, camera_ip, camera_type, resolution, is_primary, status) VALUES
(1, 1, 'Main Gate Cam 1', '192.168.1.101', 'entry', '1080p', TRUE,  'active'),
(2, 1, 'Main Gate Cam 2', '192.168.1.102', 'exit',  '1080p', FALSE, 'active'),
(3, 2, 'IT Gate Cam 1',   '192.168.1.103', 'both',  '720p',  TRUE,  'active'),
(4, 3, 'Library Cam 1',   '192.168.1.104', 'both',  '720p',  TRUE,  'active');

INSERT INTO gate_schedules (gate_id, day_of_week, open_time, close_time) VALUES
(1, 'monday',    '07:00', '22:00'),
(1, 'tuesday',   '07:00', '22:00'),
(1, 'wednesday', '07:00', '22:00'),
(1, 'thursday',  '07:00', '22:00'),
(1, 'friday',    '07:00', '22:00'),
(1, 'saturday',  '08:00', '14:00'),
(1, 'sunday',    '00:00', '00:00');
