# ArcFE Component Search

キーワードでArcFEコンポーネントを検索します。

## 使い方
```
/arcfe-search button
/arcfe-search input floating
/arcfe-search pill rounded
/arcfe-search modal
```

## 実行手順

### Step 1: カタログを読み込む
```
packages/ui/component-manifest.json
```
を読み込む（まだ読み込んでいない場合）

### Step 2: キーワードで検索
ユーザーから受け取ったキーワードで以下をフィルタリング：

**検索対象:**
- コンポーネント名（name, displayName）
- カテゴリ（category, subcategory）
- タグ（tags[]）
- Productバリアント名

**検索ロジック:**
- キーワードを小文字に変換
- 部分一致で検索
- 複数キーワードの場合はAND検索
- スコアリング（マッチ数が多いほど上位）

### Step 3: 結果を表示
関連性の高い順に5-10件を表示：

---

## 🔍 検索結果: "[keyword]"

**見つかったコンポーネント: X件**

---

### 1. [Component Name] ⭐⭐⭐ (関連度: 高)
**カテゴリ:** [category] > [subcategory]
**ID:** [id]
**バリアント:** [productVariant]

**タグ:** `tag1` `tag2` `tag3`

**ファイルパス:** [packages/ui/components/.../index.tsx](file://...)

**主な特徴:**
- [特徴1]
- [特徴2]

**使用例:**
```tsx
import { [ComponentName] } from '@arcfe/ui';

<[ComponentName]
  [主要なprops]
>
  [children]
</[ComponentName]>
```

**詳細を見る:**
```
/show-component [ComponentName]
```

---

### 2. [別のコンポーネント] ⭐⭐ (関連度: 中)
[同様の形式...]

---

[全結果を表示...]

---

## 💡 検索のヒント

### キーワード例

**形状で探す:**
- `pill` `rounded` `sharp` - 角丸の種類
- `circle` `square` `rectangle` - 基本形状

**UIタイプで探す:**
- `button` `input` `modal` `card`
- `accordion` `dropdown` `select`
- `pagination` `breadcrumb`

**機能で探す:**
- `animated` `hover` `toggle`
- `floating` `label` `icon`

**プロジェクト固有:**
- `rebita` `jmc` `tearoom` - プロジェクト名
- `advanced` `basic` - カテゴリ

**複数キーワード:**
```
/arcfe-search button icon
/arcfe-search input floating label
/arcfe-search modal animated
```

---

## 検索結果が多すぎる場合

より具体的なキーワードを追加してください：

```
# 広すぎる
/arcfe-search button

# より具体的
/arcfe-search button pill animated
/arcfe-search button product001
```

---

## 検索結果がない場合

1. **スペルを確認**
2. **類義語を試す:**
   - `btn` → `button`
   - `form` → `input` または `textfield`
3. **カテゴリで絞らずに探す:**
   - `basic button` ではなく `button` で検索
4. **全コンポーネント一覧を確認:**
   ```
   packages/ui/component-manifest.json を読み込んで、全コンポーネントをリストアップしてください
   ```

---

## 実装例（AIの内部処理）

```typescript
// Step 1: カタログ読み込み
const manifest = readFile('packages/ui/component-manifest.json');

// Step 2: キーワード抽出
const keywords = args.split(' ').map(k => k.toLowerCase());

// Step 3: フィルタリング & スコアリング
const results = manifest.components.map(component => {
  let score = 0;

  // 名前マッチ
  keywords.forEach(keyword => {
    if (component.name.toLowerCase().includes(keyword)) score += 3;
    if (component.displayName.toLowerCase().includes(keyword)) score += 3;
    if (component.subcategory.toLowerCase().includes(keyword)) score += 2;
    if (component.category.toLowerCase().includes(keyword)) score += 1;
    if (component.productVariant?.toLowerCase().includes(keyword)) score += 2;

    // タグマッチ
    component.tags.forEach(tag => {
      if (tag.toLowerCase().includes(keyword)) score += 2;
    });
  });

  return { ...component, score };
}).filter(c => c.score > 0);

// Step 4: ソート & 上位表示
const topResults = results
  .sort((a, b) => b.score - a.score)
  .slice(0, 10);

// Step 5: 表示
topResults.forEach((component, index) => {
  displayResult(component, index + 1);
});
```

---

## Tips

- **よく使うコンポーネント:**
  - `Button001` - シンプルなボタン
  - `Button002` - アイコン付きボタン
  - `TextField003` - フローティングラベル入力
  - `Modal001` - モーダル
  - `Pagination001` - ページネーション

- **カタログを直接見る:**
  ```
  packages/ui/component-manifest.json を開いて、全81コンポーネントを確認してください
  ```

- **スクリーンショットで確認:**
  ```
  /show-component [ComponentName]
  ```
