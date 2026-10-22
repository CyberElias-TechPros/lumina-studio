-- Written answers belong to a specific attempt, not only assignment history.
ALTER TABLE submissions ADD COLUMN body TEXT NOT NULL DEFAULT '';

-- Recover legacy text only where timestamp + student + assignment identify one
-- history entry unambiguously. Do not guess between same-timestamp attempts.
UPDATE submissions SET body = COALESCE((
  SELECT CASE WHEN COUNT(*) = 1 THEN MAX(json_extract(CASE WHEN j.type = 'object' THEN j.value ELSE '{}' END, '$.body')) END
  FROM assignments a, json_each(CASE WHEN json_valid(a.submissions) THEN a.submissions ELSE '[]' END) j
  WHERE a.id = submissions.assignment_id AND a.user_id = submissions.student_user_id
    AND json_extract(CASE WHEN j.type = 'object' THEN j.value ELSE '{}' END, '$.at') = submissions.submitted
), '') WHERE assignment_id IS NOT NULL;
