import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "./layout";
import { registerHome } from "./pages";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title: string }): Response;
  }
}

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));

app.get(
  "*",
  jsxRenderer(
    ({ children, title }) => <Layout title={title}>{children}</Layout>,
    {
      stream: true,
    }
  )
);

registerHome(app);

export type App = typeof app;

export default app;
