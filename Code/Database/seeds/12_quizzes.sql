-- =====================================================
-- SEED 12: QUIZZES + QUESTIONS + ATTEMPTS
-- =====================================================
USE AI_Driven_SMart_LMS;

-- ── Quizzes ──────────────────────────────────────────
INSERT INTO quizzes
  (id, offering_id, title, description, quiz_type, total_questions, total_marks, time_limit_minutes, start_time, end_time, is_mandatory, auto_grading, shuffle_questions, created_by)
VALUES
-- Offering 1 (Web Technologies)
(1, 1, 'Quiz 1 - HTML Basics',
 'Test your knowledge of HTML tags and structure',
 'teacher', 5, 10, 15,
 '2025-02-10 08:00:00', '2025-02-10 23:59:00',
 TRUE, TRUE, FALSE, 5),

(2, 1, 'Quiz 2 - CSS Fundamentals',
 'CSS selectors, properties and box model',
 'teacher', 5, 10, 15,
 '2025-02-17 08:00:00', '2025-02-17 23:59:00',
 TRUE, TRUE, TRUE, 5),

-- Offering 2 (Computer Networks)
(3, 2, 'Quiz 1 - Network Basics',
 'OSI layers and TCP/IP fundamentals',
 'teacher', 5, 10, 15,
 '2025-02-11 10:00:00', '2025-02-11 23:59:00',
 TRUE, TRUE, FALSE, 6),

-- Offering 4 (Artificial Intelligence)
(4, 4, 'Quiz 1 - AI Concepts',
 'Introduction to AI, search algorithms, and agents',
 'teacher', 5, 10, 20,
 '2025-02-19 14:00:00', '2025-02-19 23:59:00',
 TRUE, TRUE, FALSE, 4);


-- ── Quiz Questions ───────────────────────────────────

-- Quiz 1 (HTML Basics)
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, marks, difficulty, explanation) VALUES
(1, 'What does HTML stand for?',
 'mcq', '["HyperText Markup Language","HighText Machine Language","HyperText and links Markup Language","None of these"]',
 'HyperText Markup Language', 2, 'easy',
 'HTML stands for HyperText Markup Language, the standard for web pages.'),

(1, 'Which tag is used for the largest heading in HTML?',
 'mcq', '["<h6>","<heading>","<h1>","<head>"]',
 '<h1>', 2, 'easy',
 '<h1> defines the largest heading, <h6> the smallest.'),

(1, 'Which HTML attribute specifies an alternate text for an image?',
 'mcq', '["src","alt","title","href"]',
 'alt', 2, 'easy',
 'The alt attribute provides alternative text when image cannot be displayed.'),

(1, 'Which HTML tag is used to create a hyperlink?',
 'mcq', '["<link>","<a>","<href>","<url>"]',
 '<a>', 2, 'medium',
 'The <a> anchor tag with href attribute creates hyperlinks.'),

(1, 'What is the correct HTML element for inserting a line break?',
 'mcq', '["<break>","<lb>","<br>","<newline>"]',
 '<br>', 2, 'easy',
 '<br> is a self-closing tag that inserts a line break.');


-- Quiz 2 (CSS Fundamentals)
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, marks, difficulty, explanation) VALUES
(2, 'What does CSS stand for?',
 'mcq', '["Cascading Style Sheets","Creative Style Sheets","Computer Style Sheets","Colorful Style Sheets"]',
 'Cascading Style Sheets', 2, 'easy',
 'CSS stands for Cascading Style Sheets, used to style HTML.'),

(2, 'Which CSS property controls the text size?',
 'mcq', '["font-style","text-size","font-size","text-style"]',
 'font-size', 2, 'easy',
 'font-size property sets the size of the font.'),

(2, 'How do you select an element with id "demo" in CSS?',
 'mcq', '[".demo","#demo","demo","*demo"]',
 '#demo', 2, 'easy',
 '# selector targets elements by their id attribute.'),

(2, 'Which property is used to change the background color?',
 'mcq', '["bgcolor","background-color","color","background"]',
 'background-color', 2, 'medium',
 'background-color property sets the background color of an element.'),

(2, 'What is the default display value for a <div> element?',
 'mcq', '["inline","inline-block","block","flex"]',
 'block', 2, 'medium',
 '<div> is a block-level element by default.');


-- Quiz 3 (Network Basics)
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, marks, difficulty, explanation) VALUES
(3, 'How many layers does the OSI model have?',
 'mcq', '["4","5","6","7"]',
 '7', 2, 'easy',
 'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.'),

(3, 'Which layer of OSI is responsible for routing?',
 'mcq', '["Physical","Data Link","Network","Transport"]',
 'Network', 2, 'medium',
 'The Network layer (Layer 3) handles routing and logical addressing.'),

(3, 'What does IP stand for?',
 'mcq', '["Internet Protocol","Internal Protocol","Internet Process","Intranet Protocol"]',
 'Internet Protocol', 2, 'easy',
 'IP stands for Internet Protocol, used for addressing and routing.'),

(3, 'Which protocol operates at the Transport layer?',
 'mcq', '["HTTP","IP","TCP","ARP"]',
 'TCP', 2, 'medium',
 'TCP (Transmission Control Protocol) operates at Transport Layer (Layer 4).'),

(3, 'What is the maximum length of an IPv4 address in bits?',
 'mcq', '["16","32","64","128"]',
 '32', 2, 'easy',
 'IPv4 addresses are 32 bits (4 octets), e.g., 192.168.1.1');


-- Quiz 4 (AI Concepts)
INSERT INTO quiz_questions (quiz_id, question_text, question_type, options, correct_answer, marks, difficulty, explanation) VALUES
(4, 'What is Artificial Intelligence?',
 'mcq', '["A programming language","Simulation of human intelligence by machines","A type of database","An operating system"]',
 'Simulation of human intelligence by machines', 2, 'easy',
 'AI is the simulation of human intelligence processes by computer systems.'),

(4, 'Which of the following is a type of AI search algorithm?',
 'mcq', '["Quick Sort","Breadth First Search","Binary Search","Bubble Sort"]',
 'Breadth First Search', 2, 'medium',
 'BFS is used in AI for uninformed search in problem-solving.'),

(4, 'What does ML stand for in AI context?',
 'mcq', '["Machine Logic","Machine Learning","Memory Logic","Multiple Learning"]',
 'Machine Learning', 2, 'easy',
 'ML stands for Machine Learning, a subset of AI.'),

(4, 'Which algorithm is used for classification in ML?',
 'mcq', '["K-Means","Linear Regression","Decision Tree","PCA"]',
 'Decision Tree', 2, 'medium',
 'Decision Trees are used for both classification and regression tasks.'),

(4, 'What is a neural network inspired by?',
 'mcq', '["Computer circuits","Human brain neurons","Mathematical equations","DNA structure"]',
 'Human brain neurons', 2, 'medium',
 'Neural networks are inspired by the biological neural networks in human brains.');


-- ── Quiz Attempts ────────────────────────────────────

-- Quiz 1 (HTML Basics) Attempts
INSERT INTO quiz_attempts (quiz_id, student_id, start_time, end_time, score, total_marks, percentage, answers, status) VALUES
(1, 9,  '2025-02-10 10:00:00', '2025-02-10 10:12:00', 10, 10, 100.00,
 '{"1":"HyperText Markup Language","2":"<h1>","3":"alt","4":"<a>","5":"<br>"}', 'completed'),

(1, 10, '2025-02-10 11:00:00', '2025-02-10 11:14:00', 8, 10, 80.00,
 '{"1":"HyperText Markup Language","2":"<h1>","3":"alt","4":"<href>","5":"<br>"}', 'completed'),

(1, 11, '2025-02-10 12:00:00', '2025-02-10 12:13:00', 6, 10, 60.00,
 '{"1":"HyperText Markup Language","2":"<h6>","3":"src","4":"<a>","5":"<br>"}', 'completed'),

(1, 12, '2025-02-10 13:00:00', '2025-02-10 13:11:00', 10, 10, 100.00,
 '{"1":"HyperText Markup Language","2":"<h1>","3":"alt","4":"<a>","5":"<br>"}', 'completed'),

(1, 19, '2025-02-10 14:00:00', '2025-02-10 14:12:00', 8, 10, 80.00,
 '{"1":"HyperText Markup Language","2":"<h1>","3":"title","4":"<a>","5":"<br>"}', 'completed'),

(1, 20, '2025-02-10 15:00:00', '2025-02-10 15:13:00', 6, 10, 60.00,
 '{"1":"HyperText Markup Language","2":"<h1>","3":"alt","4":"<href>","5":"<newline>"}', 'completed'),

(1, 22, '2025-02-10 16:00:00', '2025-02-10 16:14:00', 8, 10, 80.00,
 '{"1":"HyperText Markup Language","2":"<h1>","3":"alt","4":"<link>","5":"<br>"}', 'completed');


-- Quiz 3 (Network Basics) Attempts
INSERT INTO quiz_attempts (quiz_id, student_id, start_time, end_time, score, total_marks, percentage, answers, status) VALUES
(3, 9,  '2025-02-11 11:00:00', '2025-02-11 11:13:00', 8, 10, 80.00,
 '{"6":"7","7":"Network","8":"Internet Protocol","9":"TCP","10":"32"}', 'completed'),

(3, 10, '2025-02-11 12:00:00', '2025-02-11 12:14:00', 10, 10, 100.00,
 '{"6":"7","7":"Network","8":"Internet Protocol","9":"TCP","10":"32"}', 'completed'),

(3, 14, '2025-02-11 13:00:00', '2025-02-11 13:12:00', 8,  10, 80.00,
 '{"6":"7","7":"Transport","8":"Internet Protocol","9":"TCP","10":"32"}', 'completed'),

(3, 15, '2025-02-11 14:00:00', '2025-02-11 14:13:00', 10, 10, 100.00,
 '{"6":"7","7":"Network","8":"Internet Protocol","9":"TCP","10":"32"}', 'completed');
