(async () => {
  try {
    if (window.TaskSecurity) {
      await window.TaskSecurity.unlockFlow();
    }
    if (window.GitDataSync) {
      await window.GitDataSync.bootstrap();
    }
  } catch (error) {
    console.warn("Secure bootstrap failed", error);
  } finally {
    if (!window.TaskSecurity || window.TaskSecurity.isUnlocked()) {
      const script = document.createElement("script");
      script.src = "./task.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  }
})();
