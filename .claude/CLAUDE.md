# ArcFE プロジェクト開発ガイドライン

このプロジェクトは ArcFE UI コンポーネントライブラリ (v2.1.0) を使用しています。

## 🚨 必須ルール: ArcFE コンポーネント使用時

ArcFE コンポーネントを使用する前に、**必ず以下の手順を実行してください**:

### 1. component-manifest.json の確認（必須）

```bash
# コンポーネント一覧の確認
component-manifest.json を読み込む
```

- 82 個のコンポーネントと 243 枚のスクリーンショットが登録されています
- コンポーネントの props、dependencies、usage を確認してから使用してください

### 2. **screenshots** ディレクトリの確認（必須）

```bash
# スクリーンショットの確認
__screenshots__/components/[Category]/[Subcategory]/[Component]/[Variant].png
```

**重要:** コンポーネントやアイコンを選択する際は、必ず実際のスクリーンショット画像を確認してください。

#### アイコン選択の例:

- Instagram アイコンが必要な場合: `__screenshots__/components/Basic/Icons/Icons/Default.png` を確認
- 43 個のアイコン (Svg001Icon ~ Svg043Icon) から視覚的に最適なものを選択

### 3. 実装前チェックリスト

ArcFE コンポーネントを使用する前に:

- [ ] component-manifest.json で該当コンポーネントを検索した
- [ ] **screenshots** ディレクトリでビジュアルを確認した
- [ ] props の仕様を確認した
- [ ] dependencies (ThemeProvider, MediaProvider など) を確認した
- [ ] 使用例 (usage) を参照した

### 4. 該当コンポーネントがない場合の対応（重要）

**デザイン指示を受けたら、必ず以下の手順を実行してください:**

1. **component-manifest.json を確認**

   - デザインに合致する ArcFE コンポーネントが存在するか検索
   - **screenshots** で視覚的に確認

2. **該当コンポーネントがない場合**

   - ArcFE コンポーネントを無理に使わず、**自作する**
   - styled-components でカスタムコンポーネントを作成
   - theme.size.rem() と theme.media.spSizeLess() を使用したスタイリング

3. **判断基準**
   - ✅ ArcFE コンポーネントを使用: デザインとの類似度が 70% 以上
   - ❌ 自作: デザインとの類似度が 70% 未満、または該当なし

**例:**

```
ユーザー: 「このデザインを実装して」
1. component-manifest.json を検索 → 該当なし
2. 自作コンポーネントを作成
3. theme を使用したスタイリングで実装
```

## 📋 利用可能なコマンド

### /match-visual [画像]

デザイン画像から最適な ArcFE コンポーネントを視覚的にマッチング

```
/match-visual
[Figma デザイン画像を添付]
```

### /arcfe-search [keyword]

キーワードで ArcFE コンポーネントを検索

```
/arcfe-search button pill
/arcfe-search input floating
/arcfe-search icon camera
```

### /arcfe-component [name]

コンポーネントの詳細情報を表示

```
/arcfe-component Header001
/arcfe-component Button/Product001
/arcfe-component Svg018Icon
```

### /show-component [name]

コンポーネントのスクリーンショット一覧を表示

```
/show-component Button001
```

## 🔧 技術スタック

- **Next.js**: 16.0.3 (Turbopack)
- **React**: 19.2.0
- **ArcFE**: v2.1.0 (git+ssh://git@github.com/kichikawa57/ArcFE.git#v2.1.0)
- **styled-components**: 6.1.19
- **TypeScript**: 5.x

## 📦 ArcFE の必須セットアップ

### 1. ThemeProvider (必須)

```tsx
import { ThemeProvider } from "styled-components";
import { themes } from "arcfe/packages/ui";

const color = {
  "color-chart-basic-primary": "#000000",
  // ...
};

<ThemeProvider theme={themes(color)}>
  <YourApp />
</ThemeProvider>;
```

### 2. MediaProvider (レスポンシブ対応の場合)

```tsx
import { MediaProvider } from "arcfe/packages/ui";

<MediaProvider>
  <ThemeProvider theme={themes(color)}>
    <YourApp />
  </ThemeProvider>
</MediaProvider>;
```

### 3. GlobalStyles (推奨)

```tsx
import { GlobalStyles } from "arcfe/packages/ui";

const Styles = GlobalStyles({ fontFamily: "zenKakuGothicNew" });

<ThemeProvider theme={themes(color)}>
  <Styles />
  <YourApp />
</ThemeProvider>;
```

## 🎨 コンポーネントカテゴリ

### Basic (基本コンポーネント)

- Button, Input, Select, Modal, Card, Icon, Header, Footer など

### Advanced (プロジェクト固有)

- Rebita, Jmc, Tearoom など特定プロジェクト用コンポーネント

## ⚠️ よくある間違い

### ❌ 悪い例: スクリーンショットを確認せずにアイコンを選択

```tsx
// ランダムに選んだアイコン（間違い）
import { Svg001Icon } from "arcfe/packages/ui";
```

### ✅ 良い例: スクリーンショットを確認してから選択

```tsx
// __screenshots__/components/Basic/Icons/Icons/Default.png を確認
// Svg018Icon がカメラアイコンであることを視覚的に確認してから使用
import { Svg018Icon } from "arcfe/packages/ui";
```

## 📝 ワークフロー例

### UI コンポーネント実装時

1. **デザイン確認**

   - Figma デザインまたはスクリーンショットを受け取る

2. **ArcFE コンポーネント検索**

   ```
   /match-visual でビジュアルマッチング
   または
   /arcfe-search [keyword] でキーワード検索
   ```

3. **スクリーンショット確認**

   ```
   __screenshots__ ディレクトリで実際のビジュアルを確認
   ```

4. **コンポーネント詳細確認**

   ```
   /arcfe-component [name] で props と usage を確認
   ```

5. **実装**

   - 確認した情報を基に実装
   - appearance props でカスタマイズ

6. **ビジュアル確認**
   - ブラウザで実際の表示を確認
   - デザインと比較して微調整

## 🔗 重要なファイルパス

- **コンポーネントカタログ**: `component-manifest.json`
- **スクリーンショット**: `__screenshots__/components/`
- **ArcFE パッケージ**: `node_modules/arcfe/packages/ui/`
- **レイアウト**: `app/_layout/Layout.tsx`
- **コンポーネント**: `app/_components/`

## 💡 ベストプラクティス

1. **必ず視覚的確認を行う**

   - component-manifest.json だけでなく、**screenshots** を必ず確認

2. **適切なコンポーネントを選択**

   - 複数の候補がある場合は、デザインに最も近いものを選択
   - 類似度が 70%未満の場合は、新規作成を検討

3. **カスタマイズは appearance props で**

   - デフォルトスタイルを直接変更せず、appearance props を活用

4. **レスポンシブ対応**

   - MediaProvider を使用して PC/SP 切り替え
   - styled-components の @media でブレークポイント調整

5. **依存関係の確認**

   - コンポーネントによっては peer dependencies が必要
   - gsap, keen-slider, swiper などは事前にインストール

6. **画像表示には ArcFE の Image コンポーネントを使用（必須）**

   - ❌ Next.js の `Image` コンポーネントを使用しない
   - ✅ ArcFE の `Image` コンポーネントを使用する
   - レスポンシブ対応: PC/SP で別々の画像を指定可能
   - `objectFit` プロパティで `object-fit: contain` の動作を実現

   **❌ 悪い例: Next.js の Image を使用**

   ```tsx
   import Image from "next/image";

   <Image src="/logo.png" alt="logo" fill />;
   ```

   **✅ 良い例: ArcFE の Image を使用**

   ```tsx
   import { Image } from "arcfe/packages/ui";

   <Image
     pc={{ src: "/logo.png" }}
     sp={{ src: "/logo.png" }}
     alt="logo"
     objectFit
   />;
   ```

## 🎨 スタイリングルール

このプロジェクトでは、ArcFE のテーマシステムを使用したスタイリングを採用しています。

### 必須: theme を使用したスタイリング

#### 1. サイズ指定は `theme.size.rem()` を使用

**❌ 悪い例: ピクセル値を直接指定**

```tsx
const Component = styled.div`
  font-size: 24px;
  padding: 8px 20px;
  gap: 16px;
`;
```

**✅ 良い例: theme.size.rem() を使用**

```tsx
const Component = styled.div`
  font-size: ${({ theme }) => theme.size.rem(24)};
  padding: ${({ theme }) => `${theme.size.rem(8)} ${theme.size.rem(20)}`};
  gap: ${({ theme }) => theme.size.rem(16)};
`;
```

#### 2. レスポンシブ対応は `theme.media.spSizeLess()` を使用

**❌ 悪い例: @media を直接使用**

```tsx
const Component = styled.div`
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
```

**✅ 良い例: theme.media.spSizeLess() を使用**

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

**重要:** `css` を `styled-components` からインポートすることを忘れずに！

```tsx
import styled, { css } from "styled-components";
```

#### 3. 型定義の設定

**styled.d.ts** (プロジェクトルート)

```tsx
import "styled-components";
import type { Theme } from "arcfe/packages/ui";
import type { color } from "@/styles/color";

declare module "styled-components" {
  export interface DefaultTheme extends Theme<typeof color> {}
}
```

**styles/color.ts**

```tsx
export const color = {
  "color-chart-basic-primary": "#000000",
  "color-chart-basic-accent": "#000000",
  "color-chart-basic-secondary": "#000000",
  "color-chart-basic-tertiary": "#000000",
  "color-chart-basic-quaternary": "#000000",
  "color-chart-basic-quinary": "#000000",
} as const;
```

**app/\_layout/Layout.tsx**

```tsx
import { color } from "@/styles/color";
import { themes } from "arcfe/packages/ui";

<ThemeProvider theme={themes(color)}>
  <YourApp />
</ThemeProvider>;
```

### スタイリング例

#### 基本的なコンポーネント

```tsx
import styled, { css } from "styled-components";

const Logo = styled.div`
  font-size: ${({ theme }) => theme.size.rem(24)};
  font-weight: 300;
  color: #ffffff;
  letter-spacing: ${({ theme }) => theme.size.rem(2)};
  margin-right: ${({ theme }) => theme.size.rem(48)};

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      font-size: ${theme.size.rem(20)};
      margin-right: 0;
    `)}
`;
```

#### 複数のプロパティを持つコンポーネント

```tsx
const Button = styled.button`
  padding: ${({ theme }) => `${theme.size.rem(8)} ${theme.size.rem(20)}`};
  font-size: ${({ theme }) => theme.size.rem(12)};
  border-radius: ${({ theme }) => theme.size.rem(20)};
  gap: ${({ theme }) => theme.size.rem(6)};

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      display: none;
    `)}

  svg {
    width: ${({ theme }) => theme.size.rem(14)};
    height: ${({ theme }) => theme.size.rem(14)};
  }
`;
```

#### ネストされたメディアクエリ

```tsx
const IconWrapper = styled.div`
  width: ${({ theme }) => theme.size.rem(24)};
  height: ${({ theme }) => theme.size.rem(24)};

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      width: ${theme.size.rem(32)};
      height: ${theme.size.rem(32)};
    `)}

  svg {
    width: ${({ theme }) => theme.size.rem(14)};
    height: ${({ theme }) => theme.size.rem(14)};

    ${({ theme }) =>
      theme.media.spSizeLess(css`
        width: ${theme.size.rem(18)};
        height: ${theme.size.rem(18)};
      `)}
  }
`;
```

### スタイリングチェックリスト

新しいコンポーネントを作成する際:

- [ ] `styled-components` から `css` をインポートした
- [ ] すべてのサイズ指定で `theme.size.rem()` を使用した
- [ ] レスポンシブ対応で `theme.media.spSizeLess(css`...`)` を使用した
- [ ] ピクセル値を直接使用していない
- [ ] `@media (max-width: 768px)` を使用していない
- [ ] TypeScript エラーが出ていない (styled.d.ts が正しく設定されている)

### よく使うパターン

#### PC のみ表示

```tsx
const PcOnly = styled.div`
  display: block;

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      display: none;
    `)}
`;
```

#### SP のみ表示

```tsx
const SpOnly = styled.div`
  display: none;

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      display: block;
    `)}
`;
```

#### 条件付きスタイル

```tsx
const Container = styled.div<{ $isOpen: boolean }>`
  background-color: rgba(0, 0, 0, 0.95);
  padding: ${({ theme }) => `${theme.size.rem(32)} ${theme.size.rem(24)}`};
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;
```

## 🚀 開発サーバー

```bash
pnpm dev  # localhost:3000
```

## 📁 ディレクトリ構成規約

このプロジェクトは、ページごとにコンポーネントとセクションを分けるディレクトリ構成を採用しています。

### ディレクトリ構造

```
app/
├── (pages)/                  # ページディレクトリ（グループルート）
│   └── home/                 # ホームページ
│       ├── _components/      # ホームページ専用のコンポーネント
│       │   └── HeroSection.tsx
│       ├── _sections/        # ホームページのセクション（大きなコンポーネントブロック）
│       │   └── MainSection.tsx
│       └── page.tsx          # ホームページのエントリーポイント
├── _components/              # 共通コンポーネント（複数ページで使用）
│   ├── Button.tsx
│   └── Header.tsx
├── _layout/                  # レイアウトコンポーネント
│   └── Layout.tsx
└── layout.tsx                # ルートレイアウト
```

### 規約

#### 1. ページ: `app/(pages)/[page-name]/`

各ページは `app/(pages)/` 配下に独自のディレクトリを持ちます。ディレクトリ名はルートと一致させます。

例:
- `app/(pages)/home/` → ルート: `/home`
- `app/(pages)/about/` → ルート: `/about`
- `app/(pages)/products/` → ルート: `/products`

#### 2. ページ専用コンポーネント: `app/(pages)/[page-name]/_components/`

**特定のページでのみ使用される**コンポーネントは、そのページの `_components/` ディレクトリに配置します。

**ガイドライン:**
- ページ固有の小さな再利用可能な UI 要素
- 例: ヒーローセクション、フィーチャーカード、ページ専用フォーム
- 他のページからインポートしてはいけません

**例:**
```tsx
// app/(pages)/home/_components/HeroSection.tsx
export const HeroSection = () => {
  return <section>...</section>;
};
```

#### 3. ページセクション: `app/(pages)/[page-name]/_sections/`

複数のコンポーネントを組み合わせた大きなコンポーネントブロックは、ページの `_sections/` ディレクトリに配置します。

**ガイドライン:**
- セクションはコンポーネントよりも大きく、複数のコンポーネントを組み合わせることが多い
- 例: メインコンテンツエリア、機能紹介セクション、お客様の声セクション
- セクションは通常、ページ全幅のブロックを表します

**例:**
```tsx
// app/(pages)/home/_sections/MainSection.tsx
import { Button } from "@/app/_components/Button";

export const MainSection = () => {
  return (
    <section>
      <h2>タイトル</h2>
      <Button>アクション</Button>
    </section>
  );
};
```

#### 4. 共通コンポーネント: `app/_components/`

**複数のページで使用される**コンポーネントは `app/_components/` ディレクトリに配置します。

**ガイドライン:**
- 汎用的で再利用可能な UI 要素
- 例: Button, Input, Modal, Header, Footer
- 特定のページに依存しないコンポーネント

**例:**
```tsx
// app/_components/Button.tsx
export const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
```

#### 5. レイアウトコンポーネント: `app/_layout/`

アプリケーションのレイアウトに関連するコンポーネント（ThemeProvider, MediaProvider など）は `app/_layout/` ディレクトリに配置します。

**例:**
```tsx
// app/_layout/Layout.tsx
import { ThemeProvider } from "styled-components";

export const Layout = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
```

### コンポーネント配置の判断フロー

```
┌─────────────────────────────────────┐
│ このコンポーネントは複数のページで  │
│ 使用されますか？                    │
└─────────────┬───────────────────────┘
              │
      ┌───────┴───────┐
      │ YES           │ NO
      ▼               ▼
┌─────────────┐  ┌─────────────────────────────┐
│ app/        │  │ 複数のコンポーネントを      │
│ _components/│  │ 組み合わせた大きなブロック  │
│ に配置      │  │ ですか？                    │
└─────────────┘  └─────────────┬───────────────┘
                               │
                       ┌───────┴───────┐
                       │ YES           │ NO
                       ▼               ▼
                ┌──────────────┐  ┌──────────────┐
                │ _sections/   │  │ _components/ │
                │ に配置       │  │ に配置       │
                └──────────────┘  └──────────────┘
```

### 実装例

#### ホームページの実装

```tsx
// app/(pages)/home/page.tsx
"use client";

import { HeroSection } from "./_components/HeroSection";
import { MainSection } from "./_sections/MainSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MainSection />
    </>
  );
}
```

#### ページ専用コンポーネント

```tsx
// app/(pages)/home/_components/HeroSection.tsx
"use client";

import styled, { css } from "styled-components";

const Hero = styled.section`
  padding: ${({ theme }) => `${theme.size.rem(80)} ${theme.size.rem(20)}`};

  ${({ theme }) =>
    theme.media.spSizeLess(css`
      padding: ${`${theme.size.rem(60)} ${theme.size.rem(16)}`};
    `)}
`;

export const HeroSection = () => {
  return <Hero>...</Hero>;
};
```

#### ページセクション

```tsx
// app/(pages)/home/_sections/MainSection.tsx
"use client";

import { Button } from "@/app/_components/Button";
import styled from "styled-components";

const Section = styled.section`
  padding: ${({ theme }) => `${theme.size.rem(60)} ${theme.size.rem(20)}`};
`;

export const MainSection = () => {
  return (
    <Section>
      <h2>メインセクション</h2>
      <Button>クリック</Button>
    </Section>
  );
};
```

### 重要な注意点

1. **ページ専用コンポーネントは他のページから参照しない**
   - `app/(pages)/home/_components/` 内のコンポーネントは home ページでのみ使用
   - 他のページで使いたい場合は `app/_components/` に移動

2. **セクションとコンポーネントの違い**
   - セクション: 複数のコンポーネントを組み合わせた大きなブロック
   - コンポーネント: 小さな再利用可能な UI 要素

3. **パス解決**
   - 共通コンポーネント: `@/app/_components/Button`
   - ページ専用: `./_components/HeroSection`
   - セクション: `./_sections/MainSection`

## 📚 参考リンク

- ArcFE Repository: https://github.com/kichikawa57/ArcFE
- Component Manifest: [component-manifest.json](./component-manifest.json)
- Screenshots: [**screenshots**](./__screenshots__/)
- README: [README.md](./README.md) - 詳細なディレクトリ構成規約
