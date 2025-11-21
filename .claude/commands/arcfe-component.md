# ArcFE Component Detail

指定されたArcFEコンポーネントの詳細情報を表示します。

## 使い方
```
/arcfe-component Button/Product001
/arcfe-component TextField003
/arcfe-component Rebita/Button
/arcfe-component Modal001
```

## 実行手順

### Step 1: コンポーネント名を解析
ユーザーから受け取ったコンポーネント名を正規化：

**パターン1:** `Button/Product001`
- category: Basic
- subcategory: Button
- productVariant: Product001

**パターン2:** `Button001`
- subcategory: Button
- number: 001
- → `Button/Product001`に変換

**パターン3:** `Rebita/Button`
- category: Advanced
- subcategory: Rebita
- component: Button

### Step 2: カタログから検索
```
packages/ui/component-manifest.json
```
から該当コンポーネントを探す

### Step 3: 詳細情報を表示

---

## 📖 **[Component Display Name]** 詳細

**コンポーネントID:** `[id]`
**カテゴリ:** [category] > [subcategory]
**ファイルパス:** [packages/ui/components/.../index.tsx](file://...)

---

### 📝 概要

[コンポーネントの説明]

**主な特徴:**
- [特徴1]
- [特徴2]
- [特徴3]

**適している用途:**
- [用途1]
- [用途2]

---

### ⚙️ Props

#### 必須Props
```tsx
{
  [required prop]: [type]  // [説明]
}
```

#### オプションProps
```tsx
{
  [optional prop]?: [type]  // [説明]
  // デフォルト: [default value]
}
```

**Props一覧:**
```tsx
interface [ComponentName]Props {
  [全propsをリスト]
}
```

---

### 📸 スクリーンショット

**バリアント数:** [totalVariants]枚

**主なバリエーション:**
- [variant1 name] - [説明]
- [variant2 name] - [説明]

**全スクリーンショットを見る:**
```
/show-component [ComponentName]
```

---

### 💻 使用例

#### 基本的な使い方
```tsx
import { [ComponentName] } from '@arcfe/ui';

function MyComponent() {
  return (
    <[ComponentName]
      [基本的なprops]
    >
      [children]
    </[ComponentName]>
  );
}
```

#### カスタマイズ例
```tsx
import { [ComponentName] } from '@arcfe/ui';

<[ComponentName]
  [カスタマイズprops]
  appearance={{
    backgroundColor: "#007bff",
    borderColor: "#0056b3",
    color: "#fff"
  }}
>
  [children]
</[ComponentName]>
```

#### アニメーション付き（該当する場合）
```tsx
<[ComponentName]
  animation={{
    type: "001",
    duration: 0.25,
    easing: "easeInOutCubic"
  }}
>
  [children]
</[ComponentName]>
```

---

### 🔧 必要な設定

#### ThemeProvider（必須）
```tsx
import { ThemeProvider } from 'styled-components';
import { themes, color } from '@arcfe/ui';

function App() {
  return (
    <ThemeProvider theme={themes(color)}>
      <YourComponent />
    </ThemeProvider>
  );
}
```

#### その他のProvider（該当する場合）
[必要に応じてMediaProviderなど]

---

### 🎨 デザインガイドライン

**このコンポーネントを選ぶべき場合:**
- ✅ [シナリオ1]
- ✅ [シナリオ2]

**代替コンポーネントを検討すべき場合:**
- ⚠️ [シナリオ1] → [別のコンポーネント]を推奨
- ⚠️ [シナリオ2] → [別のコンポーネント]を推奨

---

### 🔗 関連コンポーネント

- **[関連1]** - [関係性の説明]
- **[関連2]** - [関係性の説明]

---

### 📚 参考リンク

- **ソースコード:** [packages/ui/components/.../index.tsx](file://...)
- **Storybook:** [index.stories.tsx](file://...)
- **スタイル:** [styles.tsx](file://...)

**詳細を確認:**
```
# ソースコードを見る
packages/ui/components/[path]/index.tsx を開いてください

# Storybookストーリーを見る
packages/ui/components/[path]/index.stories.tsx を開いてください

# スクリーンショットを見る
/show-component [ComponentName]
```

---

## エラーハンドリング

### コンポーネントが見つからない場合

```
❌ コンポーネント "[name]" が見つかりませんでした。

💡 以下を確認してください:
1. スペルが正しいか
2. 正しい形式で指定しているか
   - OK: Button/Product001, Button001, Rebita/Button
   - NG: button001, ButtonProduct001

検索してみる:
/arcfe-search [keyword]

全コンポーネント一覧:
packages/ui/component-manifest.json を確認してください
```

---

## 実装例（AIの内部処理）

```typescript
// Step 1: コンポーネント名の正規化
const normalizedName = normalizeComponentName(args);
// "Button001" → "basic-button-product001"
// "Button/Product001" → "basic-button-product001"
// "Rebita/Button" → "advanced-rebita-button"

// Step 2: カタログから検索
const manifest = readFile('packages/ui/component-manifest.json');
const component = manifest.components.find(c =>
  c.id === normalizedName ||
  c.name === args ||
  c.displayName === args
);

if (!component) {
  displayError('コンポーネントが見つかりません');
  suggestSearch(args);
  return;
}

// Step 3: 詳細情報を整形して表示
displayComponentDetail(component);
```

---

## Tips

### よく見るコンポーネント

**ボタン系:**
- `Button/Product001` - pill-shaped
- `Button/Product002` - アイコン付き
- `TextButton/Product001` - テキストリンク

**入力系:**
- `Input/Product001` - シンプルな入力
- `TextField/Product003` - フローティングラベル
- `Select/Product001` - セレクトボックス

**その他:**
- `Modal/Product001` - モーダル
- `Accordion/Product001-005` - アコーディオン
- `Pagination/Product001` - ページネーション

### 番号の意味

**Productバリアント:**
- `Product001` - バリアント1（通常は最も基本的）
- `Product002` - バリアント2
- `Product003` - バリアント3
- ...

**プロジェクト固有（Advanced）:**
- `Rebita/` - Rebitaプロジェクト用
- `Jmc/` - Jmcプロジェクト用
- `common/` - 共通の高度なコンポーネント
