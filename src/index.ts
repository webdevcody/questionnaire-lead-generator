import { Hono } from "hono";
import { indexPage } from "./pages";

const app = new Hono();

app.get("/posts/:postId", async (c) => c.html(await indexPage(c.req.param())));

export default app;
