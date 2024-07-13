export type Question = {
  id: string;
  question: string;
  answers: string[];
  type: "select" | "radio";
  section: "background" | "assessment";
  cartegory: "background" | "leadership" | "marketing" | "sales";
};

export const backgroundQuestions = [
  {
    question: "Job title",
    type: "select",
    answers: ["Software Engineer", "Product Manager", "Other"],
    section: "background",
    cartegory: "background",
  },
  {
    type: "select",
    question: "Which best describes you?",
    answers: ["Business consultant"],
    section: "background",
    cartegory: "background",
  },
  {
    question: "Which best describes the area you work in or you business?",
    type: "radio",
    answers: ["Technology", "Education"],
    section: "background",
    cartegory: "background",
  },
  {
    question: "What's your company's annual revenue?",
    type: "radio",
    answers: ["0", "$100"],
    section: "background",
    cartegory: "background",
  },
  {
    type: "radio",
    question: "How many employees does your company have?",
    answers: [
      "1-10",
      "11-50",
      "51-200",
      "201-500",
      "501-1000",
      "1001-5000",
      "5001-10,000",
      "10,001+",
    ],
    section: "background",
    cartegory: "background",
  },
] as Question[];

export const assessmentQuestions = [
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    cartegory: "leadership",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    cartegory: "leadership",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    cartegory: "leadership",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    cartegory: "leadership",
  },
  // marketing questions
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    cartegory: "marketing",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    cartegory: "marketing",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    cartegory: "marketing",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    cartegory: "marketing",
  },
] as Question[];

[...backgroundQuestions, ...assessmentQuestions].forEach(
  (q, idx) => (q.id = (idx + 1).toString())
);
