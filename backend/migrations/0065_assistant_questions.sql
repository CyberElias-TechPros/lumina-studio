-- 0065_assistant_questions.sql
-- What visitors actually ask the site assistant, and what it could not answer.
--
-- This is the feedback loop that makes the chatbot reduce your explaining over
-- time: the weekly review is "here are the questions people asked, and here are
-- the ones the bot had to hand to WhatsApp" — which is a to-do list for the FAQ,
-- the course pages and the bot's own facts block.

CREATE TABLE IF NOT EXISTS assistant_questions (
  id TEXT PRIMARY KEY,
  /** The visitor's message (trimmed). */
  question TEXT NOT NULL,
  /** First ~200 chars of the answer, enough to recognise the exchange. */
  answer_preview TEXT NOT NULL DEFAULT '',
  /** 1 when the reply came from the fallback (provider down / budget spent). */
  fallback INTEGER NOT NULL DEFAULT 0,
  /** Which page the widget was on, when it reported one. */
  page TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_assistant_questions_created ON assistant_questions (created_at);
CREATE INDEX IF NOT EXISTS idx_assistant_questions_fallback ON assistant_questions (fallback);
