export type Categories = "leadership" | "marketing" | "sales";

export type Question = {
  id: string;
  question: string;
  answers: string[];
  type: "select" | "radio";
  section: "background" | "assessment";
  category: "background" | Categories;
};

export const backgroundQuestions = [
  {
    question: "Job title",
    type: "select",
    answers: ["Software Engineer", "Product Manager", "Other"],
    section: "background",
    category: "background",
  },
  {
    type: "select",
    question: "Which best describes you?",
    answers: ["Business consultant"],
    section: "background",
    category: "background",
  },
  {
    question: "Which best describes the area you work in or you business?",
    type: "radio",
    answers: ["Technology", "Education"],
    section: "background",
    category: "background",
  },
  {
    question: "What's your company's annual revenue?",
    type: "radio",
    answers: ["0", "$100"],
    section: "background",
    category: "background",
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
    category: "background",
  },
] as Question[];

export const assessmentQuestions = [
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "leadership",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "leadership",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "leadership",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "leadership",
  },
  // marketing questions
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "marketing",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "marketing",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "marketing",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "marketing",
  },
  // sales
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "sales",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "sales",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "sales",
  },
  {
    question: "How long have you been in your current role?",
    type: "radio",
    answers: ["1 year", "2 years", "10 years+"],
    section: "assessment",
    category: "sales",
  },
] as Question[];

[...backgroundQuestions, ...assessmentQuestions].forEach(
  (q, idx) => (q.id = (idx + 1).toString())
);
