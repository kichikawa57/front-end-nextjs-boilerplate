# Catalog Generator Agent

**タイプ:** general-purpose
**目的:** ArcFE UIコンポーネントの完全なカタログを自動生成

## エージェント仕様

### 入力
なし（コードベースから自動抽出）

### 出力
- `packages/ui/catalog.json` - 完全なコンポーネントカタログ
- `packages/ui/catalog-summary.md` - 人間が読みやすいサマリー

### 実行フロー

#### Phase 1: コンポーネント探索
1. `packages/ui/components/`ディレクトリを再帰的にスキャン
2. 全コンポーネントをリストアップ：
   - Basic: 81個
   - Advanced: 15個程度
3. 各コンポーネントのファイルパスを記録

#### Phase 2: コード解析
各コンポーネントについて、以下を抽出：

**型定義から:**
- Props interface
- Type aliases（"001" | "002" | "003"等）
- サイズオプション（small / middle / large）
- Appearance設定

**Storybookファイルから:**
- 全ストーリー名（Default, SmallSize, PrimaryTheme等）
- 各ストーリーのargs（props設定）
- タイトル（"Basic/Button/Product001"）

**コード構造から:**
- 依存コンポーネント（import文）
- styled-components定義
- アニメーション使用の有無

#### Phase 3: スクリーンショット収集
1. `__screenshots__/`ディレクトリをスキャン
2. 各コンポーネントのスクリーンショットパスを収集
3. バリアント数をカウント

#### Phase 4: メタデータ生成
各コンポーネントに対して、以下を自動生成：

**自動抽出（100%正確）:**
- id, category, name
- screenshots paths
- props定義
- code examples（Storybookから）
- dependencies

**AI推論（人間レビュー推奨）:**
- description（コードとコメントから推測）
- designKeywords（ビジュアル特性から）
- useCases（コンポーネント名と用途から）
- figmaKeywords（デザインパターンから）
- similarPatterns（Material Design等との対応）

#### Phase 5: catalog.json生成
全情報を統合してJSONファイル生成：

```json
{
  "metadata": {
    "version": "1.0.0",
    "totalComponents": 96,
    "totalScreenshots": 216,
    "generatedAt": "2025-11-16T10:00:00Z",
    "generatedBy": "catalog-generator-agent"
  },
  "components": [
    {
      "id": "button-product001",
      ...
    },
    ...
  ]
}
```

#### Phase 6: サマリー生成
人間が読みやすいMarkdownサマリーも生成：

```markdown
# ArcFE UI Component Catalog

## 統計
- 総コンポーネント数: 96
- スクリーンショット数: 216
- カテゴリ: 2 (Basic, Advanced)

## Basic コンポーネント (81個)

### Button (2バリアント)
- **Product001**: Pill-shaped button (13スクリーンショット)
- **Product002**: Modern rounded button (10スクリーンショット)

### Input (6バリアント)
...

## Advanced コンポーネント (15個)
...
```

## 使用方法

### 手動実行
```bash
# カタログ生成エージェントを起動
/task type:catalog-generator "Generate complete component catalog"
```

### 自動実行（CI/CD）
```yaml
# .github/workflows/update-catalog.yml
name: Update Component Catalog

on:
  push:
    paths:
      - 'packages/ui/components/**'
      - 'packages/ui/__screenshots__/**'

jobs:
  update-catalog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Generate catalog
        run: |
          # Claude Code CLIでcatalog-generatorエージェントを実行
          claude-code task --agent=catalog-generator
      - name: Commit catalog
        run: |
          git add packages/ui/catalog.json
          git commit -m "chore: update component catalog"
          git push
```

## 更新頻度
- コンポーネント追加時: 自動
- スクリーンショット更新時: 自動
- 月次: 手動レビュー＆メタデータ調整

## 品質保証

### 自動検証
- 全コンポーネントにスクリーンショットがあるか
- propsの型定義が正確か
- Storybookリンクが有効か

### 人間レビュー項目
- description が適切か
- designKeywords が正確か
- useCases が現実的か
- relatedComponents が適切か

## 出力例

```json
{
  "id": "button-product001",
  "category": "Basic",
  "name": "Button Product001",
  "description": {
    "short": "大きな角丸のモダンなボタン",
    "detailed": "自動生成: pill-shaped design with 30px border-radius..."
  },
  "screenshots": {
    "basePath": "__screenshots__/components/Basic/Button/Product001/index",
    "variants": [
      {"name": "Default", "file": "Default.png"},
      ...
    ],
    "totalVariants": 13
  },
  "props": {
    "type": {
      "values": ["001", "002", "003"],
      "extracted_from": "styles.tsx:14"
    },
    ...
  }
}
```

## メンテナンス
- カタログは自動生成されるため、手動編集は非推奨
- カスタマイズが必要な場合は `catalog-overrides.json` を作成
- オーバーライドは自動生成時にマージされる
