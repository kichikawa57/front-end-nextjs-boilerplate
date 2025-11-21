# Show Component Screenshots

指定されたArcFEコンポーネントのスクリーンショットを表示します。

## 使い方
```
/show-component Button/Product001
/show-component Rebita/Button
/show-component TextField/Product003
```

## 実行手順

### Step 1: コンポーネント名の解析
ユーザーから受け取ったコンポーネント名を解析：
- カテゴリ: Basic / Advanced
- サブカテゴリ: Button, Input, Rebita等
- Productバリアント（該当する場合）

### Step 2: スクリーンショットディレクトリの特定
```
packages/ui/__screenshots__/components/[カテゴリ]/[コンポーネント]/[Product]/index/
```

### Step 3: 全バリアントの読み込み
そのディレクトリ内の全PNG画像を読み込む：
- Default.png
- SmallSize.png, LargeSize.png
- PrimaryTheme.png, DangerTheme.png
- Disabled.png
- 等...

### Step 4: 画像の表示
各バリアントを以下の形式で表示：

---

## 📸 [Component Name] - スクリーンショット一覧

### Default
![Default](packages/ui/__screenshots__/components/[path]/Default.png)

デフォルトスタイル

**Props:**
```tsx
{
  type: "001",
  size: "middle"
}
```

---

### Small Size
![SmallSize](packages/ui/__screenshots__/components/[path]/SmallSize.png)

小サイズ

**Props:**
```tsx
{
  size: "small"
}
```

---

### Primary Theme
![PrimaryTheme](packages/ui/__screenshots__/components/[path]/PrimaryTheme.png)

プライマリカラー（青系）

**Props:**
```tsx
{
  appearance: {
    backgroundColor: "#007bff",
    borderColor: "#0056b3",
    color: "#fff"
  }
}
```

---

[全バリアントを同様に表示...]

---

## 📝 コンポーネント情報

**カテゴリ:** [Basic/Advanced]
**ファイルパス:** `packages/ui/components/[path]/index.tsx`
**合計バリアント数:** [数]

**主な用途:**
- [ユースケース1]
- [ユースケース2]

**関連コンポーネント:**
- [関連1]
- [関連2]

**詳細情報:** `/arcfe-component [name]`

---

## Tips
- 画像をクリックしてStorybookで実際に動作を確認できます
- 気に入ったバリアントがあれば、そのpropsをコピーして使用してください
