# Frontend Next.js Boilerplate

A modern Next.js boilerplate with TypeScript, styled-components, Biome, and ArcFE UI components.

## Tech Stack

- **Next.js**: 16.0.3 (Turbopack)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **styled-components**: 6.1.19
- **Biome**: 2.3.6 (Linter & Formatter)
- **ArcFE**: v2.2.0 (UI Component Library)
- **pnpm**: Package manager

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 10.x or higher

### Installation

#### 1. Add ArcFE Dependency

First, add the ArcFE package to your `package.json` dependencies:

```json
{
  "dependencies": {
    "arcfe": "git+ssh://git@github.com/kichikawa57/ArcFE.git#v2.2.0"
  }
}
```

Replace `v2.2.0` with the latest version tag from the [ArcFE repository](https://github.com/kichikawa57/ArcFE).

**Example with other dependencies:**
```json
{
  "name": "my-next-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build"
  },
  "dependencies": {
    "arcfe": "git+ssh://git@github.com/kichikawa57/ArcFE.git#v2.2.0",
    "next": "16.0.3",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "styled-components": "6.1.19"
  }
}
```

#### 2. Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
pnpm build
```

### Type Check

```bash
pnpm type-check
```

### Lint & Format

```bash
# Check
pnpm lint

# Fix
pnpm lint:fix
```

## Directory Structure

This project follows a feature-based directory structure to organize components and sections.

```
app/
├── (pages)/                  # Feature-based components and sections (not routes)
│   └── home/                 # Home feature
│       ├── _components/      # Home-specific components
│       │   └── HeroSection.tsx
│       └── _sections/        # Home sections (large component blocks)
│           └── MainSection.tsx
├── _components/              # Shared components (used across multiple features)
│   ├── Button.tsx
│   └── Header.tsx
├── _layout/                  # Layout components
│   └── Layout.tsx
├── layout.tsx                # Root layout
└── page.tsx                  # Root page (/)

styles/                       # Global styles and theme
└── color.ts                  # Theme color definitions

lib/                          # Utility functions and libraries
└── registry.tsx              # styled-components registry

public/                       # Static assets
```

### Directory Structure Conventions

#### 1. Pages: `app/page.tsx`, `app/about/page.tsx`, etc.

Actual pages are placed directly under `app/` or in route directories.

Example:
- `app/page.tsx` → Route: `/`
- `app/about/page.tsx` → Route: `/about`
- `app/products/page.tsx` → Route: `/products`

#### 2. Feature Components: `app/(pages)/[feature-name]/_components/`

Components that are **specific to a feature** should be placed in `app/(pages)/[feature-name]/_components/`.

**Guidelines:**
- Small, reusable UI elements specific to the feature
- Examples: Hero sections, feature cards, feature-specific forms
- These components can be imported by pages but are organized by feature

**Example:**
```tsx
// app/(pages)/home/_components/HeroSection.tsx
export const HeroSection = () => {
  return <section>...</section>;
};

// Usage in app/page.tsx
import { HeroSection } from "@/app/(pages)/home/_components/HeroSection";
```

#### 3. Feature Sections: `app/(pages)/[feature-name]/_sections/`

Large component blocks that combine multiple components should be placed in the feature's `_sections/` directory.

**Guidelines:**
- Sections are larger than components and often compose multiple components
- Examples: Main content area, feature showcase, testimonial section
- A section typically represents a full-width block on the page

**Example:**
```tsx
// app/(pages)/home/_sections/MainSection.tsx
import { Button } from "@/app/_components/Button";

export const MainSection = () => {
  return (
    <section>
      <h2>Title</h2>
      <Button>Action</Button>
    </section>
  );
};

// Usage in app/page.tsx
import { MainSection } from "@/app/(pages)/home/_sections/MainSection";
```

#### 4. Shared Components: `app/_components/`

Components that are **used across multiple features** should be placed in the `app/_components/` directory.

**Guidelines:**
- Generic, reusable UI elements
- Examples: Button, Input, Modal, Header, Footer
- These components should be agnostic to any specific feature

**Example:**
```tsx
// app/_components/Button.tsx
export const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
```

#### 5. Layout Components: `app/_layout/`

Components related to the application layout (ThemeProvider, MediaProvider, etc.) should be placed in the `app/_layout/` directory.

**Example:**
```tsx
// app/_layout/Layout.tsx
import { ThemeProvider } from "styled-components";

export const Layout = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
```

### Decision Tree: Where to Place a Component?

```
┌─────────────────────────────────────┐
│ Is this component used by           │
│ multiple features?                  │
└─────────────┬───────────────────────┘
              │
      ┌───────┴───────┐
      │ YES           │ NO
      ▼               ▼
┌─────────────┐  ┌─────────────────────────────┐
│ Place in    │  │ Does it combine multiple    │
│ app/        │  │ components into a large     │
│ _components/│  │ block?                      │
└─────────────┘  └─────────────┬───────────────┘
                               │
                       ┌───────┴───────┐
                       │ YES           │ NO
                       ▼               ▼
          ┌──────────────────────┐  ┌──────────────────────┐
          │ app/(pages)/         │  │ app/(pages)/         │
          │ [feature]/_sections/ │  │ [feature]/_components/│
          └──────────────────────┘  └──────────────────────┘
```

### Styling Guidelines

#### Use ArcFE's Theme System

All size values should use `theme.size.rem()` and responsive styles should use `theme.media.spSizeLess()`.

**Bad Example:**
```tsx
const Component = styled.div`
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
```

**Good Example:**
```tsx
import styled, { css } from "styled-components";

const Component = styled.div`
  font-size: ${({ theme }) => theme.size.rem(24)};

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      font-size: ${theme.size.rem(20)};
    `)}
`;
```

**Important:** Always import `css` from `styled-components` when using `theme.media.spSizeLess()`.

## CI/CD

GitHub Actions runs the following checks on every pull request:

1. **Type Check**: `pnpm type-check`
2. **Lint**: `pnpm lint`
3. **Build**: `pnpm build`

See [.github/workflows/ci.yml](.github/workflows/ci.yml) for details.

## ArcFE Component Library

This project uses the ArcFE UI component library. Before using ArcFE components:

1. Check [component-manifest.json](./component-manifest.json) for available components
2. View screenshots in [__screenshots__](./__screenshots__/) directory
3. Refer to [.claude/CLAUDE.md](./.claude/CLAUDE.md) for detailed ArcFE usage guidelines

## License

Private
