import type { Metadata } from "next";
import "./app.css"; // Tvoj CSS súbor

export const metadata: Metadata = {
  title: "Kam v tvojom meste?",
  description: "Interaktívna mapa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <head>
        {/* SEM vlož link z Fontshare */}
        <link 
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-brand-light text-brand-dark font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
