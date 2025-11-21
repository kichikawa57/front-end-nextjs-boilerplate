# Claude Code 設定ガイド

このディレクトリには、Claude Code の ArcFE プロジェクト用設定が含まれています。

## 📁 ディレクトリ構成

```
.claude/
├── CLAUDE.md                    # プロジェクト固有の開発ガイドライン（自動読み込み）
├── README.md                    # このファイル
├── settings.local.json          # パーミッションとフック設定
├── agents/                      # カスタムエージェント定義
│   ├── catalog-generator.md
│   └── visual-matcher.md        # ビジュアルマッチングエージェント
├── commands/                    # スラッシュコマンド
│   ├── arcfe-component.md       # /arcfe-component [name]
│   ├── arcfe-search.md          # /arcfe-search [keyword]
│   ├── match-visual.md          # /match-visual
│   ├── show-component.md        # /show-component [name]
│   ├── commit-and-push.md
│   ├── release-*.md
│   └── ...
├── prompts/                     # 再利用可能なプロンプト
│   └── arcfe-workflow-check.md  # ArcFE ワークフローチェックリスト
└── workflows/                   # ワークフロー定義
    └── figma-to-code.md
```

## 🚀 新機能: ArcFE 開発ワークフロー

### 自動適用される設定

`CLAUDE.md` がプロジェクト内で自動的に読み込まれ、以下が強制されます:

✅ **ArcFE コンポーネント使用時の必須チェック:**
1. component-manifest.json の確認
2. __screenshots__ ディレクトリの確認
3. props と dependencies の確認

### 利用可能なコマンド

#### 1. ビジュアルマッチング
```bash
/match-visual
```
- デザイン画像を添付すると、最適な ArcFE コンポーネントを推薦
- スクリーンショットと視覚的に比較
- 実装コード例を自動生成

#### 2. コンポーネント検索
```bash
/arcfe-search button pill
/arcfe-search icon camera
```
- キーワードで component-manifest.json を検索
- 関連コンポーネントを表示

#### 3. コンポーネント詳細
```bash
/arcfe-component Header001
/arcfe-component Svg018Icon
```
- props、usage、スクリーンショットを表示
- 実装例を提示

#### 4. スクリーンショット表示
```bash
/show-component Button001
```
- 全バリアントのスクリーンショットを表示

## 🔧 カスタマイズ

### パーミッション追加

`settings.local.json` の `permissions.allow` に追加:

```json
{
  "permissions": {
    "allow": [
      "Bash(your-command:*)"
    ]
  }
}
```

### フック追加

タスク完了時に通知を送る例:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"完了\" with title \"Claude\"'"
          }
        ]
      }
    ]
  }
}
```

## 📚 ArcFE 開発フロー

### 推奨ワークフロー

1. **デザイン受領**
   ```
   Figma デザインまたはスクリーンショットを受け取る
   ```

2. **コンポーネント検索**
   ```bash
   /match-visual
   # または
   /arcfe-search [keyword]
   ```

3. **ビジュアル確認（必須）**
   ```
   __screenshots__/ ディレクトリで実際の画像を確認
   ```

4. **実装**
   ```tsx
   import { Header001, Svg018Icon } from "arcfe/packages/ui";

   <Header001
     left={<Logo />}
     right={<Nav />}
   />
   ```

5. **ブラウザ確認**
   ```bash
   npm run dev
   # localhost:3000 で表示確認
   ```

## ⚠️ 重要な注意事項

### 必ずスクリーンショットを確認

**❌ 悪い例:**
```tsx
// component-manifest.json だけ見て、適当に選ぶ
import { Svg001Icon } from "arcfe/packages/ui";
```

**✅ 良い例:**
```bash
# 1. スクリーンショットを確認
Read __screenshots__/components/Basic/Icons/Icons/Default.png

# 2. 視覚的に確認してから選択
import { Svg018Icon } from "arcfe/packages/ui"; // カメラアイコン
```

### コンポーネントが見つからない場合

類似度が 70% 未満の場合:
- ArcFE を使わず、新規コンポーネントを作成
- styled-components で実装

## 📖 関連ドキュメント

- **プロジェクトガイドライン**: [CLAUDE.md](./CLAUDE.md)
- **ワークフローチェック**: [prompts/arcfe-workflow-check.md](./prompts/arcfe-workflow-check.md)
- **コンポーネントカタログ**: [../component-manifest.json](../component-manifest.json)
- **スクリーンショット**: [../__screenshots__/](../__screenshots__/)

## 🎯 よくある質問

### Q: スラッシュコマンドが動かない
A: `/help` で利用可能なコマンド一覧を確認してください

### Q: コンポーネントが見つからない
A: `/arcfe-search [keyword]` で検索するか、component-manifest.json を直接確認

### Q: アイコンの選び方がわからない
A: 必ず `__screenshots__/components/Basic/Icons/Icons/Default.png` を開いて、視覚的に確認してください

## 🔄 設定の更新

このディレクトリの設定ファイルを編集した後:

1. **CLAUDE.md**: 次のセッションから自動反映
2. **settings.local.json**: Claude Code を再起動
3. **commands/*.md**: `/help` で確認

---

**質問や改善提案がある場合は、このファイルを更新するか、新しいコマンド/プロンプトを追加してください。**
