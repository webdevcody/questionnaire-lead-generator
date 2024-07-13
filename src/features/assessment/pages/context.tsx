import { Question } from "../components/question";
import { getResponses, saveResponse } from "../../../data/responses";
import { App } from "../../../server";
import { backgroundQuestions } from "../data/questions";
import { Steps } from "../components/layout";

export function registerContextAssessment(app: App) {
  const saveContextUrl = "/actions/save-context";

  app.post(saveContextUrl, async (c) => {
    const formData = await c.req.formData();
    formData.forEach((value, key) => {
      saveResponse(c, { questionId: key, userAnswerIdx: value.toString() });
    });
    return c.redirect("/assessment/questions/0");
  });

  app.get("/assessment/context", async (c) => {
    const responses = getResponses(c);

    return c.render(
      <div className="container max-w-xl mx-auto">
        <div class="space-y-8">
          <Steps current={1} />

          <h1 class="text-4xl">Before you start the assessment:</h1>

          <p>
            These questions will help us understand your background and the
            context of your podcast. This will help us provide more accurate
            recommendations.
          </p>

          <form action={saveContextUrl} method="POST">
            <div className="max-w-xl">
              <div class="space-y-16">
                {backgroundQuestions.map((question) => (
                  <Question
                    responses={responses}
                    question={question}
                    required={true}
                  />
                ))}
              </div>
            </div>

            <div class="flex justify-center gap-4">
              <a href="/assessment/start" class="btn btn-ghost">
                Previous
              </a>

              <button
                type="submit"
                class="btn btn-outline"
                href={`/assessment/questions/0`}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>,
      {
        title: "Podcast Assessment - Context",
      }
    );
  });
}
