-- =====================================================
-- SEED 16: AI ANALYTICS + CHATBOT INTENTS + FAQS
-- =====================================================
USE AI_Driven_Smart_LMS;

-- ── Student Performance Scores ───────────────────────
-- Semester 4 (Spring 2025) analytics for main students
INSERT INTO student_performance_scores
  (student_id, semester_id, academic_score, consistency_index, improvement_index,
   engagement_level, class_rank, section_rank, trend_direction,
   risk_prediction, weak_subjects, recommendations, score_breakdown, calculated_at)
VALUES
(9, 4,
 82.50, 78.00, 5.00, 'high', 2, 2, 'improving',
 '{"level":"low","factors":[],"at_risk":false}',
 '[]',
 '[{"type":"general","priority":"low","message":"Great performance! Keep it up."}]',
 '{"lecture_attendance":87.50,"campus_presence":85.00,"assignment_consistency":88.89,"quiz_accuracy":90.00,"gpa_factor":100.00}',
 '2025-02-26 12:00:00'),

(10, 4,
 94.20, 92.00, 8.00, 'high', 1, 1, 'improving',
 '{"level":"low","factors":[],"at_risk":false}',
 '[]',
 '[{"type":"general","priority":"low","message":"Excellent! Top performer in class."}]',
 '{"lecture_attendance":100.00,"campus_presence":95.00,"assignment_consistency":100.00,"quiz_accuracy":90.00,"gpa_factor":100.00}',
 '2025-02-26 12:00:00'),

(11, 4,
 58.30, 45.00, -3.00, 'low', 8, 8, 'declining',
 '{"level":"high","factors":["Low lecture attendance","Missing assignments","Poor quiz performance"],"at_risk":true}',
 '[{"course":"Web Technologies","code":"IT-301","attendance":62.50,"reason":"Low attendance"}]',
 '[{"type":"attendance","priority":"high","message":"Attend more lectures to avoid shortage"},{"type":"assignment","priority":"high","message":"Submit assignments on time consistently"},{"type":"quiz","priority":"medium","message":"Practice AI quizzes to improve accuracy"}]',
 '{"lecture_attendance":62.50,"campus_presence":60.00,"assignment_consistency":55.56,"quiz_accuracy":60.00,"gpa_factor":75.00}',
 '2025-02-26 12:00:00'),

(12, 4,
 76.80, 70.00, 2.00, 'medium', 5, 5, 'stable',
 '{"level":"low","factors":[],"at_risk":false}',
 '[]',
 '[{"type":"quiz","priority":"medium","message":"Practice AI quizzes to improve accuracy"}]',
 '{"lecture_attendance":87.50,"campus_presence":80.00,"assignment_consistency":77.78,"quiz_accuracy":70.00,"gpa_factor":91.75}',
 '2025-02-26 12:00:00'),

(13, 4,
 62.50, 55.00, -1.00, 'medium', 7, 7, 'declining',
 '{"level":"medium","factors":["Low lecture attendance","Missing assignments"],"at_risk":true}',
 '[{"course":"Web Technologies","code":"IT-301","attendance":62.50,"reason":"Low attendance"}]',
 '[{"type":"attendance","priority":"high","message":"Attend more lectures to avoid shortage"},{"type":"assignment","priority":"high","message":"Submit assignments on time consistently"}]',
 '{"lecture_attendance":62.50,"campus_presence":65.00,"assignment_consistency":55.56,"quiz_accuracy":60.00,"gpa_factor":83.25}',
 '2025-02-26 12:00:00'),

(19, 4,
 88.40, 85.00, 6.00, 'high', 3, 3, 'improving',
 '{"level":"low","factors":[],"at_risk":false}',
 '[]',
 '[{"type":"general","priority":"low","message":"Great performance! Keep it up."}]',
 '{"lecture_attendance":87.50,"campus_presence":90.00,"assignment_consistency":88.89,"quiz_accuracy":80.00,"gpa_factor":100.00}',
 '2025-02-26 12:00:00'),

(23, 4,
 42.10, 30.00, -8.00, 'low', 10, 10, 'declining',
 '{"level":"high","factors":["Low lecture attendance","Missing assignments","Poor quiz performance","Low campus presence"],"at_risk":true}',
 '[{"course":"Web Technologies","code":"IT-301","attendance":37.50,"reason":"Low attendance"}]',
 '[{"type":"attendance","priority":"high","message":"Attend more lectures — shortage risk!"},{"type":"assignment","priority":"high","message":"Missing assignments will fail the course"},{"type":"subjects","priority":"high","message":"Focus on: Web Technologies"}]',
 '{"lecture_attendance":37.50,"campus_presence":40.00,"assignment_consistency":0.00,"quiz_accuracy":0.00,"gpa_factor":25.00}',
 '2025-02-26 12:00:00');


-- ── Chatbot Intents ──────────────────────────────────
INSERT INTO chatbot_intents
  (intent_name, description, category, example_queries, response_template, requires_auth, is_active)
VALUES
('check_attendance',
 'Student queries about their attendance percentage',
 'academic',
 '["What is my attendance?","Show my attendance","Am I short in attendance?","How many classes did I miss?"]',
 'Your attendance summary is available in your dashboard under the Attendance section.',
 TRUE, TRUE),

('check_fee',
 'Student queries about fee status and vouchers',
 'financial',
 '["What is my fee status?","Is my fee submitted?","Show my fee voucher","How much fee is due?"]',
 'You can check your fee status and vouchers in the Fee section of your student dashboard.',
 TRUE, TRUE),

('check_result',
 'Student queries about exam results and grades',
 'academic',
 '["What are my grades?","Show my result","What is my CGPA?","Did I pass?"]',
 'Your results and grades are available in the Results section. CGPA is auto-calculated.',
 TRUE, TRUE),

('check_schedule',
 'Student queries about class schedule and timetable',
 'academic',
 '["What is my schedule?","When is my next class?","Show timetable","What room is class in?"]',
 'Your class schedule is visible in each enrolled course on your dashboard.',
 TRUE, TRUE),

('assignment_info',
 'Student queries about assignments and deadlines',
 'academic',
 '["When is assignment due?","Show my assignments","What are the assignment requirements?","Did I submit assignment?"]',
 'Assignment details and deadlines are in each course under the Assignments tab.',
 TRUE, TRUE),

('quiz_info',
 'Student queries about quizzes',
 'academic',
 '["Is there a quiz today?","Show quiz schedule","How many quizzes are there?","Practice quiz"]',
 'You can view and attempt quizzes from your course page. AI practice quizzes are also available.',
 TRUE, TRUE),

('contact_teacher',
 'Student wants to contact teacher',
 'communication',
 '["How to contact teacher?","Teacher email?","Can I message teacher?"]',
 'Use the class group chat to message your teacher directly.',
 TRUE, TRUE),

('exam_schedule',
 'Student queries about exam dates',
 'academic',
 '["When is the exam?","Exam schedule?","Midterm date?","Final exam when?"]',
 'Exam schedules are announced via announcements and notice board. Check there for latest updates.',
 TRUE, TRUE),

('general_help',
 'General help and greeting',
 'general',
 '["Help","Hi","Hello","What can you do?","How to use LMS?"]',
 'I can help with attendance, fees, results, schedule, assignments, quizzes, and more. Just ask!',
 FALSE, TRUE);


-- ── Chatbot FAQs ─────────────────────────────────────
INSERT INTO chatbot_faqs
  (question, answer, category, tags, helpful_count, view_count, is_active)
VALUES
('How can I check my attendance percentage?',
 'Log in to your student dashboard and click on "Attendance" in the left sidebar. You will see attendance summary for each course including total classes, attended classes, and percentage. If your attendance falls below 75%, an alert will be shown.',
 'academic',
 '["attendance","percentage","dashboard"]',
 45, 120, TRUE),

('What happens if my attendance is below 75%?',
 'If your attendance drops below 75% in any course, you will receive an alert notification. You may be debarred from the final exam for that course. Contact your teacher immediately if you have valid reasons for absences.',
 'academic',
 '["attendance","shortage","exam","debarred"]',
 38, 95, TRUE),

('How do I submit my fee?',
 'Download your fee voucher from the Fee section in your dashboard. You can pay at any branch of HBL, MCB, or UBL using the voucher number. For online payment, use JazzCash or Easypaisa with the provided reference number.',
 'financial',
 '["fee","payment","voucher","bank"]',
 62, 180, TRUE),

('How is my CGPA calculated?',
 'CGPA is calculated based on all completed courses. Each course contributes based on credit hours and grade points: A+=4.0, A=4.0, A-=3.67, B+=3.33, B=3.0, B-=2.67, C+=2.33, C=2.0, D=1.0, F=0.0.',
 'academic',
 '["cgpa","gpa","grades","calculation"]',
 55, 160, TRUE),

('How to attempt an online quiz?',
 'Go to your course page and click on Quizzes tab. Click "Attempt Quiz" on any available quiz. Once started, answer all questions within the time limit and click Submit. Results are shown immediately after submission.',
 'academic',
 '["quiz","attempt","online","submit"]',
 41, 135, TRUE),

('How can I use the AI practice quiz?',
 'Go to AI Practice Quiz section in your dashboard. Select your course, enter a topic, choose difficulty level (easy/medium/hard), and click Generate. The AI will create MCQs for you to practice. After completion, you will see your score and weak areas.',
 'academic',
 '["ai quiz","practice","generate","mcq"]',
 30, 88, TRUE),

('What is the minimum passing grade?',
 'The minimum passing grade is D (50% marks). However, for graduation requirement, you need a minimum CGPA of 2.0. Courses with F grade must be repeated.',
 'academic',
 '["passing","grade","minimum","fail"]',
 48, 142, TRUE),

('How to join class group chat?',
 'You are automatically added to group chats for all your enrolled courses. Go to Chat section in your dashboard to see all your groups. You can message your classmates and teacher directly.',
 'communication',
 '["chat","group","message","teacher"]',
 25, 72, TRUE),

('Can I add or drop a course after registration?',
 'Yes, you can add or drop courses within the add/drop period specified in the academic calendar. Go to Course Registration and click Add/Drop. You need advisor approval for some changes.',
 'academic',
 '["add drop","course","registration","advisor"]',
 33, 98, TRUE),

('How to download my fee voucher?',
 'Login to your dashboard and go to Fee Management section. Click on the relevant semester voucher and click "Download Voucher" button. A PDF will be generated with all payment details.',
 'financial',
 '["voucher","download","fee","pdf"]',
 29, 85, TRUE);
