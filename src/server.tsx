import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "./components/layout/layout";
import { registerLanding } from "./features/landing";
import { logger } from "hono/logger";
import { registerAssessment } from "./features/assessment";

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
  serveStatic({ root: "./" })
);

app.get(
  "*",
  jsxRenderer(
    ({ children, title }) => <Layout title={title}>{children}</Layout>,
    {
      stream: true,
    }
  )
);

app.use("*", logger());

registerLanding(app);
registerAssessment(app);

export type App = typeof app;

export default app;
