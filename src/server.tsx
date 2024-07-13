import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "./components/layout/layout";
import { registerLanding } from "./features/landing";
import { registerStartAssessment } from "./features/assessment/start-assessment";
import { registerFinishAssessment } from "./features/assessment/finish-assessment";
import { registerAssessmentApi } from "./features/assessment/api";

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

const features = [
  registerLanding,
  registerStartAssessment,
  registerFinishAssessment,
  registerAssessmentApi,
];

features.forEach((register) => register(app));

export type App = typeof app;

export default app;
