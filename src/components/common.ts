export const col = (...children: string[]) =>
  `<div class="flex flex-col">${children.join("")}</div>`;
export const row = (...children: string[]) =>
  `<div class="flex flex-row">${children.join("")}</div>`;
export const spaceRow = (...children: string[]) =>
  `<div class="flex flex-row justify-between">${children.join("")}</div>`;
export const datetime = (time: string) => `<div>${time}</div>`;
export const text = (text: string) => `<span>${text}</span>`;
export const form = (...children: string[]) =>
  `<form>${children.join("")}</form>`;
export const textarea = (name: string) =>
  `<textarea name="${name}"></textarea>`;
export const submit = () => `<button type="submit">Submit</button>`;
export const container = (...children: string[]) =>
  `<div class="container mx-auto">${children}</div>`;
