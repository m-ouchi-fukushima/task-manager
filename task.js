(() => {
  const STORAGE_KEY = "task-calendar-ui-v1";
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  const els = {
    taskForm: document.getElementById("taskForm"),
    taskTitle: document.getElementById("taskTitle"),
    taskDate: document.getElementById("taskDate"),
    taskPriority: document.getElementById("taskPriority"),
    taskDuration: document.getElementById("taskDuration"),
    taskProject: document.getElementById("taskProject"),
    taskMemo: document.getElementById("taskMemo"),
    backlogList: document.getElementById("backlogList"),
    backlogCount: document.getElementById("backlogCount"),
    calendarGrid: document.getElementById("calendarGrid"),
    currentMonth: document.getElementById("currentMonth"),
    prevMonth: document.getElementById("prevMonth"),
    nextMonth: document.getElementById("nextMonth"),
    todayBtn: document.getElementById("todayBtn"),
    iphoneCalendarSync: document.getElementById("iphoneCalendarSync"),
    holidayForm: document.getElementById("holidayForm"),
    holidayDates: document.getElementById("holidayDates"),
    holidayList: document.getElementById("holidayList"),
    toast: document.getElementById("toast"),
    taskDetailModal: document.getElementById("taskDetailModal"),
    taskDetailTitle: document.getElementById("taskDetailTitle"),
    taskDetailDate: document.getElementById("taskDetailDate"),
    taskDetailPriority: document.getElementById("taskDetailPriority"),
    taskDetailDuration: document.getElementById("taskDetailDuration"),
    taskDetailMemo: document.getElementById("taskDetailMemo"),
    taskDetailEdit: document.getElementById("taskDetailEdit"),
    taskEditModal: document.getElementById("taskEditModal"),
    taskEditForm: document.getElementById("taskEditForm"),
    taskEditHeading: document.getElementById("taskEditHeading"),
    taskEditSubmit: document.querySelector("#taskEditForm button[type='submit']"),
    editTaskTitle: document.getElementById("editTaskTitle"),
    editTaskDate: document.getElementById("editTaskDate"),
    editTaskPriority: document.getElementById("editTaskPriority"),
    editTaskDuration: document.getElementById("editTaskDuration"),
    editTaskProject: document.getElementById("editTaskProject"),
    editTaskMemo: document.getElementById("editTaskMemo"),
    editTaskStatus: document.getElementById("editTaskStatus"),
    priorityFilterClear: document.getElementById("priorityFilterClear"),
    wishlistForm: document.getElementById("wishlistForm"),
    wishlistTitle: document.getElementById("wishlistTitle"),
    wishlistType: document.getElementById("wishlistType"),
    wishlistBudget: document.getElementById("wishlistBudget"),
    wishlistMemo: document.getElementById("wishlistMemo"),
    wishlistItemList: document.getElementById("wishlistItemList"),
    wishlistTaskList: document.getElementById("wishlistTaskList"),
    wishlistTravelList: document.getElementById("wishlistTravelList"),
    wishlistItemCount: document.getElementById("wishlistItemCount"),
    wishlistTaskCount: document.getElementById("wishlistTaskCount"),
    wishlistTravelCount: document.getElementById("wishlistTravelCount"),
    wishlistCompletedItemList: document.getElementById("wishlistCompletedItemList"),
    wishlistCompletedTaskList: document.getElementById("wishlistCompletedTaskList"),
    wishlistCompletedTravelList: document.getElementById("wishlistCompletedTravelList"),
    wishlistCompletedItemCount: document.getElementById("wishlistCompletedItemCount"),
    wishlistCompletedTaskCount: document.getElementById("wishlistCompletedTaskCount"),
    wishlistCompletedTravelCount: document.getElementById("wishlistCompletedTravelCount"),
    wishlistCount: document.getElementById("wishlistCount"),
    wishlistActiveCount: document.getElementById("wishlistActiveCount"),
    wishlistCompletedCount: document.getElementById("wishlistCompletedCount"),
    wishlistSelectAll: document.getElementById("wishlistSelectAll"),
    wishlistBulkDelete: document.getElementById("wishlistBulkDelete"),
    wishlistEditModal: document.getElementById("wishlistEditModal"),
    wishlistEditForm: document.getElementById("wishlistEditForm"),
    editWishlistTitle: document.getElementById("editWishlistTitle"),
    editWishlistType: document.getElementById("editWishlistType"),
    editWishlistBudget: document.getElementById("editWishlistBudget"),
    editWishlistStatus: document.getElementById("editWishlistStatus"),
    editWishlistMemo: document.getElementById("editWishlistMemo"),
    pageTabs: Array.from(document.querySelectorAll("[data-page-tab]")),
    pagePanels: Array.from(document.querySelectorAll("[data-page-panel]")),
    scheduleTable: document.getElementById("scheduleTable"),
    scheduleTableWrap: document.getElementById("scheduleTableWrap"),
    scheduleTableHead: document.getElementById("scheduleTableHead"),
    scheduleTableBody: document.getElementById("scheduleTableBody"),
    scheduleTodayBtn: document.getElementById("scheduleTodayBtn"),
    calendarTaskListSide: document.getElementById("calendarTaskListSide"),
    calendarTaskListCount: document.getElementById("calendarTaskListCount"),
    scheduleTaskListSide: document.getElementById("scheduleTaskListSide"),
    scheduleTaskListCount: document.getElementById("scheduleTaskListCount"),
    projectTaskForm: document.getElementById("projectTaskForm"),
    projectTaskTitle: document.getElementById("projectTaskTitle"),
    projectTaskDeadline: document.getElementById("projectTaskDeadline"),
    projectTaskTotalHours: document.getElementById("projectTaskTotalHours"),
    projectTaskList: document.getElementById("projectTaskList"),
    projectTaskCount: document.getElementById("projectTaskCount"),
    projectEditModal: document.getElementById("projectEditModal"),
    projectEditForm: document.getElementById("projectEditForm"),
    editProjectTitle: document.getElementById("editProjectTitle"),
    editProjectDeadline: document.getElementById("editProjectDeadline"),
    editProjectTotalHours: document.getElementById("editProjectTotalHours"),
    editProjectSummary: document.getElementById("editProjectSummary"),
    householdForm: document.getElementById("householdForm"),
    householdMonth: document.getElementById("householdMonth"),
    householdTodayMonth: document.getElementById("householdTodayMonth"),
    householdDate: document.getElementById("householdDate"),
    householdType: document.getElementById("householdType"),
    householdCategory: document.getElementById("householdCategory"),
    householdAmount: document.getElementById("householdAmount"),
    householdMemo: document.getElementById("householdMemo"),
    householdExpenseTotal: document.getElementById("householdExpenseTotal"),
    householdIncomeTotal: document.getElementById("householdIncomeTotal"),
    householdBalanceTotal: document.getElementById("householdBalanceTotal"),
    householdEntryCount: document.getElementById("householdEntryCount"),
    householdExpenseCount: document.getElementById("householdExpenseCount"),
    householdIncomeCount: document.getElementById("householdIncomeCount"),
    householdExpenseList: document.getElementById("householdExpenseList"),
    householdIncomeList: document.getElementById("householdIncomeList"),
    householdRecurringForm: document.getElementById("householdRecurringForm"),
    householdRecurringDay: document.getElementById("householdRecurringDay"),
    householdRecurringCategory: document.getElementById("householdRecurringCategory"),
    householdRecurringAmount: document.getElementById("householdRecurringAmount"),
    householdRecurringMemo: document.getElementById("householdRecurringMemo"),
    householdRecurringCount: document.getElementById("householdRecurringCount"),
    householdRecurringList: document.getElementById("householdRecurringList"),
    csvImportForm: document.getElementById("csvImportForm"),
    csvImportType: document.getElementById("csvImportType"),
    csvImportFile: document.getElementById("csvImportFile"),
    csvImportResult: document.getElementById("csvImportResult"),
    csvExportAll: document.getElementById("csvExportAll"),
    csvPreviewModal: document.getElementById("csvPreviewModal"),
    csvPreviewSummary: document.getElementById("csvPreviewSummary"),
    csvPreviewTableHead: document.getElementById("csvPreviewTableHead"),
    csvPreviewTableBody: document.getElementById("csvPreviewTableBody"),
    csvPreviewMessages: document.getElementById("csvPreviewMessages"),
    csvPreviewApply: document.getElementById("csvPreviewApply"),
    csvPreviewCancel: document.getElementById("csvPreviewCancel"),
    todayMemoToggle: document.getElementById("todayMemoToggle"),
    todayMemoPanel: document.getElementById("todayMemoPanel"),
    todayMemoClose: document.getElementById("todayMemoClose"),
    todayMemoDate: document.getElementById("todayMemoDate"),
    todayMemoForm: document.getElementById("todayMemoForm"),
    todayMemoInput: document.getElementById("todayMemoInput"),
    todayMemoCount: document.getElementById("todayMemoCount"),
    todayMemoDropzone: document.getElementById("todayMemoDropzone"),
    todayMemoDropHint: document.getElementById("todayMemoDropHint"),
    todayMemoList: document.getElementById("todayMemoList"),
    todayMemoSourceList: document.getElementById("todayMemoSourceList")
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const SCHEDULE_START = new Date(2026, 8, 1);
  const SCHEDULE_END = new Date(2028, 7, 31);

  const defaultTasks = [];

  let state = loadState();
  // ページ更新時は保存中の表示月ではなく、必ず今日を含む月から開始する。
  state.currentYear = today.getFullYear();
  state.currentMonth = today.getMonth();
  let draggingId = null;
  let draggingCopyMode = false;
  let draggingWishlistId = null;
  let detailTaskId = null;
  let editingTaskId = null;
  let taskEditMode = "edit";
  let editingWishlistId = null;
  let editingProjectId = null;
  let priorityFilter = "all";
  let activeTab = "calendar";
  let toastTimer = null;
  let pendingCsvImport = null;
  const selectedWishlistIds = new Set();

  if (els.householdMonth) els.householdMonth.value = toMonthKey(today);
  if (els.householdDate) els.householdDate.value = toDateKey(today);
  populateHouseholdCategories();
  populateRecurringCategories();

  populateDurationSelect(els.taskDuration);
  populateDurationSelect(els.editTaskDuration);
  renderProjectOptions();
  updatePriorityFilterButtons();
  render();
  setupDesktopPanelHeightSync();
  setupTodayMemo();

  els.taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = els.taskTitle.value.trim();
    if (!title) return;

    const dateValue = els.taskDate.value || null;
    const taskId = createId();
    const plannedMinutes = normalizePlannedMinutes(els.taskDuration.value);
    const projectId = normalizeProjectId(els.taskProject.value);
    const task = {
      id: taskId,
      title,
      date: dateValue,
      priority: els.taskPriority.value,
      plannedMinutes,
      projectId,
      completed: false,
      memo: els.taskMemo.value.trim(),
      order: getNextOrder(dateValue)
    };
    state.tasks.push(task);

    if (dateValue) {
      state.currentYear = Number(dateValue.slice(0, 4));
      state.currentMonth = Number(dateValue.slice(5, 7)) - 1;
    }

    els.taskForm.reset();
    els.taskPriority.value = "middle";
    els.taskDuration.value = "0";
    els.taskProject.value = "";
    saveAndRender("タスクを追加しました");
  });

  if (els.projectTaskForm) {
    els.projectTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = els.projectTaskTitle.value.trim();
      const deadline = els.projectTaskDeadline?.value || "";
      const totalPlannedMinutes = normalizeTotalPlannedMinutes(Number(els.projectTaskTotalHours.value) * 60);
      if (!title) return;
      if (!totalPlannedMinutes) {
        showToast("全体合計時間を入力してください");
        els.projectTaskTotalHours.focus();
        return;
      }
      state.projects.push({ id: createId(), title, deadline, totalPlannedMinutes, createdAt: Date.now() });
      els.projectTaskForm.reset();
      saveAndRender("企画タスクを追加しました");
    });
  }


  document.querySelectorAll("[data-priority-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedPriority = button.dataset.priorityFilter;
      priorityFilter = priorityFilter === selectedPriority ? "all" : selectedPriority;
      updatePriorityFilterButtons();
      render();
    });
  });

  els.priorityFilterClear.addEventListener("click", () => {
    priorityFilter = "all";
    updatePriorityFilterButtons();
    render();
  });


  els.prevMonth.addEventListener("click", () => {
    changeMonth(-1);
  });

  els.nextMonth.addEventListener("click", () => {
    changeMonth(1);
  });

  els.todayBtn.addEventListener("click", () => {
    state.currentYear = today.getFullYear();
    state.currentMonth = today.getMonth();
    saveAndRender("今月に戻しました");
  });

  if (els.scheduleTodayBtn) {
    els.scheduleTodayBtn.addEventListener("click", scrollScheduleToToday);
  }

  els.iphoneCalendarSync.addEventListener("click", exportIphoneCalendar);

  els.pageTabs.forEach((button) => {
    button.addEventListener("click", () => {
      switchPageTab(button.dataset.pageTab);
    });
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-task-complete]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    toggleTaskCompletion(button.dataset.taskComplete);
  });

  els.scheduleTableBody.addEventListener("input", handleScheduleHoursInput);
  els.scheduleTableBody.addEventListener("change", handleScheduleHoursChange);

  els.holidayForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const dates = parseHolidayDates(els.holidayDates.value);
    if (!dates.length) {
      showToast("有効な日付を入力してください");
      els.holidayDates.focus();
      return;
    }
    const name = "休日";
    let addedCount = 0;
    let updatedCount = 0;
    dates.forEach((date) => {
      const existing = state.holidays.find((holiday) => holiday.date === date);
      if (existing) {
        existing.name = name;
        updatedCount += 1;
      } else {
        state.holidays.push({ id: createId(), date, name });
        addedCount += 1;
      }
    });
    const firstDate = dates[0];
    state.currentYear = Number(firstDate.slice(0, 4));
    state.currentMonth = Number(firstDate.slice(5, 7)) - 1;
    els.holidayForm.reset();
    const messages = [];
    if (addedCount) messages.push(`${addedCount}件追加`);
    if (updatedCount) messages.push(`${updatedCount}件更新`);
    saveAndRender(`休日を${messages.join("・")}しました`);
  });

  els.wishlistForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = els.wishlistTitle.value.trim();
    if (!title) {
      els.wishlistTitle.focus();
      return;
    }

    state.wishlist.push({
      id: createId(),
      title,
      type: normalizeWishlistType(els.wishlistType?.value),
      budget: normalizeMoney(els.wishlistBudget?.value),
      memo: els.wishlistMemo?.value.trim() || "",
      done: false,
      createdAt: Date.now(),
      completedAt: null
    });

    els.wishlistForm.reset();
    if (els.wishlistType) els.wishlistType.value = "task";
    saveAndRender("やりたいことを追加しました");
  });


  els.wishlistSelectAll.addEventListener("change", () => {
    selectedWishlistIds.clear();

    if (els.wishlistSelectAll.checked) {
      state.wishlist.forEach((item) => selectedWishlistIds.add(item.id));
    }

    renderWishlist();
  });

  els.wishlistBulkDelete.addEventListener("click", () => {
    const deleteCount = selectedWishlistIds.size;
    if (!deleteCount) return;

    if (!confirm(`選択した${deleteCount}件を削除しますか？`)) return;

    state.wishlist = state.wishlist.filter(
      (item) => !selectedWishlistIds.has(item.id)
    );
    selectedWishlistIds.clear();
    saveAndRender(`${deleteCount}件を削除しました`);
  });

  if (els.householdType) {
    els.householdType.addEventListener("change", populateHouseholdCategories);
  }

  if (els.householdMonth) {
    els.householdMonth.addEventListener("change", renderHousehold);
  }

  if (els.householdTodayMonth) {
    els.householdTodayMonth.addEventListener("click", () => {
      els.householdMonth.value = toMonthKey(today);
      renderHousehold();
    });
  }

  if (els.householdForm) {
    els.householdForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const amount = normalizeMoney(els.householdAmount.value);
      if (!amount) {
        els.householdAmount.focus();
        return;
      }
      const date = els.householdDate.value || toDateKey(today);
      state.householdEntries.push({
        id: createId(),
        date,
        type: els.householdType.value === "income" ? "income" : "expense",
        category: els.householdCategory.value || "その他",
        amount,
        memo: els.householdMemo.value.trim(),
        createdAt: Date.now()
      });
      els.householdForm.reset();
      els.householdType.value = "expense";
      els.householdDate.value = date;
      els.householdMonth.value = date.slice(0, 7);
      populateHouseholdCategories();
      saveAndRender("家計簿に追加しました");
    });
  }


  if (els.householdRecurringForm) {
    els.householdRecurringForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const day = Math.max(1, Math.min(31, Number.parseInt(els.householdRecurringDay.value, 10) || 1));
      const amount = normalizeMoney(els.householdRecurringAmount.value);
      if (!amount) {
        els.householdRecurringAmount.focus();
        return;
      }

      state.householdRecurringExpenses.push({
        id: createId(),
        day,
        category: els.householdRecurringCategory.value || "住居・固定費",
        amount,
        memo: els.householdRecurringMemo.value.trim(),
        createdAt: Date.now()
      });

      els.householdRecurringForm.reset();
      els.householdRecurringDay.value = "1";
      populateRecurringCategories();
      saveAndRender("毎月繰り返し支出を追加しました");
    });
  }


  if (els.csvExportAll) {
    els.csvExportAll.addEventListener("click", exportAllCsvData);
  }

  if (els.csvImportForm) {
    els.csvImportForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const file = els.csvImportFile?.files?.[0];
      if (!file) {
        showToast("CSVファイルを選択してください");
        return;
      }

      const button = els.csvImportForm.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      if (els.csvImportResult) {
        els.csvImportResult.className = "csv-import-result is-loading";
        els.csvImportResult.textContent = "CSVを読み込んでいます…";
      }

      try {
        const preview = await prepareCsvImport(file, els.csvImportType?.value || "all");
        pendingCsvImport = preview;
        renderCsvPreview(preview);
        openCsvPreview();
        if (els.csvImportResult) {
          els.csvImportResult.className = "csv-import-result";
          els.csvImportResult.innerHTML = "";
        }
      } catch (error) {
        console.error(error);
        pendingCsvImport = null;
        if (els.csvImportResult) {
          els.csvImportResult.className = "csv-import-result is-error";
          els.csvImportResult.innerHTML = `<strong>CSVを読み込めませんでした</strong><span>${escapeHtml(error?.message || "ファイル内容を確認してください")}</span>`;
        }
        showToast("CSVの読み込みに失敗しました");
      } finally {
        if (button) button.disabled = false;
      }
    });
  }

  if (els.csvPreviewApply) {
    els.csvPreviewApply.addEventListener("click", () => {
      if (!pendingCsvImport) return;
      state = pendingCsvImport.draftState;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.GitDataSync?.scheduleSave?.();
      window.dispatchEvent(new CustomEvent("task-data-updated"));
      render();
      renderCsvImportResult(pendingCsvImport.result);
      if (els.csvImportFile) els.csvImportFile.value = "";
      const { added, updated, skipped } = pendingCsvImport.result;
      closeCsvPreview();
      pendingCsvImport = null;
      showToast(`CSVを反映しました（追加${added}・更新${updated}・スキップ${skipped}）`);
    });
  }

  if (els.csvPreviewCancel) {
    els.csvPreviewCancel.addEventListener("click", () => {
      pendingCsvImport = null;
      closeCsvPreview();
      if (els.csvImportResult) {
        els.csvImportResult.className = "csv-import-result";
        els.csvImportResult.innerHTML = '<span>CSVの反映をキャンセルしました。</span>';
      }
      showToast("CSVは反映していません");
    });
  }

  document.querySelectorAll("[data-csv-preview-close]").forEach((button) => {
    button.addEventListener("click", () => {
      pendingCsvImport = null;
      closeCsvPreview();
    });
  });


  document.querySelectorAll("[data-wishlist-edit-close]").forEach((button) => {
    button.addEventListener("click", closeWishlistEdit);
  });

  if (els.wishlistEditForm) {
    els.wishlistEditForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const item = state.wishlist.find((entry) => entry.id === editingWishlistId);
      if (!item) {
        closeWishlistEdit();
        return;
      }

      const title = els.editWishlistTitle.value.trim();
      if (!title) {
        els.editWishlistTitle.focus();
        return;
      }

      const wasDone = Boolean(item.done);
      const isDone = els.editWishlistStatus.value === "done";
      item.title = title;
      item.type = normalizeWishlistType(els.editWishlistType?.value);
      item.budget = normalizeMoney(els.editWishlistBudget.value);
      item.memo = els.editWishlistMemo.value.trim();
      item.done = isDone;
      item.completedAt = isDone
        ? (wasDone ? Number(item.completedAt || Date.now()) : Date.now())
        : null;

      closeWishlistEdit();
      saveAndRender("やりたいことを更新しました");
    });
  }

  document.querySelectorAll("[data-project-edit-close]").forEach((button) => {
    button.addEventListener("click", closeProjectEdit);
  });

  if (els.projectEditForm) {
    els.projectEditForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const project = getProjectById(editingProjectId);
      if (!project) {
        closeProjectEdit();
        return;
      }
      const title = els.editProjectTitle.value.trim();
      if (!title) {
        els.editProjectTitle.focus();
        return;
      }
      const deadline = els.editProjectDeadline.value || "";
      const totalPlannedMinutes = normalizeTotalPlannedMinutes(Number(els.editProjectTotalHours.value) * 60);
      if (!totalPlannedMinutes) {
        showToast("全体合計時間を入力してください");
        els.editProjectTotalHours.focus();
        return;
      }
      project.title = title;
      project.deadline = deadline;
      project.totalPlannedMinutes = totalPlannedMinutes;
      closeProjectEdit();
      saveAndRender("企画タスクを更新しました");
    });
  }

  document.querySelectorAll("[data-detail-close]").forEach((button) => {
    button.addEventListener("click", closeTaskDetail);
  });

  document.querySelectorAll("[data-edit-close]").forEach((button) => {
    button.addEventListener("click", closeTaskEdit);
  });

  els.taskDetailEdit.addEventListener("click", () => {
    if (!detailTaskId) return;
    const id = detailTaskId;
    closeTaskDetail();
    editTask(id);
  });

  els.taskEditForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = els.editTaskTitle.value.trim();
    if (!title) {
      els.editTaskTitle.focus();
      return;
    }

    const nextDate = els.editTaskDate.value || null;
    const nextPriority = els.editTaskPriority.value;
    const nextPlannedMinutes = normalizePlannedMinutes(els.editTaskDuration.value);
    const nextProjectId = normalizeProjectId(els.editTaskProject.value);
    const nextMemo = els.editTaskMemo.value.trim();
    const nextCompleted = els.editTaskStatus?.value === "done";

    if (taskEditMode === "create") {
      state.tasks.push({
        id: createId(),
        title,
        date: nextDate,
        priority: nextPriority,
        plannedMinutes: nextPlannedMinutes,
        projectId: nextProjectId,
        completed: nextCompleted,
        memo: nextMemo,
        order: getNextOrder(nextDate)
      });

      if (nextDate) {
        state.currentYear = Number(nextDate.slice(0, 4));
        state.currentMonth = Number(nextDate.slice(5, 7)) - 1;
      }

      closeTaskEdit();
      saveAndRender("タスクを追加しました");
      return;
    }

    if (!editingTaskId) return;

    const task = state.tasks.find((item) => item.id === editingTaskId);
    if (!task) {
      closeTaskEdit();
      return;
    }

    const previousDate = task.date || null;
    task.title = title;
    task.date = nextDate;
    task.priority = nextPriority;
    task.plannedMinutes = nextPlannedMinutes;
    task.projectId = nextProjectId;
    task.memo = nextMemo;
    task.completed = nextCompleted;

    if (previousDate !== nextDate) {
      task.order = getNextOrder(nextDate);
      normalizeAllOrders();
    }

    if (nextDate) {
      state.currentYear = Number(nextDate.slice(0, 4));
      state.currentMonth = Number(nextDate.slice(5, 7)) - 1;
    }

    closeTaskEdit();
    saveAndRender("タスクを更新しました");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.csvPreviewModal?.classList.contains("is-open")) {
      pendingCsvImport = null;
      closeCsvPreview();
      return;
    }

    if (event.key !== "Escape") return;

    if (els.projectEditModal?.classList.contains("is-open")) {
      closeProjectEdit();
      return;
    }

    if (els.wishlistEditModal?.classList.contains("is-open")) {
      closeWishlistEdit();
      return;
    }

    if (els.taskEditModal.classList.contains("is-open")) {
      closeTaskEdit();
      return;
    }

    if (els.taskDetailModal.classList.contains("is-open")) {
      closeTaskDetail();
    }
  });

  function render() {
    const visibleTasks = getVisibleTasks();

    renderProjectOptions();
    renderProjectTaskSection();
    renderBacklog(visibleTasks);
    renderHolidayList();
    renderCalendar(visibleTasks);
    renderWishlist();
    renderTodayMemo();
    renderSchedule();
    renderTaskListSide();
    renderHousehold();
    bindDragEvents();
    syncDesktopPanelHeight();
  }

  function getVisibleTasks() {
    return state.tasks.filter((task) => (
      priorityFilter === "all" || task.priority === priorityFilter
    ));
  }

  function switchPageTab(tabName) {
    const nextTab = ["calendar", "schedule", "timer", "wishlist", "household", "csv"].includes(tabName) ? tabName : "calendar";
    activeTab = nextTab;

    els.pageTabs.forEach((button) => {
      const isActive = button.dataset.pageTab === nextTab;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    els.pagePanels.forEach((panel) => {
      const isActive = panel.dataset.pagePanel === nextTab;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    if (nextTab === "schedule") {
      renderSchedule();
    }
    if (nextTab === "wishlist") {
      renderWishlist();
    }
    if (nextTab === "household") {
      renderHousehold();
    }
    syncDesktopPanelHeight();
  }

  function renderSchedule() {
    const projectList = [...state.projects].sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0) || a.title.localeCompare(b.title, "ja"));
    els.scheduleTable.hidden = false;

    els.scheduleTableHead.innerHTML = `
      <tr>
        <th class="schedule-date-heading" scope="col">日付</th>
        ${projectList.map((project) => `
          <th class="schedule-task-heading is-project-task" scope="col" data-schedule-project-column="${project.id}" data-project-edit="${project.id}" tabindex="0" role="button" aria-label="${escapeHtml(project.title)}を編集">
            <span class="schedule-task-name">${escapeHtml(project.title)}</span>
            <span class="schedule-task-deadline">締切 ${escapeHtml(formatProjectDeadline(project.deadline))}</span>
            <span class="schedule-task-total" data-schedule-project-total="${project.id}">配分合計 0時間 / 消化時間 0時間 / 全体 ${formatHours(normalizeTotalPlannedMinutes(project.totalPlannedMinutes) / 60)}時間</span>
          </th>
        `).join("")}
      </tr>
    `;

    const rows = [];
    const cursor = new Date(SCHEDULE_START);
    let previousMonthKey = "";

    while (cursor <= SCHEDULE_END) {
      const date = new Date(cursor);
      const dateKey = toDateKey(date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
      const day = date.getDate();
      const dayOfWeek = date.getDay();
      const weekdayText = weekdays[dayOfWeek];
      const weekdayClass = dayOfWeek === 0 ? "sun" : dayOfWeek === 6 ? "sat" : "";
      const holiday = state.holidays.find((item) => item.date === dateKey);
      const isToday = dateKey === toDateKey(today);
      const isPast = dateKey < toDateKey(today);

      if (monthKey !== previousMonthKey) {
        rows.push(`
          <tr class="schedule-month-row" data-schedule-month="${monthKey}">
            <th colspan="${projectList.length + 1}">${year}年 ${month + 1}月</th>
          </tr>
        `);
        previousMonthKey = monthKey;
      }

      rows.push(`
        <tr class="schedule-row ${weekdayClass} ${holiday ? "holiday" : ""} ${isToday ? "today" : ""} ${isPast ? "is-past" : ""}" data-schedule-date="${dateKey}">
          <th class="schedule-date-cell" scope="row">
            <span class="schedule-date-main">${month + 1}月${day}日</span>
            <span class="schedule-date-week ${weekdayClass}">${weekdayText}</span>
            ${holiday ? `<span class="schedule-date-holiday" aria-label="休日"></span>` : ""}
          </th>
          ${projectList.map((project) => {
            const tasks = getProjectTasksForDate(project.id, dateKey);
            const activeTasks = tasks.filter((task) => !task.completed);
            const hours = activeTasks.reduce((sum, task) => sum + normalizePlannedMinutes(task.plannedMinutes) / 60, 0);
            const taskNames = tasks.map((task) => task.title).join(" / ");
            const allCompleted = tasks.length > 0 && tasks.every((task) => task.completed);
            return `
              <td class="schedule-cell ${tasks.length ? "has-tasks has-hours" : ""} ${allCompleted ? "is-completed" : ""}" data-date="${dateKey}" data-project-id="${project.id}" title="${escapeHtml(taskNames)}">
                ${tasks.length ? `
                  <div class="schedule-cell-task-list">
                    ${tasks.map((task) => `
                      <div class="schedule-cell-task ${task.completed ? "is-completed" : ""}">
                        <button class="schedule-cell-task-main" type="button" data-schedule-task-edit="${task.id}" title="${escapeHtml(task.title)}を編集">
                          <span class="schedule-cell-task-title">${escapeHtml(task.title)}</span>
                          <span class="schedule-cell-task-time">${escapeHtml(formatDuration(task.plannedMinutes))}</span>
                        </button>
                        <button class="task-complete-toggle schedule-cell-task-complete ${task.completed ? "is-on" : ""}" type="button" data-task-complete="${task.id}" aria-pressed="${task.completed ? "true" : "false"}" aria-label="${task.completed ? "未完了に戻す" : "完了にする"}">
                          <span aria-hidden="true">${task.completed ? "✓" : ""}</span>
                        </button>
                      </div>
                    `).join("")}
                  </div>
                  <label class="schedule-hours-control schedule-hours-control--readonly">
                    <input class="schedule-hours-input" type="text" readonly value="${formatHours(hours)}" aria-label="${year}年${month + 1}月${day}日 ${escapeHtml(project.title)}の未完了予定時間">
                    <span class="schedule-hours-unit">時間</span>
                  </label>
                ` : ""}
              </td>
            `;
          }).join("")}
        </tr>
      `);

      cursor.setDate(cursor.getDate() + 1);
    }

    els.scheduleTableBody.innerHTML = rows.join("");
    updateScheduleTotals();

    els.scheduleTableHead.querySelectorAll("[data-project-edit]").forEach((heading) => {
      heading.addEventListener("click", () => editProjectTask(heading.dataset.projectEdit));
      heading.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        editProjectTask(heading.dataset.projectEdit);
      });
    });

    els.scheduleTableBody.querySelectorAll("[data-schedule-task-edit]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        editTask(button.dataset.scheduleTaskEdit);
      });
    });

    els.scheduleTableBody.querySelectorAll(".schedule-cell[data-date][data-project-id]").forEach((cell) => {
      cell.addEventListener("dblclick", (event) => {
        // 既存タスクや完了チェックなどの操作上でのダブルクリックは新規登録にしない。
        if (event.target.closest(".schedule-cell-task, button, input, select, textarea, a, label")) return;
        event.preventDefault();
        openTaskCreateModal(cell.dataset.date, cell.dataset.projectId);
      });
    });
  }

  function handleScheduleHoursInput() {
    // 企画タスク一覧の時間はカレンダーのタスクから自動集計するため手入力しない。
  }

  function handleScheduleHoursChange() {
    // 企画タスク一覧の時間はカレンダーのタスクから自動集計するため手入力しない。
  }

  function updateScheduleTotals() {
    state.projects.forEach((project) => {
      const totalElement = els.scheduleTableHead.querySelector(`[data-schedule-project-total="${cssEscape(project.id)}"]`);
      if (!totalElement) return;
      totalElement.textContent = `配分合計 ${formatHours(getProjectAllocationTotal(project.id))}時間 / 消化時間 ${formatHours(getProjectConsumedTotal(project.id))}時間 / 全体 ${formatHours(normalizeTotalPlannedMinutes(project.totalPlannedMinutes) / 60)}時間`;
    });
  }

  function getProjectTasks(projectId) {
    return state.tasks.filter((task) => normalizeProjectId(task.projectId) === projectId);
  }

  function getProjectTasksForDate(projectId, dateKey) {
    return state.tasks.filter((task) => (
      normalizeProjectId(task.projectId) === projectId &&
      task.date === dateKey
    ));
  }

  function getProjectAllocationTotal(projectId) {
    return state.tasks.reduce((total, task) => {
      if (task.completed || normalizeProjectId(task.projectId) !== projectId || !task.date) return total;
      if (task.date < toDateKey(SCHEDULE_START) || task.date > toDateKey(SCHEDULE_END)) return total;
      return total + normalizePlannedMinutes(task.plannedMinutes) / 60;
    }, 0);
  }

  function getProjectConsumedTotal(projectId) {
    return state.tasks.reduce((total, task) => {
      if (!task.completed || normalizeProjectId(task.projectId) !== projectId) return total;
      return total + normalizePlannedMinutes(task.plannedMinutes) / 60;
    }, 0);
  }

  function formatProjectDeadline(value) {
    const dateKey = typeof value === "string" ? value : "";
    if (!dateKey) return "未設定";
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
    return match ? `${Number(match[1])}/${Number(match[2])}/${Number(match[3])}` : dateKey;
  }

  function getTaskAllocationTotal(taskId) {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task || task.completed || !task.date) return 0;
    return normalizePlannedMinutes(task.plannedMinutes) / 60;
  }

  function normalizeProjectId(value) {
    return typeof value === "string" ? value : "";
  }

  function getProjectById(projectId) {
    return state.projects.find((project) => project.id === normalizeProjectId(projectId)) || null;
  }

  function renderProjectOptions() {
    const selects = [els.taskProject, els.editTaskProject].filter(Boolean);
    const projects = [...state.projects].sort((a, b) => a.title.localeCompare(b.title, "ja"));
    selects.forEach((select) => {
      const current = select.value;
      select.innerHTML = `<option value="">未設定</option>${projects.map((project) => `<option value="${project.id}">${escapeHtml(project.title)}</option>`).join("")}`;
      select.value = projects.some((project) => project.id === current) ? current : "";
    });
  }

  function renderProjectTaskSection() {
    if (!els.projectTaskList || !els.projectTaskCount) return;
    const projects = [...state.projects].sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
    els.projectTaskCount.textContent = `${projects.length}件`;
    els.projectTaskList.innerHTML = projects.map((project) => {
      const allocation = getProjectAllocationTotal(project.id);
      const consumed = getProjectConsumedTotal(project.id);
      const linkedCount = getProjectTasks(project.id).length;
      return `
        <article class="project-task-item">
          <button class="project-task-main" type="button" data-project-edit="${project.id}">
            <strong>${escapeHtml(project.title)}</strong>
            <span>締切 ${escapeHtml(formatProjectDeadline(project.deadline))}</span>
            <span>全体 ${formatHours(normalizeTotalPlannedMinutes(project.totalPlannedMinutes) / 60)}時間 / 配分 ${formatHours(allocation)}時間 / 消化時間 ${formatHours(consumed)}時間 / ${linkedCount}タスク</span>
          </button>
          <button class="mini-btn" type="button" data-project-delete="${project.id}">削除</button>
        </article>
      `;
    }).join("");

    els.projectTaskList.querySelectorAll("[data-project-edit]").forEach((button) => {
      button.addEventListener("click", () => editProjectTask(button.dataset.projectEdit));
    });
    els.projectTaskList.querySelectorAll("[data-project-delete]").forEach((button) => {
      button.addEventListener("click", () => deleteProjectTask(button.dataset.projectDelete));
    });
  }

  function editProjectTask(projectId) {
    const project = getProjectById(projectId);
    if (!project || !els.projectEditModal) return;

    editingProjectId = project.id;
    els.editProjectTitle.value = project.title || "";
    els.editProjectDeadline.value = project.deadline || "";
    els.editProjectTotalHours.value = formatHours(normalizeTotalPlannedMinutes(project.totalPlannedMinutes) / 60);
    if (els.editProjectSummary) {
      els.editProjectSummary.innerHTML = `
        <span>紐づきタスク <strong>${getProjectTasks(project.id).length}件</strong></span>
        <span>配分合計 <strong>${formatHours(getProjectAllocationTotal(project.id))}時間</strong></span>
        <span>消化時間 <strong>${formatHours(getProjectConsumedTotal(project.id))}時間</strong></span>
      `;
    }

    els.projectEditModal.classList.add("is-open");
    els.projectEditModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");

    requestAnimationFrame(() => {
      els.editProjectTitle.focus();
      els.editProjectTitle.select();
    });
  }

  function closeProjectEdit() {
    if (!els.projectEditModal) return;
    els.projectEditModal.classList.remove("is-open");
    els.projectEditModal.setAttribute("aria-hidden", "true");
    editingProjectId = null;
    els.projectEditForm?.reset();

    const taskEditOpen = els.taskEditModal?.classList.contains("is-open");
    const wishlistEditOpen = els.wishlistEditModal?.classList.contains("is-open");
    const detailOpen = els.taskDetailModal?.classList.contains("is-open");
    if (!taskEditOpen && !wishlistEditOpen && !detailOpen) document.body.classList.remove("is-modal-open");
  }

  function deleteProjectTask(projectId) {
    const project = getProjectById(projectId);
    if (!project) return;
    const linkedCount = getProjectTasks(projectId).length;
    const message = linkedCount
      ? `「${project.title}」を削除しますか？\n紐づいている${linkedCount}件のタスクは未設定に戻ります。`
      : `「${project.title}」を削除しますか？`;
    if (!confirm(message)) return;
    state.projects = state.projects.filter((item) => item.id !== projectId);
    state.tasks.forEach((task) => {
      if (normalizeProjectId(task.projectId) === projectId) task.projectId = "";
    });
    saveAndRender("企画タスクを削除しました");
  }

  function normalizeTotalPlannedMinutes(value) {
    const number = Number.parseFloat(value);
    if (!Number.isFinite(number) || number <= 0) return 0;
    return Math.round(number / 30) * 30;
  }

  function normalizePlannedMinutes(value) {
    const number = Number.parseFloat(value);
    if (!Number.isFinite(number) || number <= 0) return 0;
    return Math.min(1440, Math.round(number / 30) * 30);
  }

  function populateDurationSelect(select) {
    if (!select) return;
    const options = ['<option value="0">未設定</option>'];
    for (let minutes = 30; minutes <= 1440; minutes += 30) {
      options.push(`<option value="${minutes}">${formatDuration(minutes)}</option>`);
    }
    select.innerHTML = options.join("");
    select.value = "0";
  }

  function formatDuration(minutes) {
    const total = normalizePlannedMinutes(minutes);
    if (!total) return "未設定";
    const hours = Math.floor(total / 60);
    const mins = total % 60;
    if (!hours) return `${mins}分`;
    if (!mins) return `${hours}時間`;
    return `${hours}時間${mins}分`;
  }

  function normalizeHours(value) {
    const number = Number.parseFloat(value);
    if (!Number.isFinite(number) || number <= 0) return 0;
    return Math.min(24, Math.round(number * 2) / 2);
  }

  function formatHours(value) {
    const number = Number(value) || 0;
    return Number.isInteger(number) ? String(number) : number.toFixed(1).replace(/\.0$/, "");
  }

  function removeTaskFromSchedule(taskId) {
    Object.keys(state.timeAllocations || {}).forEach((dateKey) => {
      const allocations = state.timeAllocations[dateKey];
      if (!allocations || typeof allocations !== "object") return;
      delete allocations[taskId];
      if (!Object.keys(allocations).length) delete state.timeAllocations[dateKey];
    });
  }

  function cssEscape(value) {
    if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
      return CSS.escape(String(value));
    }
    return String(value).replace(/(["\\])/g, "\\$1");
  }

  function toggleTaskCompletion(taskId) {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task) return;
    task.completed = !task.completed;
    saveAndRender(task.completed ? "タスクを完了にしました" : "タスクを未完了に戻しました");
  }

  function updatePriorityFilterButtons() {
    document.querySelectorAll("[data-priority-filter]").forEach((button) => {
      const isActive = button.dataset.priorityFilter === priorityFilter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    els.priorityFilterClear.hidden = priorityFilter === "all";
  }

  function renderBacklog(visibleTasks) {
    const backlogTasks = sortTasks(visibleTasks.filter((task) => !task.date));
    els.backlogList.innerHTML = backlogTasks.map(createTaskCard).join("");
    const allBacklogCount = state.tasks.filter((task) => !task.date).length;
    els.backlogCount.textContent = `${allBacklogCount}件`;
  }

  function renderCalendar(visibleTasks) {
    const year = state.currentYear;
    const month = state.currentMonth;
    els.currentMonth.textContent = `${year}年 ${month + 1}月`;

    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);

    // JavaScriptのgetDay()は日曜=0のため、月曜=0〜日曜=6へ変換する。
    const firstWeekdayIndex = (firstDate.getDay() + 6) % 7;
    const lastWeekdayIndex = (lastDate.getDay() + 6) % 7;

    // 表示範囲を「月曜日から日曜日」の週単位に揃える。
    const start = new Date(year, month, 1 - firstWeekdayIndex);
    const end = new Date(year, month + 1, 6 - lastWeekdayIndex);

    const days = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      days.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    els.calendarGrid.innerHTML = days.map((date) => {
      const dateKey = toDateKey(date);
      const dayTasks = sortTasks(visibleTasks.filter((task) => task.date === dateKey));
      const isOtherMonth = date.getMonth() !== month;
      const isToday = dateKey === toDateKey(today);
      const isPast = dateKey < toDateKey(today);
      const dayOfWeek = date.getDay();
      const week = weekdays[dayOfWeek];
      const weekendClass = dayOfWeek === 0 ? "sun" : dayOfWeek === 6 ? "sat" : "";
      const holiday = state.holidays.find((item) => item.date === dateKey);
      const holidayClass = holiday ? "holiday" : "";
      const holidayLabel = "";
      const deadlineProjects = state.projects
        .filter((project) => project.deadline === dateKey)
        .sort((a, b) => a.title.localeCompare(b.title, "ja"));

      return `
        <article class="calendar-day drop-target ${isOtherMonth ? "other-month" : ""} ${isToday ? "today" : ""} ${isPast ? "is-past" : ""} ${weekendClass} ${holidayClass}" data-date="${dateKey}" aria-label="${dateKey} ${week}曜日">
          <div class="day-head">
            <div class="date-wrap"><span class="date-num">${date.getDate()}</span>${holidayLabel}</div>
            <span class="day-count">${dayTasks.length ? `${dayTasks.length}件` : ""}</span>
          </div>
          ${deadlineProjects.length ? `
            <div class="project-deadline-list" aria-label="企画タスクの締切">
              ${deadlineProjects.map((project) => `
                <button class="project-deadline-card" type="button" data-calendar-project-edit="${project.id}" aria-label="${escapeHtml(project.title)}の企画タスクを編集">
                  <span class="project-deadline-label">締切</span>
                  <span class="project-deadline-title">${escapeHtml(project.title)}</span>
                </button>
              `).join("")}
            </div>
          ` : ""}
          <div class="event-list drop-zone" data-date="${dateKey}">
            ${dayTasks.map(createTaskCard).join("")}
          </div>
        </article>
      `;
    }).join("");
  }

  function renderHolidayList() {
    const holidays = [...state.holidays].sort((a, b) => a.date.localeCompare(b.date));

    if (!holidays.length) {
      els.holidayList.innerHTML = '<p class="holiday-empty">登録済みの休日はありません</p>';
      return;
    }

    els.holidayList.innerHTML = holidays.map((holiday) => `
      <div class="holiday-item">
        <button class="holiday-jump" type="button" data-holiday-jump="${holiday.id}">
          <span class="holiday-item-date">${formatDate(holiday.date)}</span>
        </button>
        <button class="holiday-delete" type="button" data-holiday-delete="${holiday.id}" aria-label="${formatDate(holiday.date)}の休日を削除">×</button>
      </div>
    `).join("");

    document.querySelectorAll("[data-holiday-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        const holiday = state.holidays.find((item) => item.id === button.dataset.holidayJump);
        if (!holiday) return;
        state.currentYear = Number(holiday.date.slice(0, 4));
        state.currentMonth = Number(holiday.date.slice(5, 7)) - 1;
        saveAndRender();
      });
    });

    document.querySelectorAll("[data-holiday-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        const holiday = state.holidays.find((item) => item.id === button.dataset.holidayDelete);
        if (!holiday) return;
        if (!confirm(`${formatDate(holiday.date)}の休日設定を削除しますか？`)) return;
        state.holidays = state.holidays.filter((item) => item.id !== holiday.id);
        saveAndRender("休日を削除しました");
      });
    });
  }

  function createTaskCard(task) {
    const project = getProjectById(task.projectId);
    return `
      <article class="task-card ${task.priority} ${project ? "has-project" : ""} ${task.completed ? "is-completed" : ""}" draggable="true" data-id="${task.id}" tabindex="0" role="button" aria-label="${escapeHtml(task.title)}を編集">
        <div class="task-top">
          <div class="task-title">${escapeHtml(task.title)}</div>
          <div class="drag-handle" title="ドラッグで移動">⋮⋮</div>
        </div>
        <div class="task-card-meta">
          ${project ? `<span class="task-project-badge">${escapeHtml(project.title)}</span>` : ""}
          <span class="task-duration-badge">${escapeHtml(formatDuration(task.plannedMinutes))}</span>
        </div>
        <div class="task-actions">
          <button class="task-complete-toggle ${task.completed ? "is-on" : ""}" type="button" data-task-complete="${task.id}" aria-pressed="${task.completed ? "true" : "false"}" aria-label="${task.completed ? "未完了に戻す" : "完了にする"}">
            <span aria-hidden="true">${task.completed ? "✓" : ""}</span>
          </button>
          <button class="mini-btn" type="button" data-action="delete" data-id="${task.id}">削除</button>
        </div>
      </article>
    `;
  }


  function setupTodayMemo() {
    if (!els.todayMemoToggle || !els.todayMemoPanel) return;

    els.todayMemoToggle.addEventListener("click", () => {
      const willOpen = !els.todayMemoPanel.classList.contains("is-open");
      setTodayMemoOpen(willOpen);
    });

    els.todayMemoClose?.addEventListener("click", () => setTodayMemoOpen(false));

    els.todayMemoForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = els.todayMemoInput?.value.trim() || "";
      if (!title) {
        els.todayMemoInput?.focus();
        return;
      }
      addTodayMemoItem({ title });
      els.todayMemoForm.reset();
      els.todayMemoInput?.focus();
    });

    els.todayMemoDropzone?.addEventListener("dragover", (event) => {
      const hasWishlist = Boolean(
        draggingWishlistId
        || event.dataTransfer?.types?.includes?.("application/x-wishlist-id")
        || String(event.dataTransfer?.getData?.("text/plain") || "").startsWith("wishlist:")
      );
      if (!hasWishlist) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
      els.todayMemoDropzone.classList.add("is-dragover");
    });

    els.todayMemoDropzone?.addEventListener("dragleave", (event) => {
      if (!els.todayMemoDropzone.contains(event.relatedTarget)) {
        els.todayMemoDropzone.classList.remove("is-dragover");
      }
    });

    els.todayMemoDropzone?.addEventListener("drop", (event) => {
      event.preventDefault();
      els.todayMemoDropzone.classList.remove("is-dragover");
      const plain = String(event.dataTransfer?.getData("text/plain") || "");
      const wishlistId = draggingWishlistId
        || event.dataTransfer?.getData("application/x-wishlist-id")
        || plain.replace(/^wishlist:/, "");
      if (!wishlistId) return;
      addWishlistToTodayMemo(wishlistId);
    });

    renderTodayMemo();
  }

  function setTodayMemoOpen(open) {
    if (!els.todayMemoPanel || !els.todayMemoToggle) return;
    els.todayMemoPanel.classList.toggle("is-open", open);
    els.todayMemoPanel.setAttribute("aria-hidden", String(!open));
    els.todayMemoToggle.classList.toggle("is-active", open);
    els.todayMemoToggle.setAttribute("aria-expanded", String(open));
    if (open) {
      renderTodayMemo();
      window.setTimeout(() => els.todayMemoInput?.focus(), 60);
    }
  }

  function getTodayMemoItems() {
    const dateKey = toDateKey(today);
    state.dailyMemos = state.dailyMemos && typeof state.dailyMemos === "object" ? state.dailyMemos : {};
    if (!Array.isArray(state.dailyMemos[dateKey])) state.dailyMemos[dateKey] = [];
    return state.dailyMemos[dateKey];
  }

  function addTodayMemoItem({ title, sourceWishlistId = "", sourceType = "task" }) {
    const text = String(title || "").trim();
    if (!text) return;
    const items = getTodayMemoItems();
    items.push({
      id: createId(),
      title: text,
      done: false,
      sourceWishlistId: sourceWishlistId ? String(sourceWishlistId) : "",
      sourceType: normalizeWishlistType(sourceType),
      createdAt: Date.now()
    });
    saveAndRender("今日やることメモに追加しました");
  }

  function addWishlistToTodayMemo(wishlistId) {
    const source = state.wishlist.find((item) => item.id === wishlistId && !item.done);
    if (!source) {
      showToast("未完了リストの項目が見つかりません");
      return;
    }
    const items = getTodayMemoItems();
    if (items.some((item) => item.sourceWishlistId === source.id)) {
      showToast("この項目は今日のメモに追加済みです");
      return;
    }
    addTodayMemoItem({
      title: source.title,
      sourceWishlistId: source.id,
      sourceType: source.type
    });
  }

  function renderTodayMemo() {
    if (!els.todayMemoList || !els.todayMemoSourceList) return;
    const items = getTodayMemoItems();
    const activeWishlist = [...state.wishlist]
      .filter((item) => !item.done)
      .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));

    if (els.todayMemoDate) {
      els.todayMemoDate.textContent = new Intl.DateTimeFormat("ja-JP", {
        month: "long",
        day: "numeric",
        weekday: "short"
      }).format(today);
    }
    if (els.todayMemoCount) els.todayMemoCount.textContent = `${items.length}件`;
    if (els.todayMemoDropHint) els.todayMemoDropHint.hidden = items.length > 0;

    els.todayMemoList.innerHTML = items.length ? items.map((item) => `
      <article class="today-memo-item ${item.done ? "is-done" : ""}" data-today-memo-id="${escapeHtml(item.id)}">
        <button class="today-memo-check" type="button" data-today-memo-toggle="${escapeHtml(item.id)}" aria-label="${item.done ? "未完了に戻す" : "完了にする"}">${item.done ? "✓" : ""}</button>
        <div class="today-memo-item-main">
          ${item.sourceWishlistId ? `<span class="wishlist-type-badge ${normalizeWishlistType(item.sourceType)}">${wishlistTypeLabel(item.sourceType)}</span>` : `<span class="today-memo-direct-badge">MEMO</span>`}
          <strong>${escapeHtml(item.title)}</strong>
        </div>
        <button class="today-memo-delete" type="button" data-today-memo-delete="${escapeHtml(item.id)}" aria-label="削除">×</button>
      </article>
    `).join("") : '<p class="today-memo-empty">今日やることはまだありません</p>';

    els.todayMemoList.querySelectorAll("[data-today-memo-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = items.find((entry) => entry.id === button.dataset.todayMemoToggle);
        if (!item) return;
        item.done = !item.done;
        saveAndRender(item.done ? "今日やることを完了にしました" : "未完了に戻しました");
      });
    });

    els.todayMemoList.querySelectorAll("[data-today-memo-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        const dateKey = toDateKey(today);
        state.dailyMemos[dateKey] = items.filter((entry) => entry.id !== button.dataset.todayMemoDelete);
        saveAndRender("今日やることメモから削除しました");
      });
    });

    els.todayMemoSourceList.innerHTML = activeWishlist.length ? activeWishlist.map((item) => `
      <article class="today-memo-source-item" draggable="true" data-memo-source-wishlist="${escapeHtml(item.id)}">
        <span class="wishlist-type-badge ${normalizeWishlistType(item.type)}">${wishlistTypeLabel(item.type)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <span aria-hidden="true" class="today-memo-drag-mark">⋮⋮</span>
      </article>
    `).join("") : '<p class="today-memo-empty">未完了のやりたいことはありません</p>';

    els.todayMemoSourceList.querySelectorAll("[data-memo-source-wishlist]").forEach((element) => {
      element.addEventListener("dragstart", (event) => {
        draggingWishlistId = element.dataset.memoSourceWishlist;
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData("application/x-wishlist-id", draggingWishlistId);
        event.dataTransfer.setData("text/plain", `wishlist:${draggingWishlistId}`);
        element.classList.add("dragging");
      });
      element.addEventListener("dragend", () => {
        element.classList.remove("dragging");
        draggingWishlistId = null;
        els.todayMemoDropzone?.classList.remove("is-dragover");
      });
      element.addEventListener("dblclick", () => addWishlistToTodayMemo(element.dataset.memoSourceWishlist));
    });
  }

  function renderWishlist() {
    const activeItems = [...state.wishlist]
      .filter((item) => !item.done)
      .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
    const itemItems = activeItems.filter((item) => normalizeWishlistType(item.type) === "item");
    const taskItems = activeItems.filter((item) => normalizeWishlistType(item.type) === "task");
    const travelItems = activeItems.filter((item) => normalizeWishlistType(item.type) === "travel");
    const completedItems = [...state.wishlist]
      .filter((item) => item.done)
      .sort((a, b) => Number(b.completedAt || b.createdAt || 0) - Number(a.completedAt || a.createdAt || 0));
    const completedItemItems = completedItems.filter((item) => normalizeWishlistType(item.type) === "item");
    const completedTaskItems = completedItems.filter((item) => normalizeWishlistType(item.type) === "task");
    const completedTravelItems = completedItems.filter((item) => normalizeWishlistType(item.type) === "travel");
    const allItems = [...activeItems, ...completedItems];

    els.wishlistCount.textContent = `${allItems.length}件`;
    if (els.wishlistActiveCount) els.wishlistActiveCount.textContent = `${activeItems.length}件`;
    if (els.wishlistCompletedCount) els.wishlistCompletedCount.textContent = `${completedItems.length}件`;
    if (els.wishlistItemCount) els.wishlistItemCount.textContent = `${itemItems.length}件`;
    if (els.wishlistTaskCount) els.wishlistTaskCount.textContent = `${taskItems.length}件`;
    if (els.wishlistTravelCount) els.wishlistTravelCount.textContent = `${travelItems.length}件`;
    if (els.wishlistCompletedItemCount) els.wishlistCompletedItemCount.textContent = `${completedItemItems.length}件`;
    if (els.wishlistCompletedTaskCount) els.wishlistCompletedTaskCount.textContent = `${completedTaskItems.length}件`;
    if (els.wishlistCompletedTravelCount) els.wishlistCompletedTravelCount.textContent = `${completedTravelItems.length}件`;

    [...selectedWishlistIds].forEach((id) => {
      if (!state.wishlist.some((item) => item.id === id)) selectedWishlistIds.delete(id);
    });

    const selectedCount = selectedWishlistIds.size;
    const allSelected = allItems.length > 0 && selectedCount === allItems.length;
    els.wishlistSelectAll.checked = allSelected;
    els.wishlistSelectAll.indeterminate = selectedCount > 0 && !allSelected;
    els.wishlistSelectAll.disabled = allItems.length === 0;
    els.wishlistBulkDelete.disabled = selectedCount === 0;
    els.wishlistBulkDelete.textContent = selectedCount ? `選択した${selectedCount}件を削除` : "選択項目を削除";

    const makeItemHtml = (item, isCompleted = false) => `
      <article class="wishlist-item ${item.done ? "is-done" : ""} ${selectedWishlistIds.has(item.id) ? "is-selected" : ""}" ${isCompleted ? "" : 'draggable="true"'} data-wishlist-id="${item.id}">
        <label class="wishlist-select" aria-label="${escapeHtml(item.title)}を選択">
          <input type="checkbox" data-wishlist-select="${item.id}" ${selectedWishlistIds.has(item.id) ? "checked" : ""}>
        </label>
        <button class="wishlist-check" type="button" data-wishlist-action="toggle" data-id="${item.id}" aria-label="${item.done ? "未完了に戻す" : "完了にする"}">
          ${item.done ? "✓" : ""}
        </button>
        <button class="wishlist-content" type="button" data-wishlist-action="edit" data-id="${item.id}">
          <span class="wishlist-type-badge ${normalizeWishlistType(item.type)}">${wishlistTypeLabel(item.type)}</span>
          <strong class="wishlist-title">${escapeHtml(item.title)}</strong>
          <span class="wishlist-item-meta">
            ${normalizeMoney(item.budget) > 0 ? `<span class="wishlist-budget">予算 ${formatCurrency(item.budget)}</span>` : ""}
          </span>
          ${item.memo ? `<span class="wishlist-memo">${escapeHtml(item.memo)}</span>` : ""}
        </button>
        <button class="wishlist-delete" type="button" data-wishlist-action="delete" data-id="${item.id}" aria-label="${escapeHtml(item.title)}を削除">×</button>
      </article>
    `;

    if (els.wishlistItemList) {
      els.wishlistItemList.innerHTML = itemItems.length
        ? itemItems.map((item) => makeItemHtml(item, false)).join("")
        : '<p class="wishlist-empty">未完了のItemはありません</p>';
    }
    if (els.wishlistTaskList) {
      els.wishlistTaskList.innerHTML = taskItems.length
        ? taskItems.map((item) => makeItemHtml(item, false)).join("")
        : '<p class="wishlist-empty">未完了のTaskはありません</p>';
    }
    if (els.wishlistTravelList) {
      els.wishlistTravelList.innerHTML = travelItems.length
        ? travelItems.map((item) => makeItemHtml(item, false)).join("")
        : '<p class="wishlist-empty">未完了のTravelはありません</p>';
    }
    if (els.wishlistCompletedItemList) {
      els.wishlistCompletedItemList.innerHTML = completedItemItems.length
        ? completedItemItems.map((item) => makeItemHtml(item, true)).join("")
        : '<p class="wishlist-empty">完了したItemはありません</p>';
    }
    if (els.wishlistCompletedTaskList) {
      els.wishlistCompletedTaskList.innerHTML = completedTaskItems.length
        ? completedTaskItems.map((item) => makeItemHtml(item, true)).join("")
        : '<p class="wishlist-empty">完了したTaskはありません</p>';
    }
    if (els.wishlistCompletedTravelList) {
      els.wishlistCompletedTravelList.innerHTML = completedTravelItems.length
        ? completedTravelItems.map((item) => makeItemHtml(item, true)).join("")
        : '<p class="wishlist-empty">完了したTravelはありません</p>';
    }

    const lists = [
      els.wishlistItemList,
      els.wishlistTaskList,
      els.wishlistTravelList,
      els.wishlistCompletedItemList,
      els.wishlistCompletedTaskList,
      els.wishlistCompletedTravelList,
    ].filter(Boolean);
    lists.forEach((list) => {
      list.querySelectorAll("[data-wishlist-select]").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const id = checkbox.dataset.wishlistSelect;
          if (checkbox.checked) selectedWishlistIds.add(id);
          else selectedWishlistIds.delete(id);
          renderWishlist();
        });
      });

      list.querySelectorAll("[data-wishlist-action]").forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.dataset.id;
          const action = button.dataset.wishlistAction;
          const item = state.wishlist.find((entry) => entry.id === id);
          if (!item) return;

          if (action === "toggle") {
            item.done = !item.done;
            item.completedAt = item.done ? Date.now() : null;
            saveAndRender(item.done ? "完了リストへ移動しました" : "未完了リストへ戻しました");
            return;
          }
          if (action === "edit") {
            editWishlistItem(item);
            return;
          }
          if (action === "delete") {
            if (!confirm(`「${item.title}」を削除しますか？`)) return;
            state.wishlist = state.wishlist.filter((entry) => entry.id !== id);
            selectedWishlistIds.delete(id);
            saveAndRender("やりたいことを削除しました");
          }
        });
      });

      list.querySelectorAll(".wishlist-item[data-wishlist-id]").forEach((itemElement) => {
        itemElement.addEventListener("click", (event) => {
          if (event.target.closest("button, input, label, a, select, textarea")) return;
          editWishlistItem(itemElement.dataset.wishlistId);
        });
      });
    });

    [els.wishlistItemList, els.wishlistTaskList].filter(Boolean).forEach((list) => {
      list.querySelectorAll(".wishlist-item[draggable='true']").forEach((itemElement) => {
        itemElement.addEventListener("dragstart", handleWishlistDragStart);
        itemElement.addEventListener("dragend", handleWishlistDragEnd);
      });
    });
  }

  function editWishlistItem(itemOrId) {
    const item = typeof itemOrId === "string"
      ? state.wishlist.find((entry) => entry.id === itemOrId)
      : itemOrId;
    if (!item || !els.wishlistEditModal) return;

    editingWishlistId = item.id;
    els.editWishlistTitle.value = item.title || "";
    if (els.editWishlistType) els.editWishlistType.value = normalizeWishlistType(item.type);
    els.editWishlistBudget.value = normalizeMoney(item.budget) || "";
    els.editWishlistStatus.value = item.done ? "done" : "active";
    els.editWishlistMemo.value = item.memo || "";

    els.wishlistEditModal.classList.add("is-open");
    els.wishlistEditModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");

    requestAnimationFrame(() => {
      els.editWishlistTitle.focus();
      els.editWishlistTitle.select();
    });
  }

  function closeWishlistEdit() {
    if (!els.wishlistEditModal) return;
    els.wishlistEditModal.classList.remove("is-open");
    els.wishlistEditModal.setAttribute("aria-hidden", "true");
    editingWishlistId = null;
    els.wishlistEditForm?.reset();

    const taskEditOpen = els.taskEditModal?.classList.contains("is-open");
    const projectEditOpen = els.projectEditModal?.classList.contains("is-open");
    const detailOpen = els.taskDetailModal?.classList.contains("is-open");
    if (!taskEditOpen && !projectEditOpen && !detailOpen) document.body.classList.remove("is-modal-open");
  }

  function renderTaskListSide() {
    const sortedTasks = [...state.tasks].sort((a, b) => {
      const ad = a.date || "9999-99-99";
      const bd = b.date || "9999-99-99";
      if (ad !== bd) return ad.localeCompare(bd);
      return a.title.localeCompare(b.title, "ja");
    });

    if (els.calendarTaskListSide && els.calendarTaskListCount) {
      els.calendarTaskListCount.textContent = `${sortedTasks.length}件`;
      els.calendarTaskListSide.innerHTML = sortedTasks.map((task) => {
        const project = getProjectById(task.projectId);
        return `
          <article class="task-list-side-item ${escapeHtml(task.priority || "middle")} ${task.completed ? "is-completed" : ""}">
            <button class="task-list-side-main" type="button" data-task-list-edit="${task.id}">
              <span class="task-list-side-title-row">
                ${project ? `<span class="task-project-badge">${escapeHtml(project.title)}</span>` : ""}
                <strong>${escapeHtml(task.title)}</strong>
              </span>
              <span class="task-list-side-date">${task.date ? escapeHtml(formatDate(task.date)) : "未配置"}</span>
              <span class="task-list-side-duration">予定 ${escapeHtml(formatDuration(task.plannedMinutes))}</span>
            </button>
            <button class="task-complete-toggle ${task.completed ? "is-on" : ""}" type="button" data-task-complete="${task.id}" aria-pressed="${task.completed ? "true" : "false"}" aria-label="${task.completed ? "未完了に戻す" : "完了にする"}">
              <span aria-hidden="true">${task.completed ? "✓" : ""}</span>
            </button>
          </article>
        `;
      }).join("");
      els.calendarTaskListSide.querySelectorAll("[data-task-list-edit]").forEach((button) => {
        button.addEventListener("click", () => editTask(button.dataset.taskListEdit));
      });
    }

    if (els.scheduleTaskListSide && els.scheduleTaskListCount) {
      const projects = [...state.projects].sort((a, b) => a.title.localeCompare(b.title, "ja"));
      els.scheduleTaskListCount.textContent = `${projects.length}件`;
      els.scheduleTaskListSide.innerHTML = projects.map((project) => `
        <article class="task-list-side-item project-list-side-item">
          <button class="task-list-side-main" type="button" data-project-edit="${project.id}">
            <span class="task-list-side-title-row"><strong>${escapeHtml(project.title)}</strong></span>
            <span class="task-list-side-duration">締切 ${escapeHtml(formatProjectDeadline(project.deadline))}</span>
            <span class="task-list-side-duration">配分合計 ${formatHours(getProjectAllocationTotal(project.id))}時間 / 消化時間 ${formatHours(getProjectConsumedTotal(project.id))}時間 / 全体 ${formatHours(normalizeTotalPlannedMinutes(project.totalPlannedMinutes) / 60)}時間</span>
          </button>
        </article>
      `).join("");
      els.scheduleTaskListSide.querySelectorAll("[data-project-edit]").forEach((button) => {
        button.addEventListener("click", () => editProjectTask(button.dataset.projectEdit));
      });
    }
  }

  function highlightScheduleTask(taskId) {
    const heading = els.scheduleTableHead.querySelector(`[data-schedule-task-column="${cssEscape(taskId)}"]`);
    if (!heading) return;

    document.querySelectorAll(".schedule-task-heading.is-highlighted, .schedule-cell.is-highlighted").forEach((element) => {
      element.classList.remove("is-highlighted");
    });

    heading.classList.add("is-highlighted");
    els.scheduleTableBody.querySelectorAll(`[data-task-id="${cssEscape(taskId)}"]`).forEach((cell) => {
      cell.classList.add("is-highlighted");
    });
    heading.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

    window.setTimeout(() => {
      heading.classList.remove("is-highlighted");
      els.scheduleTableBody.querySelectorAll(`[data-task-id="${cssEscape(taskId)}"]`).forEach((cell) => {
        cell.classList.remove("is-highlighted");
      });
    }, 1400);
  }

  function handleWishlistDragStart(event) {
    const itemElement = event.currentTarget;
    draggingWishlistId = itemElement.dataset.wishlistId;
    draggingId = null;
    itemElement.classList.add("dragging");
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("application/x-wishlist-id", draggingWishlistId);
    event.dataTransfer.setData("text/plain", `wishlist:${draggingWishlistId}`);
  }

  function handleWishlistDragEnd(event) {
    event.currentTarget.classList.remove("dragging");
    draggingWishlistId = null;
    document.querySelectorAll(".is-hover").forEach((el) => el.classList.remove("is-hover"));
  }

  function bindDragEvents() {
    document.querySelectorAll(".calendar-day").forEach((day) => {
      day.addEventListener("dblclick", (event) => {
        // タスクカードや締切ボタンなど既存の操作対象をダブルクリックした場合は追加フォームを開かない。
        if (event.target.closest(".task-card, .project-deadline-card, button, input, select, textarea, a")) return;

        const dateKey = day.dataset.date;
        if (!dateKey) return;

        event.preventDefault();
        openTaskAddForDate(dateKey);
      });
    });

    document.querySelectorAll("[data-calendar-project-edit]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        editProjectTask(button.dataset.calendarProjectEdit);
      });
    });

    document.querySelectorAll(".task-card").forEach((card) => {
      card.addEventListener("dragstart", handleDragStart);
      card.addEventListener("dragend", handleDragEnd);
      card.addEventListener("click", (event) => {
        if (event.target.closest(".task-actions") || event.target.closest(".drag-handle")) return;
        editTask(card.dataset.id);
      });
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (event.target.closest(".mini-btn")) return;
        event.preventDefault();
        editTask(card.dataset.id);
      });
    });

    document.querySelectorAll(".drop-zone").forEach((zone) => {
      zone.addEventListener("dragover", handleDragOver);
      zone.addEventListener("drop", handleDrop);
      zone.addEventListener("dragenter", handleDragEnter);
      zone.addEventListener("dragleave", handleDragLeave);
    });

    document.querySelectorAll(".mini-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        if (action === "edit") editTask(id);
        if (action === "delete") deleteTask(id);
      });
    });
  }

  function openTaskAddForDate(dateKey) {
    if (!dateKey || !els.taskForm || !els.taskDate || !els.taskTitle) return;

    // ダブルクリックしたカレンダー日付を新規タスクの日付へ反映する。
    els.taskDate.value = dateKey;

    // 入力フォームが画面外にある場合でも、すぐ入力を始められる位置まで移動する。
    els.taskForm.scrollIntoView({ behavior: "smooth", block: "nearest" });

    window.setTimeout(() => {
      els.taskTitle.focus({ preventScroll: true });
      els.taskTitle.select();
    }, 180);

    showToast(`${formatDate(dateKey)} のタスクを追加`);
  }

  function handleDragStart(event) {
    const card = event.currentTarget;
    draggingId = card.dataset.id;
    draggingCopyMode = Boolean(event.altKey);
    card.classList.add("dragging");
    card.classList.toggle("is-copy-drag", draggingCopyMode);
    event.dataTransfer.effectAllowed = "copyMove";
    event.dataTransfer.setData("text/plain", draggingId);
    event.dataTransfer.setData("application/x-task-drag-mode", draggingCopyMode ? "copy" : "move");
  }

  function handleDragEnd(event) {
    event.currentTarget.classList.remove("dragging", "is-copy-drag");
    draggingId = null;
    draggingCopyMode = false;
    document.querySelectorAll(".is-hover").forEach((el) => el.classList.remove("is-hover"));
  }

  function handleDragEnter(event) {
    event.preventDefault();
    const target = event.currentTarget.closest(".calendar-day") || event.currentTarget;
    target.classList.add("is-hover");
  }

  function handleDragLeave(event) {
    const zone = event.currentTarget;
    const target = zone.closest(".calendar-day") || zone;
    if (!zone.contains(event.relatedTarget)) {
      target.classList.remove("is-hover");
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    const zone = event.currentTarget;
    const draggingCard = document.querySelector(".task-card.dragging");
    if (!draggingCard) return;

    const copyMode = draggingCopyMode || event.altKey;
    if (event.dataTransfer) event.dataTransfer.dropEffect = copyMode ? "copy" : "move";

    // Alt（Option）+ドラッグ中は元カードを動かさず、ドロップ時に複製する。
    if (copyMode) return;

    const afterElement = getDragAfterElement(zone, event.clientY);
    if (afterElement == null) {
      zone.appendChild(draggingCard);
    } else {
      zone.insertBefore(draggingCard, afterElement);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    const zone = event.currentTarget;
    const targetDate = zone.dataset.date || null;
    const wishlistId = draggingWishlistId
      || event.dataTransfer.getData("application/x-wishlist-id")
      || event.dataTransfer.getData("text/plain").replace(/^wishlist:/, "");

    if (wishlistId && (draggingWishlistId || event.dataTransfer.getData("text/plain").startsWith("wishlist:"))) {
      const wishlistItem = state.wishlist.find((item) => item.id === wishlistId);
      if (!wishlistItem) return;

      state.tasks.push({
        id: createId(),
        title: wishlistItem.title,
        date: targetDate,
        priority: "low",
        plannedMinutes: 0,
        projectId: "",
        completed: false,
        memo: "",
        order: getNextOrder(targetDate)
      });

      draggingWishlistId = null;
      saveAndRender(targetDate ? "タスクを追加しました" : "未配置タスクへ追加しました");
      return;
    }

    const id = draggingId || event.dataTransfer.getData("text/plain");
    const task = state.tasks.find((item) => item.id === id);
    if (!task) return;

    const dragMode = event.dataTransfer.getData("application/x-task-drag-mode");
    const copyMode = draggingCopyMode || event.altKey || dragMode === "copy";
    if (copyMode) {
      state.tasks.push({
        ...task,
        id: createId(),
        date: targetDate,
        completed: false,
        order: getNextOrder(targetDate)
      });
      normalizeAllOrders();
      saveAndRender(targetDate ? "タスクを別日に複製しました" : "タスクを未配置へ複製しました");
      return;
    }

    const previousDate = task.date || null;
    task.date = targetDate;

    const currentIds = Array.from(zone.querySelectorAll(".task-card"))
      .map((card) => card.dataset.id)
      .filter(Boolean);

    if (!currentIds.includes(id)) currentIds.push(id);

    currentIds.forEach((cardId, index) => {
      const targetTask = state.tasks.find((item) => item.id === cardId);
      if (targetTask) {
        targetTask.date = targetDate;
        targetTask.order = index;
      }
    });

    normalizeAllOrders();
    saveAndRender(targetDate ? "予定をカレンダーへ移動しました" : "予定を未配置へ戻しました");
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".task-card:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  function openTaskDetail(id) {
    const task = state.tasks.find((item) => item.id === id);
    if (!task) return;
    detailTaskId = id;
    els.taskDetailTitle.textContent = task.title;
    els.taskDetailDate.textContent = task.date ? formatDate(task.date) : "未配置";
    els.taskDetailPriority.textContent = getPriorityText(task.priority).replace("優先度：", "");
    els.taskDetailDuration.textContent = formatDuration(task.plannedMinutes);
    els.taskDetailMemo.textContent = task.memo || "メモはありません";
    els.taskDetailModal.classList.add("is-open");
    els.taskDetailModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");
    els.taskDetailModal.querySelector(".task-detail-close")?.focus();
  }

  function closeTaskDetail() {
    els.taskDetailModal.classList.remove("is-open");
    els.taskDetailModal.setAttribute("aria-hidden", "true");

    if (!els.taskEditModal.classList.contains("is-open") && !els.wishlistEditModal?.classList.contains("is-open") && !els.projectEditModal?.classList.contains("is-open")) {
      document.body.classList.remove("is-modal-open");
    }

    detailTaskId = null;
  }

  function editTask(id) {
    const task = state.tasks.find((item) => item.id === id);
    if (!task) return;

    taskEditMode = "edit";
    editingTaskId = id;
    if (els.taskEditHeading) els.taskEditHeading.textContent = "タスクを編集";
    if (els.taskEditSubmit) els.taskEditSubmit.textContent = "変更を保存";
    els.editTaskTitle.value = task.title || "";
    els.editTaskDate.value = task.date || "";
    els.editTaskPriority.value = task.priority || "middle";
    els.editTaskDuration.value = String(normalizePlannedMinutes(task.plannedMinutes));
    renderProjectOptions();
    els.editTaskProject.value = getProjectById(task.projectId) ? task.projectId : "";
    els.editTaskMemo.value = task.memo || "";
    if (els.editTaskStatus) els.editTaskStatus.value = task.completed ? "done" : "active";

    els.taskEditModal.classList.add("is-open");
    els.taskEditModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");

    requestAnimationFrame(() => {
      els.editTaskTitle.focus();
      els.editTaskTitle.select();
    });
  }

  function openTaskCreateModal(dateKey, projectId) {
    if (!isValidDateKey(dateKey)) return;

    taskEditMode = "create";
    editingTaskId = null;
    if (els.taskEditHeading) els.taskEditHeading.textContent = "タスクを追加";
    if (els.taskEditSubmit) els.taskEditSubmit.textContent = "タスクを追加";

    els.taskEditForm.reset();
    els.editTaskTitle.value = "";
    els.editTaskDate.value = dateKey;
    els.editTaskPriority.value = "middle";
    els.editTaskDuration.value = "0";
    renderProjectOptions();
    els.editTaskProject.value = getProjectById(projectId) ? projectId : "";
    els.editTaskMemo.value = "";
    if (els.editTaskStatus) els.editTaskStatus.value = "active";

    els.taskEditModal.classList.add("is-open");
    els.taskEditModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");

    requestAnimationFrame(() => els.editTaskTitle.focus());
  }

  function closeTaskEdit() {
    els.taskEditModal.classList.remove("is-open");
    els.taskEditModal.setAttribute("aria-hidden", "true");
    editingTaskId = null;
    taskEditMode = "edit";
    if (els.taskEditHeading) els.taskEditHeading.textContent = "タスクを編集";
    if (els.taskEditSubmit) els.taskEditSubmit.textContent = "変更を保存";

    if (!els.taskDetailModal.classList.contains("is-open") && !els.wishlistEditModal?.classList.contains("is-open") && !els.projectEditModal?.classList.contains("is-open")) {
      document.body.classList.remove("is-modal-open");
    }

    els.taskEditForm.reset();
  }

  function deleteTask(id) {
    const task = state.tasks.find((item) => item.id === id);
    if (!task) return;
    const ok = confirm(`「${task.title}」を削除しますか？`);
    if (!ok) return;
    state.tasks = state.tasks.filter((item) => item.id !== id);
    removeTaskFromSchedule(id);
    normalizeAllOrders();
    saveAndRender("予定を削除しました");
  }

  function exportIphoneCalendar() {
    const scheduledTasks = state.tasks.filter((task) => task.date && isValidDateKey(task.date));
    const holidays = state.holidays.filter((holiday) => holiday.date && isValidDateKey(holiday.date));

    if (!scheduledTasks.length && !holidays.length) {
      showToast("書き出せる予定がありません");
      return;
    }

    const timestamp = formatIcsTimestamp(new Date());
    const calendarLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Task Calendar UI//iPhone Calendar Export//JA",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:タスク管理カレンダー"
    ];

    scheduledTasks.forEach((task) => {
      const description = [
        getPriorityText(task.priority),
        task.memo ? `メモ：${task.memo}` : ""
      ].filter(Boolean).join("\n");

      calendarLines.push(
        "BEGIN:VEVENT",
        `UID:${escapeIcsText(task.id)}@task-calendar-ui`,
        `DTSTAMP:${timestamp}`,
        `DTSTART;VALUE=DATE:${formatIcsDate(task.date)}`,
        `DTEND;VALUE=DATE:${formatIcsDate(addDaysToDateKey(task.date, 1))}`,
        `SUMMARY:${escapeIcsText(task.title)}`,
        `DESCRIPTION:${escapeIcsText(description)}`,
        "TRANSP:TRANSPARENT",
        "END:VEVENT"
      );
    });

    holidays.forEach((holiday) => {
      calendarLines.push(
        "BEGIN:VEVENT",
        `UID:holiday-${escapeIcsText(holiday.id)}@task-calendar-ui`,
        `DTSTAMP:${timestamp}`,
        `DTSTART;VALUE=DATE:${formatIcsDate(holiday.date)}`,
        `DTEND;VALUE=DATE:${formatIcsDate(addDaysToDateKey(holiday.date, 1))}`,
        `SUMMARY:${escapeIcsText(holiday.name || "休日")}`,
        "TRANSP:TRANSPARENT",
        "END:VEVENT"
      );
    });

    calendarLines.push("END:VCALENDAR");

    const blob = new Blob([calendarLines.join("\r\n")], {
      type: "text/calendar;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `task-calendar-${toDateKey(today)}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

    showToast("iPhoneカレンダー用ファイルを書き出しました");
  }

  function formatIcsTimestamp(date) {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }

  function formatIcsDate(dateKey) {
    return String(dateKey).replace(/-/g, "");
  }

  function addDaysToDateKey(dateKey, days) {
    const [year, month, day] = dateKey.split("-").map(Number);
    const date = new Date(year, month - 1, day + days);
    return toDateKey(date);
  }

  function escapeIcsText(value) {
    return String(value ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function scrollScheduleToToday() {
    const todayKey = toDateKey(today);
    if (today < SCHEDULE_START || today > SCHEDULE_END) {
      showToast("今日の日付は企画タスク一覧の表示期間外です");
      return;
    }
    const row = els.scheduleTableBody.querySelector(`[data-schedule-date="${todayKey}"]`);
    if (!row) return;
    row.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

  function normalizeMoney(value) {
    const number = Number.parseInt(String(value ?? "").replace(/[^0-9-]/g, ""), 10);
    return Number.isFinite(number) && number > 0 ? number : 0;
  }

  function formatCurrency(value) {
    const number = Number(value) || 0;
    return `¥${Math.round(number).toLocaleString("ja-JP")}`;
  }

  function toMonthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }

  function getHouseholdCategories(type = "expense") {
    return type === "income"
      ? ["給与", "賞与", "臨時収入", "返金", "その他"]
      : ["食費", "日用品", "交通費", "住居・固定費", "趣味", "衣服・美容", "医療", "交際費", "その他"];
  }

  function populateHouseholdCategories() {
    if (!els.householdCategory || !els.householdType) return;
    const current = els.householdCategory.value;
    const categories = getHouseholdCategories(els.householdType.value);
    els.householdCategory.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
    if (categories.includes(current)) els.householdCategory.value = current;
  }

  function populateRecurringCategories() {
    if (!els.householdRecurringCategory) return;
    const current = els.householdRecurringCategory.value;
    const categories = getHouseholdCategories("expense");
    els.householdRecurringCategory.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
    if (categories.includes(current)) {
      els.householdRecurringCategory.value = current;
    } else if (categories.includes("住居・固定費")) {
      els.householdRecurringCategory.value = "住居・固定費";
    }
  }

  function normalizeHouseholdEntry(entry) {
    if (!entry || typeof entry !== "object") return null;
    const amount = normalizeMoney(entry.amount);
    if (!amount || !isValidDateKey(entry.date)) return null;
    return {
      id: entry.id || createId(),
      date: entry.date,
      type: entry.type === "income" ? "income" : "expense",
      category: typeof entry.category === "string" && entry.category ? entry.category : "その他",
      amount,
      memo: typeof entry.memo === "string" ? entry.memo : "",
      createdAt: Number(entry.createdAt || Date.now())
    };
  }

  function normalizeRecurringExpense(entry) {
    if (!entry || typeof entry !== "object") return null;
    const amount = normalizeMoney(entry.amount);
    const day = Math.max(1, Math.min(31, Number.parseInt(entry.day, 10) || 1));
    if (!amount) return null;
    return {
      id: entry.id || createId(),
      day,
      category: typeof entry.category === "string" && entry.category ? entry.category : "住居・固定費",
      amount,
      memo: typeof entry.memo === "string" ? entry.memo : "",
      createdAt: Number(entry.createdAt || Date.now())
    };
  }

  function getRecurringDateForMonth(monthKey, day) {
    const [year, month] = monthKey.split("-").map(Number);
    const lastDay = new Date(year, month, 0).getDate();
    const safeDay = Math.min(Math.max(1, Number(day) || 1), lastDay);
    return `${monthKey}-${String(safeDay).padStart(2, "0")}`;
  }

  function renderHousehold() {
    if (!els.householdExpenseList || !els.householdIncomeList || !els.householdMonth) return;

    const monthKey = els.householdMonth.value || toMonthKey(today);
    const regularEntries = state.householdEntries
      .filter((entry) => entry.date.slice(0, 7) === monthKey)
      .sort((a, b) => b.date.localeCompare(a.date) || Number(b.createdAt || 0) - Number(a.createdAt || 0));

    const recurringEntries = state.householdRecurringExpenses.map((entry) => ({
      id: `recurring:${entry.id}`,
      recurringId: entry.id,
      date: getRecurringDateForMonth(monthKey, entry.day),
      type: "expense",
      category: entry.category,
      amount: entry.amount,
      memo: entry.memo,
      recurring: true,
      createdAt: entry.createdAt
    }));

    const expenseEntries = [
      ...regularEntries.filter((entry) => entry.type === "expense"),
      ...recurringEntries
    ].sort((a, b) => b.date.localeCompare(a.date) || Number(b.createdAt || 0) - Number(a.createdAt || 0));
    const incomeEntries = regularEntries
      .filter((entry) => entry.type === "income")
      .sort((a, b) => b.date.localeCompare(a.date) || Number(b.createdAt || 0) - Number(a.createdAt || 0));

    const expense = expenseEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const income = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const balance = income - expense;

    els.householdExpenseTotal.textContent = formatCurrency(expense);
    els.householdIncomeTotal.textContent = formatCurrency(income);
    els.householdBalanceTotal.textContent = `${balance < 0 ? "-" : ""}${formatCurrency(Math.abs(balance))}`;
    els.householdBalanceTotal.classList.toggle("is-negative", balance < 0);

    const totalCount = expenseEntries.length + incomeEntries.length;
    els.householdEntryCount.textContent = `${totalCount}件`;
    if (els.householdExpenseCount) els.householdExpenseCount.textContent = `${expenseEntries.length}件`;
    if (els.householdIncomeCount) els.householdIncomeCount.textContent = `${incomeEntries.length}件`;

    renderHouseholdEntryColumn(els.householdExpenseList, expenseEntries, "支出");
    renderHouseholdEntryColumn(els.householdIncomeList, incomeEntries, "収入");
    renderRecurringExpenseTable();
  }

  function renderHouseholdEntryColumn(container, entries, label) {
    if (!container) return;

    if (!entries.length) {
      container.innerHTML = `<p class="household-empty">${label}の明細はありません</p>`;
      return;
    }

    container.innerHTML = entries.map((entry) => `
      <article class="household-entry ${entry.type} ${entry.recurring ? "is-recurring" : ""}">
        <div class="household-entry-date">${escapeHtml(formatDate(entry.date))}</div>
        <div class="household-entry-main">
          <strong>${escapeHtml(entry.category)}${entry.recurring ? '<span class="household-recurring-badge">毎月</span>' : ""}</strong>
          ${entry.memo ? `<span>${escapeHtml(entry.memo)}</span>` : ""}
        </div>
        <div class="household-entry-amount">${entry.type === "income" ? "+" : "-"}${formatCurrency(entry.amount)}</div>
        ${entry.recurring ? "" : `<button class="household-entry-delete" type="button" data-household-delete="${entry.id}" aria-label="明細を削除">×</button>`}
      </article>
    `).join("");

    container.querySelectorAll("[data-household-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        const entry = state.householdEntries.find((item) => item.id === button.dataset.householdDelete);
        if (!entry) return;
        if (!confirm(`${formatDate(entry.date)} ${entry.category} ${formatCurrency(entry.amount)} を削除しますか？`)) return;
        state.householdEntries = state.householdEntries.filter((item) => item.id !== entry.id);
        saveAndRender("家計簿の明細を削除しました");
      });
    });
  }

  function renderRecurringExpenseTable() {
    if (!els.householdRecurringList) return;
    const entries = [...state.householdRecurringExpenses].sort((a, b) => a.day - b.day || a.category.localeCompare(b.category, "ja"));
    if (els.householdRecurringCount) els.householdRecurringCount.textContent = `${entries.length}件`;

    if (!entries.length) {
      els.householdRecurringList.innerHTML = '<tr><td class="household-recurring-empty" colspan="5">毎月繰り返す支出はありません</td></tr>';
      return;
    }

    els.householdRecurringList.innerHTML = entries.map((entry) => `
      <tr>
        <td>${entry.day}日</td>
        <td>${escapeHtml(entry.category)}</td>
        <td class="household-recurring-amount">${formatCurrency(entry.amount)}</td>
        <td>${entry.memo ? escapeHtml(entry.memo) : "—"}</td>
        <td><button class="household-recurring-delete" type="button" data-recurring-delete="${entry.id}" aria-label="繰り返し支出を削除">×</button></td>
      </tr>
    `).join("");

    els.householdRecurringList.querySelectorAll("[data-recurring-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        const entry = state.householdRecurringExpenses.find((item) => item.id === button.dataset.recurringDelete);
        if (!entry) return;
        if (!confirm(`毎月${entry.day}日 ${entry.category} ${formatCurrency(entry.amount)} を削除しますか？`)) return;
        state.householdRecurringExpenses = state.householdRecurringExpenses.filter((item) => item.id !== entry.id);
        saveAndRender("毎月繰り返し支出を削除しました");
      });
    });
  }


  async function prepareCsvImport(file, type) {
    const text = await readCsvFileText(file);
    const table = parseCsvText(text);
    if (!table.length || !table[0].some((cell) => String(cell || "").trim())) {
      throw new Error("CSVに見出し行がありません");
    }

    const rawHeaders = table[0].map((cell) => String(cell ?? "").replace(/^\uFEFF/, "").trim());
    const headers = table[0].map(normalizeCsvHeader);
    const rawRows = table.slice(1).filter((row) => row.some((cell) => String(cell ?? "").trim() !== ""));
    const rows = rawRows.map((row, index) => {
      const record = { __line: index + 2 };
      headers.forEach((header, columnIndex) => {
        if (!header) return;
        record[header] = String(row[columnIndex] ?? "").trim();
      });
      return record;
    });

    const result = { type, added: 0, updated: 0, skipped: 0, errors: [], warnings: [] };
    const originalState = state;
    const originalHouseholdMonth = els.householdMonth?.value || "";
    const draftState = JSON.parse(JSON.stringify(state));

    try {
      state = draftState;
      if (!rows.length) {
        result.warnings.push("データ行がありません。見出し行の下にデータを入力してください。");
      } else {
        const handlers = {
          all: importAllRows,
          holidays: importHolidayRows,
          projects: importProjectRows,
          tasks: importTaskRows,
          wishlist: importWishlistRows,
          household: importHouseholdRows,
          recurring: importRecurringRows
        };
        const handler = handlers[type];
        if (!handler) throw new Error("CSVのデータ種別が不明です");
        handler(rows, result);
        normalizeAllOrders();
      }
    } finally {
      state = originalState;
      if (els.householdMonth) els.householdMonth.value = originalHouseholdMonth;
    }

    return {
      type,
      fileName: file.name,
      rawHeaders,
      rawRows,
      result,
      draftState
    };
  }

  function openCsvPreview() {
    if (!els.csvPreviewModal) return;
    els.csvPreviewModal.classList.add("is-open");
    els.csvPreviewModal.setAttribute("aria-hidden", "false");
  }

  function closeCsvPreview() {
    if (!els.csvPreviewModal) return;
    els.csvPreviewModal.classList.remove("is-open");
    els.csvPreviewModal.setAttribute("aria-hidden", "true");
  }

  function renderCsvPreview(preview) {
    const typeNames = {
      all: "全データ一括",
      holidays: "休日",
      projects: "企画タスク",
      tasks: "予定・タスク",
      wishlist: "やりたいことリスト",
      household: "家計簿",
      recurring: "毎月繰り返し支出"
    };
    const { result, rawHeaders, rawRows } = preview;
    if (els.csvPreviewSummary) {
      els.csvPreviewSummary.innerHTML = `
        <strong>${escapeHtml(typeNames[preview.type] || "CSV")}</strong>
        <span>${escapeHtml(preview.fileName)}</span>
        <span>読込 ${rawRows.length}行</span>
        <span>追加予定 ${result.added}件</span>
        <span>更新予定 ${result.updated}件</span>
        <span>スキップ ${result.skipped}件</span>
      `;
    }

    if (els.csvPreviewTableHead) {
      els.csvPreviewTableHead.innerHTML = `<tr><th>行</th>${rawHeaders.map((header) => `<th>${escapeHtml(header || "—")}</th>`).join("")}</tr>`;
    }
    if (els.csvPreviewTableBody) {
      els.csvPreviewTableBody.innerHTML = rawRows.length
        ? rawRows.map((row, rowIndex) => `<tr><th>${rowIndex + 2}</th>${rawHeaders.map((_, columnIndex) => `<td>${escapeHtml(String(row[columnIndex] ?? ""))}</td>`).join("")}</tr>`).join("")
        : '<tr><td colspan="99" class="csv-preview-empty">データ行がありません</td></tr>';
    }

    if (els.csvPreviewMessages) {
      const warnings = [...new Set(result.warnings)];
      const errors = result.errors;
      els.csvPreviewMessages.innerHTML = `
        ${warnings.length ? `<div class="csv-preview-message is-warning"><strong>注意</strong>${warnings.map((message) => `<span>${escapeHtml(message)}</span>`).join("")}</div>` : ""}
        ${errors.length ? `<div class="csv-preview-message is-error"><strong>確認が必要な行</strong>${errors.map((message) => `<span>${escapeHtml(message)}</span>`).join("")}</div>` : ""}
      `;
    }

    if (els.csvPreviewApply) {
      els.csvPreviewApply.disabled = result.added + result.updated === 0;
    }
  }


  async function readCsvFileText(file) {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const hasUtf8Bom = bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
    const utf8 = new TextDecoder("utf-8").decode(buffer);
    if (hasUtf8Bom || !utf8.includes("�")) return utf8.replace(/^\uFEFF/, "");
    try {
      return new TextDecoder("shift_jis").decode(buffer).replace(/^\uFEFF/, "");
    } catch (_) {
      return utf8.replace(/^\uFEFF/, "");
    }
  }

  function parseCsvText(text) {
    const source = String(text || "").replace(/^\uFEFF/, "");
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;

    for (let i = 0; i < source.length; i += 1) {
      const char = source[i];
      if (quoted) {
        if (char === '"' && source[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else if (char === '"') {
          quoted = false;
        } else {
          cell += char;
        }
        continue;
      }

      if (char === '"') {
        quoted = true;
      } else if (char === ",") {
        row.push(cell);
        cell = "";
      } else if (char === "\n") {
        row.push(cell.replace(/\r$/, ""));
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }

    if (cell.length || row.length) {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
    }
    return rows;
  }

  function normalizeCsvHeader(value) {
    return String(value || "")
      .replace(/^\uFEFF/, "")
      .trim()
      .toLowerCase()
      .replace(/[\s_\-・･（）()［］\[\]]+/g, "");
  }

  function csvValue(record, aliases) {
    for (const alias of aliases) {
      const key = normalizeCsvHeader(alias);
      if (Object.prototype.hasOwnProperty.call(record, key)) return String(record[key] ?? "").trim();
    }
    return "";
  }

  function normalizeCsvDate(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    const normalized = text
      .replace(/年/g, "-")
      .replace(/月/g, "-")
      .replace(/日/g, "")
      .replace(/[\/.]/g, "-");
    const match = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return "";
    const key = `${match[1]}-${String(Number(match[2])).padStart(2, "0")}-${String(Number(match[3])).padStart(2, "0")}`;
    return isValidDateKey(key) ? key : "";
  }

  function normalizeCsvNumber(value) {
    const cleaned = String(value ?? "")
      .replace(/[¥￥円時間hｈ]/gi, "")
      .replace(/,/g, "")
      .trim();
    const number = Number.parseFloat(cleaned);
    return Number.isFinite(number) ? number : 0;
  }

  function normalizeCsvPriority(value) {
    const text = String(value || "").trim().toLowerCase();
    if (["高", "high", "h"].includes(text)) return "high";
    if (["低", "low", "l"].includes(text)) return "low";
    return "middle";
  }

  function normalizeWishlistType(value) {
    const text = String(value || "").trim().toLowerCase();
    if (["item", "アイテム", "物", "購入"].includes(text)) return "item";
    if (["travel", "trip", "旅行", "旅"].includes(text)) return "travel";
    return "task";
  }

  function wishlistTypeLabel(value) {
    const type = normalizeWishlistType(value);
    if (type === "item") return "Item";
    if (type === "travel") return "Travel";
    return "Task";
  }

  function normalizeCsvDone(value) {
    const text = String(value || "").trim().toLowerCase();
    return ["1", "true", "yes", "y", "完了", "済", "done", "completed"].includes(text);
  }

  function normalizeCsvHouseholdType(value) {
    const text = String(value || "").trim().toLowerCase();
    return ["収入", "income", "+"].includes(text) ? "income" : "expense";
  }

  function ensureProjectByName(name, result) {
    const title = String(name || "").trim();
    if (!title) return "";
    let project = state.projects.find((item) => item.title === title);
    if (!project) {
      project = { id: createId(), title, deadline: "", totalPlannedMinutes: 0, createdAt: Date.now() };
      state.projects.push(project);
      result.warnings.push(`予定CSVの企画「${title}」を全体時間0時間で自動作成しました。`);
    }
    return project.id;
  }

  function normalizeBulkCsvType(value) {
    const text = String(value || "").trim().toLowerCase().replace(/[\s_\-・･]+/g, "");
    if (["休日", "holiday", "holidays"].includes(text)) return "holidays";
    if (["企画タスク", "企画", "project", "projects"].includes(text)) return "projects";
    if (["予定タスク", "予定・タスク", "予定", "タスク", "task", "tasks"].includes(text)) return "tasks";
    if (["やりたいこと", "やりたいことリスト", "wishlist", "wish"].includes(text)) return "wishlist";
    if (["家計簿", "household", "householdentry", "money"].includes(text)) return "household";
    if (["毎月繰り返し支出", "繰り返し支出", "固定費", "recurring", "recurringexpense"].includes(text)) return "recurring";
    return "";
  }

  function importAllRows(rows, result) {
    const grouped = {
      projects: [],
      holidays: [],
      tasks: [],
      wishlist: [],
      household: [],
      recurring: []
    };

    rows.forEach((record) => {
      const rawType = csvValue(record, ["データ種別", "データタイプ", "recordtype", "datatype"]);
      const type = normalizeBulkCsvType(rawType);
      if (!type) {
        result.skipped += 1;
        result.errors.push(`${record.__line}行目：データ種別「${rawType || "未入力"}」を判別できません`);
        return;
      }
      grouped[type].push(record);
    });

    // 企画を先に取り込むことで、後続タスクの企画紐付けを確実にする。
    importProjectRows(grouped.projects, result);
    importHolidayRows(grouped.holidays, result);
    importTaskRows(grouped.tasks, result);
    importWishlistRows(grouped.wishlist, result);
    importHouseholdRows(grouped.household, result);
    importRecurringRows(grouped.recurring, result);
  }

  function exportAllCsvData() {
    const headers = [
      "データ種別", "ID", "名称", "日付", "優先度", "使用予定時間", "企画タスク名", "完了", "メモ",
      "締切日", "全体合計時間", "種別", "予算", "区分", "カテゴリ", "金額", "毎月の日付"
    ];
    const rows = [headers];
    const pushRow = (values) => rows.push(headers.map((header) => values[header] ?? ""));
    const projectNameById = new Map(state.projects.map((project) => [project.id, project.title]));
    const priorityLabel = { high: "高", middle: "中", low: "低" };

    [...state.holidays]
      .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")))
      .forEach((holiday) => pushRow({
        "データ種別": "休日",
        "ID": holiday.id || "",
        "日付": holiday.date || ""
      }));

    [...state.projects]
      .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0))
      .forEach((project) => pushRow({
        "データ種別": "企画タスク",
        "ID": project.id || "",
        "名称": project.title || "",
        "締切日": project.deadline || "",
        "全体合計時間": csvHours(project.totalPlannedMinutes)
      }));

    [...state.tasks]
      .sort((a, b) => String(a.date || "9999-99-99").localeCompare(String(b.date || "9999-99-99")) || (Number(a.order || 0) - Number(b.order || 0)))
      .forEach((task) => pushRow({
        "データ種別": "予定・タスク",
        "ID": task.id || "",
        "名称": task.title || "",
        "日付": task.date || "",
        "優先度": priorityLabel[task.priority] || "中",
        "使用予定時間": csvHours(task.plannedMinutes),
        "企画タスク名": projectNameById.get(normalizeProjectId(task.projectId)) || "",
        "完了": task.completed ? "完了" : "未完了",
        "メモ": task.memo || ""
      }));

    [...state.wishlist]
      .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0))
      .forEach((item) => pushRow({
        "データ種別": "やりたいことリスト",
        "ID": item.id || "",
        "名称": item.title || "",
        "完了": item.done ? "完了" : "未完了",
        "メモ": item.memo || "",
        "種別": wishlistTypeLabel(item.type),
        "予算": normalizeMoney(item.budget)
      }));

    [...state.householdEntries]
      .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")))
      .forEach((entry) => pushRow({
        "データ種別": "家計簿",
        "ID": entry.id || "",
        "日付": entry.date || "",
        "メモ": entry.memo || "",
        "区分": entry.type === "income" ? "収入" : "支出",
        "カテゴリ": entry.category || "",
        "金額": normalizeMoney(entry.amount)
      }));

    [...state.householdRecurringExpenses]
      .sort((a, b) => Number(a.day || 0) - Number(b.day || 0))
      .forEach((entry) => pushRow({
        "データ種別": "毎月繰り返し支出",
        "ID": entry.id || "",
        "メモ": entry.memo || "",
        "カテゴリ": entry.category || "",
        "金額": normalizeMoney(entry.amount),
        "毎月の日付": entry.day || ""
      }));

    const csv = "\uFEFF" + rows.map((row) => row.map(csvEscapeCell).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `task-data-all-${toDateKey(today)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("全データCSVを書き出しました");
  }

  function csvEscapeCell(value) {
    const text = String(value ?? "");
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function csvHours(minutes) {
    const hours = normalizeTotalPlannedMinutes(minutes) / 60;
    return Number.isInteger(hours) ? String(hours) : String(Math.round(hours * 10) / 10);
  }

  function importHolidayRows(rows, result) {
    let firstDate = "";
    rows.forEach((record) => {
      const date = normalizeCsvDate(csvValue(record, ["日付", "date"]));
      if (!date) {
        result.skipped += 1;
        result.errors.push(`${record.__line}行目：日付が不正です`);
        return;
      }
      const importedId = csvValue(record, ["ID", "id"]);
      const existing = (importedId && state.holidays.find((item) => item.id === importedId))
        || state.holidays.find((item) => item.date === date);
      if (existing) {
        existing.date = date;
        existing.name = "休日";
        result.updated += 1;
      } else {
        state.holidays.push({ id: importedId || createId(), date, name: "休日" });
        result.added += 1;
      }
      if (!firstDate) firstDate = date;
    });
    if (firstDate) {
      state.currentYear = Number(firstDate.slice(0, 4));
      state.currentMonth = Number(firstDate.slice(5, 7)) - 1;
    }
  }

  function importProjectRows(rows, result) {
    rows.forEach((record) => {
      const title = csvValue(record, ["企画タスク名", "企画名", "名称", "name", "projectname", "project", "title"]);
      const totalHours = normalizeCsvNumber(csvValue(record, ["全体合計時間", "全体時間", "totalhours", "totalplannedhours"]));
      const deadlineRaw = csvValue(record, ["締切日", "締切", "deadline", "duedate"]);
      const deadline = deadlineRaw ? normalizeCsvDate(deadlineRaw) : "";
      if (!title) {
        result.skipped += 1;
        result.errors.push(`${record.__line}行目：企画タスク名を入力してください`);
        return;
      }
      if (deadlineRaw && !deadline) {
        result.skipped += 1;
        result.errors.push(`${record.__line}行目：締切日の形式が不正です`);
        return;
      }
      const totalPlannedMinutes = normalizeTotalPlannedMinutes(totalHours * 60);
      const importedId = csvValue(record, ["ID", "id"]);
      const existing = (importedId && state.projects.find((item) => item.id === importedId))
        || state.projects.find((item) => item.title === title);
      if (existing) {
        existing.title = title;
        existing.deadline = deadline;
        existing.totalPlannedMinutes = totalPlannedMinutes;
        result.updated += 1;
      } else {
        state.projects.push({ id: importedId || createId(), title, deadline, totalPlannedMinutes, createdAt: Date.now() });
        result.added += 1;
      }
    });
  }

  function importTaskRows(rows, result) {
    let firstDate = "";
    rows.forEach((record) => {
      const title = csvValue(record, ["タスク名", "予定名", "名称", "name", "taskname", "title"]);
      if (!title) {
        result.skipped += 1;
        result.errors.push(`${record.__line}行目：タスク名がありません`);
        return;
      }
      const dateText = csvValue(record, ["日付", "date"]);
      const date = dateText ? normalizeCsvDate(dateText) : "";
      if (dateText && !date) {
        result.skipped += 1;
        result.errors.push(`${record.__line}行目：日付が不正です`);
        return;
      }
      const projectName = csvValue(record, ["企画タスク名", "企画名", "projectname", "project"]);
      const projectId = ensureProjectByName(projectName, result);
      const priority = normalizeCsvPriority(csvValue(record, ["優先度", "priority"]));
      const plannedHours = normalizeCsvNumber(csvValue(record, ["使用予定時間", "予定時間", "plannedhours", "durationhours", "hours"]));
      const plannedMinutes = normalizePlannedMinutes(plannedHours * 60);
      const completed = normalizeCsvDone(csvValue(record, ["完了", "状態", "completed", "status"]));
      const memo = csvValue(record, ["メモ", "memo", "note"]);
      const importedId = csvValue(record, ["ID", "id"]);
      const existing = (importedId && state.tasks.find((item) => item.id === importedId))
        || state.tasks.find((item) => item.title === title && (item.date || "") === date && normalizeProjectId(item.projectId) === projectId);
      if (existing) {
        const previousDate = existing.date || null;
        existing.title = title;
        existing.date = date || null;
        existing.priority = priority;
        existing.plannedMinutes = plannedMinutes;
        existing.projectId = projectId;
        existing.completed = completed;
        existing.memo = memo;
        if (previousDate !== (date || null)) existing.order = getNextOrder(date || null);
        result.updated += 1;
      } else {
        state.tasks.push({
          id: importedId || createId(),
          title,
          date: date || null,
          priority,
          plannedMinutes,
          projectId,
          completed,
          memo,
          order: getNextOrder(date || null)
        });
        result.added += 1;
      }
      if (date && !firstDate) firstDate = date;
    });
    if (firstDate) {
      state.currentYear = Number(firstDate.slice(0, 4));
      state.currentMonth = Number(firstDate.slice(5, 7)) - 1;
    }
  }

  function importWishlistRows(rows, result) {
    rows.forEach((record) => {
      const title = csvValue(record, ["やりたいこと", "タイトル", "名称", "name", "title"]);
      if (!title) {
        result.skipped += 1;
        result.errors.push(`${record.__line}行目：やりたいこと名がありません`);
        return;
      }
      const type = normalizeWishlistType(csvValue(record, ["種別", "type", "itemtask", "category"]));
      const budget = normalizeMoney(csvValue(record, ["予算", "budget"]));
      const memo = csvValue(record, ["メモ", "memo", "note"]);
      const done = normalizeCsvDone(csvValue(record, ["状態", "完了", "status", "completed"]));
      const importedId = csvValue(record, ["ID", "id"]);
      const existing = (importedId && state.wishlist.find((item) => item.id === importedId))
        || state.wishlist.find((item) => item.title === title);
      if (existing) {
        existing.title = title;
        existing.type = type;
        existing.budget = budget;
        existing.memo = memo;
        existing.done = done;
        existing.completedAt = done ? Number(existing.completedAt || Date.now()) : null;
        result.updated += 1;
      } else {
        state.wishlist.push({ id: importedId || createId(), title, type, budget, memo, done, createdAt: Date.now(), completedAt: done ? Date.now() : null });
        result.added += 1;
      }
    });
  }

  function importHouseholdRows(rows, result) {
    let firstDate = "";
    rows.forEach((record) => {
      const date = normalizeCsvDate(csvValue(record, ["日付", "date"]));
      const type = normalizeCsvHouseholdType(csvValue(record, ["区分", "type"]));
      const category = csvValue(record, ["カテゴリ", "category"]) || "その他";
      const amount = normalizeMoney(csvValue(record, ["金額", "amount"]));
      const memo = csvValue(record, ["メモ", "memo", "note"]);
      if (!date || !amount) {
        result.skipped += 1;
        result.errors.push(`${record.__line}行目：日付または金額が不正です`);
        return;
      }
      const importedId = csvValue(record, ["ID", "id"]);
      const existingById = importedId ? state.householdEntries.find((item) => item.id === importedId) : null;
      if (existingById) {
        existingById.date = date;
        existingById.type = type;
        existingById.category = category;
        existingById.amount = amount;
        existingById.memo = memo;
        result.updated += 1;
      } else {
        const duplicate = state.householdEntries.some((item) => item.date === date && item.type === type && item.category === category && item.amount === amount && item.memo === memo);
        if (duplicate) {
          result.skipped += 1;
          return;
        }
        state.householdEntries.push({ id: importedId || createId(), date, type, category, amount, memo, createdAt: Date.now() });
        result.added += 1;
      }
      if (!firstDate) firstDate = date;
    });
    if (firstDate && els.householdMonth) els.householdMonth.value = firstDate.slice(0, 7);
  }

  function importRecurringRows(rows, result) {
    rows.forEach((record) => {
      const rawDay = Number.parseInt(csvValue(record, ["毎月の日付", "日", "day"]), 10);
      const day = Number.isInteger(rawDay) && rawDay >= 1 && rawDay <= 31 ? rawDay : 0;
      const category = csvValue(record, ["カテゴリ", "category"]) || "住居・固定費";
      const amount = normalizeMoney(csvValue(record, ["金額", "amount"]));
      const memo = csvValue(record, ["メモ", "memo", "note"]);
      if (!day || !amount) {
        result.skipped += 1;
        result.errors.push(`${record.__line}行目：毎月の日付または金額が不正です`);
        return;
      }
      const importedId = csvValue(record, ["ID", "id"]);
      const existingById = importedId ? state.householdRecurringExpenses.find((item) => item.id === importedId) : null;
      if (existingById) {
        existingById.day = day;
        existingById.category = category;
        existingById.amount = amount;
        existingById.memo = memo;
        result.updated += 1;
      } else {
        const duplicate = state.householdRecurringExpenses.some((item) => item.day === day && item.category === category && item.amount === amount && item.memo === memo);
        if (duplicate) {
          result.skipped += 1;
          return;
        }
        state.householdRecurringExpenses.push({ id: importedId || createId(), day, category, amount, memo, createdAt: Date.now() });
        result.added += 1;
      }
    });
  }

  function renderCsvImportResult(result) {
    if (!els.csvImportResult) return;
    const typeNames = {
      all: "全データ一括",
      holidays: "休日",
      projects: "企画タスク",
      tasks: "予定・タスク",
      wishlist: "やりたいことリスト",
      household: "家計簿",
      recurring: "毎月繰り返し支出"
    };
    const errors = result.errors.slice(0, 8);
    const warnings = [...new Set(result.warnings)].slice(0, 5);
    els.csvImportResult.className = `csv-import-result ${result.errors.length ? "has-warning" : "is-success"}`;
    els.csvImportResult.innerHTML = `
      <div class="csv-result-summary">
        <strong>${escapeHtml(typeNames[result.type] || "CSV")}を反映しました</strong>
        <span>追加 ${result.added}件</span>
        <span>更新 ${result.updated}件</span>
        <span>スキップ ${result.skipped}件</span>
      </div>
      ${warnings.length ? `<div class="csv-result-messages"><strong>注意</strong>${warnings.map((message) => `<span>${escapeHtml(message)}</span>`).join("")}</div>` : ""}
      ${errors.length ? `<div class="csv-result-messages is-error"><strong>確認が必要な行</strong>${errors.map((message) => `<span>${escapeHtml(message)}</span>`).join("")}${result.errors.length > errors.length ? `<span>ほか ${result.errors.length - errors.length}件</span>` : ""}</div>` : ""}
    `;
  }

  function syncDesktopPanelHeight() {
    const layout = document.querySelector("#panelCalendar .layout");
    if (!layout || window.innerWidth <= 820) {
      document.documentElement.style.removeProperty("--desktop-panel-height");
      return;
    }
    requestAnimationFrame(() => {
      const height = Math.ceil(layout.getBoundingClientRect().height);
      if (height > 0) {
        document.documentElement.style.setProperty("--desktop-panel-height", `${height}px`);
      }
    });
  }

  function setupDesktopPanelHeightSync() {
    const layout = document.querySelector("#panelCalendar .layout");
    if (!layout) return;
    syncDesktopPanelHeight();
    window.addEventListener("resize", syncDesktopPanelHeight);
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(() => syncDesktopPanelHeight());
      observer.observe(layout);
    }
  }

  function changeMonth(diff) {
    const date = new Date(state.currentYear, state.currentMonth + diff, 1);
    state.currentYear = date.getFullYear();
    state.currentMonth = date.getMonth();
    saveAndRender();
  }

  function removePastHolidays() {
    const todayKey = toDateKey(today);
    const originalLength = state.holidays.length;

    state.holidays = state.holidays.filter((holiday) => holiday.date >= todayKey);

    if (state.holidays.length !== originalLength) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.GitDataSync?.scheduleSave?.();
    }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return makeInitialState();
      const parsed = JSON.parse(saved);
      if (!parsed || !Array.isArray(parsed.tasks)) return makeInitialState();
      parsed.holidays = Array.isArray(parsed.holidays) ? parsed.holidays : [];
      parsed.wishlist = Array.isArray(parsed.wishlist) ? parsed.wishlist : [];
      parsed.dailyMemos = parsed.dailyMemos && typeof parsed.dailyMemos === "object" ? parsed.dailyMemos : {};
      Object.keys(parsed.dailyMemos).forEach((dateKey) => {
        const items = Array.isArray(parsed.dailyMemos[dateKey]) ? parsed.dailyMemos[dateKey] : [];
        parsed.dailyMemos[dateKey] = items.map((item) => ({
          id: String(item?.id || createId()),
          title: String(item?.title || "").trim(),
          done: Boolean(item?.done),
          sourceWishlistId: item?.sourceWishlistId ? String(item.sourceWishlistId) : "",
          sourceType: normalizeWishlistType(item?.sourceType),
          createdAt: Number(item?.createdAt || Date.now())
        })).filter((item) => item.title);
      });
      parsed.wishlist.forEach((item) => {
        item.type = normalizeWishlistType(item.type);
        item.budget = normalizeMoney(item.budget);
        item.memo = typeof item.memo === "string" ? item.memo : "";
        item.done = Boolean(item.done);
        item.completedAt = item.done ? Number(item.completedAt || item.createdAt || Date.now()) : null;
      });
      parsed.householdEntries = Array.isArray(parsed.householdEntries) ? parsed.householdEntries : [];
      parsed.householdEntries = parsed.householdEntries.map(normalizeHouseholdEntry).filter(Boolean);
      parsed.householdRecurringExpenses = Array.isArray(parsed.householdRecurringExpenses) ? parsed.householdRecurringExpenses : [];
      parsed.householdRecurringExpenses = parsed.householdRecurringExpenses.map(normalizeRecurringExpense).filter(Boolean);
      parsed.timeAllocations = parsed.timeAllocations && typeof parsed.timeAllocations === "object"
        ? parsed.timeAllocations
        : {};
      parsed.projects = Array.isArray(parsed.projects) ? parsed.projects : [];

      // 旧形式の大型データは、企画タスクへ自動移行する。
      parsed.tasks.forEach((task) => {
        if (task.taskType === "large" && !task.projectId) {
          const legacyProjectId = `project-${task.id}`;
          if (!parsed.projects.some((project) => project.id === legacyProjectId)) {
            parsed.projects.push({
              id: legacyProjectId,
              title: task.title || "名称未設定の企画",
              deadline: "",
              totalPlannedMinutes: normalizeTotalPlannedMinutes(task.totalPlannedMinutes),
              createdAt: Number(task.createdAt || Date.now())
            });
          }
          task.projectId = legacyProjectId;
        }
        task.projectId = normalizeProjectId(task.projectId);
        task.completed = Boolean(task.completed);
        if (!Number.isFinite(Number(task.plannedMinutes))) {
          const allocatedHours = task.date ? Number(parsed.timeAllocations?.[task.date]?.[task.id]) || 0 : 0;
          task.plannedMinutes = normalizePlannedMinutes(allocatedHours * 60);
        } else {
          task.plannedMinutes = normalizePlannedMinutes(task.plannedMinutes);
        }
        delete task.taskType;
        delete task.totalPlannedMinutes;
      });
      parsed.projects = parsed.projects.map((project) => ({
        id: String(project.id || createId()),
        title: String(project.title || "名称未設定の企画"),
        deadline: normalizeCsvDate(project.deadline) || "",
        totalPlannedMinutes: normalizeTotalPlannedMinutes(project.totalPlannedMinutes),
        createdAt: Number(project.createdAt || Date.now())
      }));
      return parsed;
    } catch (error) {
      console.warn(error);
      return makeInitialState();
    }
  }

  function makeInitialState() {
    return {
      currentYear: today.getFullYear(),
      currentMonth: today.getMonth(),
      tasks: structuredCloneSafe(defaultTasks),
      projects: [],
      holidays: [],
      wishlist: [],
      dailyMemos: {},
      householdEntries: [],
      householdRecurringExpenses: [],
      timeAllocations: {}
    };
  }

  function saveAndRender(message) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.GitDataSync?.scheduleSave?.();
    window.dispatchEvent(new CustomEvent("task-data-updated"));
    render();
    if (message) showToast(message);
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    toastTimer = setTimeout(() => {
      els.toast.classList.remove("show");
    }, 1700);
  }

  function normalizeAllOrders() {
    const groups = new Map();
    state.tasks.forEach((task) => {
      const key = task.date || "backlog";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(task);
    });
    groups.forEach((tasks) => {
      sortTasks(tasks).forEach((task, index) => {
        task.order = index;
      });
    });
  }

  function getNextOrder(dateKey) {
    const sameGroup = state.tasks.filter((task) => (task.date || null) === (dateKey || null));
    if (!sameGroup.length) return 0;
    return Math.max(...sameGroup.map((task) => Number(task.order) || 0)) + 1;
  }

  function sortTasks(tasks) {
    return [...tasks].sort((a, b) => {
      const ao = Number(a.order) || 0;
      const bo = Number(b.order) || 0;
      if (ao !== bo) return ao - bo;
      return a.title.localeCompare(b.title, "ja");
    });
  }

  function getPriorityText(priority) {
    return {
      high: "優先度：高",
      middle: "優先度：中",
      low: "優先度：低"
    }[priority] || "優先度：中";
  }

  function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseHolidayDates(value) {
    const tokens = String(value || "").split(/[\n,、\s]+/).map((item) => item.trim()).filter(Boolean);
    return [...new Set(tokens.filter(isValidDateKey))].sort();
  }

  function isValidDateKey(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  function formatDate(dateKey) {
    const [year, month, day] = dateKey.split("-");
    return `${year}/${Number(month)}/${Number(day)}`;
  }

  function createId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function structuredCloneSafe(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }
})();


function updateClock() {
  const now = new Date();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const pad = (value) => String(value).padStart(2, "0");
  const clockText = document.getElementById("clockText");

  if (!clockText) return;

  clockText.textContent =
    `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())}`
    + `（${weekdays[now.getDay()]}） `
    + `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

updateClock();
setInterval(updateClock, 1000);

// ======================================
// V23: In-page work timer / task total time + Pomodoro
// ======================================
(() => {
  const TIMER_STORAGE_KEY = "task-work-timer-pomodoro-v2";
  const MAIN_STORAGE_KEY = "task-calendar-ui-v1";

  const els = {
    panel: document.getElementById("pomodoroPanel"),
    task: document.getElementById("workTimerTask"),
    totalMinutes: document.getElementById("workTimerTotalMinutes"),
    apply: document.getElementById("workTimerApply"),
    message: document.getElementById("workTimerMessage"),
    activeTask: document.getElementById("workTimerActiveTask"),
    totalTime: document.getElementById("workTimerTotalTime"),
    totalLabel: document.getElementById("workTimerTotalLabel"),
    progressBar: document.getElementById("workTimerProgressBar"),
    progressText: document.getElementById("workTimerProgressText"),
    stateBadge: document.getElementById("workTimerStateBadge"),
    phase: document.getElementById("pomodoroPhase"),
    time: document.getElementById("pomodoroTime"),
    cycle: document.getElementById("pomodoroCycle"),
    cycleText: document.getElementById("pomodoroCycleText"),
    start: document.getElementById("pomodoroStart"),
    reset: document.getElementById("pomodoroReset"),
    todayCount: document.getElementById("pomodoroTodayCount"),
    todayMinutes: document.getElementById("pomodoroTodayMinutes"),
    focusMinutes: document.getElementById("pomodoroFocusMinutes"),
    shortMinutes: document.getElementById("pomodoroShortMinutes"),
    longMinutes: document.getElementById("pomodoroLongMinutes"),
    sessions: document.getElementById("pomodoroSessions"),
    autoAdvance: document.getElementById("pomodoroAutoAdvance"),
    sound: document.getElementById("pomodoroSound"),
    notify: document.getElementById("pomodoroNotify"),
    modeButtons: Array.from(document.querySelectorAll("[data-pomodoro-mode]"))
  };

  if (!els.panel || !els.task || !els.totalMinutes) return;

  const modeLabels = { focus: "集中", short: "短休憩", long: "長休憩" };
  let state = loadTimerState();
  let audioContext = null;
  let tickTimer = null;
  let availableTasks = [];

  populateTotalTimeOptions();
  refreshTaskOptions();
  reconcileRunningTimer();
  syncSettingsInputs();
  renderTimer();
  startTicker();

  els.task.addEventListener("change", () => {
    const task = availableTasks.find((item) => item.id === els.task.value);
    if (task?.plannedMinutes) {
      ensureTotalTimeOption(task.plannedMinutes);
      els.totalMinutes.value = String(task.plannedMinutes);
    }
    setMessage("");
  });

  els.apply.addEventListener("click", applyTaskTimer);

  els.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.configuredTotalSeconds) {
        setMessage("先に対象タスクと総作業時間を設定してください。", "error");
        return;
      }
      commitRunningProgress();
      const mode = button.dataset.pomodoroMode;
      if (!modeLabels[mode]) return;
      state.mode = mode;
      state.running = false;
      state.endsAt = null;
      state.remainingSeconds = getModeDurationSeconds(mode);
      resetPhaseBaseline();
      saveTimerState();
      renderTimer();
    });
  });

  els.start.addEventListener("click", () => {
    unlockPomodoroAudio();
    if (!state.configuredTotalSeconds) {
      setMessage("対象タスクを選択し、総作業時間を設定してください。", "error");
      els.task.focus();
      return;
    }
    if (getDisplayedTotalRemaining() <= 0) {
      setMessage("総作業時間を消化済みです。リセットまたは再設定してください。", "success");
      return;
    }
    if (state.running) pauseTimer(); else startTimer();
  });

  els.reset.addEventListener("click", () => {
    if (!state.configuredTotalSeconds) return;
    state.running = false;
    state.endsAt = null;
    state.mode = "focus";
    state.completedInCycle = 0;
    state.totalRemainingSeconds = state.configuredTotalSeconds;
    state.remainingSeconds = getModeDurationSeconds("focus");
    resetPhaseBaseline();
    setMessage("総タイマーを最初からリセットしました。");
    saveTimerState();
    renderTimer();
  });

  [els.focusMinutes, els.shortMinutes, els.longMinutes, els.sessions].forEach((input) => {
    input?.addEventListener("change", updateSettings);
  });

  els.autoAdvance.addEventListener("change", () => {
    state.autoAdvance = Boolean(els.autoAdvance.checked);
    saveTimerState();
  });

  els.sound.addEventListener("change", () => {
    state.sound = Boolean(els.sound.checked);
    if (state.sound) unlockPomodoroAudio();
    saveTimerState();
  });

  els.notify.addEventListener("change", async () => {
    const wants = Boolean(els.notify.checked);
    if (!wants) {
      state.notify = false;
      saveTimerState();
      return;
    }
    if (!("Notification" in window)) {
      state.notify = false;
      els.notify.checked = false;
      setMessage("このブラウザでは通知を利用できません。", "error");
      saveTimerState();
      return;
    }
    let permission = Notification.permission;
    if (permission === "default") {
      try { permission = await Notification.requestPermission(); }
      catch (error) { console.warn("Notification permission error", error); }
    }
    state.notify = permission === "granted";
    els.notify.checked = state.notify;
    saveTimerState();
  });

  window.addEventListener("task-data-updated", refreshTaskOptions);
  window.addEventListener("storage", (event) => {
    if (event.key === MAIN_STORAGE_KEY) refreshTaskOptions();
  });
  window.addEventListener("pagehide", () => {
    commitRunningProgress();
    saveTimerState();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      reconcileRunningTimer();
      refreshTaskOptions();
      renderTimer();
    }
  });

  function makeDefaultState() {
    return {
      selectedTaskId: "",
      configuredTotalSeconds: 0,
      totalRemainingSeconds: 0,
      mode: "focus",
      running: false,
      remainingSeconds: 25 * 60,
      endsAt: null,
      phaseStartRemainingSeconds: 25 * 60,
      totalAtPhaseStartSeconds: 0,
      focusMinutes: 25,
      shortMinutes: 5,
      longMinutes: 15,
      sessionsBeforeLongBreak: 4,
      completedInCycle: 0,
      autoAdvance: false,
      sound: true,
      notify: false,
      dailyRecords: {}
    };
  }

  function loadTimerState() {
    const fallback = makeDefaultState();
    try {
      const saved = JSON.parse(localStorage.getItem(TIMER_STORAGE_KEY) || "null");
      if (!saved || typeof saved !== "object") return fallback;
      const next = {
        ...fallback,
        ...saved,
        selectedTaskId: String(saved.selectedTaskId || ""),
        configuredTotalSeconds: Math.max(0, Number(saved.configuredTotalSeconds) || 0),
        totalRemainingSeconds: Math.max(0, Number(saved.totalRemainingSeconds) || 0),
        mode: modeLabels[saved.mode] ? saved.mode : "focus",
        running: Boolean(saved.running),
        remainingSeconds: Math.max(0, Number(saved.remainingSeconds) || 0),
        endsAt: Number(saved.endsAt) || null,
        phaseStartRemainingSeconds: Math.max(0, Number(saved.phaseStartRemainingSeconds) || 0),
        totalAtPhaseStartSeconds: Math.max(0, Number(saved.totalAtPhaseStartSeconds) || 0),
        focusMinutes: clampInteger(saved.focusMinutes, 1, 180, 25),
        shortMinutes: clampInteger(saved.shortMinutes, 1, 60, 5),
        longMinutes: clampInteger(saved.longMinutes, 1, 120, 15),
        sessionsBeforeLongBreak: clampInteger(saved.sessionsBeforeLongBreak, 1, 12, 4),
        completedInCycle: Math.max(0, Number.parseInt(saved.completedInCycle, 10) || 0),
        autoAdvance: Boolean(saved.autoAdvance),
        sound: saved.sound !== false,
        notify: Boolean(saved.notify),
        dailyRecords: saved.dailyRecords && typeof saved.dailyRecords === "object" ? saved.dailyRecords : {}
      };
      next.completedInCycle = Math.min(next.completedInCycle, next.sessionsBeforeLongBreak);
      if (!next.phaseStartRemainingSeconds) next.phaseStartRemainingSeconds = next.remainingSeconds || getModeDurationSecondsFromState(next, next.mode);
      if (!next.totalAtPhaseStartSeconds) next.totalAtPhaseStartSeconds = next.totalRemainingSeconds;
      pruneDailyRecords(next.dailyRecords);
      return next;
    } catch (error) {
      console.warn("Work timer state load error", error);
      return fallback;
    }
  }

  function saveTimerState() {
    try {
      pruneDailyRecords(state.dailyRecords);
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(state));
      window.GitDataSync?.scheduleSave?.();
    } catch (error) {
      console.warn("Work timer state save error", error);
    }
  }

  function readMainTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(MAIN_STORAGE_KEY) || "null");
      const tasks = Array.isArray(saved?.tasks) ? saved.tasks : [];
      return tasks
        .filter((task) => task && !task.completed)
        .map((task) => ({
          id: String(task.id || ""),
          title: String(task.title || "名称未設定"),
          date: task.date || "",
          plannedMinutes: normalizeMinutes(task.plannedMinutes)
        }))
        .filter((task) => task.id)
        .sort((a, b) => {
          if (a.date && b.date && a.date !== b.date) return a.date.localeCompare(b.date);
          if (a.date && !b.date) return -1;
          if (!a.date && b.date) return 1;
          return a.title.localeCompare(b.title, "ja");
        });
    } catch (error) {
      console.warn("Task data load error", error);
      return [];
    }
  }

  function refreshTaskOptions() {
    const currentInput = els.task.value || state.selectedTaskId;
    availableTasks = readMainTasks();
    const options = ['<option value="">タスクを選択してください</option>'];
    availableTasks.forEach((task) => {
      const date = task.date ? ` / ${escapeHtml(task.date)}` : " / 未配置";
      const duration = task.plannedMinutes ? ` / ${escapeHtml(formatMinutes(task.plannedMinutes))}` : "";
      options.push(`<option value="${escapeHtml(task.id)}">${escapeHtml(task.title)}${date}${duration}</option>`);
    });
    els.task.innerHTML = options.join("");
    if (availableTasks.some((task) => task.id === currentInput)) els.task.value = currentInput;
    else els.task.value = "";

    if (state.selectedTaskId && !availableTasks.some((task) => task.id === state.selectedTaskId)) {
      const main = readAllMainTasks().find((task) => String(task.id) === state.selectedTaskId);
      if (main) {
        const option = document.createElement("option");
        option.value = state.selectedTaskId;
        option.textContent = `${main.title || "名称未設定"}（完了済み）`;
        els.task.appendChild(option);
        els.task.value = state.selectedTaskId;
      } else {
        state.selectedTaskId = "";
      }
    }
    renderTimer();
  }

  function readAllMainTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(MAIN_STORAGE_KEY) || "null");
      return Array.isArray(saved?.tasks) ? saved.tasks : [];
    } catch (error) { return []; }
  }

  function populateTotalTimeOptions() {
    const options = [];
    for (let minutes = 30; minutes <= 1440; minutes += 30) {
      options.push(`<option value="${minutes}">${escapeHtml(formatMinutes(minutes))}</option>`);
    }
    els.totalMinutes.innerHTML = options.join("");
    els.totalMinutes.value = "60";
  }

  function ensureTotalTimeOption(minutes) {
    const normalized = normalizeMinutes(minutes);
    if (!normalized) return;
    if (!Array.from(els.totalMinutes.options).some((option) => Number(option.value) === normalized)) {
      const option = document.createElement("option");
      option.value = String(normalized);
      option.textContent = formatMinutes(normalized);
      els.totalMinutes.appendChild(option);
    }
  }

  function applyTaskTimer() {
    const taskId = els.task.value;
    const task = availableTasks.find((item) => item.id === taskId) || readAllMainTasks().find((item) => String(item.id) === taskId);
    if (!taskId || !task) {
      setMessage("対象タスクを選択してください。", "error");
      els.task.focus();
      return;
    }
    const totalMinutes = normalizeMinutes(els.totalMinutes.value);
    if (!totalMinutes) {
      setMessage("総作業時間を選択してください。", "error");
      return;
    }

    state.selectedTaskId = taskId;
    state.configuredTotalSeconds = totalMinutes * 60;
    state.totalRemainingSeconds = state.configuredTotalSeconds;
    state.mode = "focus";
    state.running = false;
    state.endsAt = null;
    state.completedInCycle = 0;
    state.remainingSeconds = getModeDurationSeconds("focus");
    resetPhaseBaseline();
    setMessage(`「${task.title || "タスク"}」を ${formatMinutes(totalMinutes)} で設定しました。`, "success");
    saveTimerState();
    renderTimer();
  }

  function startTicker() {
    clearInterval(tickTimer);
    tickTimer = window.setInterval(() => {
      if (!state.running || !state.endsAt) return;
      const remaining = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
      state.remainingSeconds = remaining;
      if (remaining <= 0) finishPhase();
      else renderClockOnly();
    }, 250);
  }

  function startTimer() {
    if (state.mode === "focus" && state.remainingSeconds <= 0) state.remainingSeconds = getModeDurationSeconds("focus");
    if (state.remainingSeconds <= 0) state.remainingSeconds = getModeDurationSeconds(state.mode);
    state.phaseStartRemainingSeconds = state.remainingSeconds;
    state.totalAtPhaseStartSeconds = state.totalRemainingSeconds;
    state.running = true;
    state.endsAt = Date.now() + state.remainingSeconds * 1000;
    setMessage("");
    saveTimerState();
    renderTimer();
  }

  function pauseTimer() {
    commitRunningProgress();
    state.running = false;
    state.endsAt = null;
    resetPhaseBaseline();
    saveTimerState();
    renderTimer();
  }

  function commitRunningProgress() {
    if (!state.running || !state.endsAt) return;
    const currentRemaining = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
    if (state.mode === "focus") {
      state.totalRemainingSeconds = calculateTotalRemaining(currentRemaining);
    }
    state.remainingSeconds = currentRemaining;
  }

  function reconcileRunningTimer() {
    if (!state.running || !state.endsAt) return;
    const currentRemaining = Math.ceil((state.endsAt - Date.now()) / 1000);
    if (currentRemaining > 0) {
      state.remainingSeconds = currentRemaining;
      return;
    }
    state.remainingSeconds = 0;
    finishPhase();
  }

  function finishPhase() {
    const completedMode = state.mode;
    const now = Date.now();

    if (completedMode === "focus") {
      const focusSeconds = Math.min(
        Math.max(0, state.phaseStartRemainingSeconds),
        Math.max(0, state.totalAtPhaseStartSeconds)
      );
      state.totalRemainingSeconds = Math.max(0, state.totalAtPhaseStartSeconds - focusSeconds);
      recordFocusSession(focusSeconds);
      state.completedInCycle = Math.min(state.sessionsBeforeLongBreak, state.completedInCycle + 1);

      if (state.totalRemainingSeconds <= 0) {
        state.running = false;
        state.endsAt = null;
        state.remainingSeconds = 0;
        state.mode = "focus";
        resetPhaseBaseline();
        setMessage("総作業時間を消化しました。お疲れさまでした。", "success");
        playSound();
        sendNotification("総作業時間が終了しました", "設定したタスク時間を消化しました。お疲れさまでした。");
        saveTimerState();
        renderTimer();
        return;
      }
      state.mode = state.completedInCycle >= state.sessionsBeforeLongBreak ? "long" : "short";
    } else {
      if (completedMode === "long") state.completedInCycle = 0;
      state.mode = "focus";
    }

    state.remainingSeconds = getModeDurationSeconds(state.mode);
    state.running = Boolean(state.autoAdvance);
    resetPhaseBaseline();
    state.endsAt = state.running ? now + state.remainingSeconds * 1000 : null;
    if (state.running) {
      state.phaseStartRemainingSeconds = state.remainingSeconds;
      state.totalAtPhaseStartSeconds = state.totalRemainingSeconds;
    }

    playSound();
    const nextLabel = modeLabels[state.mode];
    sendNotification(completedMode === "focus" ? "集中時間が終了しました" : "休憩が終了しました", `次は「${nextLabel}」です。`);
    saveTimerState();
    renderTimer();
  }

  function updateSettings() {
    commitRunningProgress();
    const wasRunning = state.running;
    state.running = false;
    state.endsAt = null;
    state.focusMinutes = clampInteger(els.focusMinutes.value, 1, 180, state.focusMinutes);
    state.shortMinutes = clampInteger(els.shortMinutes.value, 1, 60, state.shortMinutes);
    state.longMinutes = clampInteger(els.longMinutes.value, 1, 120, state.longMinutes);
    state.sessionsBeforeLongBreak = clampInteger(els.sessions.value, 1, 12, state.sessionsBeforeLongBreak);
    state.completedInCycle = Math.min(state.completedInCycle, state.sessionsBeforeLongBreak);
    state.remainingSeconds = getModeDurationSeconds(state.mode);
    resetPhaseBaseline();
    if (wasRunning) setMessage("設定変更のためタイマーを一時停止しました。再開してください。");
    syncSettingsInputs();
    saveTimerState();
    renderTimer();
  }

  function resetPhaseBaseline() {
    state.phaseStartRemainingSeconds = state.remainingSeconds;
    state.totalAtPhaseStartSeconds = state.totalRemainingSeconds;
  }

  function calculateTotalRemaining(currentPhaseRemaining) {
    if (state.mode !== "focus") return state.totalRemainingSeconds;
    const spent = Math.max(0, state.phaseStartRemainingSeconds - currentPhaseRemaining);
    return Math.max(0, state.totalAtPhaseStartSeconds - spent);
  }

  function getDisplayedTotalRemaining() {
    if (state.running && state.mode === "focus" && state.endsAt) {
      const current = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
      return calculateTotalRemaining(current);
    }
    return Math.max(0, state.totalRemainingSeconds);
  }

  function getModeDurationSeconds(mode) {
    const base = getModeDurationSecondsFromState(state, mode);
    if (mode !== "focus") return base;
    const total = getDisplayedTotalRemaining();
    return total > 0 ? Math.min(base, total) : 0;
  }

  function getModeDurationSecondsFromState(source, mode) {
    const minutes = mode === "short" ? source.shortMinutes : mode === "long" ? source.longMinutes : source.focusMinutes;
    return Math.max(1, Number(minutes) || 1) * 60;
  }

  function renderTimer() {
    renderClockOnly();
    const isBreak = state.mode !== "focus";
    els.panel.classList.toggle("is-break", isBreak);
    if (els.phase) els.phase.textContent = modeLabels[state.mode];
    if (els.start) els.start.textContent = state.running ? "一時停止" : "開始";
    els.modeButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.pomodoroMode === state.mode));
    renderCycle();
    renderStats();
    syncSettingsInputs();

    const task = readAllMainTasks().find((item) => String(item.id) === state.selectedTaskId);
    els.activeTask.textContent = task?.title || "タスク未設定";
    if (state.selectedTaskId && Array.from(els.task.options).some((option) => option.value === state.selectedTaskId)) {
      els.task.value = state.selectedTaskId;
    }
    if (state.configuredTotalSeconds) {
      const configuredMinutes = Math.round(state.configuredTotalSeconds / 60);
      ensureTotalTimeOption(configuredMinutes);
      els.totalMinutes.value = String(configuredMinutes);
    }

    const totalRemaining = getDisplayedTotalRemaining();
    const total = Math.max(0, state.configuredTotalSeconds);
    const consumed = Math.max(0, total - totalRemaining);
    const percent = total ? Math.min(100, (consumed / total) * 100) : 0;
    els.totalTime.textContent = formatLongSeconds(totalRemaining);
    els.totalLabel.textContent = total ? `${formatMinutes(Math.ceil(totalRemaining / 60))} / ${formatMinutes(Math.round(total / 60))}` : "-- / --";
    els.progressBar.style.width = `${percent}%`;
    els.progressText.textContent = `${Math.round(percent)}%`;

    const badgeText = !state.configuredTotalSeconds ? "未設定" : state.running ? (isBreak ? "休憩中" : "作業中") : totalRemaining <= 0 ? "完了" : "停止中";
    els.stateBadge.textContent = badgeText;
    els.stateBadge.classList.toggle("is-running", state.running && !isBreak);
    els.stateBadge.classList.toggle("is-break", state.running && isBreak);
    els.stateBadge.classList.toggle("is-complete", Boolean(state.configuredTotalSeconds && totalRemaining <= 0));
  }

  function renderClockOnly() {
    els.time.textContent = formatPomodoroSeconds(state.remainingSeconds);
    const totalRemaining = getDisplayedTotalRemaining();
    els.totalTime.textContent = formatLongSeconds(totalRemaining);
    if (state.configuredTotalSeconds) {
      const percent = Math.min(100, ((state.configuredTotalSeconds - totalRemaining) / state.configuredTotalSeconds) * 100);
      els.progressBar.style.width = `${Math.max(0, percent)}%`;
      els.progressText.textContent = `${Math.round(Math.max(0, percent))}%`;
      els.totalLabel.textContent = `${formatMinutes(Math.ceil(totalRemaining / 60))} / ${formatMinutes(Math.round(state.configuredTotalSeconds / 60))}`;
    }
  }

  function renderCycle() {
    const count = state.sessionsBeforeLongBreak;
    const done = Math.min(state.completedInCycle, count);
    els.cycle.innerHTML = Array.from({ length: count }, (_, index) => `<i class="pomodoro-cycle-dot${index < done ? " is-done" : ""}"></i>`).join("");
    els.cycleText.textContent = `${done} / ${count}`;
  }

  function renderStats() {
    const record = normalizeDailyRecord(state.dailyRecords[getLocalDateKey(new Date())]);
    els.todayCount.textContent = String(record.pomodoros);
    els.todayMinutes.textContent = String(Math.round(record.focusSeconds / 60));
  }

  function recordFocusSession(seconds) {
    if (!seconds) return;
    const key = getLocalDateKey(new Date());
    const record = normalizeDailyRecord(state.dailyRecords[key]);
    record.pomodoros += 1;
    record.focusSeconds += seconds;
    state.dailyRecords[key] = record;
  }

  function normalizeDailyRecord(record) {
    const legacySeconds = Math.max(0, Number(record?.focusMinutes) || 0) * 60;
    return {
      pomodoros: Math.max(0, Number.parseInt(record?.pomodoros, 10) || 0),
      focusSeconds: Math.max(0, Number(record?.focusSeconds) || legacySeconds)
    };
  }

  function syncSettingsInputs() {
    els.focusMinutes.value = String(state.focusMinutes);
    els.shortMinutes.value = String(state.shortMinutes);
    els.longMinutes.value = String(state.longMinutes);
    els.sessions.value = String(state.sessionsBeforeLongBreak);
    els.autoAdvance.checked = state.autoAdvance;
    els.sound.checked = state.sound;
    els.notify.checked = state.notify && ("Notification" in window) && Notification.permission === "granted";
  }

  function setMessage(message, type = "") {
    els.message.textContent = message;
    els.message.className = `work-timer-message${type ? ` is-${type}` : ""}`;
  }

  function unlockPomodoroAudio() {
    if (!state.sound) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioContext) audioContext = new AudioContextClass();
      if (audioContext.state === "suspended") audioContext.resume();
    } catch (error) { console.warn("Pomodoro audio error", error); }
  }

  function playSound() {
    if (!state.sound) return;
    unlockPomodoroAudio();
    if (!audioContext) return;
    const now = audioContext.currentTime;
    [0, 0.22].forEach((offset, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = index === 0 ? 740 : 880;
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.12, now + offset + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.16);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now + offset);
      oscillator.stop(now + offset + 0.18);
    });
  }

  function sendNotification(title, body) {
    if (!state.notify || !("Notification" in window) || Notification.permission !== "granted") return;
    try { new Notification(title, { body, tag: "task-work-timer" }); }
    catch (error) { console.warn("Notification error", error); }
  }

  function normalizeMinutes(value) {
    const minutes = Number.parseInt(value, 10);
    if (!Number.isFinite(minutes) || minutes <= 0) return 0;
    return Math.max(1, Math.min(1440, minutes));
  }

  function formatMinutes(minutes) {
    const total = Math.max(0, Number.parseInt(minutes, 10) || 0);
    const hours = Math.floor(total / 60);
    const mins = total % 60;
    if (!hours) return `${mins}分`;
    if (!mins) return `${hours}時間`;
    return `${hours}時間${mins}分`;
  }

  function formatPomodoroSeconds(totalSeconds) {
    const safe = Math.max(0, Number.parseInt(totalSeconds, 10) || 0);
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function formatLongSeconds(totalSeconds) {
    const safe = Math.max(0, Number.parseInt(totalSeconds, 10) || 0);
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const seconds = safe % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function clampInteger(value, min, max, fallback) {
    const number = Number.parseInt(value, 10);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
  }

  function getLocalDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function pruneDailyRecords(records) {
    Object.keys(records || {}).sort().reverse().slice(120).forEach((key) => delete records[key]);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[char]));
  }
})();
