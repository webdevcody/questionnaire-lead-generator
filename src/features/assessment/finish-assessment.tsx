import { App } from "../../server";

export function registerFinishAssessment(app: App) {
  app.get("/start-assessment", async (c) => {
    return c.render(
      <div className="container max-w-xl mx-auto">
        <div class="space-y-8">
          <h1 class="text-4xl">You've finished your assessment!</h1>
        </div>
      </div>,
      {
        title: "Start Assessment",
      }
    );
  });
}
