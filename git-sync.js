(() => {
  "use strict";

  const APP_KEY = "task-calendar-ui-v1";
  const TIMER_KEY = "task-work-timer-pomodoro-v2";
  const SETTINGS_KEY = "task-git-sync-settings-v1";
  const META_KEY = "task-git-sync-meta-v1";
  const TOKEN_KEY = "task-github-token-v1";
  const DEFAULT_DATA_PATH = "data/app-state.enc.json";
  const SAVE_DELAY = 1400;

  let saveTimer = null;
  let lastRemoteSha = "";
  let lastLoadedRemoteUpdatedAt = "";
  let bootstrapping = false;

  function nowIso() {
    return new Date().toISOString();
  }

  function safeJsonParse(value, fallback = null) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function inferGitHubPagesRepo() {
    const hostname = location.hostname.toLowerCase();
    if (!hostname.endsWith(".github.io")) return {};
    const owner = hostname.slice(0, -".github.io".length);
    const firstPath = location.pathname.split("/").filter(Boolean)[0] || "";
    const repo = firstPath || `${owner}.github.io`;
    return { owner, repo };
  }

  function getSettings() {
    const configured = window.TASK_GIT_CONFIG || {};
    const saved = safeJsonParse(localStorage.getItem(SETTINGS_KEY), {}) || {};
    const inferred = inferGitHubPagesRepo();
    return {
      owner: String(saved.owner || configured.owner || inferred.owner || "").trim(),
      repo: String(saved.repo || configured.repo || inferred.repo || "").trim(),
      branch: String(saved.branch || configured.branch || "main").trim() || "main",
      dataPath: String(saved.dataPath || configured.dataPath || DEFAULT_DATA_PATH).replace(/^\/+/, ""),
      autoSave: saved.autoSave !== undefined ? Boolean(saved.autoSave) : configured.autoSave !== false
    };
  }

  function saveSettings(next) {
    const settings = {
      owner: String(next.owner || "").trim(),
      repo: String(next.repo || "").trim(),
      branch: String(next.branch || "main").trim() || "main",
      dataPath: String(next.dataPath || DEFAULT_DATA_PATH).replace(/^\/+/, ""),
      autoSave: Boolean(next.autoSave)
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return settings;
  }

  function getToken() {
    return sessionStorage.getItem(TOKEN_KEY) || "";
  }

  function setToken(token) {
    const value = String(token || "").trim();
    if (value) sessionStorage.setItem(TOKEN_KEY, value);
    else sessionStorage.removeItem(TOKEN_KEY);
  }

  function encodeBase64Utf8(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }

  function decodeBase64Utf8(base64) {
    const binary = atob(base64.replace(/\s/g, ""));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  }

  function apiUrl(settings) {
    return `https://api.github.com/repos/${encodeURIComponent(settings.owner)}/${encodeURIComponent(settings.repo)}/contents/${settings.dataPath.split("/").map(encodeURIComponent).join("/")}`;
  }

  function rawUrl(settings) {
    return `https://raw.githubusercontent.com/${encodeURIComponent(settings.owner)}/${encodeURIComponent(settings.repo)}/${encodeURIComponent(settings.branch)}/${settings.dataPath.split("/").map(encodeURIComponent).join("/")}`;
  }

  function authHeaders(token) {
    const headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }

  function getLocalMeta() {
    return safeJsonParse(localStorage.getItem(META_KEY), {}) || {};
  }

  function setLocalMeta(patch) {
    const next = { ...getLocalMeta(), ...patch };
    localStorage.setItem(META_KEY, JSON.stringify(next));
    return next;
  }

  function collectPayload() {
    return {
      schemaVersion: 1,
      updatedAt: nowIso(),
      appState: safeJsonParse(localStorage.getItem(APP_KEY), null),
      timerState: safeJsonParse(localStorage.getItem(TIMER_KEY), null)
    };
  }

  function applyPayload(payload) {
    if (!payload || typeof payload !== "object") return false;
    bootstrapping = true;
    try {
      if (payload.appState && typeof payload.appState === "object") {
        localStorage.setItem(APP_KEY, JSON.stringify(payload.appState));
      }
      if (payload.timerState && typeof payload.timerState === "object") {
        localStorage.setItem(TIMER_KEY, JSON.stringify(payload.timerState));
      }
      if (payload.updatedAt) {
        setLocalMeta({ lastRemoteUpdatedAt: payload.updatedAt, lastLocalUpdatedAt: payload.updatedAt });
        lastLoadedRemoteUpdatedAt = payload.updatedAt;
      }
      return true;
    } finally {
      bootstrapping = false;
    }
  }

  function emitStatus(status, message, extra = {}) {
    window.dispatchEvent(new CustomEvent("git-sync-status", {
      detail: { status, message, ...extra }
    }));
  }

  async function getRemoteFile(settings, { allowPublicRaw = true } = {}) {
    if (!settings.owner || !settings.repo) throw new Error("Owner / Repository を設定してください");
    if (!window.TaskSecurity?.isUnlocked?.()) throw new Error("パスワードでロックを解除してください");
    const token = getToken();
    let envelope = null;
    let sha = "";
    if (token) {
      const response = await fetch(`${apiUrl(settings)}?ref=${encodeURIComponent(settings.branch)}`, {
        headers: authHeaders(token),
        cache: "no-store"
      });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`GitHub API ${response.status}: ${response.statusText}`);
      const json = await response.json();
      sha = String(json.sha || "");
      lastRemoteSha = sha;
      envelope = safeJsonParse(decodeBase64Utf8(json.content || ""), null);
    } else {
      if (!allowPublicRaw) throw new Error("Gitへ書き込むにはFine-grained PATが必要です");
      const response = await fetch(`${rawUrl(settings)}?t=${Date.now()}`, { cache: "no-store" });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`データ取得 ${response.status}: ${response.statusText}`);
      envelope = await response.json();
    }
    if (envelope?.setupRequired) return null;
    const payload = await window.TaskSecurity.decryptEnvelope(envelope);
    return { payload, sha };
  }

  async function bootstrap() {
    const settings = getSettings();
    if (!settings.owner || !settings.repo) {
      try {
        const response = await fetch(`./${settings.dataPath}?t=${Date.now()}`, { cache: "no-store" });
        if (response.ok) {
          const envelope = await response.json();
          if (!envelope?.setupRequired) {
            const payload = await window.TaskSecurity.decryptEnvelope(envelope);
            const localMeta = getLocalMeta();
            const remoteTime = Date.parse(payload?.updatedAt || 0) || 0;
            const localTime = Date.parse(localMeta.lastLocalUpdatedAt || 0) || 0;
            if (!localTime || remoteTime >= localTime) applyPayload(payload);
          }
        }
      } catch (_) {
        // local fallback is optional
      }
      return;
    }

    emitStatus("loading", "Gitからデータを確認しています…");
    try {
      const remote = await getRemoteFile(settings);
      if (!remote?.payload) {
        emitStatus("ready", "Git上にデータファイルがありません。最初の保存時に作成します。", { settings });
        return;
      }
      const localMeta = getLocalMeta();
      const remoteTime = Date.parse(remote.payload.updatedAt || 0) || 0;
      const localTime = Date.parse(localMeta.lastLocalUpdatedAt || 0) || 0;
      lastLoadedRemoteUpdatedAt = remote.payload.updatedAt || "";
      if (!localTime || remoteTime >= localTime) {
        applyPayload(remote.payload);
        emitStatus("synced", "Gitの最新データを読み込みました", { settings });
      } else {
        emitStatus("pending", "ローカル側にGitより新しい変更があります", { settings });
        if (settings.autoSave && getToken()) scheduleSave();
      }
    } catch (error) {
      console.warn("Git bootstrap error", error);
      emitStatus("error", error.message || "Gitデータを読み込めませんでした", { settings });
    }
  }

  async function saveNow({ force = false } = {}) {
    const settings = getSettings();
    if (!settings.owner || !settings.repo) throw new Error("Owner / Repository を設定してください");
    const token = getToken();
    if (!token) throw new Error("Gitへ保存するにはFine-grained PATを入力してください");

    emitStatus("saving", "Gitへ保存しています…", { settings });
    let remote = null;
    try {
      remote = await getRemoteFile(settings, { allowPublicRaw: false });
    } catch (error) {
      if (!String(error.message || "").includes("404")) throw error;
    }

    const payload = collectPayload();
    const envelope = await window.TaskSecurity.encryptPayload(payload);
    const body = {
      message: `Update encrypted app data ${payload.updatedAt}`,
      content: encodeBase64Utf8(`${JSON.stringify(envelope, null, 2)}\n`),
      branch: settings.branch
    };
    const sha = remote?.sha || lastRemoteSha;
    if (sha) body.sha = sha;

    const response = await fetch(apiUrl(settings), {
      method: "PUT",
      headers: { ...authHeaders(token), "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const info = await response.json().catch(() => ({}));
      throw new Error(info.message || `GitHub API ${response.status}`);
    }
    const result = await response.json();
    lastRemoteSha = String(result?.content?.sha || "");
    lastLoadedRemoteUpdatedAt = payload.updatedAt;
    setLocalMeta({ lastRemoteUpdatedAt: payload.updatedAt, lastLocalUpdatedAt: payload.updatedAt });
    emitStatus("synced", "Gitへ保存しました", { settings, updatedAt: payload.updatedAt });
    return result;
  }

  function markLocalChanged() {
    if (bootstrapping) return;
    setLocalMeta({ lastLocalUpdatedAt: nowIso() });
  }

  function scheduleSave() {
    if (bootstrapping) return;
    markLocalChanged();
    const settings = getSettings();
    if (!settings.autoSave || !getToken() || !settings.owner || !settings.repo) {
      emitStatus("pending", "ローカル変更あり（Git未保存）", { settings });
      return;
    }
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveNow().catch((error) => {
        console.warn("Git auto save error", error);
        emitStatus("error", error.message || "Gitへの保存に失敗しました", { settings });
      });
    }, SAVE_DELAY);
  }

  async function pullNow({ reload = true } = {}) {
    const settings = getSettings();
    emitStatus("loading", "Gitから再読込しています…", { settings });
    const remote = await getRemoteFile(settings);
    if (!remote?.payload) throw new Error("Git上にデータファイルがありません");
    applyPayload(remote.payload);
    emitStatus("synced", "Gitのデータを反映しました", { settings });
    if (reload) location.reload();
    return remote.payload;
  }

  async function testConnection() {
    const settings = getSettings();
    if (!settings.owner || !settings.repo) throw new Error("Owner / Repository を設定してください");
    const token = getToken();
    const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(settings.owner)}/${encodeURIComponent(settings.repo)}`, {
      headers: authHeaders(token),
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`リポジトリへ接続できません（${response.status}）`);
    emitStatus("ready", token ? "接続OK：読み書き設定を確認できます" : "接続OK：公開リポジトリを読み取りできます", { settings });
    return true;
  }

  window.GitDataSync = {
    bootstrap,
    getSettings,
    saveSettings,
    getToken,
    setToken,
    scheduleSave,
    saveNow,
    pullNow,
    testConnection,
    collectPayload,
    applyPayload
  };
})();

(() => {
  "use strict";

  function initGitSyncUi() {
    const api = window.GitDataSync;
    if (!api) return;

    const els = {
      owner: document.getElementById("gitOwner"),
      repo: document.getElementById("gitRepo"),
      branch: document.getElementById("gitBranch"),
      dataPath: document.getElementById("gitDataPath"),
      token: document.getElementById("gitToken"),
      autoSave: document.getElementById("gitAutoSave"),
      status: document.getElementById("gitSyncStatus"),
      message: document.getElementById("gitSyncMessage"),
      test: document.getElementById("gitTestBtn"),
      pull: document.getElementById("gitPullBtn"),
      push: document.getElementById("gitPushBtn")
    };
    if (!els.owner || !els.repo) return;

    const settings = api.getSettings();
    els.owner.value = settings.owner || "";
    els.repo.value = settings.repo || "";
    els.branch.value = settings.branch || "main";
    els.dataPath.value = settings.dataPath || "data/app-state.enc.json";
    els.autoSave.checked = settings.autoSave !== false;
    els.token.value = api.getToken();

    function collectSettings() {
      return api.saveSettings({
        owner: els.owner.value,
        repo: els.repo.value,
        branch: els.branch.value,
        dataPath: els.dataPath.value,
        autoSave: els.autoSave.checked
      });
    }

    function show(status, message) {
      els.status.dataset.status = status || "idle";
      els.status.textContent = {
        loading: "読込中",
        saving: "保存中",
        synced: "同期済",
        ready: "接続OK",
        pending: "未保存",
        error: "エラー"
      }[status] || "未接続";
      els.message.textContent = message || "";
    }

    [els.owner, els.repo, els.branch, els.dataPath].forEach((input) => {
      input.addEventListener("change", () => {
        collectSettings();
        show("pending", "Git同期設定を変更しました");
      });
    });
    els.autoSave.addEventListener("change", () => {
      collectSettings();
      if (els.autoSave.checked) api.scheduleSave();
    });
    els.token.addEventListener("change", async () => {
      api.setToken(els.token.value);
      try {
        if (window.TaskSecurity?.rememberGitToken) {
          await window.TaskSecurity.rememberGitToken(els.token.value);
        }
        show(
          "pending",
          els.token.value.trim()
            ? "PATをこのブラウザへ暗号化して保存しました"
            : "保存済みPATを削除しました"
        );
      } catch (error) {
        show("error", error.message || "PATを保存できませんでした");
      }
    });

    els.test.addEventListener("click", async () => {
      collectSettings();
      api.setToken(els.token.value);
      if (window.TaskSecurity?.rememberGitToken && els.token.value.trim()) {
        await window.TaskSecurity.rememberGitToken(els.token.value);
      }
      show("loading", "接続を確認しています…");
      try {
        await api.testConnection();
      } catch (error) {
        show("error", error.message || "接続確認に失敗しました");
      }
    });

    els.pull.addEventListener("click", async () => {
      collectSettings();
      api.setToken(els.token.value);
      if (window.TaskSecurity?.rememberGitToken && els.token.value.trim()) {
        await window.TaskSecurity.rememberGitToken(els.token.value);
      }
      if (!confirm("Git上のデータでこのブラウザのデータを更新します。続けますか？")) return;
      show("loading", "Gitからデータを読み込んでいます…");
      try {
        await api.pullNow({ reload: true });
      } catch (error) {
        show("error", error.message || "Gitから読み込めませんでした");
      }
    });

    els.push.addEventListener("click", async () => {
      collectSettings();
      api.setToken(els.token.value);
      if (window.TaskSecurity?.rememberGitToken && els.token.value.trim()) {
        await window.TaskSecurity.rememberGitToken(els.token.value);
      }
      show("saving", "Gitへ保存しています…");
      try {
        await api.saveNow({ force: true });
      } catch (error) {
        show("error", error.message || "Gitへ保存できませんでした");
      }
    });

    window.addEventListener("git-sync-status", (event) => {
      const detail = event.detail || {};
      show(detail.status, detail.message);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGitSyncUi, { once: true });
  } else {
    initGitSyncUi();
  }
})();
