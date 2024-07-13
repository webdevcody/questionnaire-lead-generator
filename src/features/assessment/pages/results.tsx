import { Question } from "../components/question";
import { getResponses } from "../../../data/responses";
import { App } from "../../../server";
import { backgroundQuestions } from "../data/questions";

export function registerResults(app: App) {
  app.get("/results", async (c) => {
    const responses = getResponses(c);

    return c.render(
      <div className="container max-w-xl mx-auto min-h-screen">
        <div class="space-y-8">
          <h1 class="text-4xl">Results</h1>

          <p>
            These questions will help us understand your background and the
            context of your podcast. This will help us provide more accurate
            recommendations.
          </p>
        </div>
      </div>,
      {
        title: "Podcasr Assessment - Start",
      }
    );
  });
}
