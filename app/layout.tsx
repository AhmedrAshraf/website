import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TranslationProvider } from "./context/TranslationContext";
import { AttorneysProvider } from "./context/AttorneysContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DESIST! - Stand Against Harassment",
  description: "Join the movement to create safer spaces for everyone. Report incidents, access support, and be part of the community.",
  keywords: "harassment, safety, community, support, reporting, anti-harassment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TranslationProvider>
            <AttorneysProvider>
              <Header />
              <main className="pt-16 md:pt-20">
                {children}
              </main>
              <Footer />
            </AttorneysProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
