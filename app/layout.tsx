import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { SavedItemsProvider } from "@/lib/saved-context";
import { FollowProvider } from "@/lib/follow-context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VITRIS — Vitrinear",
  description: "No vienes a buscar. Vienes a vitrinear.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#08080C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="font-body bg-void text-ink antialiased">
        <SavedItemsProvider>
          <FollowProvider>{children}</FollowProvider>
        </SavedItemsProvider>
      </body>
    </html>
  );
}
