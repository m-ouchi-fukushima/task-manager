(async () => {
  try {
    if (!window.TaskSecurity) {
      throw new Error("認証モジュールを読み込めませんでした");
    }
    await window.TaskSecurity.unlockFlow();
    if (!window.TaskSecurity.isUnlocked()) return;
    if (window.GitDataSync) {
      await window.GitDataSync.bootstrap();
    }
    const script = document.createElement("script");
    script.src = "./task.js";
    script.defer = true;
    document.body.appendChild(script);
  } catch (error) {
    console.warn("Secure bootstrap failed", error);
    const message = document.getElementById("authMessage");
    if (message) {
      message.textContent = error?.message || "認証処理に失敗しました";
      message.classList.add("is-error");
    }
  }
})();
