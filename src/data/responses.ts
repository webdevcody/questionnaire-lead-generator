import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";

const RESPONSES_COOKIE_NAME = "responses";

export function getResponses(c: Context) {
  return JSON.parse(getCookie(c, RESPONSES_COOKIE_NAME) ?? "{}");
}

export function saveResponse(
  c: Context,
  { questionId, userAnswerIdx }: { questionId: string; userAnswerIdx: string }
) {
  const responses = getResponses(c);
  responses[questionId] = userAnswerIdx;
  setCookie(c, RESPONSES_COOKIE_NAME, JSON.stringify(responses));
}
