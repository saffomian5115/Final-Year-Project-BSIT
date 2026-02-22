-- =====================================================
-- MASTER SEED RUNNER
-- AI-Driven Smart LMS - BZU Multan
-- Run this file to seed entire database at once
-- =====================================================
-- Usage: mysql -u root -p < run_all_seeds.sql
-- =====================================================

USE AI_Driven_SMart_LMS;

SET FOREIGN_KEY_CHECKS = 0;

-- ── Step 1: Academic Structure ───────────────────────
SOURCE 01_departments.sql;
SOURCE 02_programs.sql;
SOURCE 03_semesters.sql;
SOURCE 04_courses.sql;

-- ── Step 2: Users ────────────────────────────────────
SOURCE 05_users_admin.sql;
SOURCE 06_users_teachers.sql;
SOURCE 07_users_students.sql;
SOURCE 08_program_enrollments.sql;

-- ── Step 3: Course Offerings + Enrollments ───────────
SOURCE 09_offerings_enrollments.sql;

-- ── Step 4: Attendance ───────────────────────────────
SOURCE 10_attendance.sql;

-- ── Step 5: Assessment ───────────────────────────────
SOURCE 11_assignments.sql;
SOURCE 12_quizzes.sql;
SOURCE 13_exams.sql;

-- ── Step 6: Fee ──────────────────────────────────────
SOURCE 14_fees.sql;

-- ── Step 7: Communication ────────────────────────────
SOURCE 15_communication.sql;

-- ── Step 8: AI Layer ─────────────────────────────────
SOURCE 16_ai_analytics.sql;
SOURCE 17_ai_campus.sql;

SET FOREIGN_KEY_CHECKS = 1;

-- ── Verify Data ──────────────────────────────────────
SELECT 'departments'              AS table_name, COUNT(*) AS records FROM departments
UNION ALL
SELECT 'programs',                               COUNT(*) FROM programs
UNION ALL
SELECT 'semesters',                              COUNT(*) FROM semesters
UNION ALL
SELECT 'courses',                                COUNT(*) FROM courses
UNION ALL
SELECT 'users',                                  COUNT(*) FROM users
UNION ALL
SELECT 'student_profiles',                       COUNT(*) FROM student_profiles
UNION ALL
SELECT 'teacher_profiles',                       COUNT(*) FROM teacher_profiles
UNION ALL
SELECT 'course_offerings',                       COUNT(*) FROM course_offerings
UNION ALL
SELECT 'enrollments',                            COUNT(*) FROM enrollments
UNION ALL
SELECT 'lecture_sessions',                       COUNT(*) FROM lecture_sessions
UNION ALL
SELECT 'lecture_attendance',                     COUNT(*) FROM lecture_attendance
UNION ALL
SELECT 'campus_gates',                           COUNT(*) FROM campus_gates
UNION ALL
SELECT 'campus_attendance',                      COUNT(*) FROM campus_attendance
UNION ALL
SELECT 'assignments',                            COUNT(*) FROM assignments
UNION ALL
SELECT 'assignment_submissions',                 COUNT(*) FROM assignment_submissions
UNION ALL
SELECT 'quizzes',                                COUNT(*) FROM quizzes
UNION ALL
SELECT 'quiz_questions',                         COUNT(*) FROM quiz_questions
UNION ALL
SELECT 'quiz_attempts',                          COUNT(*) FROM quiz_attempts
UNION ALL
SELECT 'exams',                                  COUNT(*) FROM exams
UNION ALL
SELECT 'exam_results',                           COUNT(*) FROM exam_results
UNION ALL
SELECT 'fee_structure',                          COUNT(*) FROM fee_structure
UNION ALL
SELECT 'fee_vouchers',                           COUNT(*) FROM fee_vouchers
UNION ALL
SELECT 'fee_payments',                           COUNT(*) FROM fee_payments
UNION ALL
SELECT 'announcements',                          COUNT(*) FROM announcements
UNION ALL
SELECT 'notice_board',                           COUNT(*) FROM notice_board
UNION ALL
SELECT 'chat_groups',                            COUNT(*) FROM chat_groups
UNION ALL
SELECT 'messages',                               COUNT(*) FROM messages
UNION ALL
SELECT 'student_performance_scores',             COUNT(*) FROM student_performance_scores
UNION ALL
SELECT 'chatbot_intents',                        COUNT(*) FROM chatbot_intents
UNION ALL
SELECT 'chatbot_faqs',                           COUNT(*) FROM chatbot_faqs
UNION ALL
SELECT 'ai_quizzes',                             COUNT(*) FROM ai_quizzes;
