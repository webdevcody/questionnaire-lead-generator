import { Question } from "../components/question";
import { getResponses } from "../../../data/responses";
import { App } from "../../../server";
import { backgroundQuestions } from "../data/questions";

export function registerStartAssessment(app: App) {
  app.get("/start-assessment", async (c) => {
    const responses = getResponses(c);

    return c.render(
      <div className="container max-w-xl mx-auto">
        <div class="space-y-8">
          <h1 class="text-4xl">Before you start the assessment:</h1>

          <p>
            These questions will help us understand your background and the
            context of your podcast. This will help us provide more accurate
            recommendations.
          </p>

          <div className="max-w-xl">
            <div class="space-y-16">
              {backgroundQuestions.map((question) => (
                <Question responses={responses} question={question} />
              ))}
            </div>
          </div>

          <div>
            <a href="/assessment/0" class="btn btn-primary">
              Start Assessments
            </a>
          </div>
        </div>
      </div>,
      {
        title: "Podcasr Assessment - Start",
      }
    );
  });
}
