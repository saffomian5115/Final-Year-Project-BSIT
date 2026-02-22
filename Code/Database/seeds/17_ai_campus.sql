-- =====================================================
-- SEED 17: AI QUIZZES + CAMPUS ATTENDANCE LOGS
-- =====================================================
USE AI_Driven_SMart_LMS;

-- ── AI Practice Quiz History ─────────────────────────
INSERT INTO ai_quizzes
  (student_id, course_id, topic, difficulty, questions_generated, student_answers, score, feedback, weak_areas_identified)
VALUES
(9, 7, 'JavaScript Basics', 'medium',
 '[{"id":1,"question":"What is a closure in JavaScript?","options":["A loop","A function with access to outer scope","A variable type","An event"],"correct_answer":"A function with access to outer scope","explanation":"Closures allow functions to access variables from outer scope even after execution."},{"id":2,"question":"What does DOM stand for?","options":["Document Object Model","Data Object Model","Document Order Model","Dynamic Object Model"],"correct_answer":"Document Object Model","explanation":"DOM is the Document Object Model, representing the HTML structure as objects."},{"id":3,"question":"Which method adds an element to the end of an array?","options":["push()","pop()","shift()","unshift()"],"correct_answer":"push()","explanation":"push() adds one or more elements to the end of an array."},{"id":4,"question":"What is the output of typeof null?","options":["null","undefined","object","string"],"correct_answer":"object","explanation":"typeof null returns object due to a historical JavaScript bug."},{"id":5,"question":"Which event fires when page loads?","options":["onload","onclick","onchange","onfocus"],"correct_answer":"onload","explanation":"onload event fires when the page has fully loaded."}]',
 '{"1":"A function with access to outer scope","2":"Document Object Model","3":"push()","4":"object","5":"onclick"}',
 80.00, 'Good performance! Review event handling.', '["Which event fires when page loads?"]'),

(10, 7, 'CSS Advanced', 'hard',
 '[{"id":1,"question":"What is specificity in CSS?","options":["Font weight","Priority of CSS rules","Page layout","Animation speed"],"correct_answer":"Priority of CSS rules","explanation":"Specificity determines which CSS rule is applied when multiple rules target the same element."},{"id":2,"question":"What is the z-index property?","options":["Horizontal position","Vertical position","Stack order","Opacity"],"correct_answer":"Stack order","explanation":"z-index controls the vertical stacking order of elements."},{"id":3,"question":"What does display: flex do?","options":["Hides element","Creates block element","Enables flexbox layout","Sets font size"],"correct_answer":"Enables flexbox layout","explanation":"display: flex turns an element into a flex container."},{"id":4,"question":"What is the CSS box model?","options":["Layout model","Color model","Grid model","Font model"],"correct_answer":"Layout model","explanation":"The CSS box model describes the rectangular boxes around elements."},{"id":5,"question":"What is a CSS pseudo-class?","options":["A fake class","A state-based selector","An HTML tag","A color value"],"correct_answer":"A state-based selector","explanation":"Pseudo-classes like :hover select elements based on state."}]',
 '{"1":"Priority of CSS rules","2":"Stack order","3":"Enables flexbox layout","4":"Layout model","5":"A state-based selector"}',
 100.00, 'Perfect! Outstanding CSS knowledge.', '[]'),

(11, 7, 'HTML Forms', 'easy',
 '[{"id":1,"question":"Which tag creates a form in HTML?","options":["<input>","<form>","<button>","<field>"],"correct_answer":"<form>","explanation":"The <form> tag creates an HTML form."},{"id":2,"question":"What attribute makes an input field required?","options":["mandatory","required","must","validate"],"correct_answer":"required","explanation":"The required attribute makes a field mandatory."},{"id":3,"question":"What type attribute creates a password field?","options":["hidden","text","password","secure"],"correct_answer":"password","explanation":"type=password creates a masked input field."}]',
 '{"1":"<form>","2":"required","3":"text"}',
 66.67, 'Review password field and input types.', '["What type attribute creates a password field?"]'),

(9, 8, 'IP Addressing', 'medium',
 '[{"id":1,"question":"How many classes of IP addresses are there?","options":["3","5","7","4"],"correct_answer":"5","explanation":"IPv4 addresses are divided into 5 classes: A, B, C, D, E."},{"id":2,"question":"What is a subnet mask?","options":["IP address range","Network identifier","Device name","Gateway address"],"correct_answer":"Network identifier","explanation":"Subnet mask identifies which part of an IP is the network address."},{"id":3,"question":"What is the loopback address?","options":["192.168.1.1","10.0.0.1","127.0.0.1","172.16.0.1"],"correct_answer":"127.0.0.1","explanation":"127.0.0.1 is the loopback address used to test network software."}]',
 '{"1":"5","2":"Network identifier","3":"127.0.0.1"}',
 100.00, 'Excellent! Perfect score on IP addressing.', '[]');


-- ── Campus Attendance Logs ───────────────────────────
-- Entry logs for main students (Feb 2025)
INSERT INTO campus_attendance
  (student_id, gate_id, camera_id, entry_time, exit_time, entry_direction,
   face_match_confidence, processing_time_ms, spoof_check_passed, liveness_score,
   is_duplicate_filtered, manual_override)
VALUES
-- Student 9 (Ali) - Regular attendee
(9, 1, 1, '2025-02-03 07:45:00', '2025-02-03 14:30:00', 'in',  96.50, 245, TRUE, 0.92, FALSE, FALSE),
(9, 1, 2, '2025-02-03 14:30:00', NULL,                  'out', 95.80, 238, TRUE, 0.91, FALSE, FALSE),
(9, 1, 1, '2025-02-04 08:10:00', '2025-02-04 13:45:00', 'in',  97.20, 231, TRUE, 0.94, FALSE, FALSE),
(9, 1, 1, '2025-02-05 07:55:00', '2025-02-05 14:00:00', 'in',  96.90, 252, TRUE, 0.93, FALSE, FALSE),
(9, 1, 1, '2025-02-06 08:05:00', '2025-02-06 15:30:00', 'in',  95.60, 248, TRUE, 0.90, FALSE, FALSE),
(9, 1, 1, '2025-02-10 07:50:00', '2025-02-10 14:20:00', 'in',  97.10, 239, TRUE, 0.92, FALSE, FALSE),
(9, 1, 1, '2025-02-11 08:00:00', '2025-02-11 13:30:00', 'in',  96.30, 244, TRUE, 0.91, FALSE, FALSE),
(9, 1, 1, '2025-02-12 08:15:00', '2025-02-12 14:45:00', 'in',  97.50, 235, TRUE, 0.95, FALSE, FALSE),
(9, 1, 1, '2025-02-13 07:45:00', '2025-02-13 13:00:00', 'in',  96.80, 241, TRUE, 0.93, FALSE, FALSE),
(9, 1, 1, '2025-02-17 08:00:00', '2025-02-17 14:30:00', 'in',  97.00, 237, TRUE, 0.92, FALSE, FALSE),
(9, 1, 1, '2025-02-18 08:20:00', '2025-02-18 15:00:00', 'in',  96.40, 250, TRUE, 0.90, FALSE, FALSE),
(9, 1, 1, '2025-02-19 07:55:00', '2025-02-19 14:15:00', 'in',  97.30, 243, TRUE, 0.94, FALSE, FALSE),

-- Student 10 (Sara) - Very regular
(10, 1, 1, '2025-02-03 07:30:00', '2025-02-03 15:00:00', 'in', 98.20, 220, TRUE, 0.97, FALSE, FALSE),
(10, 1, 1, '2025-02-04 07:35:00', '2025-02-04 14:30:00', 'in', 97.80, 225, TRUE, 0.96, FALSE, FALSE),
(10, 1, 1, '2025-02-05 07:40:00', '2025-02-05 15:10:00', 'in', 98.50, 218, TRUE, 0.98, FALSE, FALSE),
(10, 1, 1, '2025-02-06 07:25:00', '2025-02-06 14:45:00', 'in', 98.10, 222, TRUE, 0.97, FALSE, FALSE),
(10, 1, 1, '2025-02-10 07:45:00', '2025-02-10 15:20:00', 'in', 97.90, 228, TRUE, 0.96, FALSE, FALSE),
(10, 1, 1, '2025-02-11 07:30:00', '2025-02-11 14:00:00', 'in', 98.30, 219, TRUE, 0.97, FALSE, FALSE),
(10, 1, 1, '2025-02-12 07:50:00', '2025-02-12 15:30:00', 'in', 98.00, 224, TRUE, 0.96, FALSE, FALSE),

-- Student 11 (Usman) - Irregular
(11, 1, 1, '2025-02-03 09:15:00', '2025-02-03 12:30:00', 'in', 94.30, 265, TRUE, 0.88, FALSE, FALSE),
(11, 1, 1, '2025-02-06 10:00:00', '2025-02-06 13:00:00', 'in', 93.80, 270, TRUE, 0.87, FALSE, FALSE),
(11, 1, 1, '2025-02-11 11:30:00', '2025-02-11 14:00:00', 'in', 94.50, 260, TRUE, 0.89, FALSE, FALSE),
(11, 1, 1, '2025-02-13 09:45:00', '2025-02-13 12:15:00', 'in', 93.60, 268, TRUE, 0.86, FALSE, FALSE),

-- Student 23 (Danish) - Very irregular / problematic
(23, 1, 1, '2025-02-05 11:00:00', '2025-02-05 13:00:00', 'in', 92.10, 280, TRUE, 0.85, FALSE, FALSE),
(23, 1, 1, '2025-02-13 10:30:00', '2025-02-13 12:30:00', 'in', 91.80, 285, TRUE, 0.84, FALSE, FALSE),

-- Face recognition failures (unknown persons)
(NULL, 1, 1, '2025-02-05 08:30:00', NULL, 'in', 45.20, 312, FALSE, 0.42, FALSE, FALSE),
(NULL, 1, 1, '2025-02-10 09:00:00', NULL, 'in', 38.50, 325, TRUE,  0.35, FALSE, FALSE);


-- ── Face Recognition Attempt Logs ────────────────────
INSERT INTO face_recognition_logs
  (student_id, gate_id, camera_id, confidence, match_success, processing_time_ms, spoof_check_passed, liveness_score)
VALUES
(9,    1, 1, 96.50, TRUE,  245, TRUE, 0.92),
(10,   1, 1, 98.20, TRUE,  220, TRUE, 0.97),
(11,   1, 1, 94.30, TRUE,  265, TRUE, 0.88),
(NULL, 1, 1, 45.20, FALSE, 312, FALSE, 0.42),
(NULL, 1, 1, 38.50, FALSE, 325, TRUE,  0.35),
(9,    1, 1, 97.20, TRUE,  231, TRUE, 0.94),
(23,   1, 1, 92.10, TRUE,  280, TRUE, 0.85);
