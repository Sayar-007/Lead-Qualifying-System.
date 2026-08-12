import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anders & Vale | Premium Real Estate in Austin, TX",
  description: "Bespoke real estate services tailored to your timeline.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500;600&family=Inter:wght@400&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body-md antialiased relative selection:bg-secondary-fixed selection:text-on-secondary-fixed-variant">
        {children}
      </body>
    </html>
  );
}
