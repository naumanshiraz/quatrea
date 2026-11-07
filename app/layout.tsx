import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: { default: "Quatréa — Four Seasons. Four Scents.", template: "%s | Quatréa" },
  description: "Quatréa is a luxury perfume house with four fragrances, one for each season.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;1,300;1,500&family=Jost:wght@300;400;500&display=swap"
        />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
