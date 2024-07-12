import { Child } from "hono/jsx";

function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="container mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content p-10">
      <div className="footer container mx-auto">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
}

export function Layout({
  children,
  title,
}: {
  children: Child;
  title: string;
}) {
  return (
    <html>
      <head>
        <title>{title}</title>
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
