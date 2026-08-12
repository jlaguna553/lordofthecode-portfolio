import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  title: "Lord of the Code — La Sintaxis Ancestral",
  description:
    "RPG educativo para aprender a programar de 0 a 100 resolviendo acertijos, con múltiples aventuras (PHP, Python…) y estudio de sprites LPC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="text-slate-100 antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
