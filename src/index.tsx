import { Hono } from "hono";
import { Index, Todo } from "./pages";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { db } from "./db";
import { todos } from "./db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));

app.get(
  "*",
  jsxRenderer(
    ({ children }) => {
      return (
        <html>
          <head>
            <title>HI</title>
            <script
              src="https://cdnjs.cloudflare.com/ajax/libs/htmx/2.0.0/htmx.min.js"
              integrity="sha512-Cpedvic0/Mgc3uRJ5apQ/ZYroPCZpatYEXGJayRaRNjKLaFualFxfxn97LJymznV+nC7y0/Hp/apHNwGpMimuw=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            ></script>
            <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
            <link href="/static/output.css" rel="stylesheet" />
          </head>
          <body class="bg-gray-800">
            <Header />
            <div className="container mx-auto py-12">{children}</div>
            <Footer />
          </body>
        </html>
      );
    },
    { stream: true }
  )
);

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

export default app;
