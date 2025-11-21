"use client";

import styled, { css } from "styled-components";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const StyledButton = styled.button`
  padding: ${({ theme }) => `${theme.size.rem(12)} ${theme.size.rem(24)}`};
  font-size: ${({ theme }) => theme.size.rem(16)};
  border: none;
  border-radius: ${({ theme }) => theme.size.rem(4)};
  background-color: #000000;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      font-size: ${theme.size.rem(14)};
      padding: ${`${theme.size.rem(10)} ${theme.size.rem(20)}`};
    `)}
`;

export const Button = ({ children, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
