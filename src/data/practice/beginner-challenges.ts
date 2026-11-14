/** Small practice checks for the first five Notes. Suggestions require editorial review. */
export type LessonChallenge = {
  question: string;
  options: readonly { id: string; text: string; feedback: string; correct: boolean }[];
};

export const beginnerChallenges: Record<string, LessonChallenge> = {
  "sitting-down-at-a-computer": {
    question: "You want your next words to appear in an open document. What should you do first?",
    options: [
      {
        id: "click",
        text: "Click inside the document, then type",
        correct: true,
        feedback:
          "Yes. Clicking inside the document places the cursor where your next words can appear.",
      },
      {
        id: "power",
        text: "Press the power button again",
        correct: false,
        feedback:
          "The power button controls the computer, not where text appears. Click inside the document first.",
      },
      {
        id: "unsure",
        text: "I'm not sure yet",
        correct: false,
        feedback:
          "That's okay. Click inside the document to place the cursor, then type with the keyboard.",
      },
    ],
  },
  "files-and-folders": {
    question:
      "You want to find your document again later. What is a useful first step when saving it?",
    options: [
      {
        id: "name",
        text: "Give it a clear name and choose a folder",
        correct: true,
        feedback:
          "Yes. A clear file name and a folder you can remember help you find the document again.",
      },
      {
        id: "close",
        text: "Close the document without saving",
        correct: false,
        feedback:
          "Closing without saving may discard your changes. Save it with a clear name in a folder you can find.",
      },
      {
        id: "unsure",
        text: "I'm not sure yet",
        correct: false,
        feedback:
          "That's okay. Save the document with a clear name and choose a folder you can find later.",
      },
    ],
  },
  "your-hands-on-the-keyboard": {
    question: "You typed one extra letter just before the cursor. Which key normally removes it?",
    options: [
      {
        id: "backspace",
        text: "Backspace",
        correct: true,
        feedback: "Yes. Backspace normally removes the character immediately before the cursor.",
      },
      {
        id: "space",
        text: "Spacebar",
        correct: false,
        feedback:
          "The spacebar adds a space. Backspace normally removes the character before the cursor.",
      },
      {
        id: "unsure",
        text: "I'm not sure yet",
        correct: false,
        feedback:
          "That's okay. Backspace normally removes the character immediately before the cursor.",
      },
    ],
  },
  "the-internet-without-getting-lost": {
    question: "You have a web address you trust and want to visit it. Where can you type it?",
    options: [
      {
        id: "address",
        text: "The browser's address bar",
        correct: true,
        feedback:
          "Yes. The address bar is where you can type a website address. Check the spelling before visiting.",
      },
      {
        id: "document",
        text: "A document's text area",
        correct: false,
        feedback:
          "A document is for writing, not navigating. Enter the address in the browser's address bar.",
      },
      {
        id: "unsure",
        text: "I'm not sure yet",
        correct: false,
        feedback: "That's okay. A browser's address bar is where you can enter a website address.",
      },
    ],
  },
  "your-first-email": {
    question:
      "You promised to send a document with an email. What should you check before sending?",
    options: [
      {
        id: "attachment",
        text: "That the intended recipient and the attachment are correct",
        correct: true,
        feedback:
          "Yes. Check the recipient and confirm the intended file is attached before sending.",
      },
      {
        id: "subject",
        text: "Only the subject line; the file will attach itself",
        correct: false,
        feedback:
          "A file does not attach itself. Check the recipient and add the intended attachment before sending.",
      },
      {
        id: "unsure",
        text: "I'm not sure yet",
        correct: false,
        feedback:
          "That's okay. Check the recipient and confirm the intended file is attached before sending.",
      },
    ],
  },
};

export const beginnerLessonSlugs = [
  "sitting-down-at-a-computer",
  "files-and-folders",
  "your-hands-on-the-keyboard",
  "the-internet-without-getting-lost",
  "your-first-email",
] as const;
