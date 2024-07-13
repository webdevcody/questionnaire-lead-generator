import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "./components/layout/layout";
import { logger } from "hono/logger";
import * as features from "./features";
import { registerModule } from "./util/action";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title: string }): Response;
  }
}

const app = new Hono();

app.use(
  "/static/*",
  async (c, next) => {
    await next();
    if (process.env.NODE_ENV === "production") {
      c.res.headers.set("Cache-Control", "public, max-age=31536000");
    }
  },
  serveStatic({ root: "./" }),
);

app.get(
  "*",
  jsxRenderer(
    ({ children, title }) => <Layout title={title}>{children}</Layout>,
    {
      stream: true,
    },
  ),
);

app.use("*", logger());

registerModule(app, features);

export type App = typeof app;

export default app;
