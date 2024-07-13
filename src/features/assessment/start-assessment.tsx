import { Question } from "./question";
import { getResponses } from "../../data/responses";
import { App } from "../../server";
// import { setCookie, getCookie } from "hono/cookie";

const questions: Question[] = [
  {
    id: "1",
    question: "Job title",
    type: "select",
    answers: ["Software Engineer", "Product Manager", "Other"],
  },
  {
    id: "2",
    type: "select",
    question: "Which best describes you?",
    answers: ["Business consultant"],
  },
  {
    id: "3",
    question: "Which best describes the area you work in or you business?",
    type: "radio",
    answers: ["Technology", "Education"],
  },
  {
    id: "4",
    question: "What's your company's annual revenue?",
    type: "radio",
    answers: ["0", "$100"],
  },
  {
    id: "5",
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
  },
];

export function registerStartAssessment(app: App) {
  app.get("/start-assessment", async (c) => {
    const responses = getResponses(c);

    return c.render(
      <div className="container max-w-xl mx-auto">
        <div class="space-y-8">
          <h1 class="text-4xl">Before you start the assessment:</h1>

          <div className="max-w-xl">
            <div id="todos" class="space-y-16">
              {questions.map((question) => (
                <Question responses={responses} question={question} />
              ))}
            </div>
          </div>
        </div>
      </div>,
      {
        title: "Podcasr Assessment - Start",
      }
    );
  });
}
