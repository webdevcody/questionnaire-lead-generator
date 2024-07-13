import { App } from "../../../server";

export function registerFinishAssessment(app: App) {
  app.get("/assessment/finish", async (c) => {
    return c.render(
      <div className="container max-w-xl mx-auto min-h-screen py-12">
        <div class="space-y-8">
          <h1 class="text-4xl">You've finished your assessment!</h1>

          <p>
            Thanks for taking the time to complete the assessment. Click below
            to see your results.
          </p>

          <a href={`/results`} class="btn btn-primary">
            View Results
          </a>
        </div>
      </div>,
      {
        title: "Start Assessment",
      }
    );
  });
}
