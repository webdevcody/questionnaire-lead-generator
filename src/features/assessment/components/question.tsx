import { saveResponseUrl } from "../actions/save-response";
import { Question } from "../data/questions";

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
      <input type="hidden" name="questionId" value={question.id} />
      {question.answers.map((answer, idx) => (
        <li class="flex gap-2">
          <input
            id={answer}
            type="radio"
            name={"answerIdx"}
            value={idx.toString()}
            hx-post={saveResponseUrl}
            hx-trigger="click"
            hx-include={`previous [name='questionId']`}
            checked={responses[question.id] === idx.toString()}
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
