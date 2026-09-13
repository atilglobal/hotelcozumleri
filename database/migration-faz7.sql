-- FAZ 7 Migration: Decor quote form type
SET NAMES utf8mb4;

ALTER TABLE form_submissions
  MODIFY COLUMN form_type ENUM(
    'contact',
    'service_quote',
    'general',
    'procurement_request',
    'decor_quote'
  ) NOT NULL;
