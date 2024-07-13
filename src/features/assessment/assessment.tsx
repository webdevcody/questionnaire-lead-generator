import { Question } from "./question";
import { getResponses } from "../../data/responses";
import { App } from "../../server";

const questions: Question[] = [
  {
    id: "6",
    type: "radio",
    question: "How long has it been since you've done something",
    answers: ["1 year", "2 years", "10 years+"],
  },
];

export function registerAssessment(app: App) {
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
        title: "Start Assessment",
      }
    );
  });
}
