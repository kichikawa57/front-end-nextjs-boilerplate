import "styled-components";
import type { color } from "@/styles/color";
import type { Theme } from "arcfe/packages/ui";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme<typeof color> {}
}
