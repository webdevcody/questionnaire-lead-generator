import { eq } from "drizzle-orm";
import { App } from "..";
import { db } from "../db";
import { Todo, todos } from "../db/schema";

export function Todo({ todo }: { todo: Todo }) {
  return (
    <div class="flex gap-2 items-center">
      <input
        id={"todo-" + todo.id}
        type="checkbox"
        checked={todo.complete === 1}
        hx-post={`/todos/${todo.id}/toggle`}
        hx-trigger="click"
        hx-swap="outerHTML"
        hx-target="closest div"
      />
      <label for={"todo-" + todo.id}>{todo.text}</label>
      <button
        class="btn"
        hx-delete={`/todos/${todo.id}`}
        hx-target="closest div"
      >
        <img class="htmx-indicator w-5 h-5" src="/static/spinner.svg" /> Delete
      </button>
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
      </form>
    </div>
  );
}

export function register(app: App) {
  app.get("/", async (c) => {
    return c.render(<Index />);
  });

  app.post("/todos", async (c) => {
    const formData = await c.req.formData();
    const text = formData.get("text") as string;
    const [todo] = await db
      .insert(todos)
      .values({ text, complete: 0 })
      .returning();
    return c.render(<Todo todo={todo} />);
  });

  app.post("/todos/:todoId/toggle", async (c) => {
    const todoId = c.req.param().todoId;
    const todo = await db.query.todos.findFirst({
      where: eq(todos.id, parseInt(todoId)),
    });
    const [updatedTodo] = await db
      .update(todos)
      .set({
        complete: todo?.complete ? 0 : 1,
      })
      .where(eq(todos.id, parseInt(todoId)))
      .returning();

    return c.render(<Todo todo={updatedTodo} />);
  });

  app.delete("/todos/:todoId", async (c) => {
    const todoId = c.req.param().todoId;
    await db.delete(todos).where(eq(todos.id, parseInt(todoId)));
    return c.render("");
  });
}
