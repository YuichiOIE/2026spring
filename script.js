// ========== DOM要素の取得 ==========
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const searchInput = document.querySelector('#searchInput');
const scrollTopBtn = document.querySelector('#scrollTop');

// ========== Markdownファイルのパス ==========
const contentFiles = {
    glossary: 'glossary.md',
    manual: 'manual.md'
};

// キャッシュ用
const contentCache = {};
let currentTab = 'glossary';
let allContent = {};

// ========== 初期化 ==========
document.addEventListener('DOMContentLoaded', () => {
    loadAllContent();
    setupEventListeners();
});

// ========== イベントリスナーの設定 ==========
function setupEventListeners() {
    // タブ切り替え
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            switchTab(tabName);
        });
    });

    // 検索機能
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });

    // スクロールトップボタン
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // キーボードショートカット
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + F で検索ボックスにフォーカス
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Ctrl/Cmd + 1 で用語集
        if ((e.ctrlKey || e.metaKey) && e.key === '1') {
            e.preventDefault();
            switchTab('glossary');
        }
        
        // Ctrl/Cmd + 2 でマニュアル
        if ((e.ctrlKey || e.metaKey) && e.key === '2') {
            e.preventDefault();
            switchTab('manual');
        }
    });
}

// ========== コンテンツの読み込み ==========
async function loadAllContent() {
    for (const [key, filename] of Object.entries(contentFiles)) {
        try {
            const response = await fetch(filename);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            const markdown = await response.text();
            const html = marked.parse(markdown);
            contentCache[key] = html;
            allContent[key] = markdown;
            
            // コンテンツを表示
            const contentDiv = document.querySelector(`#${key}`);
            contentDiv.innerHTML = html;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            const contentDiv = document.querySelector(`#${key}`);
            contentDiv.innerHTML = `
                <div class="error">
                    <h2>❌ コンテンツの読み込みに失敗しました</h2>
                    <p>${filename} が見つかりません。</p>
                    <p>ファイルが同じディレクトリにあることを確認してください。</p>
                </div>
            `;
        }
    }
}

// ========== タブ切り替え ==========
function switchTab(tabName) {
    currentTab = tabName;
    
    // タブボタンの状態更新
    tabButtons.forEach(button => {
        if (button.dataset.tab === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // タブコンテンツの表示切り替え
    tabContents.forEach(content => {
        if (content.id === tabName) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // 検索をクリア
    searchInput.value = '';
    
    // トップにスクロール
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== 検索機能 ==========
function performSearch(query) {
    const currentContent = document.querySelector(`#${currentTab}`);
    
    if (!query.trim()) {
        // 検索クエリが空なら元のコンテンツを復元
        currentContent.innerHTML = contentCache[currentTab];
        return;
    }
    
    // 元のコンテンツを取得
    const originalHTML = contentCache[currentTab];
    
    // 検索クエリをエスケープ
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // 正規表現を作成（大文字小文字を区別しない）
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    
    // HTMLタグ内でないマッチのみハイライト
    let highlightedHTML = originalHTML;
    
    // テキストノードのみをハイライト（HTMLタグは無視）
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    
    highlightTextNodes(tempDiv, regex);
    
    currentContent.innerHTML = tempDiv.innerHTML;
    
    // 最初のハイライトまでスクロール
    const firstHighlight = currentContent.querySelector('.highlight');
    if (firstHighlight) {
        firstHighlight.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// テキストノードを再帰的にハイライト
function highlightTextNodes(node, regex) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (regex.test(text)) {
            const span = document.createElement('span');
            span.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
            node.parentNode.replaceChild(span, node);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE && 
               node.nodeName !== 'SCRIPT' && 
               node.nodeName !== 'STYLE' &&
               node.nodeName !== 'CODE' &&
               node.nodeName !== 'PRE') {
        Array.from(node.childNodes).forEach(child => {
            highlightTextNodes(child, regex);
        });
    }
}

// ========== ユーティリティ関数 ==========
// コンテンツのエクスポート（将来的な機能拡張用）
function exportContent(format = 'html') {
    const content = contentCache[currentTab];
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTab}.html`;
    a.click();
    URL.revokeObjectURL(url);
}

// ダークモード切り替え（将来的な機能拡張用）
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// ページ読み込み時にダークモード設定を復元
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ========== 便利な情報を表示 ==========
console.log(`
🎉 Vibecoding 学習ガイドへようこそ！

キーボードショートカット:
- Ctrl/Cmd + F: 検索
- Ctrl/Cmd + 1: 用語集を表示
- Ctrl/Cmd + 2: マニュアルを表示

使い方:
1. タブを切り替えてコンテンツを閲覧
2. 検索ボックスでキーワード検索
3. 右下のボタンでトップに戻る

楽しくVibecodingを学びましょう！🚀
`);

