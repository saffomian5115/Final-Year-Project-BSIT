-- =====================================================
-- SEED 14: FEE STRUCTURE + VOUCHERS + PAYMENTS
-- =====================================================
USE AI_Driven_Smart_LMS;

-- ── Fee Structure ────────────────────────────────────
INSERT INTO fee_structure
  (id, program_id, semester_number, tuition_fee, admission_fee, library_fee, sports_fee, other_fees, valid_from)
VALUES
-- BSIT Fee Structure (all 8 semesters)
(1,  1, 1, 35000, 5000, 1000, 500, '[{"name":"Lab Fee","amount":2000},{"name":"Examination Fee","amount":1500}]', '2021-09-01'),
(2,  1, 2, 35000, 0,    1000, 500, '[{"name":"Lab Fee","amount":2000},{"name":"Examination Fee","amount":1500}]', '2022-02-01'),
(3,  1, 3, 36000, 0,    1000, 500, '[{"name":"Lab Fee","amount":2000},{"name":"Examination Fee","amount":1500}]', '2022-09-01'),
(4,  1, 4, 36000, 0,    1000, 500, '[{"name":"Lab Fee","amount":2000},{"name":"Examination Fee","amount":1500}]', '2023-02-01'),
(5,  1, 5, 38000, 0,    1000, 500, '[{"name":"Lab Fee","amount":2000},{"name":"Examination Fee","amount":1500}]', '2023-09-01'),
(6,  1, 6, 38000, 0,    1000, 500, '[{"name":"Lab Fee","amount":2000},{"name":"Examination Fee","amount":1500}]', '2024-02-01'),
(7,  1, 7, 40000, 0,    1000, 500, '[{"name":"Lab Fee","amount":2500},{"name":"Examination Fee","amount":2000}]', '2024-09-01'),
(8,  1, 8, 40000, 0,    1000, 500, '[{"name":"Lab Fee","amount":2500},{"name":"Examination Fee","amount":2000}]', '2025-02-01'),

-- BSCS Fee Structure
(9,  2, 1, 37000, 5000, 1000, 500, '[{"name":"Lab Fee","amount":2500},{"name":"Examination Fee","amount":1500}]', '2021-09-01'),
(10, 2, 8, 42000, 0,    1000, 500, '[{"name":"Lab Fee","amount":3000},{"name":"Examination Fee","amount":2000}]', '2025-02-01'),

-- BBA Fee Structure
(11, 3, 1, 30000, 4000, 1000, 500, '[{"name":"Examination Fee","amount":1500}]', '2021-09-01'),
(12, 3, 8, 33000, 0,    1000, 500, '[{"name":"Examination Fee","amount":1500}]', '2025-02-01');


-- ── Fee Vouchers (Spring 2025 = semester_id 4) ───────
INSERT INTO fee_vouchers
  (id, student_id, voucher_number, semester_id, amount, due_date, issue_date, status, fine_amount)
VALUES
-- BSIT 2021 Batch (Semester 8 fee)
(1,  9,  'VCH-2025-00001', 4, 46000.00, '2025-02-28', '2025-02-01', 'paid',    0),
(2,  10, 'VCH-2025-00002', 4, 46000.00, '2025-02-28', '2025-02-01', 'paid',    0),
(3,  11, 'VCH-2025-00003', 4, 46000.00, '2025-02-28', '2025-02-01', 'partial', 0),
(4,  12, 'VCH-2025-00004', 4, 46000.00, '2025-02-28', '2025-02-01', 'paid',    0),
(5,  13, 'VCH-2025-00005', 4, 46000.00, '2025-02-28', '2025-02-01', 'overdue', 1500),
(6,  14, 'VCH-2025-00006', 4, 46000.00, '2025-02-28', '2025-02-01', 'paid',    0),
(7,  15, 'VCH-2025-00007', 4, 46000.00, '2025-02-28', '2025-02-01', 'paid',    0),
(8,  16, 'VCH-2025-00008', 4, 46000.00, '2025-02-28', '2025-02-01', 'unpaid',  0),
(9,  17, 'VCH-2025-00009', 4, 46000.00, '2025-02-28', '2025-02-01', 'overdue', 1000),
(10, 18, 'VCH-2025-00010', 4, 46000.00, '2025-02-28', '2025-02-01', 'paid',    0),

-- BSIT 2022 Batch (Semester 6 fee)
(11, 19, 'VCH-2025-00011', 4, 41500.00, '2025-02-28', '2025-02-01', 'paid',    0),
(12, 20, 'VCH-2025-00012', 4, 41500.00, '2025-02-28', '2025-02-01', 'paid',    0),
(13, 21, 'VCH-2025-00013', 4, 41500.00, '2025-02-28', '2025-02-01', 'unpaid',  0),
(14, 22, 'VCH-2025-00014', 4, 41500.00, '2025-02-28', '2025-02-01', 'paid',    0),
(15, 23, 'VCH-2025-00015', 4, 41500.00, '2025-02-28', '2025-02-01', 'overdue', 2000),

-- BSCS Batch
(16, 24, 'VCH-2025-00016', 4, 48000.00, '2025-02-28', '2025-02-01', 'paid',    0),
(17, 25, 'VCH-2025-00017', 4, 48000.00, '2025-02-28', '2025-02-01', 'paid',    0);


-- ── Fee Payments ─────────────────────────────────────
INSERT INTO fee_payments
  (voucher_id, amount_paid, payment_method, reference_number, bank_name, received_by, receipt_number)
VALUES
-- Paid vouchers full payment
(1,  46000.00, 'bank_transfer', 'TXN-2025-001', 'HBL',     1, 'RCP-2025-001'),
(2,  46000.00, 'online',        'TXN-2025-002', 'Easypaisa',1, 'RCP-2025-002'),
(4,  46000.00, 'cash',           NULL,           NULL,       1, 'RCP-2025-004'),
(6,  46000.00, 'bank_transfer', 'TXN-2025-006', 'MCB',      1, 'RCP-2025-006'),
(7,  46000.00, 'online',        'TXN-2025-007', 'JazzCash',  1, 'RCP-2025-007'),
(10, 46000.00, 'bank_transfer', 'TXN-2025-010', 'UBL',      1, 'RCP-2025-010'),
(11, 41500.00, 'bank_transfer', 'TXN-2025-011', 'HBL',      1, 'RCP-2025-011'),
(12, 41500.00, 'cash',           NULL,           NULL,       1, 'RCP-2025-012'),
(14, 41500.00, 'online',        'TXN-2025-014', 'Easypaisa',1, 'RCP-2025-014'),
(16, 48000.00, 'bank_transfer', 'TXN-2025-016', 'MCB',      1, 'RCP-2025-016'),
(17, 48000.00, 'bank_transfer', 'TXN-2025-017', 'HBL',      1, 'RCP-2025-017'),

-- Partial payment (voucher 3 - student 11)
(3,  25000.00, 'cash', NULL, NULL, 1, 'RCP-2025-003');
