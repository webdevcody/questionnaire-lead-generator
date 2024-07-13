export function Steps({ current }: { current: number }) {
  return (
    <div className="flex justify-center pb-12">
      <ul class="steps">
        <li class={`step ${current === 0 ? "step-primary" : ""}`}>Info</li>
        <li class={`step ${current === 1 ? "step-primary" : ""}`}>Context</li>
        <li class={`step ${current === 2 ? "step-primary" : ""}`}>
          Assessment
        </li>
        <li class={`step ${current === 3 ? "step-primary" : ""}`}>Results</li>
      </ul>
    </div>
  );
}
