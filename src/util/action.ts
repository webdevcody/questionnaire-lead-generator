import { Context } from "hono";
import { App } from "../server";

// TODO: track pages and action url to prevent duplicate urls

export function actionFactory(name: string, action: (c: Context) => any) {
  const url = `/actions/${name}`;
  const factory = (app: App) => {
    app.post(url, action);
  };
  factory.url = url;
  return factory;
}

export function pageFactory(
  url: string,
  page: (c: Context) => any,
  options: { title: string },
) {
  const factory = (app: App) => {
    app.get(url, (c) => {
      return c.render(page(c), options);
    });
  };
  return factory;
}

export function registerModule(app: App, module: any) {
  for (const key in module) {
    const fn = module[key];
    if (typeof fn === "function" && key.startsWith("register")) {
      fn(app);
    }
  }
}
