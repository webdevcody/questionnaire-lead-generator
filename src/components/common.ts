export const col = (...children: string[]) =>
  `<div class="col">${children.join("")}</div>`;
export const row = (...children: string[]) =>
  `<div class="row">${children.join("")}</div>`;
export const datetime = (time: string) => `<div>${time}</div>`;
export const text = (text: string) => `<span>${text}</span>`;
export const form = (...children: string[]) =>
  `<form>${children.join("")}</form>`;
export const textarea = (name: string) =>
  `<textarea name="${name}"></textarea>`;
export const submit = () => `<button type="submit">Submit</button>`;
