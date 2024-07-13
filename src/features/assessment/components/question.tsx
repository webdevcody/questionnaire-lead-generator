import { Question } from "../data/questions";
import { saveResponseUrl } from "../pages/assessment";

function Select({
  question,
  responses,
}: {
  question: Question;
  responses: Record<string, string>;
}) {
  return (
    <>
      <select
        hx-post={saveResponseUrl}
        hx-trigger="change"
        class="select w-full max-w-xs select-bordered"
        name="answerIdx"
        hx-include={`next [name='questionId']`}
      >
        <option disabled selected>
          Pick your favorite Simpson
        </option>
        {question.answers.map((answer, idx) => (
          <option
            value={`${idx}`}
            selected={responses[question.id] === `${idx}`}
          >
            {answer}
          </option>
        ))}
      </select>

      <input type="hidden" name="questionId" value={question.id} />
    </>
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
            value={idx.toString()}
            hx-post={saveResponseUrl}
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
          <input
            data-name={`${question.id}-${idx}`}
            type="hidden"
            name="questionId"
            value={question.id}
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
