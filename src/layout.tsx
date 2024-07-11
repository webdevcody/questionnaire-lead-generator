import { Child } from "hono/jsx";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export function Layout({ children }: { children: Child }) {
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
        <script src="/static/livereload.js"></script>
        <link href="/static/output.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-800">
        <Header />
        <div className="container mx-auto py-12">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
