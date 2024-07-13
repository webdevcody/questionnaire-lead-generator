import { App } from "../../server";
import { saveResponse } from "../../data/responses";

export function registerAssessmentApi(app: App) {
  app.post("/htmx/responses/:questionId", async (c) => {
    const questionId = c.req.param().questionId;
    const formData = await c.req.formData();
    const answerIdx = formData.get("answerIdx") as string;
    await saveResponse(c, { questionId, userAnswerIdx: answerIdx });
    return c.body(null, 204);
  });
}
