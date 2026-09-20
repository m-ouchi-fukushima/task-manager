# Personal Task Board / GitHub Pages

個人用タスク管理ページです。GitHub Pages上ではHTML/JS自体は公開されますが、入力データはパスワードから生成した鍵で暗号化し、`data/app-state.enc.json` としてGitへ保存します。

## セキュリティ仕様

- `robots.txt` で全クローラーを拒否
- HTMLに `noindex,nofollow,noarchive,noimageindex,nosnippet`
- アプリ本体は認証成功前には起動しない（fail-closed）
- 初回パスワード設定はGitHubへの暗号化設定保存に成功した場合のみ完了
- 初回設定には対象リポジトリの Fine-grained PAT（Contents: Read and write）が必要
- Git保存データは `data/app-state.enc.json`
- AES-256-GCMで暗号化
- 鍵生成はPBKDF2-HMAC-SHA-256（600,000回）
- パスワードそのものはGit / localStorage / sessionStorageへ保存しない
- GitHub PATはsessionStorageのみに保持

> 注意: GitHub Pagesはサーバー側認証ではありません。HTML/JSそのものは取得できます。今回の保護対象は入力データで、Git上の実データはパスワードなしでは復号できない形にしています。

## 初回セットアップ

1. このフォルダの中身をGitHubリポジトリのルートへ配置します。
2. Settings → Pages → Source を GitHub Actions にします。
3. 公開URLへアクセスすると「初回パスワード設定」が表示されます。
4. 12文字以上のパスワードと Fine-grained PAT を入力します。
5. 「パスワードを設定してGitへ保存」を押します。
6. `data/app-state.enc.json` の更新に成功した場合だけアプリが開きます。
7. 以後は設定したパスワードがないと開けません。

## Git同期

「CSVデータ取込」タブ内のGit同期から、次を操作できます。

- Gitから再読込
- 今すぐGitへ保存
- 更新時の自動Git保存

タスク、企画タスク、休日、やりたいこと、家計簿、今日メモ、作業タイマーの状態が暗号化されて保存・ロードされます。

## UI変更

- `📝` 今日やることメモは左メニュー最上部に配置（初期表示はタスク・カレンダーのまま）
- 企画タスク一覧を初めて開いたときは今日の日付まで自動スクロール
- CSVデータ取込は「データ種別」を左、その下にあったファイル選択・確認・一括書き出し等を枠内右側へ配置

## パスワードを忘れた場合

暗号化済みデータを復号できません。パスワードマネージャー等で保管してください。


## GitHub PAT の保存

PATは初回設定時に入力します。以後はサイトパスワードから生成した鍵でAES-GCM暗号化し、暗号文のみをブラウザのlocalStorageへ保存します。平文PATは永続保存しません。サイトのロック解除後にPATを自動復号してsessionStorageへ展開し、Git同期に使用します。Git同期欄でPATを空にすると、保存済みPATも削除されます。
