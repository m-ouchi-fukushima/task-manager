# Personal Task Board / GitHub Pages

個人用タスク管理ページです。GitHub Pages向けの静的サイトですが、保存データはパスワードから生成した鍵で暗号化してGitへ保存します。

## セキュリティ仕様

- `robots.txt` で全クローラーを拒否
- HTMLに `noindex,nofollow,noarchive,noimageindex,nosnippet`
- 初回アクセス時にパスワードを設定
- Git保存データは `data/app-state.enc.json`
- AES-256-GCMで暗号化
- 鍵生成はPBKDF2-HMAC-SHA-256（600,000回）
- パスワードそのものはGit / localStorage / sessionStorageへ保存しない
- GitHub Fine-grained PATは従来どおりsessionStorageのみ

> 注意: `noindex` / `robots.txt` は検索除外の指示でありアクセス制御ではありません。HTML/JS自体はGitHub Pages上で公開されます。個人データは暗号化ファイルだけに保存してください。

## 初回セットアップ

1. このフォルダの中身をGitHubリポジトリのルートへ配置します。
2. Settings → Pages → SourceをGitHub Actionsにします。
3. 公開URLへアクセスすると「初回パスワード設定」が表示されます。
4. 12文字以上の強いパスワードを設定します。
5. CSVデータ取込 → Git同期でFine-grained PATを設定します。
6. 「今すぐGitへ保存」を押すと、`data/app-state.enc.json` が暗号化データへ置き換わります。

## パスワードについて

パスワードを忘れた場合、暗号化済みデータを復号できません。安全なパスワードマネージャー等で保管してください。

パスワードを変更する機能は現時点では付けていません。変更する場合は、復号済み状態でデータをCSVバックアップしてから暗号データを初期化してください。

## Git同期

Fine-grained PATは対象リポジトリだけに限定し、`Contents: Read and write` を付与してください。PAT自体はGitには保存されません。

## 旧版から更新する場合

旧版で `data/app-state.json` に実データを保存していた場合は、この版の `data/app-state.json` で上書きしてください。Git履歴に過去の平文データが残っている場合は、その履歴も別途削除する必要があります。

個人用なら、リポジトリ自体も **Private** にすることを推奨します。ただし通常の個人向けGitHub Pagesは、リポジトリがPrivateでもPagesサイト自体が自動的に非公開になるわけではありません。

## 今日やることメモ

画面右上の `📝` ボタンから「今日やることメモ」を開けます。

- 直接テキストを追加できます。
- やりたいことリストの未完了 Item / Task / Travel が引用候補として表示されます。
- 引用候補を「今日やること」枠へドラッグ＆ドロップするとコピーできます。
- やりたいことリスト本体の未完了カードから直接ドラッグすることもできます。
- 引用後は元のやりたいこととは独立した今日メモとして保持されます。
- 今日メモは日付ごとに内部状態へ保存され、Git同期時には他のデータと一緒に暗号化されます。
