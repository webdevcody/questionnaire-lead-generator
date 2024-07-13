import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";

const RESPONSES_COOKIE_NAME = "responses";

export type Responses = {
  info: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };
  questions: Record<string, string>;
};

export function getResponses(c: Context): Responses {
  return JSON.parse(
    getCookie(c, RESPONSES_COOKIE_NAME) ??
      JSON.stringify({
        info: {
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
        },
        questions: {},
      })
  );
}

export function updateResponse(c: Context, responses: Responses) {
  setCookie(c, RESPONSES_COOKIE_NAME, JSON.stringify(responses));
}

export function saveResponse(
  c: Context,
  { questionId, userAnswerIdx }: { questionId: string; userAnswerIdx: string }
) {
  const responses = getResponses(c);
  responses.questions[questionId] = userAnswerIdx;
  setCookie(c, RESPONSES_COOKIE_NAME, JSON.stringify(responses));
}
