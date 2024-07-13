import { getResponses, saveResponse } from "../../../data/responses";
import { App } from "../../../server";
import { assessmentQuestions } from "../data/questions";
import { Steps } from "../components/layout";
import { startCase } from "lodash";

export const saveResponseUrl = "/actions/save-response";

export function registerAssessmentQuestions(app: App) {
  app.post(saveResponseUrl, async (c) => {
    const formData = await c.req.formData();
    const answerIdx = formData.get("answerIdx") as string;
    const questionId = formData.get("questionId") as string;
    const questionIdx = assessmentQuestions.findIndex(
      (q) => q.id === questionId
    );
    await saveResponse(c, { questionId, userAnswerIdx: answerIdx });
    if (questionIdx === assessmentQuestions.length - 1) {
      return c.redirect(`/assessment/finish`);
    } else {
      return c.redirect(`/assessment/questions/${questionIdx + 1}`);
    }
  });

  app.get("/assessment/questions/:questionIdx", async (c) => {
    const responses = getResponses(c);
    const questionIdx = parseInt(c.req.param().questionIdx, 10);
    const question = assessmentQuestions[questionIdx];

    return c.render(
      <div className="container max-w-xl mx-auto min-h-screen">
        <div class="space-y-8">
          <Steps current={2} />

          <h1 class="text-center text-4xl">
            Question {questionIdx + 1} of {assessmentQuestions.length}
          </h1>

          <p class="text-center text-2xl">{startCase(question.category)}</p>

          <form action={saveResponseUrl} method="POST">
            <input type="hidden" name="questionId" value={question.id} />

            <div className="max-w-xl">
              <div class="space-y-16">
                <ul class="space-y-4">
                  {question.answers.map((answer, idx) => (
                    <li class="flex gap-2">
                      <input
                        id={answer}
                        type="radio"
                        required={true}
                        name="answerIdx"
                        value={idx.toString()}
                        checked={
                          responses.questions[question.id] === idx.toString()
                        }
                      />
                      <label for={answer}>{answer}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-8 justify-center">
              {questionIdx === 0 && (
                <div>
                  <a href={`/assessment/context`} class="btn btn-ghost">
                    Previous
                  </a>
                </div>
              )}

              {questionIdx > 0 && (
                <div>
                  <a
                    href={`/assessment/questions/${questionIdx - 1}`}
                    class="btn btn-ghost"
                  >
                    Previous
                  </a>
                </div>
              )}

              {questionIdx < assessmentQuestions.length - 1 && (
                <div>
                  <button
                    type="submit"
                    href={`/assessment/questions/${questionIdx + 1}`}
                    class="btn btn-outline"
                  >
                    Next
                  </button>
                </div>
              )}

              {questionIdx === assessmentQuestions.length - 1 && (
                <div>
                  <button
                    type="submit"
                    href={`/assessment/finish`}
                    class="btn btn-primary"
                  >
                    Finish
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>,
      {
        title: "Podcast Assessment - Questions",
      }
    );
  });
}
