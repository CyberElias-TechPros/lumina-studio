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
- Student website: actual submission state, written answers and returned feedback.
- Instructor website: actual submitted text, explicit score/feedback, no fabricated
  code checks, plagiarism scores, preset praise, rubric scores or autosave claims.

## Deployment order

Apply additive migration `0069_submission_text.sql` and deploy the backend before
shipping the dependent website. It recovers historical written answers only
where owner, assignment and timestamp identify one history entry unambiguously.
Ambiguous history is not guessed. Existing submission/file records are retained.
No production migration or deployment has been performed by this implementation.
The unresolved Cloudflare build must be addressed before rollout.

## Boundaries

This is the shared backend and website handoff, not a completed native assignment
screen. Native assignment UI, secure file upload/download, draft recovery and
request-id deduplication remain work. Explicit resubmission creates a new attempt;
clients do not automatically retry writes. After an ambiguous network failure,
check submission status before retrying. Drafts currently live only in the page.
An assignment without a linked maximum cannot be graded in the new website UI.
A legacy assignment without an author still needs staff ownership reconciliation;
this change does not invent an instructor assignment.

Tests use isolated fixtures/local Worker databases: text handoff and feedback,
ownership, score bounds, superseded attempts, transactional rollback, empty input
and safe legacy backfill. Production student/instructor acceptance remains a gate.
