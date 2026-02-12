# Webアプリケーション開発マニュアル

VibecodingでWebアプリケーションを作るための実践的なマニュアルです。

---

## 第1章：準備編

### 1.1 必要なもの

1. **テキストエディタ**
   - VS Code（おすすめ）、Sublime Text、Atomなど
   - コードを書くためのソフト

2. **ブラウザ**
   - Chrome、Firefox、Safariなど
   - 作ったものを確認するため

3. **やる気**
   - これが一番大事！

### 1.2 基本的なファイル構成

```
プロジェクトフォルダ/
├── index.html    # メインのHTMLファイル
├── style.css     # スタイルシート
└── script.js     # JavaScript
```

---

## 第2章：HTMLの書き方

### 2.1 基本構造

すべてのHTMLファイルはこの構造から始まります：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アプリのタイトル</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- ここにコンテンツを書く -->
    
    <script src="script.js"></script>
</body>
</html>
```

#### 各部分の意味
- `<!DOCTYPE html>`: HTML5を使うという宣言
- `<html lang="ja">`: 日本語のページであることを示す
- `<head>`: ページの設定（表示されない部分）
- `<meta charset="UTF-8">`: 日本語が使えるようにする
- `<meta name="viewport"...>`: スマホ対応
- `<title>`: ブラウザのタブに表示される名前
- `<body>`: 実際に表示される部分
- `<script src="script.js">`: JavaScriptファイルを読み込む

### 2.2 よく使う要素

#### 見出しと段落
```html
<h1>大見出し</h1>
<h2>中見出し</h2>
<h3>小見出し</h3>
<p>これは段落です。文章を書くときに使います。</p>
```

#### ボタン
```html
<button id="myButton">クリックしてね</button>
```

#### 入力欄
```html
<input type="text" id="nameInput" placeholder="名前を入力してください">
<input type="number" id="ageInput" placeholder="年齢">
<input type="email" id="emailInput" placeholder="メールアドレス">
```

#### グループ化
```html
<div class="container">
    <h2>タイトル</h2>
    <p>関連するコンテンツをまとめる</p>
</div>
```

#### リスト
```html
<!-- 順序なしリスト -->
<ul>
    <li>項目1</li>
    <li>項目2</li>
    <li>項目3</li>
</ul>

<!-- 順序ありリスト -->
<ol>
    <li>最初</li>
    <li>次</li>
    <li>最後</li>
</ol>
```

### 2.3 IDとクラスの使い分け

- **ID**: 1つだけの要素につける（`id="uniqueName"`）
  - JavaScriptで操作するときに便利
  
- **クラス**: 同じスタイルを複数の要素につける（`class="groupName"`）
  - CSSでまとめてスタイルを適用するときに便利

```html
<button id="submitButton" class="btn btn-primary">送信</button>
```

---

## 第3章：CSSの書き方

### 3.1 基本の書き方

```css
セレクタ {
    プロパティ: 値;
    プロパティ: 値;
}
```

### 3.2 実践例

```css
/* 全体の設定 */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

/* IDで指定 */
#myButton {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

/* クラスで指定 */
.container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* ホバー効果（マウスを乗せたとき） */
button:hover {
    opacity: 0.8;
}
```

### 3.3 よく使うレイアウト技法

#### Flexbox（簡単に横並び・中央揃え）
```css
.flex-container {
    display: flex;
    justify-content: center;  /* 横方向の中央揃え */
    align-items: center;      /* 縦方向の中央揃え */
    gap: 10px;                /* 要素間の隙間 */
}
```

#### レスポンシブデザイン（スマホ対応）
```css
/* 画面幅が600px以下のとき */
@media (max-width: 600px) {
    .container {
        padding: 10px;
    }
    
    button {
        width: 100%;
    }
}
```

### 3.4 色の指定方法

```css
.element {
    /* 名前で指定 */
    color: red;
    
    /* 16進数で指定 */
    color: #ff0000;
    
    /* RGBで指定 */
    color: rgb(255, 0, 0);
    
    /* RGBAで指定（最後は透明度 0-1） */
    color: rgba(255, 0, 0, 0.5);
}
```

---

## 第4章：JavaScriptの書き方

### 4.1 要素の取得

```javascript
// IDで取得（1つだけ）
const button = document.querySelector('#myButton');
const input = document.querySelector('#nameInput');

// クラスで取得（複数可能）
const buttons = document.querySelectorAll('.btn');

// タグ名で取得
const allDivs = document.querySelectorAll('div');
```

### 4.2 イベントリスナーの設定

```javascript
// クリックイベント
button.addEventListener('click', function() {
    console.log('ボタンがクリックされました');
});

// 入力イベント
input.addEventListener('input', function() {
    console.log('入力値:', input.value);
});

// アロー関数を使った書き方（同じ意味）
button.addEventListener('click', () => {
    console.log('クリックされました');
});
```

### 4.3 要素の操作

```javascript
// テキストの変更
const heading = document.querySelector('h1');
heading.textContent = '新しいタイトル';

// HTMLの変更
const container = document.querySelector('.container');
container.innerHTML = '<p>新しいコンテンツ</p>';

// スタイルの変更
button.style.backgroundColor = 'red';
button.style.color = 'white';

// クラスの追加・削除
button.classList.add('active');
button.classList.remove('inactive');
button.classList.toggle('selected');  // あればし、なければ追加

// 属性の取得・設定
const value = input.value;          // 値の取得
input.value = '新しい値';           // 値の設定
input.placeholder = '入力してください';
```

### 4.4 条件分岐

```javascript
const age = 20;

if (age >= 20) {
    console.log('成人です');
} else if (age >= 13) {
    console.log('ティーンエイジャーです');
} else {
    console.log('子供です');
}
```

### 4.5 繰り返し

```javascript
// 配列のループ
const items = ['りんご', 'バナナ', 'オレンジ'];

// forEachを使う方法
items.forEach((item, index) => {
    console.log(`${index + 1}番目: ${item}`);
});

// for文を使う方法
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}
```

### 4.6 関数の定義

```javascript
// 通常の関数
function greet(name) {
    return `こんにちは、${name}さん！`;
}

// アロー関数
const greet = (name) => {
    return `こんにちは、${name}さん！`;
};

// アロー関数（短縮形）
const greet = name => `こんにちは、${name}さん！`;

// 使い方
console.log(greet('太郎'));  // こんにちは、太郎さん！
```

---

## 第5章：実践例

### 5.1 カウンターアプリ

#### HTML
```html
<div class="counter-app">
    <h1 id="count">0</h1>
    <button id="increment">+</button>
    <button id="decrement">-</button>
    <button id="reset">リセット</button>
</div>
```

#### CSS
```css
.counter-app {
    text-align: center;
    padding: 50px;
}

#count {
    font-size: 72px;
    margin: 20px 0;
}

button {
    font-size: 20px;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
}
```

#### JavaScript
```javascript
let count = 0;
const countDisplay = document.querySelector('#count');
const incrementBtn = document.querySelector('#increment');
const decrementBtn = document.querySelector('#decrement');
const resetBtn = document.querySelector('#reset');

incrementBtn.addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
});

decrementBtn.addEventListener('click', () => {
    count--;
    countDisplay.textContent = count;
});

resetBtn.addEventListener('click', () => {
    count = 0;
    countDisplay.textContent = count;
});
```

### 5.2 To-Doリストアプリ

#### HTML
```html
<div class="todo-app">
    <h1>To-Doリスト</h1>
    <div class="input-area">
        <input type="text" id="todoInput" placeholder="タスクを入力">
        <button id="addBtn">追加</button>
    </div>
    <ul id="todoList"></ul>
</div>
```

#### JavaScript
```javascript
const todoInput = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const todoList = document.querySelector('#todoList');

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('タスクを入力してください');
        return;
    }
    
    // リスト項目を作成
    const li = document.createElement('li');
    li.textContent = text;
    
    // 削除ボタンを作成
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });
    
    // 完了トグル
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });
    
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    
    // 入力欄をクリア
    todoInput.value = '';
}
```

---

## 第6章：デバッグのコツ

### 6.1 コンソールの活用

```javascript
// 変数の中身を確認
console.log('変数の値:', myVariable);

// オブジェクトの中身を確認
console.log('オブジェクト:', { name: '太郎', age: 25 });

// エラーメッセージ
console.error('これはエラーです');

// 警告メッセージ
console.warn('これは警告です');
```

### 6.2 よくあるエラーと対処法

#### エラー1: Uncaught ReferenceError: xxx is not defined
- **意味**: 変数や関数が定義されていない
- **対処**: スペルミスをチェック、定義する順序を確認

#### エラー2: Uncaught TypeError: Cannot read property 'xxx' of null
- **意味**: 要素が見つからない
- **対処**: セレクタが正しいか、JavaScriptの読み込み位置を確認

#### エラー3: Uncaught SyntaxError: Unexpected token
- **意味**: 文法エラー
- **対処**: 括弧やクォートの閉じ忘れをチェック

### 6.3 デバッグの手順

1. **エラーメッセージを読む**: 何行目でどんなエラーか書いてある
2. **console.logを仕込む**: 処理がどこまで進んでいるか確認
3. **要素が取得できているか確認**: `console.log(element)`
4. **ブラウザのデベロッパーツールを使う**: F12キーで開く
5. **少しずつコメントアウトして原因を特定する**

---

## 第7章：次のステップ

### 7.1 よく使うライブラリ・フレームワーク

#### 初心者向け
- **Bootstrap**: CSSフレームワーク。簡単にきれいなデザインが作れる
- **jQuery**: JavaScriptライブラリ。DOMの操作が簡単に（最近は使わない傾向）

#### 中級者向け
- **React**: Facebookが作ったUIライブラリ
- **Vue.js**: 軽量で学習しやすいフレームワーク
- **Tailwind CSS**: ユーティリティファーストなCSSフレームワーク

### 7.2 学習リソース

#### 日本語
- [MDN Web Docs（日本語版）](https://developer.mozilla.org/ja/)
- [ドットインストール](https://dotinstall.com/)
- [Progate](https://prog-8.com/)

#### 英語
- [freeCodeCamp](https://www.freecodecamp.org/)
- [The Odin Project](https://www.theodinproject.com/)
- [W3Schools](https://www.w3schools.com/)

### 7.3 便利なツール

- **Git**: バージョン管理システム
- **GitHub**: コードを公開・共有するプラットフォーム
- **CodePen**: ブラウザ上でコードを書いて試せるサービス
- **Chrome DevTools**: ブラウザの開発者ツール（デバッグに必須）

---

## 第8章：Vibecodingのコツ

### 8.1 考え方

1. **完璧主義を捨てる**
   - 動くことが最優先
   - リファクタリングは後で

2. **小さく始める**
   - 最小限の機能から作る
   - 動いたら機能を追加していく

3. **検索力が大事**
   - 「JavaScript ボタン クリック」など具体的に検索
   - Stack Overflowは宝の山

4. **失敗を恐れない**
   - 壊れても元に戻せる（Git使えば完璧）
   - エラーは学びのチャンス

### 8.2 効率的な開発フロー

1. **アイデアをメモ**: 何を作りたいか書き出す
2. **最小構成を作る**: HTMLの骨組みだけ
3. **見た目を整える**: CSSで最低限のスタイル
4. **動きをつける**: JavaScriptで1つの機能を実装
5. **テスト**: 動作確認
6. **繰り返し**: 次の機能を追加

### 8.3 ハマったときの打開策

- **5分考えて分からなければ休憩**: 煮詰まったら離れる
- **問題を言語化する**: 誰かに説明するつもりで書き出す
- **Google検索**: エラーメッセージをそのまま検索
- **ChatGPTに聞く**: コードを見せて相談
- **一旦シンプルにする**: 複雑すぎたら機能を減らす

---

## おわりに

このマニュアルは「最初の一歩」を踏み出すためのガイドです。

プログラミングは：
- **実践あるのみ**: 読むだけでは身につかない
- **エラーは当たり前**: プロでも毎日エラーと格闘
- **楽しむのが一番**: ストレスを感じたら休憩しよう

さあ、Vibecodingでアプリを作り始めましょう！🚀
