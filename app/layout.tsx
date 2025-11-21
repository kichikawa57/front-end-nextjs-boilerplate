import type { Metadata } from "next";
import { Lato, Zen_Kaku_Gothic_New } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import { Layout } from "./_layout/Layout";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-zen-kaku-gothic-new",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Frontend Next.js Boilerplate",
  description:
    "A modern Next.js boilerplate with TypeScript, styled-components, and Biome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenKakuGothicNew.variable} ${lato.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Layout>{children}</Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
