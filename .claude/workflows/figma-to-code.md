# Workflow: Figmaデザインから実装まで

## シナリオ
デザイナーからFigmaデザインを受け取り、ArcFE UIコンポーネントを使って実装する。

---

## Step 1: Figmaデザインの準備

### デザイナー
Figmaでデザインを作成し、スクリーンショットを共有：
```
「このログインページを実装してください」
[screenshot.png]
- ユーザー名入力フィールド
- パスワード入力フィールド
- ログインボタン
- パスワードを忘れた方はこちらリンク
```

---

## Step 2: ビジュアルマッチング

### 開発者
```bash
/match-visual
[Figmaスクリーンショット添付]
```

### Claude Code (Visual Matcher Agent起動)
```
画像を解析しています...

検出されたUIコンポーネント:
1. 入力フィールド x2（ユーザー名、パスワード）
2. ボタン x1（ログイン）
3. テキストリンク x1（パスワードを忘れた方）

各コンポーネントのビジュアルマッチングを実行中...
```

#### 入力フィールドの解析
```
特徴:
- 形状: 下線のみ（underline-only）
- ラベル: フローティングラベル（入力時に上に移動）
- サイズ: 中程度
- 色: グレーの下線、黒テキスト

スクリーンショット比較中...
- TextField/Product003/Default.png (類似度: 92%) ✅
- Input/Product001/Default.png (類似度: 75%)
- TextField/Product001/Default.png (類似度: 68%)

推薦: TextField/Product003
```

#### ボタンの解析
```
特徴:
- 形状: 大きな角丸（28px程度）、pill-shaped
- 色: 青背景（#0066FF）、白テキスト
- サイズ: 幅100%、高さ50px
- アニメーション: ホバー時に背景色が濃くなる

スクリーンショット比較中...
- Button/Product001/PrimaryTheme.png (類似度: 95%) ✅
- Button/Product002/Default.png (類似度: 70%)

推薦: Button/Product001
```

#### テキストリンクの解析
```
特徴:
- 形状: シンプルなテキストリンク
- 色: グレー（#666）
- サイズ: 小（14px）
- 下線: ホバー時のみ

スクリーンショット比較中...
- TextButton/Product001/Default.png (類似度: 88%) ✅

推薦: TextButton/Product001
```

---

## Step 3: マッチング結果の確認

### Claude Code
```markdown
## 🎯 ビジュアルマッチング結果

### コンポーネント構成
1. **ユーザー名入力:** TextField/Product003 (類似度: 92%)
2. **パスワード入力:** TextField/Product003 (類似度: 92%)
3. **ログインボタン:** Button/Product001 (類似度: 95%)
4. **パスワードリンク:** TextButton/Product001 (類似度: 88%)

### 詳細レポート

#### 1. TextField/Product003 ✅
![Figma](user-provided.png) vs ![ArcFE](__screenshots__/TextField/Product003/Default.png)

**一致点:**
- ✅ 下線のみのデザイン
- ✅ フローティングラベル
- ✅ シンプルでモダン

**差異:**
- ⚠️ 下線の色が若干異なる（appearance propsで調整可能）

**実装コード:**
```tsx
<TextField003
  label="ユーザー名"
  type="text"
  appearance={{
    borderColor: "#ccc",
    focusBorderColor: "#0066FF",
    labelColor: "#666"
  }}
/>
```

---

#### 2. Button/Product001 ✅
![Figma](user-provided.png) vs ![ArcFE](__screenshots__/Button/Product001/PrimaryTheme.png)

**一致点:**
- ✅ pill-shaped（角丸大）
- ✅ 青背景、白テキスト
- ✅ 幅100%

**差異:**
- ⚠️ Figmaの青（#0066FF）とデフォルトの青（#007bff）が若干異なる

**実装コード:**
```tsx
<Button001
  type="001"
  size="middle"
  fullWidth
  animation={{
    type: "001",
    duration: 0.25,
    backgroundColor: "#0050CC",
    textColor: "#fff"
  }}
  appearance={{
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
    color: "#fff"
  }}
>
  ログイン
</Button001>
```

---

実装しますか？
```

### 開発者
```
はい、実装してください
```

---

## Step 4: コード生成

### Claude Code
```tsx
// LoginPage.tsx
import { useState } from 'react';
import { Button001, TextField003, TextButton001 } from '@arcfe/ui';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  margin-top: 32px;
`;

const ForgotPasswordLink = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { username, password });
  };

  return (
    <LoginContainer>
      <Title>ログイン</Title>

      <FormGroup>
        <TextField003
          label="ユーザー名"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          appearance={{
            borderColor: "#ccc",
            focusBorderColor: "#0066FF",
            labelColor: "#666"
          }}
        />
      </FormGroup>

      <FormGroup>
        <TextField003
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          appearance={{
            borderColor: "#ccc",
            focusBorderColor: "#0066FF",
            labelColor: "#666"
          }}
        />
      </FormGroup>

      <ButtonGroup>
        <Button001
          type="001"
          size="middle"
          fullWidth
          onClick={handleLogin}
          animation={{
            type: "001",
            duration: 0.25,
            backgroundColor: "#0050CC",
            textColor: "#fff"
          }}
          appearance={{
            backgroundColor: "#0066FF",
            borderColor: "#0066FF",
            color: "#fff"
          }}
        >
          ログイン
        </Button001>
      </ButtonGroup>

      <ForgotPasswordLink>
        <TextButton001
          href="/forgot-password"
          appearance={{
            color: "#666",
            hoverColor: "#333"
          }}
        >
          パスワードを忘れた方はこちら
        </TextButton001>
      </ForgotPasswordLink>
    </LoginContainer>
  );
};
```

実装完了しました！

次のステップ:
1. 開発サーバーで確認
2. Figmaと並べて比較
3. 必要に応じて微調整

---

## Step 5: ビジュアル確認＆微調整

### 開発者
```
実装を確認しました。ボタンのサイズがFigmaより少し小さいです。
```

### Claude Code
```tsx
// Button001のappearanceにカスタムサイズを追加
<Button001
  ...
  appearance={{
    backgroundColor: "#0066FF",
    borderColor: "#0066FF",
    color: "#fff",
    paddingTop: 15,      // 追加
    paddingBottom: 15,   // 追加
    fontSize: 16         // 追加
  }}
>
  ログイン
</Button001>
```

調整しました！再度確認してください。

---

## Step 6: 完成

### 開発者
```
完璧です！ありがとうございます。
```

---

## ワークフローサマリー

1. **Figmaスクリーンショット提供** (30秒)
2. **/match-visual でビジュアルマッチング** (1分)
3. **マッチング結果確認** (1分)
4. **コード生成** (30秒)
5. **ビジュアル確認＆微調整** (2分)

**合計時間: 約5分** 🚀

---

## 従来の方法との比較

### 従来（手動）
1. Figmaを見る
2. コンポーネントライブラリを探す
3. Storybookで確認
4. コードを書く
5. propsを調べる
6. 微調整

**合計時間: 20-30分**

### ArcFE + ビジュアルマッチング
1. /match-visual でマッチング
2. 確認
3. 完了

**合計時間: 5分** 💨

**効率: 4-6倍向上！**
