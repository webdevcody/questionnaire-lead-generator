import { pageFactory } from "../../../util/action";
import { Steps } from "../components/layout";

export const registerFinishAssessmentPage = pageFactory(
  "/assessment/finish",
  (c) => {
    return (
      <div className="container mx-auto min-h-screen max-w-xl">
        <div class="space-y-8">
          <Steps current={3} />

          <h1 class="text-4xl">You've finished your assessment!</h1>

          <p>
            Thanks for taking the time to complete the assessment. Click below
            to see your results.
          </p>

          <div className="flex flex-col items-center gap-8">
            <div>
              <a href={`/assessment/results`} class="btn btn-primary">
                View Results
              </a>
            </div>
            <div>
              <a href={`/assessment/start`} class="link">
                Modify Responses
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  },
  {
    title: "Finished | Podcast Assessment",
  },
);
