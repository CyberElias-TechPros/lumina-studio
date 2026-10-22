# Assignment handoff increment

## Implemented

- Written answers are stored on their exact submission attempt, delivered to the
  assigned instructor's detail API, and returned in the student's latest status.
- Submission insertion and assignment history updates share a D1 transaction.
  Blank work is rejected; already-graded assignments cannot accept a new attempt.
- Latest attempt selection is deterministic, including equal timestamps. A stale
  attempt cannot overwrite the current assignment's grade. Linked assignment
  maximum scores are enforced server-side. Cross-instructor fallback checks the
  actual assignment course rather than any course taken by the student.
- Student website: actual loaded assignment counts, cursor pagination, actual
  submission state, written answers, points (`score / max`) and returned feedback
  (replacing fabricated average/countdown KPIs).
- Instructor website: actual submitted text, explicit score/feedback, no fabricated
  code checks, plagiarism scores, preset praise, rubric scores or autosave claims.
- Native Android (`0.5.0-native-preview` / `versionCode = 5`): student assignment
  list with cursor pagination, rubric and prompt reader, explicit confirmation
  before submitting written answers, non-optimistic server refresh, and returned
  points (`score / max`) plus instructor feedback. Drafts and private coursework
  remain memory-only; transient conflict/network failures preserve the typed draft
  in memory while `401`/`403`/logout wipe private records immediately.

## Deployment order

Apply additive migration `0069_submission_text.sql` and deploy the backend before
shipping the dependent website. It recovers historical written answers only
where owner, assignment and timestamp identify one history entry unambiguously.
Ambiguous history is not guessed. Existing submission/file records are retained.
No production migration or deployment has been performed by this implementation.
The unresolved Cloudflare build must be addressed before rollout.

## Boundaries

Native instructor grading, secure file upload/download, persistent draft recovery
and request-id deduplication remain future work. Explicit resubmission creates a
new attempt; clients do not automatically retry writes. After an ambiguous network
failure, check submission status before retrying. Drafts currently live only in
screen memory. An assignment without a linked maximum cannot be graded in the new
website UI. A legacy assignment without an author still needs staff ownership
reconciliation; this change does not invent an instructor assignment.

Tests use isolated fixtures/local Worker databases: text handoff and feedback,
ownership, score bounds, superseded attempts, transactional rollback, empty input
and safe legacy backfill. Production student/instructor acceptance remains a gate.
