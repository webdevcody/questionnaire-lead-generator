import { App } from "..";
import { setCookie, getCookie } from "hono/cookie";

const questions = [
  {
    id: 1,
    question: "How many employees does your company have?",
    answers: [
      "1-10",
      "11-50",
      "51-200",
      "201-500",
      "501-1000",
      "1001-5000",
      "5001-10,000",
      "10,001+",
    ],
  },
];

type Question = (typeof questions)[0];

export function Question({
  question,
  responses,
}: {
  question: Question;
  responses: Record<string, string>;
}) {
  return (
    <div class="space-y-4">
      <h2 class="text-3xl font-bold">{question.question}</h2>

      <ul class="space-y-4">
        {question.answers.map((answer, idx) => (
          <li class="flex gap-2">
            <input
              id={answer}
              type="radio"
              name={`${question.id}`}
              hx-post={`/responses/${question.id}`}
              hx-trigger="click"
              hx-include={`[data-name='${question.id}-${idx}']`}
              checked={responses[question.id] === idx.toString()}
            />
            <input
              type="hidden"
              name="answerIdx"
              data-name={`${question.id}-${idx}`}
              value={idx}
            />
            <label for={answer}>{answer}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Index({
  responses,
}: {
  responses: Record<string, string>;
}) {
  // const todos = await db.query.todos.findMany();

  return (
    <div class="space-y-8">
      <h1 class="text-4xl">Questions</h1>

      <div id="todos" class="space-y-2">
        {questions.map((question) => (
          <Question responses={responses} question={question} />
        ))}
      </div>

      {/* <form
        className="flex items-center"
        hx-post="/todos"
        hx-target="#todos"
        hx-swap="beforeend"
        hx-trigger="submit"
        _="on htmx:afterRequest reset() me"
      >
        <input class="input" name="text" />
        <button class="btn">
          <img class="htmx-indicator w-5 h-5" src="/static/spinner.svg" />
          Create
        </button>
      </form> */}
    </div>
  );
}

export function registerHome(app: App) {
  app.get("/", async (c) => {
    const responses = JSON.parse(getCookie(c, "responses") ?? "{}");

    return c.render(<Index responses={responses} />, {
      title: "Questions",
    });
  });

  app.post("/responses/:questionId", async (c) => {
    const questionId = c.req.param().questionId;
    const formData = await c.req.formData();
    const answerIdx = formData.get("answerIdx") as string;
    const responses = JSON.parse(getCookie(c, "responses") ?? "{}");
    responses[questionId] = answerIdx;
    setCookie(c, "responses", JSON.stringify(responses));
    return c.render("");
  });
}
