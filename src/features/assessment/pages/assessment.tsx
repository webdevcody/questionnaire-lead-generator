import { Question } from "../components/question";
import { getResponses, saveResponse } from "../../../data/responses";
import { App } from "../../../server";
import { assessmentQuestions } from "../data/questions";

export const saveResponseUrl = "/actions/save-response";

export function registerAssessmentQuestions(app: App) {
  app.post(saveResponseUrl, async (c) => {
    const formData = await c.req.formData();
    const answerIdx = formData.get("answerIdx") as string;
    const questionId = formData.get("questionId") as string;
    await saveResponse(c, { questionId, userAnswerIdx: answerIdx });
    return c.body(null, 204);
  });

  app.get("/assessment/questions/:questionIdx", async (c) => {
    const responses = getResponses(c);
    const questionIdx = parseInt(c.req.param().questionIdx, 10);
    const question = assessmentQuestions[questionIdx];

    return c.render(
      <div className="container max-w-xl mx-auto min-h-screen py-12">
        <div class="space-y-8">
          <div className="flex justify-center">
            {questionIdx === 0 && (
              <div>
                <a href={`/assessment/context`} class="btn btn-outline">
                  Previous
                </a>
              </div>
            )}

            {questionIdx > 0 && (
              <div>
                <a
                  href={`/assessment/questions/${questionIdx - 1}`}
                  class="btn btn-outline"
                >
                  Previous
                </a>
              </div>
            )}
          </div>

          <h1 class="text-4xl">
            Question {questionIdx + 1} of {assessmentQuestions.length}:
          </h1>

          <div className="max-w-xl">
            <div class="space-y-16">
              <Question responses={responses} question={question} />
            </div>
          </div>

          <div className="flex justify-center">
            {questionIdx < assessmentQuestions.length - 1 && (
              <div>
                <a
                  href={`/assessment/questions/${questionIdx + 1}`}
                  class="btn btn-outline"
                >
                  Next
                </a>
              </div>
            )}

            {questionIdx === assessmentQuestions.length - 1 && (
              <div>
                <a href={`/assessment/finish`} class="btn btn-primary">
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
