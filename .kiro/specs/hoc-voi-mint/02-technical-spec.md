# Technical Spec

## 1. Current State
- Relevant modules/files: `index.html`, `css/styles.css`, `js/data.js`, `js/app.js`
- Current flow: SPA thuần JS, render HTML string vào `#app` container
- Current limitations: Không lưu tiến độ, dữ liệu hardcode trong JS
- Known technical debt: Không có build tool, không có minification

## 2. Proposed Design
### Approach
Single-page app thuần HTML/CSS/JS, không framework. Dữ liệu câu hỏi lưu trong JS objects. Điều hướng bằng state object + render functions. Deploy tĩnh trên GitHub Pages.

### Why This Approach
- Đơn giản nhất cho mục tiêu: 1 file HTML mở là chạy
- Không cần build step, không cần server
- Phụ huynh chỉ cần mở link trên trình duyệt
- Dễ maintain và mở rộng dữ liệu

### Rejected Alternatives
- React/Vue SPA: Quá nặng cho app đơn giản, cần build tool
- PWA với Service Worker: Phức tạp hóa, deferred cho round sau
- Backend + Database: Không cần cho MVP, thêm chi phí hosting

## 3. Architecture Overview
```
index.html          ← Entry point, navbar, bottom nav
├── css/styles.css  ← Toàn bộ CSS, theme variables, Claymorphism
├── js/data.js      ← Data layer: TOPICS, LESSONS, EXAMS, QUESTIONS
└── js/app.js       ← App logic: state, navigation, rendering, quiz engine
```

### Key Architectural Decisions
- Render bằng HTML string concatenation (không virtual DOM)
- State là 1 global object, mutate trực tiếp
- Event delegation qua `data-action` attributes
- Theme lưu trong `data-theme` attribute trên `<html>`

## 4. Data Model

### TOPICS
```javascript
{
  id: string,        // "so-phep-tinh"
  name: string,      // "Số và phép tính"
  desc: string,      // Mô tả ngắn
  icon: string,      // Key trong ICONS map
  color: string,     // Hex color cho icon background
  lessonCount: number,
  semester: number | null
}
```

### LESSONS
```javascript
{
  id: string,           // "l01"
  topicId: string,      // FK → TOPICS.id
  title: string,
  difficulty: "easy" | "medium" | "hard",
  questionCount: number,
  semester: 1 | 2 | null
}
```

### EXAMS
```javascript
{
  id: string,           // "e01"
  title: string,
  semester: 1 | 2,
  questionCount: number,
  duration: string      // "30 phút"
}
```

### QUESTIONS
```javascript
// Map: lessonId/examId → Question[]
{
  [id: string]: Array<{
    type: "multiple_choice" | "input_number",
    text: string,
    choices?: string[],    // 4 items for multiple_choice
    answer: number,        // index for MC, value for input
    explain: string
  }>
}
```

### App State
```javascript
{
  currentScreen: "home" | "topics" | "lessons" | "quiz" | "result" | "exams",
  previousScreen: string | null,
  selectedTopic: Topic | null,
  selectedLesson: Lesson | null,
  selectedExam: Exam | null,
  quizSource: "lesson" | "exam" | "review" | null,
  quizQuestions: Question[],
  currentQuestionIndex: number,
  answers: (number | string | null)[],
  checked: boolean,
  sessionStats: { completed: number, correct: number, total: number },
  reviewQuestions: Question[],
  theme: "light" | "dark"
}
```

## 5. State Machine

### Screen Navigation Flow
```
Home ──→ Topics ──→ Lessons ──→ Quiz ──→ Result
  │                                        │
  ├──→ Exams ──→ Quiz ──→ Result           │
  │                                        │
  ←────────────────────────────────────────┘
```

### Quiz State Flow
```
START → Showing Question → [User selects answer] → Answer Selected
  → [User clicks Check] → Checked (show feedback)
  → [User clicks Next] → Next Question OR Finish
  → Finish → Result Screen
```

### State Transitions
| Current State | Trigger | Next State | Condition |
|---------------|---------|------------|-----------|
| home | click "Ôn theo chủ đề" | topics | — |
| home | click "Ôn HK1/HK2" | exams | filter by semester |
| topics | click topic card | lessons | set selectedTopic |
| lessons | click "Bắt đầu" | quiz | load questions |
| quiz | click choice | quiz | update answers[idx] |
| quiz | click "Kiểm tra" | quiz | set checked=true, show feedback |
| quiz | click "Câu tiếp" | quiz | increment index |
| quiz | last question + next | result | calculate score |
| result | click "Làm lại" | quiz | reset same questions |
| result | click "Ôn phần sai" | quiz | load wrong questions only |
| result | click "Về danh sách" | lessons/exams | based on source |

## 6. Filesystem Conventions
```
/
├── index.html              # Entry point
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── data.js             # Data (topics, lessons, exams, questions)
│   └── app.js              # App logic
└── design-system/
    └── vui-hoc-toan-3/
        └── MASTER.md        # Design system reference
```

## 7. Route / Page Structure
| Route | Screen | Purpose |
|-------|--------|---------|
| home | Home | Landing, quick actions, stats |
| topics | Topic List | Browse 6 chủ đề |
| lessons | Lesson List | Bài luyện trong 1 chủ đề |
| exams | Exam List | Đề ôn thi HK1/HK2 |
| quiz | Quiz Screen | Làm bài từng câu |
| result | Result Screen | Kết quả + review câu sai |

## 8. API Routes
Không có API — app hoàn toàn client-side.

## 9. Service / Adapter Interfaces
Không có — tất cả logic trong `app.js`.

## 10. Failure Handling
| Failure Type | Behavior |
|-------------|----------|
| localStorage unavailable | Fallback to light theme, no crash |
| Google Fonts fail to load | Fallback to system sans-serif |
| Question data missing for lesson/exam | Show "Không có câu hỏi" message |
| Empty input on check | Ignore click, do nothing |

## 11. Observability
Không có logging/monitoring cho round này. Session stats chỉ hiển thị trong UI.

## 12. Performance Considerations
- Không có API calls — tất cả dữ liệu trong JS
- CSS và JS nhỏ (< 50KB tổng)
- Google Fonts là external dependency duy nhất
- Render bằng innerHTML — đủ nhanh cho data size hiện tại

## 13. Security Considerations
- Không có user input gửi lên server
- Không có sensitive data
- innerHTML dùng với data hardcode (không có user-generated content)
- Không có XSS risk vì không có dynamic user input rendered as HTML

## 14. Resolved Technical Questions
| ID | Question | Resolution | Decision Ref |
|----|----------|-----------|-------------|
| TQ-1 | Dùng framework hay vanilla JS? | Vanilla JS — đơn giản, không cần build | D-01 |
| TQ-2 | Font nào hỗ trợ tiếng Việt? | Nunito (heading + body) | D-04 |
| TQ-3 | Deploy ở đâu? | GitHub Pages — miễn phí, static hosting | D-02 |
| TQ-4 | Lưu tiến độ thế nào? | Session only, localStorage cho theme | D-03 |
