# ArcFE Workflow Check

## 🔍 実装前チェック

ArcFE コンポーネントを使用する前に、以下を確認しましたか？

### ✅ 必須確認項目

#### 1. component-manifest.json の確認
```bash
# まだ読み込んでいない場合
component-manifest.json を読み込んでください
```

**確認内容:**
- [ ] 使用予定のコンポーネントが存在するか
- [ ] props の仕様
- [ ] dependencies (必要な Provider など)
- [ ] productVariant の種類

#### 2. __screenshots__ の確認
```bash
# スクリーンショットディレクトリ
__screenshots__/components/[Category]/[Subcategory]/[Component]/
```

**確認方法:**
- [ ] Read ツールでスクリーンショット画像を開いた
- [ ] デザインと視覚的に比較した
- [ ] 複数のバリアントがある場合、すべて確認した

**特にアイコンの場合:**
```bash
# 43個のアイコン一覧を確認
__screenshots__/components/Basic/Icons/Icons/Default.png
```

### 🎯 使用可能なコマンド

#### ビジュアルマッチング
```
/match-visual
[デザイン画像を添付]
```
→ デザインに最適なコンポーネントを自動推薦

#### キーワード検索
```
/arcfe-search button pill
/arcfe-search icon camera
```
→ キーワードでコンポーネントを検索

#### コンポーネント詳細
```
/arcfe-component Header001
/arcfe-component Svg018Icon
```
→ props と使用例を表示

### ⚠️ よくあるミス

#### アイコン選択
❌ **間違い:** component-manifest.json だけ見て、Svg001Icon を選ぶ
✅ **正解:** `__screenshots__/.../Icons/Default.png` を開いて、視覚的に確認してから選ぶ

#### コンポーネント選択
❌ **間違い:** Button001 という名前だけで選ぶ
✅ **正解:** `__screenshots__/.../Button/Product001/` のスクリーンショットを確認してから選ぶ

### 📋 実装フロー

```
1. デザイン確認
   ↓
2. /match-visual または /arcfe-search でコンポーネント検索
   ↓
3. __screenshots__ でビジュアル確認（必須）
   ↓
4. component-manifest.json で props 確認
   ↓
5. 実装
   ↓
6. ブラウザで表示確認
```

### 🔗 Quick Links

- [component-manifest.json](../../component-manifest.json)
- [__screenshots__](../../__screenshots__/)
- [CLAUDE.md](../CLAUDE.md) - プロジェクトガイドライン

---

**このチェックリストを実行してから実装を開始してください。**
