-- =====================================================
-- SEED 05: ADMIN USERS
-- Password for all: Admin@123
-- bcrypt hash of "Admin@123"
-- =====================================================
USE AI_Driven_Smart_LMS;

INSERT INTO users (id, roll_number, email, password_hash, role, is_active) VALUES
(1, NULL, 'admin@bzu.edu.pk',
 '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGniCGGHNNEeJmA5uVdVKbQU7sC',
 'admin', TRUE),

(2, NULL, 'security@bzu.edu.pk',
 '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGniCGGHNNEeJmA5uVdVKbQU7sC',
 'admin', TRUE),

(3, NULL, 'gate.operator@bzu.edu.pk',
 '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGniCGGHNNEeJmA5uVdVKbQU7sC',
 'admin', TRUE);

INSERT INTO admin_profiles (user_id, employee_id, full_name, designation, phone, email_official, role_type) VALUES
(1, 'EMP-001', 'Muhammad Sarfraz',    'System Administrator', '0300-1234567', 'admin@bzu.edu.pk',        'admin'),
(2, 'EMP-002', 'Ahmad Security',      'Security Admin',       '0300-2345678', 'security@bzu.edu.pk',     'security_admin'),
(3, 'EMP-003', 'Ali Gate Operator',   'Gate Operator',        '0300-3456789', 'gate.operator@bzu.edu.pk','gate_operator');
