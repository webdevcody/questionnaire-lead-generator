import { row, text } from "../components/common";

const header = () => {
  const logo = () => {
    return text("Logo");
  };

  const nav = () => {
    return row(text("Home"), text("About"), text("Contact"));
  };

  return row(logo(), nav());
};

const footer = () => {
  const footerText = () => {
    return text("© 2021 Adem");
  };
  const footerLinks = () => {
    return row(text("About"), text("Contact"));
  };

  return row(footerLinks(), footerText());
};

export const layout = (content: string, title: string) => {
  return `<html>
    <head>
      <title>${title}</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/htmx/2.0.0/htmx.min.js" integrity="sha512-Cpedvic0/Mgc3uRJ5apQ/ZYroPCZpatYEXGJayRaRNjKLaFualFxfxn97LJymznV+nC7y0/Hp/apHNwGpMimuw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </head>
    <body>
      ${row(header(), content, footer())}
    </body>
  </html>`;
};
