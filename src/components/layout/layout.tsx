import { Child } from "hono/jsx";
import { Header } from "./header";
import { Footer } from "./footer";

export function Layout({
  children,
  title,
}: {
  children: Child;
  title: string;
}) {
  return (
    <html data-theme="luxury">
      <head>
        <title>{title}</title>
        <script
          src="https://unpkg.com/htmx.org@2.0.1/dist/htmx.js"
          integrity="sha384-gpIh5aLQ0qmX8kZdyhsd6jA24uKLkqIr1WAGtantR4KsS97l/NRBvh8/8OYGThAf"
          crossorigin="anonymous"
        ></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
        {process.env.NODE_ENV !== "production" && (
          <script src="/static/livereload.js"></script>
        )}
        <link href="/static/output.css" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <div className="py-12">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
