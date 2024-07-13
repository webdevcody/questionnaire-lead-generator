import { App } from "../../../server";
import { saveResponse } from "../../../data/responses";

export const saveResponseUrl = "/actions/save-response";

export function registerAssessmentActions(app: App) {
  app.post(saveResponseUrl, async (c) => {
    const formData = await c.req.formData();
    const answerIdx = formData.get("answerIdx") as string;
    const questionId = formData.get("questionId") as string;
    await saveResponse(c, { questionId, userAnswerIdx: answerIdx });
    return c.body(null, 204);
  });
}
