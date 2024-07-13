import { Responses } from "../../../data/responses";
import { Question } from "../data/questions";

function Select({
  question,
  required = false,
  responses,
}: {
  question: Question;
  required?: boolean;
  responses: Record<string, string>;
}) {
  return (
    <select
      required={required}
      class="select w-full max-w-xs select-bordered"
      name={question.id}
    >
      <option disabled selected value="">
        - Select -
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
  required = false,
}: {
  question: Question;
  responses: Record<string, string>;
  required?: boolean;
}) {
  return (
    <ul class="space-y-4">
      {question.answers.map((answer, idx) => (
        <li class="flex gap-2">
          <input
            id={answer}
            type="radio"
            required={required}
            name={`${question.id}`}
            value={idx.toString()}
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
  required,
}: {
  question: Question;
  responses: Responses;
  required?: boolean;
}) {
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-bold text-neutral-content">
        {question.question}
      </h2>

      {question.type === "select" && (
        <Select
          required={required}
          question={question}
          responses={responses.questions}
        />
      )}

      {question.type === "radio" && (
        <Radio
          required={required}
          question={question}
          responses={responses.questions}
        />
      )}
    </div>
  );
}
