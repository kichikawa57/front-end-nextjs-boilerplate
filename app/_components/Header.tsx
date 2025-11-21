"use client";

import styled, { css } from "styled-components";

const HeaderWrapper = styled.header`
  padding: ${({ theme }) => `${theme.size.rem(20)} ${theme.size.rem(40)}`};
  background-color: #000000;
  color: #ffffff;

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      padding: ${`${theme.size.rem(16)} ${theme.size.rem(20)}`};
    `)}
`;

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.size.rem(24)};
  font-weight: 700;
  margin: 0;

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      font-size: ${theme.size.rem(20)};
    `)}
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>Next.js Boilerplate</Logo>
    </HeaderWrapper>
  );
};
