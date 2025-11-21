"use client";

import { Button } from "@/app/_components/Button";

// const Section = styled.section`
//   padding: ${({ theme }) => `${theme.size.rem(60)} ${theme.size.rem(20)}`};
//   max-width: ${({ theme }) => theme.size.rem(1200)};
//   margin: 0 auto;

//   ${({ theme }) =>
//     theme.media.spSizeLess(css`
//       padding: ${`${theme.size.rem(40)} ${theme.size.rem(16)}`};
//     `)}
// `;

// const SectionTitle = styled.h2`
//   font-size: ${({ theme }) => theme.size.rem(36)};
//   margin-bottom: ${({ theme }) => theme.size.rem(32)};
//   text-align: center;

//   ${({ theme }) =>
//     theme.media.spSizeLess(css`
//       font-size: ${theme.size.rem(28)};
//       margin-bottom: ${theme.size.rem(24)};
//     `)}
// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: ${({ theme }) => theme.size.rem(24)};
// `;

export const MainSection = () => {
  return (
    <>
      <p>This is a sample section component.</p>
      <Button onClick={() => console.log("Clicked!")}>Click Me</Button>
    </>
  );
};
