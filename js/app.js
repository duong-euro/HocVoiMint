/* ============================================
   HỌC VỚI MINT — App Logic v2
   8 screens, adaptive difficulty, progress tracking
   ============================================ */

// ========== STATE ==========
const state = {
  screen: "home",
  prevScreen: null,
  profile: { ...APP_DATA.profile },
  // Quiz state
  quizMode: null, // "topic" | "exam" | "random"
  quizTopicId: null,
  quizExamId: null,
  quizQuestions: [],
  quizIndex: 0,
  quizAnswers: [],
  quizChecked: false,
  quizStartTime: null,
  quizTimerInterval: null,
  quizElapsed: 0,
  // Adaptive difficulty
  consecutiveCorrect: 0,
  consecutiveWrong: 0,
  currentDifficulty: "easy",
  // Progress tracking (session)
  progress: {},  // { lessonId: { started: bool, completed: bool, correct: n, total: n } }
  topicProgress: {}, // { topicId: { correct: n, total: n } }
  // Result
  lastResult: null,
  // UI
  theme: "light",
  nicknameModalOpen: false
};

// ========== HELPERS ==========
function ls(key, val) {
  try {
    if (val === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, val);
  } catch(e) { return null; }
}

function getProfile() {
  const saved = ls("mint-profile");
  if (saved) {
    try { Object.assign(state.profile, JSON.parse(saved)); } catch(e) {}
  }
}

function saveProfile() {
  ls("mint-profile", JSON.stringify(state.profile));
}

function getNickname() {
  return state.profile.nickname || "Học sinh chăm chỉ";
}

function getTotalQuestions() {
  return APP_DATA.questions.length;
}

function getTopicQuestions(topicId) {
  return APP_DATA.questions.filter(q => q.topicId === topicId);
}

function getLessonQuestions(lessonId) {
  return APP_DATA.questions.filter(q => q.lessonId === lessonId);
}

function getJourneyPercent() {
  const total = APP_DATA.lessons.length;
  const completed = Object.values(state.progress).filter(p => p.completed).length;
  return total > 0 ? Math.round(completed / total * 100) : 0;
}

function getTopicProgress(topicId) {
  const tp = state.topicProgress[topicId];
  if (!tp || tp.total === 0) return 0;
  return Math.round(tp.correct / tp.total * 100);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ========== THEME ==========
function initTheme() {
  const saved = ls("mint-theme");
  if (saved) state.theme = saved;
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  const btn = document.getElementById("btn-theme");
  if (btn) {
    btn.innerHTML = state.theme === "dark"
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  applyTheme();
  ls("mint-theme", state.theme);
}

// ========== NAVIGATION ==========
function go(screen) {
  state.prevScreen = state.screen;
  state.screen = screen;
  render();
  window.scrollTo(0, 0);
}

function goBack() {
  if (state.prevScreen) {
    state.screen = state.prevScreen;
    state.prevScreen = null;
  } else {
    state.screen = "home";
  }
  render();
  window.scrollTo(0, 0);
}

// ========== ICONS ==========
const IC = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  shapes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 20 2 20"/></svg>',
  ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="2"/><line x1="6" y1="7" x2="6" y2="12"/><line x1="10" y1="7" x2="10" y2="12"/><line x1="14" y1="7" x2="14" y2="12"/><line x1="18" y1="7" x2="18" y2="12"/></svg>',
  "plus-minus": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="11"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="16" x2="15" y2="16"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  sprout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12c-3-3-7-2-7 1s4 4 7 1"/><path d="M12 12c3-3 7-2 7 1s-4 4-7 1"/></svg>'
};

function ic(name) { return '<span class="ic">' + (IC[name] || '') + '</span>'; }

// ========== RENDER ENGINE ==========
function render() {
  const app = document.getElementById("app");
  const renderers = {
    home: renderHome,
    mode: renderMode,
    topics: renderTopics,
    exams: renderExams,
    quiz: renderQuiz,
    result: renderResult,
    progress: renderProgress,
    profile: renderProfile
  };
  const fn = renderers[state.screen];
  if (fn) {
    app.innerHTML = '<div class="screen active">' + fn() + '</div>';
    bindEvents();
    updateNav();
  }
}

function bindEvents() {
  document.querySelectorAll("[data-go]").forEach(el => {
    el.addEventListener("click", () => go(el.dataset.go));
  });
  document.querySelectorAll("[data-action]").forEach(el => {
    el.addEventListener("click", () => handleAction(el));
  });
}

function updateNav() {
  document.querySelectorAll(".bnav-item").forEach(el => {
    el.classList.toggle("active", el.dataset.nav === state.screen ||
      (el.dataset.nav === "learn" && ["mode","topics","exams"].includes(state.screen)));
  });
}

function handleAction(el) {
  const a = el.dataset.action;
  const v = el.dataset.value;
  switch(a) {
    case "set-nickname": openNicknameModal(); break;
    case "save-nickname": saveNickname(); break;
    case "close-modal": closeModal(); break;
    case "start-topic": startTopicQuiz(v); break;
    case "start-exam": startExamQuiz(v); break;
    case "start-random": startRandomQuiz(); break;
    case "select-choice": selectChoice(parseInt(v)); break;
    case "check-answer": checkAnswer(); break;
    case "next-question": nextQuestion(); break;
    case "quit-quiz": quitQuiz(); break;
    case "retry": retryQuiz(); break;
    case "review-wrong": reviewWrong(); break;
    case "go-home": go("home"); break;
    case "go-back": goBack(); break;
  }
}

// ========== NICKNAME MODAL ==========
function openNicknameModal() {
  state.nicknameModalOpen = true;
  render();
  const input = document.getElementById("nickname-input");
  if (input) input.focus();
}

function closeModal() {
  state.nicknameModalOpen = false;
  render();
}

function saveNickname() {
  const input = document.getElementById("nickname-input");
  if (input && input.value.trim()) {
    state.profile.nickname = input.value.trim().substring(0, 20);
    saveProfile();
  }
  closeModal();
}

function renderModal() {
  if (!state.nicknameModalOpen) return '';
  return '<div class="modal-overlay" data-action="close-modal">' +
    '<div class="modal-box" onclick="event.stopPropagation()">' +
    '<h3>Đặt biệt danh cho bé</h3>' +
    '<input id="nickname-input" type="text" class="modal-input" placeholder="Nhập biệt danh..." value="' + (state.profile.nickname || '') + '" maxlength="20">' +
    '<div class="modal-actions">' +
    '<button class="btn btn-outline btn-sm" data-action="close-modal">Hủy</button>' +
    '<button class="btn btn-primary btn-sm" data-action="save-nickname">Lưu</button>' +
    '</div></div></div>';
}

// ========== SCREEN: HOME ==========
function renderHome() {
  const nick = getNickname();
  const journey = getJourneyPercent();
  const completed = Object.values(state.progress).filter(p => p.completed).length;
  const started = Object.values(state.progress).filter(p => p.started).length;
  let h = '';

  // Greeting
  h += '<div class="home-greeting">';
  h += '<div class="greeting-row">';
  h += '<div><p class="greeting-hi">Chào bé ' + ic("sprout") + '</p>';
  h += '<h2 class="greeting-name">' + nick + '</h2>';
  h += '<p class="greeting-sub">Tiếp tục hành trình học toán nào!</p></div>';
  h += '<button class="avatar-circle" style="background:' + state.profile.avatarColor + '" data-action="set-nickname" aria-label="Đổi biệt danh">';
  h += nick.charAt(0).toUpperCase();
  h += '</button></div></div>';

  // Journey card
  h += '<div class="journey-card">';
  h += '<div class="journey-header">' + ic("target") + ' <span>Hành trình của bé</span></div>';
  h += '<div class="progress-bar-lg"><div class="progress-fill-lg" style="width:' + journey + '%"></div></div>';
  h += '<div class="journey-stats">';
  h += '<span>' + journey + '% hoàn thành</span>';
  h += '<span>' + started + ' bắt đầu · ' + completed + ' xong</span>';
  h += '</div></div>';

  // CTA buttons
  h += '<div class="home-cta">';
  h += '<button class="btn btn-primary btn-lg" data-go="mode">' + ic("play") + ' Luyện ngay</button>';
  h += '<button class="btn btn-outline" data-action="start-random">' + ic("shuffle") + ' Luyện ngẫu nhiên</button>';
  h += '</div>';

  // Recent achievement
  h += '<div class="home-section">';
  h += '<h3 class="section-title">' + ic("award") + ' Thành tích hôm nay</h3>';
  h += '<div class="stats-row">';
  h += '<div class="stat-chip"><span class="stat-num">' + state.profile.todayCompleted + '</span><span class="stat-lbl">Bài xong</span></div>';
  h += '<div class="stat-chip"><span class="stat-num">' + state.profile.todayCorrect + '</span><span class="stat-lbl">Câu đúng</span></div>';
  h += '<div class="stat-chip"><span class="stat-num">' + state.profile.todayTotal + '</span><span class="stat-lbl">Tổng câu</span></div>';
  h += '</div></div>';

  // Suggestion
  const suggestion = getNextSuggestion();
  if (suggestion) {
    h += '<div class="home-section">';
    h += '<h3 class="section-title">' + ic("sprout") + ' Bài nên học tiếp</h3>';
    h += '<div class="suggestion-card card-click" data-action="start-topic" data-value="' + suggestion.topicId + '">';
    const topic = APP_DATA.topics.find(t => t.id === suggestion.topicId);
    h += '<div class="sug-icon" style="background:' + (topic ? topic.color : '#3B82F6') + '">' + ic(topic ? topic.icon : 'book') + '</div>';
    h += '<div class="sug-info"><div class="sug-title">' + suggestion.title + '</div>';
    h += '<div class="sug-sub">' + (topic ? topic.name : '') + '</div></div>';
    h += '</div></div>';
  }

  h += renderModal();
  return h;
}

function getNextSuggestion() {
  for (const lesson of APP_DATA.lessons) {
    const p = state.progress[lesson.id];
    if (!p || !p.completed) return lesson;
  }
  return APP_DATA.lessons[0];
}

// ========== SCREEN: MODE SELECT ==========
function renderMode() {
  let h = '<button class="btn-back" data-action="go-back">' + ic("back") + ' Quay lại</button>';
  h += '<h2 class="screen-title">Chọn cách học</h2>';
  h += '<div class="mode-cards">';

  h += '<div class="mode-card recommended card-click" data-go="topics">';
  h += '<div class="mode-icon" style="background:#3B82F6">' + ic("book") + '</div>';
  h += '<h3>Học theo chủ đề</h3>';
  h += '<p>Chọn chủ đề và luyện từng bài</p>';
  h += '<span class="badge badge-rec">Đề xuất</span>';
  h += '</div>';

  h += '<div class="mode-card card-click" data-go="exams">';
  h += '<div class="mode-icon" style="background:#10B981">' + ic("target") + '</div>';
  h += '<h3>Ôn thi học kỳ</h3>';
  h += '<p>Làm đề ôn ngắn, có tính giờ</p>';
  h += '</div>';

  h += '<div class="mode-card card-click" data-action="start-random">';
  h += '<div class="mode-icon" style="background:#F59E0B">' + ic("shuffle") + '</div>';
  h += '<h3>Luyện ngẫu nhiên</h3>';
  h += '<p>Bài tập ngẫu nhiên, tự điều chỉnh độ khó</p>';
  h += '</div>';

  h += '</div>';
  return h;
}

// ========== SCREEN: TOPICS ==========
function renderTopics() {
  let h = '<button class="btn-back" data-action="go-back">' + ic("back") + ' Quay lại</button>';
  h += '<h2 class="screen-title">Chọn chủ đề</h2>';
  h += '<div class="topic-list">';
  APP_DATA.topics.forEach(t => {
    const qs = getTopicQuestions(t.id);
    const prog = getTopicProgress(t.id);
    h += '<div class="topic-card card-click" data-action="start-topic" data-value="' + t.id + '">';
    h += '<div class="topic-icon" style="background:' + t.color + '">' + ic(t.icon) + '</div>';
    h += '<div class="topic-body">';
    h += '<h3>' + t.name + '</h3>';
    h += '<p class="topic-desc">' + t.desc + '</p>';
    h += '<div class="topic-meta">';
    h += '<span>' + qs.length + ' câu</span>';
    h += '<div class="mini-bar"><div class="mini-fill" style="width:' + prog + '%;background:' + t.color + '"></div></div>';
    h += '<span>' + prog + '%</span>';
    h += '</div></div></div>';
  });
  h += '</div>';
  return h;
}

// ========== SCREEN: EXAMS ==========
function renderExams() {
  let h = '<button class="btn-back" data-action="go-back">' + ic("back") + ' Quay lại</button>';
  h += '<h2 class="screen-title">Đề ôn thi</h2>';

  [1, 2].forEach(sem => {
    const exams = APP_DATA.exams.filter(e => e.semester === sem);
    h += '<h3 class="section-title">' + ic("star") + ' Học kỳ ' + sem + '</h3>';
    h += '<div class="exam-list">';
    exams.forEach(ex => {
      h += '<div class="exam-card card">';
      h += '<div class="exam-info"><h4>' + ex.title + '</h4>';
      h += '<div class="exam-meta">' + ex.questionCount + ' câu · ' + ic("clock") + ' ' + ex.duration + ' phút</div></div>';
      h += '<button class="btn btn-cta btn-sm" data-action="start-exam" data-value="' + ex.id + '">' + ic("play") + ' Làm</button>';
      h += '</div>';
    });
    h += '</div>';
  });
  return h;
}

// ========== QUIZ ENGINE ==========
function startTopicQuiz(topicId) {
  const qs = getTopicQuestions(topicId);
  if (!qs.length) return;
  state.quizMode = "topic";
  state.quizTopicId = topicId;
  state.quizExamId = null;
  state.quizQuestions = selectAdaptiveQuestions(qs, 8);
  state.quizIndex = 0;
  state.quizAnswers = new Array(state.quizQuestions.length).fill(null);
  state.quizChecked = false;
  state.quizStartTime = null;
  state.quizElapsed = 0;
  clearInterval(state.quizTimerInterval);
  state.quizTimerInterval = null;
  // Mark started
  const lessons = APP_DATA.lessons.filter(l => l.topicId === topicId);
  lessons.forEach(l => {
    if (!state.progress[l.id]) state.progress[l.id] = { started: false, completed: false, correct: 0, total: 0 };
    state.progress[l.id].started = true;
  });
  go("quiz");
}

function startExamQuiz(examId) {
  const exam = APP_DATA.exams.find(e => e.id === examId);
  if (!exam) return;
  const qIds = APP_DATA.examQuestions[examId] || [];
  const qs = qIds.map(id => APP_DATA.questions.find(q => q.id === id)).filter(Boolean);
  if (!qs.length) return;
  state.quizMode = "exam";
  state.quizExamId = examId;
  state.quizTopicId = null;
  state.quizQuestions = qs;
  state.quizIndex = 0;
  state.quizAnswers = new Array(qs.length).fill(null);
  state.quizChecked = false;
  state.quizStartTime = Date.now();
  state.quizElapsed = 0;
  clearInterval(state.quizTimerInterval);
  state.quizTimerInterval = setInterval(() => {
    state.quizElapsed = Math.floor((Date.now() - state.quizStartTime) / 1000);
    const timerEl = document.getElementById("quiz-timer");
    if (timerEl) timerEl.textContent = formatTime(state.quizElapsed);
  }, 1000);
  go("quiz");
}

function startRandomQuiz() {
  const all = [...APP_DATA.questions];
  state.quizMode = "random";
  state.quizTopicId = null;
  state.quizExamId = null;
  state.consecutiveCorrect = 0;
  state.consecutiveWrong = 0;
  state.currentDifficulty = "easy";
  state.quizQuestions = selectAdaptiveQuestions(all, 10);
  state.quizIndex = 0;
  state.quizAnswers = new Array(state.quizQuestions.length).fill(null);
  state.quizChecked = false;
  state.quizStartTime = null;
  state.quizElapsed = 0;
  clearInterval(state.quizTimerInterval);
  state.quizTimerInterval = null;
  go("quiz");
}

function selectAdaptiveQuestions(pool, count) {
  const diff = state.currentDifficulty;
  // Prioritize current difficulty, fill with others
  const preferred = pool.filter(q => q.difficulty === diff);
  const others = pool.filter(q => q.difficulty !== diff);
  const shuffled = [...shuffleArray(preferred), ...shuffleArray(others)];
  return shuffled.slice(0, count);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

// ========== SCREEN: QUIZ ==========
function renderQuiz() {
  const qs = state.quizQuestions;
  if (!qs.length) return '<p>Không có câu hỏi.</p>';
  const idx = state.quizIndex;
  const q = qs[idx];
  const total = qs.length;
  const pct = ((idx + (state.quizChecked ? 1 : 0)) / total * 100).toFixed(0);

  let label = "";
  if (state.quizMode === "topic") {
    const t = APP_DATA.topics.find(t => t.id === state.quizTopicId);
    label = t ? t.name : "Luyện tập";
  } else if (state.quizMode === "exam") {
    const ex = APP_DATA.exams.find(e => e.id === state.quizExamId);
    label = ex ? ex.title : "Đề ôn thi";
  } else {
    label = "Luyện ngẫu nhiên";
  }

  let h = '';
  // Header
  h += '<div class="quiz-top">';
  h += '<button class="btn-icon" data-action="quit-quiz" aria-label="Thoát">' + ic("x") + '</button>';
  h += '<div class="quiz-info"><span class="quiz-label">' + label + '</span>';
  if (state.quizMode === "exam") {
    h += '<span class="quiz-timer" id="quiz-timer">' + formatTime(state.quizElapsed) + '</span>';
  }
  h += '</div>';
  h += '<span class="quiz-count">Câu ' + (idx + 1) + '/' + total + '</span>';
  h += '</div>';

  // Progress
  h += '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>';

  // Question
  h += '<div class="card q-card">';
  h += '<div class="q-number">' + (idx + 1) + '</div>';
  h += '<div class="q-text">' + q.question + '</div>';

  if (q.type === "multiple-choice") {
    const labels = ["A", "B", "C", "D"];
    h += '<div class="choices">';
    q.options.forEach((opt, i) => {
      let cls = "choice-btn";
      if (state.quizChecked) {
        cls += " disabled";
        if (opt === q.correctAnswer) cls += " correct";
        else if (state.quizAnswers[idx] === i && q.options[i] !== q.correctAnswer) cls += " wrong";
      } else if (state.quizAnswers[idx] === i) {
        cls += " selected";
      }
      h += '<button class="' + cls + '" data-action="select-choice" data-value="' + i + '">';
      h += '<span class="choice-lbl">' + labels[i] + '</span><span>' + opt + '</span></button>';
    });
    h += '</div>';
  } else {
    let cls = "input-answer";
    if (state.quizChecked) {
      const val = state.quizAnswers[idx];
      cls += (val !== null && String(val).trim() === String(q.correctAnswer)) ? " correct" : " wrong";
    }
    const dis = state.quizChecked ? ' disabled' : '';
    const val = state.quizAnswers[idx] !== null ? state.quizAnswers[idx] : '';
    h += '<input type="number" inputmode="numeric" class="' + cls + '" id="input-answer" placeholder="Nhập đáp án..." value="' + val + '"' + dis + '>';
  }

  // Feedback
  h += '<div id="feedback" class="feedback"></div>';
  h += '</div>';

  // Actions
  h += '<div class="quiz-actions">';
  if (!state.quizChecked) {
    h += '<button class="btn btn-primary" data-action="check-answer">Kiểm tra</button>';
  } else {
    h += (idx < total - 1)
      ? '<button class="btn btn-primary" data-action="next-question">Câu tiếp theo</button>'
      : '<button class="btn btn-cta" data-action="next-question">Xem kết quả</button>';
  }
  h += '</div>';

  return h;
}

function selectChoice(i) {
  if (state.quizChecked) return;
  state.quizAnswers[state.quizIndex] = i;
  render();
}

function checkAnswer() {
  const idx = state.quizIndex;
  const q = state.quizQuestions[idx];

  if (q.type === "input") {
    const input = document.getElementById("input-answer");
    if (input) {
      const v = input.value.trim();
      if (!v) return;
      state.quizAnswers[idx] = v;
    }
  }
  if (q.type === "multiple-choice" && state.quizAnswers[idx] === null) return;

  state.quizChecked = true;

  // Check correctness
  let correct = false;
  if (q.type === "multiple-choice") {
    correct = q.options[state.quizAnswers[idx]] === q.correctAnswer;
  } else {
    correct = String(state.quizAnswers[idx]).trim() === String(q.correctAnswer);
  }

  // Adaptive difficulty
  if (correct) {
    state.consecutiveCorrect++;
    state.consecutiveWrong = 0;
    if (state.consecutiveCorrect >= 3) state.currentDifficulty = "hard";
    else if (state.consecutiveCorrect >= 2) state.currentDifficulty = "medium";
  } else {
    state.consecutiveWrong++;
    state.consecutiveCorrect = 0;
    if (state.consecutiveWrong >= 2) state.currentDifficulty = "easy";
    else if (state.consecutiveWrong >= 1) state.currentDifficulty = "medium";
  }

  render();

  // Show feedback
  const fb = document.getElementById("feedback");
  if (fb) {
    const msgs = correct
      ? ["Chính xác rồi!", "Giỏi quá!", "Đúng rồi nè!"]
      : ["Chưa đúng rồi, xem lại nhé!", "Sai rồi, không sao!"];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    fb.className = "feedback show " + (correct ? "correct" : "wrong");
    let fbHtml = '<div class="fb-header">' + ic(correct ? "check" : "x") + ' ' + msg + '</div>';
    fbHtml += '<div class="fb-explain">' + q.explanation + '</div>';
    if (!correct && q.hint) {
      fbHtml += '<div class="fb-hint">' + ic("sprout") + ' Gợi ý: ' + q.hint + '</div>';
    }
    fb.innerHTML = fbHtml;
  }
}

function nextQuestion() {
  if (state.quizIndex < state.quizQuestions.length - 1) {
    state.quizIndex++;
    state.quizChecked = false;
    render();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  clearInterval(state.quizTimerInterval);
  const qs = state.quizQuestions;
  let correct = 0;
  const wrongList = [];
  const topicStats = {};

  qs.forEach((q, i) => {
    let isCorrect = false;
    if (q.type === "multiple-choice") {
      isCorrect = q.options[state.quizAnswers[i]] === q.correctAnswer;
    } else {
      isCorrect = String(state.quizAnswers[i]).trim() === String(q.correctAnswer);
    }
    if (isCorrect) correct++;
    else wrongList.push({ question: q, userAnswer: state.quizAnswers[i], index: i });

    // Track topic progress
    if (!topicStats[q.topicId]) topicStats[q.topicId] = { correct: 0, total: 0 };
    topicStats[q.topicId].total++;
    if (isCorrect) topicStats[q.topicId].correct++;
  });

  // Update progress
  Object.entries(topicStats).forEach(([tid, s]) => {
    if (!state.topicProgress[tid]) state.topicProgress[tid] = { correct: 0, total: 0 };
    state.topicProgress[tid].correct += s.correct;
    state.topicProgress[tid].total += s.total;
  });

  // Update profile
  state.profile.todayCompleted++;
  state.profile.todayCorrect += correct;
  state.profile.todayTotal += qs.length;
  state.profile.totalCompleted++;
  saveProfile();

  // Mark lessons completed if topic quiz
  if (state.quizMode === "topic" && state.quizTopicId) {
    const lessons = APP_DATA.lessons.filter(l => l.topicId === state.quizTopicId);
    lessons.forEach(l => {
      if (!state.progress[l.id]) state.progress[l.id] = { started: true, completed: false, correct: 0, total: 0 };
      state.progress[l.id].completed = true;
      state.progress[l.id].correct += correct;
      state.progress[l.id].total += qs.length;
    });
  }

  state.lastResult = {
    correct, total: qs.length,
    percent: Math.round(correct / qs.length * 100),
    wrongList, topicStats,
    elapsed: state.quizElapsed,
    isExam: state.quizMode === "exam"
  };

  state.reviewQuestions = wrongList.map(w => w.question);
  go("result");
}

function quitQuiz() {
  clearInterval(state.quizTimerInterval);
  go(state.quizMode === "exam" ? "exams" : state.quizMode === "topic" ? "topics" : "home");
}

function retryQuiz() {
  if (state.quizMode === "topic" && state.quizTopicId) startTopicQuiz(state.quizTopicId);
  else if (state.quizMode === "exam" && state.quizExamId) startExamQuiz(state.quizExamId);
  else startRandomQuiz();
}

function reviewWrong() {
  if (!state.reviewQuestions.length) return go("home");
  state.quizMode = "review";
  state.quizQuestions = [...state.reviewQuestions];
  state.quizIndex = 0;
  state.quizAnswers = new Array(state.quizQuestions.length).fill(null);
  state.quizChecked = false;
  go("quiz");
}

// ========== SCREEN: RESULT ==========
function renderResult() {
  const r = state.lastResult;
  if (!r) return '<p>Không có kết quả.</p>';
  const grade = r.percent >= 80 ? "good" : r.percent >= 50 ? "ok" : "bad";
  const msgs = {
    good: { t: "Xuất sắc!", s: "Con giỏi lắm, tiếp tục phát huy nhé!" },
    ok: { t: "Khá tốt!", s: "Cố gắng thêm chút nữa nhé!" },
    bad: { t: "Cần ôn thêm!", s: "Không sao, ôn lại rồi sẽ giỏi hơn!" }
  };

  let h = '<div class="result-hero">';
  if (r.isExam) h += '<p class="result-label">Kết quả đề ôn thi</p>';
  h += '<div class="score-circle ' + grade + '"><div class="score-num">' + r.correct + '/' + r.total + '</div>';
  h += '<div class="score-pct">' + r.percent + '%</div></div>';
  h += '<h2 class="result-msg">' + msgs[grade].t + '</h2>';
  h += '<p class="result-sub">' + msgs[grade].s + '</p>';
  if (r.isExam && r.elapsed) h += '<p class="result-time">' + ic("clock") + ' Thời gian: ' + formatTime(r.elapsed) + '</p>';
  h += '</div>';

  // Topic breakdown
  if (Object.keys(r.topicStats).length > 1) {
    h += '<div class="result-section"><h3 class="section-title">' + ic("chart") + ' Theo chủ đề</h3>';
    Object.entries(r.topicStats).forEach(([tid, s]) => {
      const t = APP_DATA.topics.find(t => t.id === tid);
      const pct = Math.round(s.correct / s.total * 100);
      h += '<div class="topic-stat"><span>' + (t ? t.name : tid) + '</span>';
      h += '<div class="mini-bar"><div class="mini-fill" style="width:' + pct + '%;background:' + (t ? t.color : '#3B82F6') + '"></div></div>';
      h += '<span>' + s.correct + '/' + s.total + '</span></div>';
    });
    h += '</div>';
  }

  // Wrong answers
  if (r.wrongList.length > 0) {
    h += '<div class="result-section"><h3 class="section-title">' + ic("x") + ' Câu sai (' + r.wrongList.length + ')</h3>';
    r.wrongList.forEach(w => {
      const q = w.question;
      let userAns = "";
      if (q.type === "multiple-choice") userAns = w.userAnswer !== null ? q.options[w.userAnswer] : "(chưa chọn)";
      else userAns = w.userAnswer !== null ? w.userAnswer : "(chưa nhập)";
      h += '<div class="card wrong-card">';
      h += '<div class="wrong-q">' + q.question + '</div>';
      h += '<div class="wrong-detail">Con chọn: ' + userAns + '</div>';
      h += '<div class="wrong-detail">Đáp án: <strong>' + q.correctAnswer + '</strong></div>';
      h += '<div class="wrong-explain">' + q.explanation + '</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  // Badge milestone
  if (r.percent >= 80 && state.profile.totalCompleted <= 3) {
    h += '<div class="badge-earned">' + ic("trophy") + ' Huy hiệu: Ngôi sao mới!</div>';
  }

  // Actions
  h += '<div class="result-actions">';
  h += '<button class="btn btn-primary" data-action="retry">' + ic("refresh") + ' Làm lại</button>';
  if (r.wrongList.length > 0) {
    h += '<button class="btn btn-outline" data-action="review-wrong">' + ic("book") + ' Ôn phần sai</button>';
  }
  h += '<button class="btn btn-outline" data-action="go-home">' + ic("home") + ' Về trang chủ</button>';
  h += '</div>';
  return h;
}

// ========== SCREEN: PROGRESS ==========
function renderProgress() {
  let h = '<h2 class="screen-title">' + ic("chart") + ' Tiến bộ học tập</h2>';

  // Overview stats
  const totalDone = state.profile.todayTotal;
  const totalCorrect = state.profile.todayCorrect;
  const avgPct = totalDone > 0 ? Math.round(totalCorrect / totalDone * 100) : 0;

  h += '<div class="progress-stats">';
  h += '<div class="pstat"><div class="pstat-num">' + state.profile.totalCompleted + '</div><div class="pstat-lbl">Bài đã làm</div></div>';
  h += '<div class="pstat"><div class="pstat-num">' + totalDone + '</div><div class="pstat-lbl">Câu đã làm</div></div>';
  h += '<div class="pstat accent"><div class="pstat-num">' + avgPct + '%</div><div class="pstat-lbl">Tỷ lệ đúng</div></div>';
  h += '</div>';

  // Per-topic progress
  h += '<div class="progress-section"><h3 class="section-title">' + ic("target") + ' Theo chủ đề</h3>';
  APP_DATA.topics.forEach(t => {
    const tp = state.topicProgress[t.id];
    const pct = tp && tp.total > 0 ? Math.round(tp.correct / tp.total * 100) : 0;
    const total = tp ? tp.total : 0;
    h += '<div class="topic-prog">';
    h += '<div class="tp-header"><span class="tp-name">' + t.name + '</span><span class="tp-pct">' + pct + '% (' + (tp ? tp.correct : 0) + '/' + total + ')</span></div>';
    h += '<div class="mini-bar"><div class="mini-fill" style="width:' + pct + '%;background:' + t.color + '"></div></div>';
    h += '</div>';
  });
  h += '</div>';

  // Strongest / weakest
  const sorted = APP_DATA.topics.map(t => {
    const tp = state.topicProgress[t.id];
    return { name: t.name, pct: tp && tp.total > 0 ? Math.round(tp.correct / tp.total * 100) : -1 };
  }).filter(x => x.pct >= 0).sort((a, b) => b.pct - a.pct);

  if (sorted.length > 0) {
    h += '<div class="progress-section">';
    h += '<div class="strength-card good">' + ic("star") + ' Mạnh nhất: <strong>' + sorted[0].name + '</strong> (' + sorted[0].pct + '%)</div>';
    if (sorted.length > 1) {
      const weakest = sorted[sorted.length - 1];
      h += '<div class="strength-card weak">' + ic("sprout") + ' Cần luyện thêm: <strong>' + weakest.name + '</strong> (' + weakest.pct + '%)</div>';
    }
    h += '</div>';
  }

  if (totalDone === 0) {
    h += '<div class="empty-state">' + ic("sprout") + '<p>Chưa có dữ liệu. Hãy bắt đầu luyện tập nhé!</p>';
    h += '<button class="btn btn-primary" data-go="mode">' + ic("play") + ' Bắt đầu học</button></div>';
  }

  return h;
}

// ========== SCREEN: PROFILE ==========
function renderProfile() {
  const nick = getNickname();
  let h = '<div class="profile-header">';
  h += '<div class="profile-avatar" style="background:' + state.profile.avatarColor + '">' + nick.charAt(0).toUpperCase() + '</div>';
  h += '<h2>' + nick + '</h2>';
  h += '<button class="btn btn-outline btn-sm" data-action="set-nickname">' + ic("edit") + ' Đổi biệt danh</button>';
  h += '</div>';

  // Today goal
  h += '<div class="card profile-goal">';
  h += '<h3>' + ic("target") + ' Mục tiêu hôm nay</h3>';
  h += '<p>Hoàn thành 3 bài luyện tập</p>';
  h += '<div class="mini-bar"><div class="mini-fill" style="width:' + Math.min(100, Math.round(state.profile.todayCompleted / 3 * 100)) + '%;background:#10B981"></div></div>';
  h += '<span class="goal-text">' + state.profile.todayCompleted + ' / 3 bài</span>';
  h += '</div>';

  // Badges
  h += '<div class="profile-section"><h3 class="section-title">' + ic("award") + ' Huy hiệu</h3>';
  const badges = [];
  if (state.profile.totalCompleted >= 1) badges.push({ name: "Bước đầu tiên", icon: "sprout" });
  if (state.profile.totalCompleted >= 5) badges.push({ name: "Chăm chỉ", icon: "star" });
  if (state.profile.totalCompleted >= 10) badges.push({ name: "Siêu sao", icon: "trophy" });
  if (badges.length === 0) {
    h += '<p class="empty-text">Hoàn thành bài đầu tiên để nhận huy hiệu!</p>';
  } else {
    h += '<div class="badge-list">';
    badges.forEach(b => {
      h += '<div class="badge-chip">' + ic(b.icon) + ' ' + b.name + '</div>';
    });
    h += '</div>';
  }
  h += '</div>';

  // Week stats
  h += '<div class="profile-section"><h3 class="section-title">' + ic("chart") + ' Thành tích tuần</h3>';
  h += '<div class="stats-row">';
  h += '<div class="stat-chip"><span class="stat-num">' + state.profile.totalCompleted + '</span><span class="stat-lbl">Bài xong</span></div>';
  h += '<div class="stat-chip"><span class="stat-num">' + state.profile.todayCorrect + '</span><span class="stat-lbl">Câu đúng</span></div>';
  h += '</div></div>';

  // Color picker
  h += '<div class="profile-section"><h3 class="section-title">' + ic("star") + ' Màu đại diện</h3>';
  h += '<div class="color-picker">';
  ["#3B82F6","#8B5CF6","#EC4899","#EF4444","#F59E0B","#10B981","#6366F1","#14B8A6"].forEach(c => {
    const sel = c === state.profile.avatarColor ? ' selected' : '';
    h += '<button class="color-dot' + sel + '" style="background:' + c + '" onclick="state.profile.avatarColor=\'' + c + '\';saveProfile();render();" aria-label="Chọn màu"></button>';
  });
  h += '</div></div>';

  h += renderModal();
  return h;
}

// ========== INIT ==========
function initApp() {
  getProfile();
  initTheme();
  render();

  document.getElementById("btn-theme").addEventListener("click", toggleTheme);

  document.querySelectorAll(".bnav-item").forEach(el => {
    el.addEventListener("click", function() {
      const nav = this.dataset.nav;
      if (nav === "learn") go("mode");
      else go(nav);
    });
  });

  document.querySelector(".nav-logo").addEventListener("click", () => go("home"));
}

document.addEventListener("DOMContentLoaded", initApp);
