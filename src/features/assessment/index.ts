import { registerStartAssessment } from "./pages/start";
import { registerFinishAssessment } from "./pages/finish";
import { App } from "../../server";
import { registerContextAssessment } from "./pages/context";
import { registerAssessmentQuestions } from "./pages/assessment";
import { registerResults } from "./pages/results";

export function registerAssessment(app: App) {
  registerStartAssessment(app);
  registerContextAssessment(app);
  registerFinishAssessment(app);
  registerAssessmentQuestions(app);
  registerResults(app);
}
