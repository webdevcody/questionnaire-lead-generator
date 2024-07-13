import { Question } from "../components/question";
import { getResponses } from "../../../data/responses";
import { App } from "../../../server";
import { assessmentQuestions } from "../data/questions";

export function registerAssessment(app: App) {
  app.get("/assessment/:questionIdx", async (c) => {
    const responses = getResponses(c);
    const questionIdx = parseInt(c.req.param().questionIdx, 10);
    const question = assessmentQuestions[questionIdx];

    return c.render(
      <div className="container max-w-xl mx-auto min-h-screen py-12">
        <div class="space-y-8">
          <h1 class="text-4xl">
            Question {questionIdx + 1} of {assessmentQuestions.length}:
          </h1>

          <div className="max-w-xl">
            <div class="space-y-16">
              <Question responses={responses} question={question} />
            </div>
          </div>

          <div className="flex justify-between">
            {questionIdx === 0 && (
              <div>
                <a href={`/start-assessment`} class="btn btn-ghost">
                  Back
                </a>
              </div>
            )}

            {questionIdx > 0 && (
              <div>
                <a
                  href={`/assessment/${questionIdx - 1}`}
                  class="btn btn-ghost"
                >
                  Previous
                </a>
              </div>
            )}

            {questionIdx < assessmentQuestions.length - 1 && (
              <div>
                <a
                  href={`/assessment/${questionIdx + 1}`}
                  class="btn btn-primary"
                >
                  Next
                </a>
              </div>
            )}

            {questionIdx === assessmentQuestions.length - 1 && (
              <div>
                <a href={`/finish-assessment`} class="btn btn-primary">
                  Finish
                </a>
              </div>
            )}
          </div>
        </div>
      </div>,
      {
        title: "Start Assessment",
      }
    );
  });
}
