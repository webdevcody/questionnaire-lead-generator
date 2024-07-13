import { getResponses } from "../../../data/responses";
import { App } from "../../../server";
import { assessmentQuestions, Categories } from "../data/questions";
import { startCase } from "lodash";

function Category({
  category,
  score,
}: {
  category: Categories;
  score: number;
}) {
  return (
    <div class="space-y-8 border rounded-xl border-neutral-content p-8">
      <h1 class="text-4xl">{startCase(category)}</h1>

      <p>Category Score of {score}</p>

      <p>
        These questions will help us understand your background and the context
        of your podcast. This will help us provide more accurate
        recommendations.
      </p>
    </div>
  );
}

export function registerResults(app: App) {
  app.get("/assessment/results", async (c) => {
    const responses = getResponses(c);

    // filter out the responses.questions by type
    const categoryScores: Record<Categories, number> = assessmentQuestions
      .filter((question) => question.section === "assessment")
      .reduce((acc: any, question) => {
        if (!acc[question.category]) {
          acc[question.category] = 0;
        }
        const responseIdx = responses.questions[question.id];
        acc[question.category] += parseInt(responseIdx) + 1;
        return acc;
      }, {});

    return c.render(
      <div className="container max-w-2xl mx-auto min-h-screen">
        <div class="space-y-8">
          <h1 class="text-4xl">Results</h1>

          <p>
            These questions will help us understand your background and the
            context of your podcast. This will help us provide more accurate
            recommendations.
          </p>

          <Category
            category="leadership"
            score={categoryScores["leadership"]}
          />
          <Category category="marketing" score={categoryScores["marketing"]} />
          <Category category="sales" score={categoryScores["sales"]} />
        </div>
      </div>,
      {
        title: "Results | Podcast Assessment",
      }
    );
  });
}
