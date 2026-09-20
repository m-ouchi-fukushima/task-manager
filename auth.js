(() => {
  "use strict";

  const DEFAULT_DATA_PATH = "data/app-state.enc.json";
  const ITERATIONS = 600000;
  const SALT_BYTES = 16;
  const IV_BYTES = 12;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");

  let passwordInMemory = "";
  let preferredSalt = null;
  let unlocked = false;
  let setupMode = false;

  function bytesToBase64(bytes) {
    let binary = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }

  function base64ToBytes(value) {
    const binary = atob(String(value || "").replace(/\s/g, ""));
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
    return out;
  }

  function randomBytes(length) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return bytes;
  }

  async function deriveKey(password, salt, iterations = ITERATIONS) {
    const material = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", hash: "SHA-256", salt, iterations },
      material,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  function normalizeEnvelope(value) {
    if (!value || typeof value !== "object") return null;
    if (value.setupRequired) return { setupRequired: true, schemaVersion: 2, encrypted: true };
    if (!value.encrypted || !value.kdf?.salt || !value.iv || !value.ciphertext) return null;
    return value;
  }

  async function decryptEnvelope(envelope) {
    const normalized = normalizeEnvelope(envelope);
    if (!normalized || normalized.setupRequired) return null;
    if (!passwordInMemory) throw new Error("パスワードでロックを解除してください");
    const salt = base64ToBytes(normalized.kdf.salt);
    const iv = base64ToBytes(normalized.iv);
    const iterations = Number(normalized.kdf.iterations) || ITERATIONS;
    const key = await deriveKey(passwordInMemory, salt, iterations);
    let plain;
    try {
      plain = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        base64ToBytes(normalized.ciphertext)
      );
    } catch (_) {
      throw new Error("パスワードが違うか、暗号化データが破損しています");
    }
    preferredSalt = salt;
    const parsed = JSON.parse(decoder.decode(plain));
    return parsed;
  }

  async function encryptPayload(payload) {
    if (!passwordInMemory) throw new Error("パスワードでロックを解除してください");
    const salt = preferredSalt || randomBytes(SALT_BYTES);
    const iv = randomBytes(IV_BYTES);
    const key = await deriveKey(passwordInMemory, salt, ITERATIONS);
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(JSON.stringify(payload))
    );
    preferredSalt = salt;
    return {
      schemaVersion: 2,
      encrypted: true,
      algorithm: "AES-256-GCM",
      kdf: {
        name: "PBKDF2",
        hash: "SHA-256",
        iterations: ITERATIONS,
        salt: bytesToBase64(salt)
      },
      iv: bytesToBase64(iv),
      ciphertext: bytesToBase64(new Uint8Array(encrypted))
    };
  }

  function inferRepo() {
    const configured = window.TASK_GIT_CONFIG || {};
    const host = location.hostname.toLowerCase();
    let owner = String(configured.owner || "").trim();
    let repo = String(configured.repo || "").trim();
    if ((!owner || !repo) && host.endsWith(".github.io")) {
      owner ||= host.slice(0, -".github.io".length);
      repo ||= location.pathname.split("/").filter(Boolean)[0] || `${owner}.github.io`;
    }
    return {
      owner,
      repo,
      branch: String(configured.branch || "main").trim() || "main",
      dataPath: String(configured.dataPath || DEFAULT_DATA_PATH).replace(/^\/+/, "")
    };
  }

  function rawUrl(info) {
    return `https://raw.githubusercontent.com/${encodeURIComponent(info.owner)}/${encodeURIComponent(info.repo)}/${encodeURIComponent(info.branch)}/${info.dataPath.split("/").map(encodeURIComponent).join("/")}`;
  }

  function apiUrl(info) {
    return `https://api.github.com/repos/${encodeURIComponent(info.owner)}/${encodeURIComponent(info.repo)}/contents/${info.dataPath.split("/").map(encodeURIComponent).join("/")}`;
  }

  function gitHeaders(token) {
    return {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json"
    };
  }

  async function persistInitialEnvelope(envelope, token) {
    const repo = inferRepo();
    if (!repo.owner || !repo.repo) {
      throw new Error("GitHubのOwner / Repositoryを特定できません。git-config.jsを設定してください");
    }
    if (!token) throw new Error("初回設定にはGitHub PATが必要です");

    let sha = "";
    const getResponse = await fetch(`${apiUrl(repo)}?ref=${encodeURIComponent(repo.branch)}`, {
      headers: gitHeaders(token),
      cache: "no-store"
    });
    if (getResponse.ok) {
      const current = await getResponse.json();
      sha = String(current.sha || "");
    } else if (getResponse.status !== 404) {
      throw new Error(`GitHubへ接続できません（${getResponse.status}）`);
    }

    const body = {
      message: "Initialize encrypted task data",
      content: bytesToBase64(encoder.encode(`${JSON.stringify(envelope, null, 2)}\n`)),
      branch: repo.branch
    };
    if (sha) body.sha = sha;

    const putResponse = await fetch(apiUrl(repo), {
      method: "PUT",
      headers: gitHeaders(token),
      body: JSON.stringify(body)
    });
    if (!putResponse.ok) {
      const info = await putResponse.json().catch(() => ({}));
      throw new Error(info.message || `GitHubへの初期保存に失敗しました（${putResponse.status}）`);
    }
    sessionStorage.setItem("task-github-token-v1", token);
    const gitTokenInput = document.getElementById("gitToken");
    if (gitTokenInput) gitTokenInput.value = token;
    return true;
  }

  async function fetchBootstrapEnvelope() {
    const repo = inferRepo();
    if (repo.owner && repo.repo) {
      try {
        const response = await fetch(`${rawUrl(repo)}?t=${Date.now()}`, { cache: "no-store" });
        if (response.ok) return normalizeEnvelope(await response.json());
      } catch (_) {
        // Deployed file fallback below.
      }
    }
    try {
      const response = await fetch(`./${repo.dataPath}?t=${Date.now()}`, { cache: "no-store" });
      if (response.ok) return normalizeEnvelope(await response.json());
    } catch (_) {
      // First setup fallback.
    }
    return { schemaVersion: 2, encrypted: true, setupRequired: true };
  }

  function ui() {
    return {
      gate: document.getElementById("authGate"),
      title: document.getElementById("authTitle"),
      description: document.getElementById("authDescription"),
      unlockForm: document.getElementById("authUnlockForm"),
      password: document.getElementById("authPassword"),
      setupForm: document.getElementById("authSetupForm"),
      newPassword: document.getElementById("authNewPassword"),
      confirmPassword: document.getElementById("authNewPasswordConfirm"),
      setupToken: document.getElementById("authSetupToken"),
      message: document.getElementById("authMessage")
    };
  }

  function setMessage(text, isError = false) {
    const { message } = ui();
    if (!message) return;
    message.textContent = text || "";
    message.classList.toggle("is-error", Boolean(isError));
  }

  function openApp() {
    unlocked = true;
    document.body.classList.remove("is-auth-locked");
    const { gate } = ui();
    if (gate) gate.hidden = true;
  }

  function showSetup() {
    setupMode = true;
    const els = ui();
    els.title.textContent = "初回パスワード設定";
    els.description.textContent = "初回だけ、パスワードとGitHub PATを使って暗号化設定をGitへ保存します。保存に成功するまでアプリは開きません。";
    els.unlockForm.hidden = true;
    els.setupForm.hidden = false;
    setTimeout(() => els.newPassword?.focus(), 0);
  }

  function showUnlock() {
    setupMode = false;
    const els = ui();
    els.title.textContent = "パスワードを入力";
    els.description.textContent = "Gitに保存されているデータは暗号化されています。";
    els.unlockForm.hidden = false;
    els.setupForm.hidden = true;
    setTimeout(() => els.password?.focus(), 0);
  }

  async function unlockFlow() {
    const envelope = await fetchBootstrapEnvelope();
    if (!envelope || envelope.setupRequired) showSetup();
    else showUnlock();

    return new Promise((resolve) => {
      const els = ui();

      els.unlockForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const candidate = String(els.password.value || "");
        if (!candidate) return;
        setMessage("確認しています…");
        passwordInMemory = candidate;
        try {
          await decryptEnvelope(envelope);
          openApp();
          setMessage("");
          resolve(true);
        } catch (error) {
          passwordInMemory = "";
          setMessage(error.message || "パスワードを確認できませんでした", true);
          els.password.select();
        }
      }, { once: false });

      els.setupForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const a = String(els.newPassword.value || "");
        const b = String(els.confirmPassword.value || "");
        if (a.length < 12) {
          setMessage("12文字以上のパスワードを設定してください", true);
          return;
        }
        if (a !== b) {
          setMessage("確認用パスワードが一致しません", true);
          return;
        }
        const token = String(els.setupToken?.value || "").trim();
        if (!token) {
          setMessage("初回設定にはGitHub PATを入力してください", true);
          return;
        }
        passwordInMemory = a;
        preferredSalt = randomBytes(SALT_BYTES);
        try {
          setMessage("暗号化した初期設定をGitへ保存しています…");
          let localAppState = null;
          let localTimerState = null;
          try { localAppState = JSON.parse(localStorage.getItem("task-calendar-ui-v1") || "null"); } catch (_) {}
          try { localTimerState = JSON.parse(localStorage.getItem("task-work-timer-pomodoro-v2") || "null"); } catch (_) {}
          const initialPayload = {
            schemaVersion: 1,
            updatedAt: new Date().toISOString(),
            appState: localAppState,
            timerState: localTimerState
          };
          const initialEnvelope = await encryptPayload(initialPayload);
          await persistInitialEnvelope(initialEnvelope, token);
          openApp();
          setMessage("");
          resolve(true);
        } catch (error) {
          passwordInMemory = "";
          preferredSalt = null;
          setMessage(error.message || "初期設定に失敗しました", true);
        }
      }, { once: false });
    });
  }

  function lock({ reload = true } = {}) {
    passwordInMemory = "";
    preferredSalt = null;
    unlocked = false;
    if (reload) location.reload();
  }

  window.TaskSecurity = {
    unlockFlow,
    decryptEnvelope,
    encryptPayload,
    isUnlocked: () => unlocked,
    isSetupMode: () => setupMode,
    lock
  };
})();
