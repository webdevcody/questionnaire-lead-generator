import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "./layout";
import { register } from "./pages";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));

app.get(
  "*",
  jsxRenderer(({ children }) => <Layout>{children}</Layout>, { stream: true })
);

register(app);

export type App = typeof app;

export default app;
