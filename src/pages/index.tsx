import { db } from "../db";
import { Todo } from "../db/schema";

export function Todo({ todo }: { todo: Todo }) {
  return (
    <div class="flex gap-2 items-center">
      <input
        type="checkbox"
        checked={todo.complete === 1}
        hx-post={`/todos/${todo.id}/toggle`}
        hx-trigger="click"
        hx-swap="outerHTML"
        hx-target="closest div"
      />
      {todo.text}
    </div>
  );
}

export async function Index() {
  const todos = await db.query.todos.findMany();

  return (
    <div>
      <h1>Todos</h1>

      <div id="todos" class="space-y-2">
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>

      <form
        _="on htmx:afterRequest reset() me"
        hx-post="/todos"
        hx-target="#todos"
        hx-swap="beforeend"
        hx-trigger="submit"
      >
        <input class="input" name="text" />
        <button class="btn">Create</button>
      </form>
    </div>
  );
}
