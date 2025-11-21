"use client";

import { GlobalStyles, MediaProvider, themes } from "arcfe/packages/ui";
import { ThemeProvider } from "styled-components";
import { Header } from "@/app/_components/Header";
import { color } from "@/styles/color";

const Styles = GlobalStyles({ fontFamily: "zenKakuGothicNew" });

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MediaProvider>
      <ThemeProvider theme={themes(color)}>
        <Styles />
        <Header />
        {children}
      </ThemeProvider>
    </MediaProvider>
  );
};
