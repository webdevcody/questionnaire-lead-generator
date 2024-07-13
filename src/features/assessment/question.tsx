export type Question = {
  id: string;
  question: string;
  answers: string[];
  type: "select" | "radio" | "multi";
};

function Select({
  question,
  responses,
}: {
  question: Question;
  responses: Record<string, string>;
}) {
  return (
    <select
      hx-post={`/api/responses/${question.id}`}
      hx-trigger="change"
      class="select w-full max-w-xs"
      name="answerIdx"
      // hx-include={`[data-name='${question.id}']`}
    >
      <option disabled selected>
        Pick your favorite Simpson
      </option>
      {question.answers.map((answer, idx) => (
        <option value={`${idx}`} selected={responses[question.id] === `${idx}`}>
          {answer}
        </option>
      ))}
    </select>
  );
}

function Radio({
  question,
  responses,
}: {
  question: Question;
  responses: Record<string, string>;
}) {
  return (
    <ul class="space-y-4">
      {question.answers.map((answer, idx) => (
        <li class="flex gap-2">
          <input
            id={answer}
            type="radio"
            name={`${question.id}`}
            hx-post={`/api/responses/${question.id}`}
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
  );
}

export function Question({
  question,
  responses,
}: {
  question: Question;
  responses: Record<string, string>;
}) {
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-bold text-neutral-content">
        {question.question}
      </h2>

      {question.type === "select" && (
        <Select question={question} responses={responses} />
      )}

      {question.type === "radio" && (
        <Radio question={question} responses={responses} />
      )}
    </div>
  );
}
