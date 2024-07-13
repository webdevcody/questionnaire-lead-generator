import { getResponses, saveResponse } from "../../../data/responses";
import { assessmentQuestions } from "../data/questions";
import { Steps } from "../components/layout";
import { startCase } from "lodash";
import { actionFactory, pageFactory } from "../../../util/action";

export const registerSaveResponse = actionFactory(
  "save-response",
  async (c) => {
    const formData = await c.req.formData();
    const answerIdx = formData.get("answerIdx") as string;
    const questionId = formData.get("questionId") as string;
    const questionIdx = assessmentQuestions.findIndex(
      (q) => q.id === questionId,
    );
    await saveResponse(c, { questionId, userAnswerIdx: answerIdx });
    if (questionIdx === assessmentQuestions.length - 1) {
      return c.redirect(`/assessment/finish`);
    } else {
      return c.redirect(`/assessment/questions/${questionIdx + 1}`);
    }
  },
);

export const registerQuestionPage = pageFactory(
  "/assessment/questions/:questionIdx",
  async (c) => {
    const responses = getResponses(c);
    const questionIdx = parseInt(c.req.param().questionIdx, 10);
    const question = assessmentQuestions[questionIdx];

    return (
      <div className="container mx-auto min-h-screen max-w-xl">
        <div class="space-y-8">
          <Steps current={2} />

          <h1 class="text-center text-xl">
            Question {questionIdx + 1} of {assessmentQuestions.length}
          </h1>

          <p class="text-center text-xl">{startCase(question.category)}</p>

          <form
            action={registerSaveResponse.url}
            method="POST"
            class={"space-y-16"}
          >
            <input type="hidden" name="questionId" value={question.id} />

            <div className="max-w-xl space-y-8">
              <p class={"text-xl"}>{question.question}</p>

              <div class="flex items-center">
                <label for="rating" class="">
                  Strongly Disagree
                </label>

                <div className="mx-12 flex flex-1 justify-between">
                  {new Array(5).fill(0).map((_, idx) => (
                    <label for={`option-${idx}`} class="relative">
                      <span class="absolute -bottom-6 right-2">{idx + 1}</span>
                      <input
                        required
                        type="radio"
                        id={`option-${idx}`}
                        name="answerIdx"
                        value={idx.toString()}
                        checked={
                          responses.questions[question.id] === idx.toString()
                        }
                        class="radio"
                      />
                    </label>
                  ))}
                </div>

                <label for="rating" class="">
                  Strongly Agree
                </label>
              </div>
            </div>

            <div className="flex justify-center gap-8">
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
      </div>
    );
  },
  {
    title: "Podcast Assessment - Questions",
  },
);
