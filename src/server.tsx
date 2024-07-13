import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "./components/layout/layout";
import { registerLanding } from "./features/landing";
import { registerStartAssessment } from "./features/assessment/pages/start";
import { registerFinishAssessment } from "./features/assessment/pages/finish";
import { registerAssessment } from "./features/assessment/pages/assessment";
import { registerAssessmentActions } from "./features/assessment/actions/save-response";
import { cache } from "hono/cache";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title: string }): Response;
  }
}

const app = new Hono();

app.use(
  "/static/*",
  cache({
    cacheName: "static",
    cacheControl: "max-age=3600",
  }),
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

const features = [
  registerLanding,
  registerStartAssessment,
  registerFinishAssessment,
  registerAssessmentActions,
  registerAssessment,
];

features.forEach((register) => register(app));

export type App = typeof app;

export default app;
