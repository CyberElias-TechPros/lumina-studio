-- 0011_parent.sql — Parent portal: parent accounts linked to student learners.

CREATE TABLE parent_students (
  parent_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (parent_id, student_id)
);
CREATE INDEX idx_parent_students_parent ON parent_students (parent_id);
CREATE INDEX idx_parent_students_student ON parent_students (student_id);