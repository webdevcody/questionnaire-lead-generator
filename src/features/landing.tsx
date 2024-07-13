// import { getCookie } from "hono/cookie";
import { App } from "../server";

export function registerLanding(app: App) {
  app.get("/", async (c) => {
    // const responses = JSON.parse(getCookie(c, "responses") ?? "{}");
    // const isSurveyInProgress = !!responses;

    return c.render(
      <div class="space-y-4">
        <section class="py-12">
          <div class="container mx-auto max-w-2xl text-center">
            <h1 class="text-4xl font-semibold text-gray-200">
              A <span class="text-neutral-content">good</span> Podcast deserves
              to be
              <span class="text-base-content"> great</span>
            </h1>
            <p class="text-gray-400 mt-4 text-xl">
              Our survey analyzes various aspects of your podcast to pinpoint
              areas for improvement. You'll receive a detailed PDF report with
              personalized insights and recommendations.
            </p>
          </div>
        </section>

        <section class="py-12">
          <div class="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div class="p-6 rounded-lg shadow-lg border-neutral-content border">
                <h3 class="text-xl font-bold text-base-content">
                  Identify Weaknesses
                </h3>
                <p class="text-accent-content mt-2">
                  Understand where your podcast is falling short and how to
                  address it.
                </p>
              </div>
              <div class="p-6 rounded-lg shadow-lg border-neutral-content border">
                <h3 class="text-xl font-bold text-base-content">
                  Customized Insights
                </h3>
                <p class="text-accent-content mt-2">
                  Receive a tailored report specific to your podcast's unique
                  needs.
                </p>
              </div>
              <div class="p-6 rounded-lg shadow-lg border-neutral-content border">
                <h3 class="text-xl font-bold text-base-content">
                  Actionable Recommendations
                </h3>
                <p class="text-accent-content mt-2">
                  Get practical tips and strategies to enhance your podcast's
                  performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="py-12">
          <div class="container mx-auto text-center space-y-4">
            <h2 class="text-2xl font-semibold">
              Ready to Improve Your Podcast?
            </h2>
            <p class="mt-4">
              Take our survey today and start your journey towards podcasting
              excellence.
            </p>
            <a href="/start-assessment" class="btn btn-primary">
              Take the Survey
            </a>
          </div>
        </section>
      </div>,
      {
        title: "Podcast Performance Survey",
      }
    );
  });
}
