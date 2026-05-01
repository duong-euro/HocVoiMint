/* ============================================
   VUI HỌC TOÁN 3 — App Logic
   Navigation, state management, rendering
   ============================================ */

// ---------- App State ----------
const state = {
  currentScreen: "home",
  previousScreen: null,
  selectedTopic: null,
  selectedLesson: null,
  selectedExam: null,
  quizSource: null, // "lesson" | "exam" | "review"
  quizQuestions: [],
  currentQuestionIndex: 0,
  answers: [],
  checked: false,
  sessionStats: { completed: 0, correct: 0, total: 0 },
  reviewQuestions: [],
  theme: "light"
};

// ---------- Theme ----------
function initTheme() {
  const saved = getSavedTheme();
  if (saved) {
    state.theme = saved;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    state.theme = "dark";
  }
  applyTheme();
}

function getSavedTheme() {
  try { return localStorage.getItem("vht3-theme"); } catch(e) { return null; }
}

function saveTheme(t) {
  try { localStorage.setItem("vht3-theme", t); } catch(e) { /* no-op */ }
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  updateThemeIcon();
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  applyTheme();
  saveTheme(state.theme);
}

function updateThemeIcon() {
  const btn = document.getElementById("btn-theme");
  if (!btn) return;
  const isDark = state.theme === "dark";
  btn.innerHTML = isDark
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  btn.setAttribute("aria-label", isDark ? "Chuyển sang sáng" : "Chuyển sang tối");
}

// ---------- Navigation ----------
function navigate(screen) {
  state.previousScreen = state.currentScreen;
  state.currentScreen = screen;
  renderScreen();
  updateBottomNav();
  window.scrollTo(0, 0);
}

function goBack() {
  if (state.previousScreen) {
    const target = state.previousScreen;
    state.previousScreen = null;
    state.currentScreen = target;
    renderScreen();
    updateBottomNav();
    window.scrollTo(0, 0);
  } else {
    navigate("home");
  }
}

function updateBottomNav() {
  document.querySelectorAll(".bottom-nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.screen === state.currentScreen);
  });
}

// ---------- SVG Icons ----------
const ICONS = {
  calculator: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="16" y2="18"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  shapes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 20 2 20"/></svg>',
  ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>'
};

function icon(name, cls) {
  return '<span class="icon ' + (cls || '') + '">' + (ICONS[name] || '') + '</span>';
}

// ---------- Screen Renderer ----------
function renderScreen() {
  const app = document.getElementById("app");
  const screens = {
    home: renderHome,
    topics: renderTopics,
    lessons: renderLessons,
    quiz: renderQuiz,
    result: renderResult,
    exams: renderExams
  };
  const renderer = screens[state.currentScreen];
  if (renderer) {
    app.innerHTML = '<div class="screen active">' + renderer() + '</div>';
    bindScreenEvents();
  }
}

function bindScreenEvents() {
  // Bind all data-action elements
  document.querySelectorAll("[data-action]").forEach(el => {
    el.addEventListener("click", handleAction);
  });
}

function handleAction(e) {
  const el = e.currentTarget;
  const action = el.dataset.action;
  const id = el.dataset.id;
  const value = el.dataset.value;

  switch (action) {
    case "navigate":
      navigate(id);
      break;
    case "select-topic":
      state.selectedTopic = TOPICS.find(t => t.id === id);
      state.previousScreen = state.currentScreen;
      navigate("lessons");
      break;
    case "start-lesson":
      startQuiz("lesson", id);
      break;
    case "start-exam":
      startQuiz("exam", id);
      break;
    case "start-exam-semester":
      state.previousScreen = "home";
      navigate("exams");
      // Filter will be handled by value
      if (value) state._examFilter = parseInt(value);
      renderScreen();
      break;
    case "select-choice":
      selectChoice(parseInt(value));
      break;
    case "check-answer":
      checkAnswer();
      break;
    case "next-question":
      nextQuestion();
      break;
    case "quit-quiz":
      quitQuiz();
      break;
    case "retry-quiz":
      retryQuiz();
      break;
    case "review-wrong":
      reviewWrong();
      break;
    case "back-to-list":
      backToList();
      break;
    case "submit-input":
      checkAnswer();
      break;
  }
}

// ---------- Home Screen ----------
function renderHome() {
  const suggestions = getSuggestions();
  let html = '';

  // Greeting with mascot
  html += '<div class="greeting-section">';
  html += '<div class="greeting-mascot">' + ICONS.star + '</div>';
  html += '<p class="greeting">Hôm nay mình học Toán nhé!</p>';
  html += '<p class="greeting-sub">Chọn chủ đề hoặc làm đề ôn thi nào</p>';
  html += '</div>';

  // Main actions
  html += '<div class="home-actions">';
  html += '<button class="btn btn-primary btn-lg" data-action="navigate" data-id="topics">' + icon("list") + ' Ôn theo chủ đề</button>';
  html += '<button class="btn btn-secondary btn-lg" data-action="start-exam-semester" data-value="1">' + icon("clipboard") + ' Ôn học kỳ 1</button>';
  html += '<button class="btn btn-cta btn-lg" data-action="start-exam-semester" data-value="2">' + icon("clipboard") + ' Ôn học kỳ 2</button>';
  html += '</div>';

  // Stats
  html += '<div class="stats-card">';
  html += '<h3>' + icon("award") + ' Thành tích hôm nay</h3>';
  html += '<div class="stats-row">';
  html += '<div class="stat-item"><div class="stat-number">' + state.sessionStats.completed + '</div><div class="stat-label">Bài đã làm</div></div>';
  html += '<div class="stat-item"><div class="stat-number">' + state.sessionStats.correct + '</div><div class="stat-label">Câu đúng</div></div>';
  html += '<div class="stat-item"><div class="stat-number">' + state.sessionStats.total + '</div><div class="stat-label">Tổng câu</div></div>';
  html += '</div></div>';

  // Suggestions
  if (suggestions.length > 0) {
    html += '<h3 class="section-title">Bài nên học tiếp</h3>';
    html += '<div class="suggestion-list">';
    suggestions.forEach(s => {
      const topic = TOPICS.find(t => t.id === s.topicId);
      const bgColor = topic ? topic.color : "#2563EB";
      html += '<div class="suggestion-item card-clickable" data-action="start-lesson" data-id="' + s.id + '">';
      html += '<div class="suggestion-icon" style="background:' + bgColor + '15; color:' + bgColor + '">' + icon(topic ? topic.icon : "book") + '</div>';
      html += '<div><div class="suggestion-text">' + s.title + '</div>';
      html += '<div class="suggestion-sub">' + (topic ? topic.name : '') + ' · ' + s.questionCount + ' câu</div></div>';
      html += '</div>';
    });
    html += '</div>';
  }

  return html;
}

function getSuggestions() {
  // Return first 3 lessons as suggestions
  return LESSONS.slice(0, 3);
}

// ---------- Topics Screen ----------
function renderTopics() {
  let html = '<h2 class="mb-16">Chủ đề ôn tập</h2>';
  html += '<div class="card-list">';
  TOPICS.forEach(topic => {
    const lessons = LESSONS.filter(l => l.topicId === topic.id);
    html += '<div class="card card-clickable topic-card" data-action="select-topic" data-id="' + topic.id + '" style="border-left-color:' + topic.color + '">';
    html += '<div class="topic-header">';
    html += '<div class="topic-icon" style="background:' + topic.color + '">' + icon(topic.icon) + '</div>';
    html += '<div class="topic-info">';
    html += '<h3>' + topic.name + '</h3>';
    html += '<p>' + topic.desc + '</p>';
    html += '<div class="topic-meta">';
    html += '<span>' + lessons.length + ' bài</span>';
    const semesters = [...new Set(lessons.map(l => l.semester).filter(Boolean))];
    semesters.forEach(s => {
      html += '<span class="badge badge-hk' + s + '">HK' + s + '</span>';
    });
    html += '</div></div></div></div>';
  });
  html += '</div>';
  return html;
}

// ---------- Lessons Screen ----------
function renderLessons() {
  const topic = state.selectedTopic;
  if (!topic) return renderTopics();

  const lessons = LESSONS.filter(l => l.topicId === topic.id);
  let html = '';
  html += '<button class="btn-back" data-action="navigate" data-id="topics">' + icon("arrowLeft") + ' Quay lại</button>';
  html += '<h2 class="mb-8">' + topic.name + '</h2>';
  html += '<p style="color:var(--color-text-muted);font-size:0.88rem;margin-bottom:16px">' + topic.desc + '</p>';
  html += '<div class="card-list">';

  lessons.forEach(lesson => {
    const diffLabel = { easy: "Dễ", medium: "Vừa", hard: "Nâng cao" };
    const diffClass = { easy: "badge-easy", medium: "badge-medium", hard: "badge-hard" };
    html += '<div class="card lesson-card">';
    html += '<div class="lesson-info">';
    html += '<h3>' + lesson.title + '</h3>';
    html += '<div class="lesson-meta">';
    html += '<span class="badge ' + diffClass[lesson.difficulty] + '">' + diffLabel[lesson.difficulty] + '</span>';
    html += '<span>' + lesson.questionCount + ' câu</span>';
    if (lesson.semester) html += '<span class="badge badge-hk' + lesson.semester + '">HK' + lesson.semester + '</span>';
    html += '</div></div>';
    html += '<button class="btn btn-primary btn-sm" data-action="start-lesson" data-id="' + lesson.id + '">' + icon("play") + ' Bắt đầu</button>';
    html += '</div>';
  });

  html += '</div>';
  return html;
}

// ---------- Exams Screen ----------
function renderExams() {
  const filter = state._examFilter || null;
  let html = '';
  html += '<button class="btn-back" data-action="navigate" data-id="home">' + icon("arrowLeft") + ' Quay lại</button>';
  html += '<h2 class="mb-16">Đề ôn thi</h2>';

  const semesters = filter ? [filter] : [1, 2];
  semesters.forEach(sem => {
    const exams = EXAMS.filter(e => e.semester === sem);
    html += '<h3 class="section-title mb-12">Học kỳ ' + sem + '</h3>';
    html += '<div class="card-list mb-24">';
    exams.forEach(exam => {
      html += '<div class="card exam-card">';
      html += '<div class="exam-info">';
      html += '<h3>' + exam.title + '</h3>';
      html += '<div class="exam-meta">';
      html += '<span>' + exam.questionCount + ' câu</span>';
      html += '<span>' + icon("clock") + ' ' + exam.duration + '</span>';
      html += '</div></div>';
      html += '<button class="btn btn-cta btn-sm" data-action="start-exam" data-id="' + exam.id + '">' + icon("play") + ' Làm bài</button>';
      html += '</div>';
    });
    html += '</div>';
  });

  return html;
}

// ---------- Quiz Logic ----------
function startQuiz(source, id) {
  state.quizSource = source;
  state.quizQuestions = QUESTIONS[id] ? [...QUESTIONS[id]] : [];
  state.currentQuestionIndex = 0;
  state.answers = new Array(state.quizQuestions.length).fill(null);
  state.checked = false;

  if (source === "lesson") {
    state.selectedLesson = LESSONS.find(l => l.id === id);
    state.selectedExam = null;
  } else if (source === "exam") {
    state.selectedExam = EXAMS.find(e => e.id === id);
    state.selectedLesson = null;
  } else if (source === "review") {
    state.selectedLesson = null;
    state.selectedExam = null;
  }

  state.previousScreen = state.currentScreen;
  navigate("quiz");
}

function renderQuiz() {
  const questions = state.quizQuestions;
  if (!questions.length) return '<p>Không có câu hỏi.</p>';

  const idx = state.currentQuestionIndex;
  const q = questions[idx];
  const total = questions.length;
  const progress = ((idx + (state.checked ? 1 : 0)) / total * 100).toFixed(0);

  // Label
  let label = "";
  if (state.quizSource === "lesson" && state.selectedLesson) {
    const topic = TOPICS.find(t => t.id === state.selectedLesson.topicId);
    label = (topic ? topic.name + " · " : "") + state.selectedLesson.title;
  } else if (state.quizSource === "exam" && state.selectedExam) {
    label = state.selectedExam.title;
  } else {
    label = "Ôn lại phần sai";
  }

  let html = '';
  // Header
  html += '<div class="quiz-header">';
  html += '<div class="quiz-label">' + label + '</div>';
  html += '<div class="progress-bar"><div class="progress-fill" style="width:' + progress + '%"></div></div>';
  html += '<div class="progress-text">Câu ' + (idx + 1) + ' / ' + total + '</div>';
  html += '</div>';

  // Question card
  html += '<div class="card question-card">';
  html += '<div class="question-number">' + (idx + 1) + '</div>';
  html += '<div class="question-text">' + q.text + '</div>';

  if (q.type === "multiple_choice") {
    html += renderChoices(q, idx);
  } else if (q.type === "input_number") {
    html += renderInputNumber(q, idx);
  }

  // Feedback
  html += '<div id="feedback" class="feedback"></div>';
  html += '</div>';

  // Actions
  html += '<div class="quiz-actions">';
  if (!state.checked) {
    html += '<button class="btn btn-primary" data-action="check-answer" id="btn-check">Kiểm tra</button>';
  } else {
    if (idx < total - 1) {
      html += '<button class="btn btn-primary" data-action="next-question">Câu tiếp theo</button>';
    } else {
      html += '<button class="btn btn-cta" data-action="next-question">Xem kết quả</button>';
    }
  }
  html += '<button class="btn btn-outline btn-sm" data-action="quit-quiz">' + icon("x") + ' Thoát bài</button>';
  html += '</div>';

  return html;
}

function renderChoices(q, idx) {
  const labels = ["A", "B", "C", "D"];
  const selected = state.answers[idx];
  let html = '<div class="choices">';

  q.choices.forEach((choice, i) => {
    let cls = "choice-btn";
    if (state.checked) {
      cls += " disabled";
      if (i === q.answer) cls += " correct";
      else if (i === selected && i !== q.answer) cls += " wrong";
    } else {
      if (i === selected) cls += " selected";
    }
    html += '<button class="' + cls + '" data-action="select-choice" data-value="' + i + '">';
    html += '<span class="choice-label">' + labels[i] + '</span>';
    html += '<span>' + choice + '</span>';
    html += '</button>';
  });

  html += '</div>';
  return html;
}

function renderInputNumber(q, idx) {
  const val = state.answers[idx];
  let cls = "input-answer";
  if (state.checked) {
    cls += val !== null && parseInt(val) === q.answer ? " correct" : " wrong";
  }
  const disabled = state.checked ? ' disabled' : '';
  const inputVal = val !== null && val !== undefined ? val : '';
  return '<input type="number" inputmode="numeric" class="' + cls + '" id="input-answer" placeholder="Nhập đáp án..." value="' + inputVal + '"' + disabled + '>';
}

function selectChoice(choiceIndex) {
  if (state.checked) return;
  const idx = state.currentQuestionIndex;
  state.answers[idx] = choiceIndex;
  renderScreen();
}

function checkAnswer() {
  const idx = state.currentQuestionIndex;
  const q = state.quizQuestions[idx];

  // For input_number, grab value from input
  if (q.type === "input_number") {
    const input = document.getElementById("input-answer");
    if (input) {
      const val = input.value.trim();
      if (val === "") return; // Don't check empty
      state.answers[idx] = val;
    }
  }

  // For multiple_choice, must have selected
  if (q.type === "multiple_choice" && state.answers[idx] === null) return;

  state.checked = true;
  renderScreen();

  // Show feedback
  const fb = document.getElementById("feedback");
  if (fb) {
    let isCorrect = false;
    if (q.type === "multiple_choice") {
      isCorrect = state.answers[idx] === q.answer;
    } else {
      isCorrect = parseInt(state.answers[idx]) === q.answer;
    }
    fb.className = "feedback show " + (isCorrect ? "correct" : "wrong");
    fb.innerHTML = (isCorrect ? icon("check") + " Đúng rồi! " : icon("x") + " Sai rồi! ") + q.explain;
  }
}

function nextQuestion() {
  const idx = state.currentQuestionIndex;
  if (idx < state.quizQuestions.length - 1) {
    state.currentQuestionIndex++;
    state.checked = false;
    renderScreen();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  // Calculate results
  const questions = state.quizQuestions;
  let correct = 0;
  const wrongList = [];

  questions.forEach((q, i) => {
    let isCorrect = false;
    if (q.type === "multiple_choice") {
      isCorrect = state.answers[i] === q.answer;
    } else {
      isCorrect = parseInt(state.answers[i]) === q.answer;
    }
    if (isCorrect) {
      correct++;
    } else {
      wrongList.push({ question: q, userAnswer: state.answers[i], index: i });
    }
  });

  state.quizResult = {
    correct: correct,
    total: questions.length,
    percent: Math.round(correct / questions.length * 100),
    wrongList: wrongList
  };

  // Update session stats
  state.sessionStats.completed++;
  state.sessionStats.correct += correct;
  state.sessionStats.total += questions.length;

  // Store wrong questions for review
  state.reviewQuestions = wrongList.map(w => w.question);

  navigate("result");
}

function quitQuiz() {
  if (state.quizSource === "lesson") {
    navigate("lessons");
  } else if (state.quizSource === "exam") {
    navigate("exams");
  } else {
    navigate("home");
  }
}

function retryQuiz() {
  if (state.quizSource === "lesson" && state.selectedLesson) {
    startQuiz("lesson", state.selectedLesson.id);
  } else if (state.quizSource === "exam" && state.selectedExam) {
    startQuiz("exam", state.selectedExam.id);
  } else {
    navigate("home");
  }
}

function reviewWrong() {
  if (state.reviewQuestions.length === 0) {
    navigate("home");
    return;
  }
  state.quizSource = "review";
  state.quizQuestions = [...state.reviewQuestions];
  state.currentQuestionIndex = 0;
  state.answers = new Array(state.quizQuestions.length).fill(null);
  state.checked = false;
  navigate("quiz");
}

function backToList() {
  if (state.selectedLesson) {
    const topic = TOPICS.find(t => t.id === state.selectedLesson.topicId);
    if (topic) {
      state.selectedTopic = topic;
      navigate("lessons");
      return;
    }
  }
  if (state.selectedExam || state.quizSource === "exam") {
    navigate("exams");
    return;
  }
  navigate("home");
}

// ---------- Result Screen ----------
function renderResult() {
  const r = state.quizResult;
  if (!r) return '<p>Không có kết quả.</p>';

  const grade = r.percent >= 80 ? "good" : r.percent >= 50 ? "ok" : "bad";
  const messages = {
    good: { title: "Xuất sắc!", sub: "Con giỏi lắm, tiếp tục phát huy nhé!" },
    ok: { title: "Khá tốt!", sub: "Cố gắng thêm một chút nữa nhé!" },
    bad: { title: "Cần ôn thêm!", sub: "Không sao, mình ôn lại rồi sẽ giỏi hơn!" }
  };

  const isExam = state.quizSource === "exam";
  let html = '';

  html += '<div class="result-hero' + (grade === "good" ? ' result-confetti' : '') + '">';
  if (isExam) {
    html += '<p class="quiz-label mb-8">Kết quả đề ôn thi</p>';
  }
  html += '<div class="result-score-circle ' + grade + '">';
  html += '<div class="result-fraction">' + r.correct + '/' + r.total + '</div>';
  html += '<div class="result-percent">' + r.percent + '%</div>';
  html += '</div>';
  html += '<h2 class="result-message">' + messages[grade].title + '</h2>';
  html += '<p class="result-sub">' + messages[grade].sub + '</p>';
  html += '</div>';

  // Wrong answers
  if (r.wrongList.length > 0) {
    html += '<h3 class="section-title mb-12">Câu trả lời sai (' + r.wrongList.length + ' câu)</h3>';
    html += '<div class="wrong-list">';
    r.wrongList.forEach((w, i) => {
      const q = w.question;
      let userAns = "";
      let correctAns = "";
      if (q.type === "multiple_choice") {
        userAns = w.userAnswer !== null ? q.choices[w.userAnswer] : "(chưa chọn)";
        correctAns = q.choices[q.answer];
      } else {
        userAns = w.userAnswer !== null ? w.userAnswer : "(chưa nhập)";
        correctAns = q.answer;
      }
      html += '<div class="card wrong-item">';
      html += '<div class="q-text">Câu ' + (w.index + 1) + ': ' + q.text + '</div>';
      html += '<div class="q-detail">Đáp án của con: ' + userAns + '</div>';
      html += '<div class="q-detail">Đáp án đúng: <span>' + correctAns + '</span></div>';
      html += '<div class="q-detail" style="margin-top:4px;font-style:italic">' + q.explain + '</div>';
      html += '</div>';
    });
    html += '</div>';
  }

  // Actions
  html += '<div class="result-actions">';
  html += '<button class="btn btn-primary" data-action="retry-quiz">' + icon("refresh") + ' Làm lại bài này</button>';
  if (r.wrongList.length > 0) {
    html += '<button class="btn btn-secondary" data-action="review-wrong">' + icon("book") + ' Ôn lại phần sai</button>';
  }
  html += '<button class="btn btn-outline" data-action="back-to-list">' + icon("arrowLeft") + ' Về danh sách bài</button>';
  html += '</div>';

  return html;
}

// ---------- Init ----------
function initApp() {
  initTheme();
  renderScreen();
  updateBottomNav();

  // Theme toggle
  document.getElementById("btn-theme").addEventListener("click", toggleTheme);

  // Bottom nav
  document.querySelectorAll(".bottom-nav-item").forEach(item => {
    item.addEventListener("click", function() {
      const screen = this.dataset.screen;
      if (screen) {
        state._examFilter = null;
        navigate(screen);
      }
    });
  });

  // Logo click -> home
  document.querySelector(".navbar-logo").addEventListener("click", function() {
    state._examFilter = null;
    navigate("home");
  });
}

document.addEventListener("DOMContentLoaded", initApp);
